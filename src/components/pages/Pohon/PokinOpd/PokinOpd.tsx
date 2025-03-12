'use client'

import '@/components/pages/Pohon/treeflex.css'
import { useState, useEffect, useRef } from 'react';
import { TbPencil, TbCheck, TbCircleLetterXFilled, TbCirclePlus, TbHandStop, TbPointer, TbSettings, TbHourglass, TbCopy } from 'react-icons/tb';
import { ButtonGreenBorder, ButtonSkyBorder, ButtonRedBorder, ButtonBlackBorder, ButtonBlack } from '@/components/global/Button';
import { LoadingBeat, LoadingButtonClip } from '@/components/global/Loading';
import { OpdTahunNull, TahunNull } from '@/components/global/OpdTahunNull';
import { PohonOpd } from '@/components/lib/Pohon/Opd/PohonOpd';
import { FormPohonOpd } from '@/components/lib/Pohon/Opd/FormPohonOpd';
import { getUser, getToken, getOpdTahun } from '@/components/lib/Cookie';
import { ModalPohonPemda, ModalPohonCrosscutting } from './ModalPohonPemda';
import { ModalTujuanOpd } from '../../tujuanopd/ModalTujuanOpd';
import { ModalClone } from '../ModalClone';
import html2canvas from "html2canvas";

interface OptionType {
  value: number;
  label: string;
}
interface PokinPemda {
  value: number;
  label: string;
  jenis: string;
}
interface pokin {
  kode_opd: string;
  nama_opd: string;
  tahun: string;
  tujuan_opd: tujuan[];
  childs: childs[]
}
interface tujuan {
  id: number;
  tujuan: string;
}
interface childs {
  id: number;
  parent: number;
  strategi: string;
  target: string;
  satuan: string;
  keterangan: string;
  indikators: string;
  childs: childs[];
}
interface TujuanOpd {
  id_tujuan_opd: number;
  tujuan: string;
}

const PokinOpd = () => {
  const [User, setUser] = useState<any>(null);
  const [Tahun, setTahun] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);
  const [Pokin, setPokin] = useState<pokin | null>(null);
  const [Loading, setLoading] = useState<boolean | null>(null);
  const [IsLoading, setIsLoading] = useState<boolean>(false);

  const [Kendali, setKendali] = useState<boolean>(true);
  const [OpenModalTujuanOpd, setOpenModalTujuanOpd] = useState<boolean>(false);

  //rekapitulasi jumlah pohon dari pemda
  const [JumlahPemdaStrategic, setJumlahPemdaStrategic] = useState<PokinPemda[]>([]);
  const [JumlahPemdaTactical, setJumlahPemdaTactical] = useState<PokinPemda[]>([]);
  const [JumlahPemdaOperational, setJumlahPemdaOperational] = useState<PokinPemda[]>([]);

  //pohon pemda
  const [PohonPemda, setPohonPemda] = useState<boolean>(false);
  const [TriggerAfterPokinOutside, setTriggerAfterPokinOutside] = useState<boolean>(false);
  const [LevelPemda, setLevelPemda] = useState<number>(0);

  //pohon cross opd lain
  const [PohonCrosscutting, setPohonCrosscutting] = useState<boolean>(false);
  const [CrossPending, setCrossPending] = useState<number | null>(null);
  const [CrossDitolak, setCrossDitolak] = useState<number | null>(null);

  //clone
  const [Clone, setClone] = useState<boolean>(false);

  const [error, setError] = useState<string>('');
  const token = getToken();

  const [formList, setFormList] = useState<number[]>([]); // List of form IDs
  const [Deleted, setDeleted] = useState<boolean>(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });
  const [cursorMode, setCursorMode] = useState<"normal" | "hand">("normal");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPdf = async () => {
    if (!containerRef.current) return;

    const elementsToHide = document.querySelectorAll(".hide-on-capture") as NodeListOf<HTMLElement>;
    elementsToHide.forEach((el) => (el.style.display = "none"));

    const paddingTop = 50 // Extra padding for the top of the canvas

    try {
      const element = containerRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        width: element.scrollWidth + 50, // Use full scrollable width
        height: element.scrollHeight + 250, // Use full scrollable height
        windowWidth: element.scrollWidth + 50, // Force full width rendering
        windowHeight: element.scrollHeight + 250, // Force full height rendering
        useCORS: true, // For cross-origin images
      });

      // Create a new canvas with extra padding
      const newCanvas = document.createElement("canvas");
      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height + paddingTop;

      const ctx = newCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white"; // Optional: Background color
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
        ctx.drawImage(canvas, 0, paddingTop);
      }

      const imgData = newCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "capture.png";
      link.click();
    } catch (error) {
      alert("Error capturing the element");
      console.error("Error capturing the element:", error);
    } finally {
      // Ensure elements are restored even if an error occurs
      elementsToHide.forEach((el) => (el.style.display = ""));
    }
  };

  useEffect(() => {
    const fetchUser = getUser();
    if (fetchUser) {
      setUser(fetchUser.user);
    }
    const data = getOpdTahun();
    if (data.tahun) {
      const tahun = {
        value: data.tahun.value,
        label: data.tahun.label,
      }
      setTahun(tahun);
    }
    if (data.opd) {
      const opd = {
        value: data.opd.value,
        label: data.opd.label,
      }
      setSelectedOpd(opd);
    }
  }, []);

  const toggleCursorMode = () => {
    setCursorMode((prevMode) => (prevMode === "normal" ? "hand" : "normal"));
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    if (cursorMode === "normal") return; // Ignore if cursor is normal

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      setScrollStart({
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const dx = dragStart.x - e.clientX;
    const dy = dragStart.y - e.clientY;
    containerRef.current.scrollLeft = scrollStart.x + dx;
    containerRef.current.scrollTop = scrollStart.y + dy;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleModalPohonPemda = (level: number) => {
    setPohonPemda((prev) => !prev);
    setLevelPemda(level);
  }
  const handleModalCrosscutting = () => {
    setPohonCrosscutting((prev) => !prev);
  }
  const handleTriggerAfterPokinOutside = () => {
    setTriggerAfterPokinOutside((prev) => !prev);
  }

  // Adds a new form entry
  const newChild = () => {
    setFormList([...formList, Date.now()]); // Using unique IDs
  };

  const handleModalNewTujuan = () => {
    if (OpenModalTujuanOpd) {
      setOpenModalTujuanOpd(false);
    } else {
      setOpenModalTujuanOpd(true);
    }
  }

  useEffect(() => {
    const fetchPokinOpd = async (url: string) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setLoading(true);
      //FETCH POKIN OPD
      try {
        const response = await fetch(`${API_URL}/${url}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('terdapat kesalahan di koneksi backend');
        }
        const result = await response.json();
        const data = result.data || [];
        setPokin(data);
      } catch (err) {
        setError('gagal mendapatkan data, terdapat kesalahan backend/server saat mengambil data pohon kinerja perangkat daerah');
        console.error(err);
      } finally {
        setLoading(false);
      }
      //FETCH STATUS POHON PEMDA
      try {
        const url = User?.roles == 'super_admin' ? `pohon_kinerja/status/${SelectedOpd?.value}/${Tahun?.value}` : `pohon_kinerja/status/${User?.kode_opd}/${Tahun?.value}`;
        const response = await fetch(`${API_URL}/${url}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('terdapat kesalahan di koneksi backend');
        }
        const result = await response.json();
        const data = result.data || [];
        if (data) {
          const Strategic = data.filter((item: any) => item.level_pohon == 4);
          setJumlahPemdaStrategic(Strategic);
          const Tactical = data.filter((item: any) => item.level_pohon == 5);
          setJumlahPemdaTactical(Tactical);
          const Operational = data.filter((item: any) => item.level_pohon == 6);
          setJumlahPemdaOperational(Operational);
        }
      } catch (err) {
        setError('gagal mendapatkan data, terdapat kesalahan backend/server saat mengambil data pohon kinerja perangkat daerah');
        console.error(err);
      } finally {
        setLoading(false);
      }
      //FETCH STATUS POHON CROSSCUTTING
      try {
        const url = User?.roles == 'super_admin' ? `crosscutting_menunggu/${SelectedOpd?.value}/${Tahun?.value}` : `crosscutting_menunggu/${User?.kode_opd}/${Tahun?.value}`;
        const response = await fetch(`${API_URL}/${url}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('terdapat kesalahan di koneksi backend');
        }
        const result = await response.json();
        const data = result.data || [];
        if (data) {
          const pending = data.filter((item: any) => item.status === "crosscutting_menunggu");
          setCrossPending(pending.length);
          const ditolak = data.filter((item: any) => item.status === "crosscutting_ditolak");
          setCrossDitolak(ditolak.length);
        }
      } catch (err) {
        setError('gagal mendapatkan data, terdapat kesalahan backend/server saat mengambil data pohon kinerja perangkat daerah');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (User?.roles == 'super_admin' || User?.roles == 'reviewer') {
      if (SelectedOpd?.value != undefined && Tahun?.value != undefined) {
        fetchPokinOpd(`pohon_kinerja_opd/findall/${SelectedOpd?.value}/${Tahun?.value}`);
      }
    } else if (User?.roles != 'super_admin') {
      if (User?.kode_opd != undefined && Tahun?.value != undefined) {
        fetchPokinOpd(`pohon_kinerja_opd/findall/${User?.kode_opd}/${Tahun?.value}`);
      }
    }
  }, [User, SelectedOpd, Tahun, Deleted, token, TriggerAfterPokinOutside]);

  if (Loading) {
    return (
      <>
        <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
          <h1>Pohon Kinerja {SelectedOpd?.label}</h1>
        </div>
        <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
          <LoadingBeat />
        </div>
      </>
    )
  }
  if (error) {
    return (
      <>
        <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
          <h1>Pohon Kinerja</h1>
        </div>
        <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
          {error}
        </div>
      </>
    )
  }
  /* TODO: Refactor logic | guard tahun dan opd kosong */
  if (User?.roles == 'super_admin' || User?.roles == 'reviewer') {
    if (SelectedOpd?.value == undefined || Tahun?.value == undefined) {
      return (
        <>
          <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
            <h1>Pohon Kinerja {SelectedOpd?.label}</h1>
          </div>
          <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
            <OpdTahunNull />
          </div>
        </>
      )
    }
  }
  if (User?.roles != 'super_admin') {
    if (Tahun?.value == undefined) {
      return (
        <>
          <div className="flex flex-col p-5 border-2 rounded-t-xl mt-2">
            <h1>Pohon Kinerja {SelectedOpd?.label}</h1>
          </div>
          <div className="flex flex-col p-5 border-b-2 border-x-2 rounded-b-xl">
            <TahunNull />
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div className="flex justify-between items-center p-5 border-2 rounded-t-xl mt-2">
        {(User?.roles == 'super_admin' || User?.roles === 'reviewer') ?
          <h1 className="font-bold">Pohon Kinerja {SelectedOpd?.label}</h1>
          :
          User?.roles == 'admin_opd' ?
            <h1 className="font-bold">Pohon Kinerja {Pokin?.nama_opd}</h1>
            :
            <h1 className="font-bold">Pohon Cascading {Pokin?.nama_opd}</h1>
        }
        {(User?.roles == 'admin_opd' || User?.roles == 'super_admin') &&
          <ButtonBlackBorder onClick={() => setKendali((prev) => !prev)}>{Kendali ? <span className='flex gap-1 items-center'><TbSettings />Sembunyikan</span> : <span className='flex gap-1 items-center'><TbSettings />Tampilkan</span>}</ButtonBlackBorder>
        }
      </div>
      <div className="flex flex-col py-3 px-3 border-b-2 border-x-2 rounded-b-xl relative w-full h-[calc(100vh-50px)] max-h-screen overflow-auto">
        {(User?.roles == 'admin_opd' || User?.roles == 'super_admin') &&
          <div className={`flex flex-wrap justify-between gap-2 transition-all duration-300 ease-in-out ${Kendali ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
            {/* PEMDA */}
            <div className="flex flex-col justify-between border-2 max-w-[400px] min-w-[300px] px-3 py-2 rounded-xl">
              <h1 className="font-semibold border-b-2 py-1 text-center">
                Pohon Pemda
              </h1>
              <div className="flex flex-col py-2 mt-1 justify-between">
                <table>
                  <tbody className='flex flex-col gap-2'>
                    <tr className="flex items-center border border-red-500 text-red-500 cursor-pointer rounded-lg px-2 hover:bg-red-500 hover:text-white"
                      onClick={() => handleModalPohonPemda(4)}
                    >
                      <td className="px-2 py-1 text-start min-w-[130px]">
                        <button type="button" className="font-semibold">
                          Strategic
                        </button>
                      </td>
                      <td className="py-1">
                        <h1 className="font-semibold">
                          :
                        </h1>
                      </td>
                      <td className='flex justify-center px-2 py-1 text-center w-full'>
                        <h1 className="flex items-center gap-1 font-semibold">
                          {JumlahPemdaStrategic?.length || 0}
                          <TbHourglass />
                        </h1>
                      </td>
                      <td className="py-1">
                        <h1 className="font-semibold">
                          /
                        </h1>
                      </td>
                      <td className='flex justify-center px-2 py-1 text-center w-full'>
                        <h1 className="flex items-center gap-1 font-semibold">
                          0
                          <TbCheck />
                        </h1>
                      </td>
                    </tr>
                    <tr className="flex items-center border border-blue-500 text-blue-500 cursor-pointer rounded-lg px-2 hover:bg-blue-500 hover:text-white"
                      onClick={() => handleModalPohonPemda(5)}
                    >
                      <td className="px-2 py-1 text-start min-w-[130px]">
                        <h1 className="font-semibold">
                          Tactical
                        </h1>
                      </td>
                      <td className="py-1">
                        <h1 className="font-semibold">
                          :
                        </h1>
                      </td>
                      <td className='flex justify-center px-2 py-1 text-center w-full'>
                        <h1 className="flex items-center gap-1 font-semibold">
                          {JumlahPemdaTactical?.length || 0}
                          <TbHourglass />
                        </h1>
                      </td>
                      <td className="py-1">
                        <h1 className="font-semibold">
                          /
                        </h1>
                      </td>
                      <td className='flex justify-center px-2 py-1 text-center w-full'>
                        <h1 className="flex items-center gap-1 font-semibold">
                          0
                          <TbCheck />
                        </h1>
                      </td>
                    </tr>
                    <tr className="flex items-center border border-green-500 text-green-500 cursor-pointer rounded-lg px-2 hover:bg-green-500 hover:text-white"
                      onClick={() => handleModalPohonPemda(6)}
                    >
                      <td className="px-2 py-1 text-start min-w-[130px]">
                        <h1 className="font-semibold">
                          Operational
                        </h1>
                      </td>
                      <td className="py-1">
                        <h1 className="font-semibold">
                          :
                        </h1>
                      </td>
                      <td className='flex justify-center px-2 py-1 text-center w-full'>
                        <h1 className="flex gap-1 items-center font-semibold">
                          {JumlahPemdaOperational?.length || 0}
                          <TbHourglass />
                        </h1>
                      </td>
                      <td className="py-1">
                        <h1 className="font-semibold">
                          /
                        </h1>
                      </td>
                      <td className='flex justify-center px-2 py-1 text-center w-full'>
                        <h1 className="flex gap-1 items-center font-semibold">
                          0
                          <TbCheck />
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ModalPohonPemda isOpen={PohonPemda} isLevel={LevelPemda} onClose={() => { handleModalPohonPemda(4) }} onSuccess={handleTriggerAfterPokinOutside} />
            </div>
            {/* CROSS OPD */}
            <div className="flex flex-col justify-between border-2 max-w-[400px] min-w-[300px] px-3 py-2 rounded-xl">
              <h1 className="font-semibold border-b-2 py-1 text-center">
                Crosscutting Pending
              </h1>
              <div className="flex flex-col py-2 mt-1">
                <table>
                  <tbody>
                    <tr className="flex items-center">
                      <td className="border-l border-t px-2 py-1 bg-white text-start rounded-tl-lg min-w-[150px]">
                        <h1 className="font-semibold">
                          Ditolak
                        </h1>
                      </td>
                      <td className="border-t py-1">
                        <h1 className="font-semibold">
                          :
                        </h1>
                      </td>
                      <td className='border-r border-t px-2 py-1 bg-white text-center rounded-tr-lg w-full'>
                        <h1 className="font-semibold">
                          {CrossDitolak ? CrossDitolak : 0}
                        </h1>
                      </td>
                    </tr>
                    <tr className="flex items-center">
                      <td className="border-l border-b px-2 py-1 bg-white text-start rounded-bl-lg min-w-[150px]">
                        <h1 className="font-semibold">
                          Pending
                        </h1>
                      </td>
                      <td className="border-b py-1">
                        <h1 className="font-semibold">
                          :
                        </h1>
                      </td>
                      <td className='border-r border-b px-2 py-1 bg-white text-center rounded-br-lg w-full'>
                        <h1 className="font-semibold">
                          {CrossPending ? CrossPending : 0}
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ButtonSkyBorder className="w-full" onClick={handleModalCrosscutting}>
                <TbSettings className='mr-1' />
                Edit
              </ButtonSkyBorder>
              <ModalPohonCrosscutting isOpen={PohonCrosscutting} onClose={handleModalCrosscutting} onSuccess={handleTriggerAfterPokinOutside} />
            </div>
          </div>
        }
        <div
          className={`tf-tree text-center mt-3 transition-all duration-300 ease-in-out ${cursorMode === 'hand' ? "select-none" : ""}`}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            cursor: cursorMode === "hand" ? (isDragging ? "grabbing" : "grab") : "default", // Cursor style
          }}
        >
          <ul>
            <li>
              <div className="tf-nc tf flex flex-col w-[600px] rounded-lg">
                <div className="header flex pt-3 justify-center font-bold text-lg uppercase border my-3 py-3 border-black">
                  <h1>Pohon Kinerja OPD</h1>
                </div>
                <div className="body flex justify-center my-3">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="min-w-[100px] border px-2 py-3 border-black text-start">Perangkat Daerah</td>
                        <td className="min-w-[300px] border px-2 py-3 border-black text-start">{Pokin?.nama_opd}</td>
                      </tr>
                      <tr>
                        <td className="min-w-[100px] border px-2 py-3 border-black text-start">Kode OPD</td>
                        <td className="min-w-[300px] border px-2 py-3 border-black text-start">{Pokin?.kode_opd}</td>
                      </tr>
                      {Pokin?.tujuan_opd ?
                        Pokin?.tujuan_opd.map((item: any) => (
                          <>
                            <tr key={item.id}>
                              <td className="min-w-[100px] border px-2 py-3 border-black text-start bg-gray-100">Tujuan OPD</td>
                              <td className="min-w-[300px] border px-2 py-3 border-black text-start bg-gray-100">{item.tujuan}</td>
                            </tr>
                            {item.indikator ?
                              <>
                                {item.indikator.map((i: any) => (
                                  <tr key={item.id}>
                                    <td className="min-w-[100px] border px-2 py-3 border-black text-start">Indikator</td>
                                    <td className="min-w-[300px] border px-2 py-3 border-black text-start">{i.indikator}</td>
                                  </tr>
                                ))}
                              </>
                              :
                              <tr key={item.id}>
                                <td className="min-w-[100px] border px-2 py-3 border-black text-start">Indikator</td>
                                <td className="min-w-[300px] border px-2 py-3 border-black text-start">-</td>
                              </tr>
                            }
                          </>
                        ))
                        :
                        <tr>
                          <td className="min-w-[100px] border px-2 py-3 border-black text-start">Tujuan OPD</td>
                          <td className="min-w-[300px] border px-2 py-3 border-black text-start">-</td>
                        </tr>
                      }
                      <tr>
                        <td className="min-w-[100px] border px-2 py-3 border-black text-start">Tahun</td>
                        <td className="min-w-[300px] border px-2 py-3 border-black text-start">{Pokin?.tahun}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ButtonGreenBorder className='w-full hide-on-capture' onClick={() => handleDownloadPdf()}>Cetak Pohon</ButtonGreenBorder>
                {(User?.roles == 'super_admin' || User?.roles == 'admin_opd') &&
                  <div className={`flex flex-col gap-2 my-3 py-3 rounded-lg bg-white border-black hide-on-capture`}>
                    <ButtonSkyBorder onClick={() => handleModalNewTujuan()}>
                      <TbCirclePlus className="mr-1" />
                      Tambah Tujuan OPD
                    </ButtonSkyBorder>
                    <ButtonBlack
                      className='flex flex-wrap items-center justify-center gap-1'
                      onClick={() => setClone(true)}
                    >
                      <TbCopy />
                      Clone Pohon Kinerja
                    </ButtonBlack>
                    <ModalClone
                      isOpen={Clone}
                      onClose={() => setClone(false)}
                      jenis='opd'
                      nama_opd={SelectedOpd?.label}
                      onSuccess={() => setTriggerAfterPokinOutside((prev) => !prev)}
                    />
                  </div>
                }
                {/* button */}
                {(User?.roles == 'admin_opd' || User?.roles == 'super_admin' || User?.roles == 'level_1') &&
                  <div className="flex justify-center my-1 py-2 hide-on-capture">
                    <ButtonGreenBorder className='border-[#ef4444] hover:bg-[#ef4444] text-[#ef4444] hover:text-white' onClick={newChild}>
                      <TbCirclePlus className="mr-1" />
                      Strategic
                    </ButtonGreenBorder>
                  </div>
                }
              </div>
              {Pokin?.childs ? (
                <ul>
                  {Pokin.childs.map((data: any) => (
                    <li key={data.id}>
                      <PohonOpd tema={data} deleteTrigger={() => setDeleted((prev) => !prev)} />
                    </li>
                  ))}
                  {formList.map((formId) => (
                    <FormPohonOpd
                      level={3}
                      id={null}
                      key={formId}
                      formId={formId}
                      pokin={'opd'}
                      onCancel={() => setFormList(formList.filter((id) => id !== formId))}
                    />
                  ))}
                </ul>
              ) : (
                <ul>
                  {formList.map((formId) => (
                    <FormPohonOpd
                      level={3}
                      id={null}
                      key={formId}
                      formId={formId}
                      pokin={'opd'}
                      onCancel={() => setFormList(formList.filter((id) => id !== formId))}
                    />
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
        {/* BUTTON HAND TOOL */}
        <div className="fixed flex items-center mr-2 mb-2 bottom-0 right-0">
          <button
            onClick={toggleCursorMode}
            className={`p-2 rounded ${cursorMode === "hand" ? "bg-green-500 text-white" : "bg-gray-300 text-black"
              }`}
          >
            {cursorMode === "hand" ? <TbHandStop size={30} /> : <TbPointer size={30} />}
          </button>
        </div>
        <ModalTujuanOpd
          metode="baru"
          kode_opd={User?.roles == 'super_admin' ? SelectedOpd?.value : User?.kode_opd}
          tahun={Tahun?.value}
          special={true}
          isOpen={OpenModalTujuanOpd}
          onClose={() => handleModalNewTujuan()}
          onSuccess={() => setDeleted((prev) => !prev)}
        />
      </div>
    </>
  )
}

export default PokinOpd;
