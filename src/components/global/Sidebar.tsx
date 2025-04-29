'use client'
import "@/app/globals.css";
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  TbApps,
  TbArrowUpFromArc,
  TbBinaryTree,
  TbBinaryTree2,
  TbBook2,
  TbBuildingFortress,
  TbBulb,
  TbCalendarShare,
  TbChartBar,
  TbChecklist,
  TbCircleArrowLeftFilled,
  TbFileAlert,
  TbHexagonLetterM,
  TbHexagonLetterV,
  TbHome,
  TbLogout,
  TbMapPin,
  TbRefreshAlert,
  TbTarget,
  TbTooltip,
} from "react-icons/tb";
import { getUser, logout } from '../lib/Cookie';
import DataMasterMenu from './sidebar/DataMasterMenu';
import PerencanaanOpdMenu from './sidebar/PerencanaanOpdMenu';
import LaporanMenu from "./sidebar/LaporanMenu";

interface SidebarProps {
  isOpen: boolean | null;
  isZoomed: boolean | null;
  toggleSidebar: () => void;
}

// TODO: REFACTOR SIDEBAR LOGIC
export const Sidebar = ({ isZoomed, isOpen, toggleSidebar }: SidebarProps) => {

  const { appName } = useAppContext();
  const [User, setUser] = useState<any>(null);
  const { id } = useParams();
  const url = usePathname();
  //state menu, submenu, subsmenu
  const [Dashboard, setDashboard] = useState<boolean | null>(null);
  const [PerencanaanKota, setPerencanaanKota] = useState<boolean | null>(null);
  const [TematikKota, setTematikKota] = useState<boolean | null>(null);
  const [KotaPohonKinerjaKota, setKotaPohonKinerjaKota] = useState<boolean | null>(null);
  const [RPJMD, setRPJMD] = useState<boolean | null>(null);
  const [Visi, setVisi] = useState<boolean | null>(null);
  const [Misi, setMisi] = useState<boolean | null>(null);
  const [TujuanPemda, setTujuanPemda] = useState<boolean | null>(null);
  const [SasaranPemda, setSasaranPemda] = useState<boolean | null>(null);
  const [IKU, setIKU] = useState<boolean | null>(null);
  const [PerencanaanOPD, setPerencanaanOPD] = useState<boolean | null>(null);
  const [pohonKinerjaOpd, setPohonKinerjaOpd] = useState<boolean | null>(null);
  const [PohonCascadingOpd, setPohonCascadingOpd] = useState<boolean | null>(null);
  const [UserOpd, setUserOpd] = useState<boolean | null>(null);
  const [Renstra, setRenstra] = useState<boolean | null>(null);
  const [TujuanOpd, setTujuanOpd] = useState<boolean | null>(null);
  const [SasaranOpd, setSasaranOpd] = useState<boolean | null>(null);
  const [IKUOpd, setIKUOpd] = useState<boolean | null>(null);
  const [PermasalahanOpd, setPermasalahanOpd] = useState<boolean | null>(null);
  const [MasterUsulanOpd, setMasterUsulanOpd] = useState<boolean | null>(null);
  const [MasterUsulanMusrenbang, setMasterUsulanMusrenbang] = useState<boolean | null>(null);
  const [MasterUsulanPokir, setMasterUsulanPokir] = useState<boolean | null>(null);
  const [MasterUsulanMandatori, setMasterUsulanMandatori] = useState<boolean | null>(null);
  const [MasterUsulanInisiatif, setMasterUsulanInisiatif] = useState<boolean | null>(null);
  const [Perencanaan, setPerencanaan] = useState<boolean | null>(null);
  const [UsulanLaporan, setUsulanLaporan] = useState<boolean | null>(null);
  const [Musrenbang, setMusrenbang] = useState<boolean | null>(null);
  const [PokokPikiran, setPokokPikiran] = useState<boolean | null>(null);
  const [Mandatori, setMandatori] = useState<boolean | null>(null);
  const [Inisiatif, setInisiatif] = useState<boolean | null>(null);
  const [RencanaKinerja, setRencanaKinerja] = useState<boolean | null>(null);
  const [PohonCascading, setPohonCascading] = useState<boolean | null>(null);
  const [PerencanaanManajemenResiko, setPerencanaanManajemenResiko] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = getUser();
    if (fetchUser) {
      setUser(fetchUser.user);
    }
  }, [])

  useEffect(() => {
    if (url == "/") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(true);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    //DATA MASTER
    if (url == "/DataMaster/masteropd") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterpegawai") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
      //laporan
    }
    if (url == "/DataMaster/masterperiode") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterusulan") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    //Master Program Kegiatan
    if (url == "/DataMaster/masterprogramkegiatan/bidangurusan") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterprogramkegiatan/kegiatan") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterprogramkegiatan/program") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterprogramkegiatan/subkegiatan") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterprogramkegiatan/urusan") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterjabatan") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterlembaga") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masteruser") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/DataMaster/masterrole") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    //PERENCANAAN KOTA
    if (url == "/pohonkinerjapemda") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(true);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(true);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/tematikpemda") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(true);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(true);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/visi") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(true);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(true);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/misi") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(true);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(true);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/tujuanpemda") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(true);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(true);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/sasaranpemda") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(true);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(true);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/ikupemda") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(true);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(true);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    //PERENCANAAN OPD
    if (url == "/tujuanopd") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setMasterUsulanOpd(false);
      setRenstra(true);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(true);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/sasaranopd") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setMasterUsulanOpd(false);
      setRenstra(true);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(true);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/ikuopd") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setMasterUsulanOpd(false);
      setRenstra(true);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(true);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/MasterUsulan/mastermusrenbang") {
      setDashboard(false);
      setPerencanaanKota(false);
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      setPerencanaanOPD(true);
      setMasterUsulanOpd(true);
      setMasterUsulanMusrenbang(true);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setUsulanLaporan(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/MasterUsulan/masterpokokpikiran") {
      setDashboard(false);
      setPerencanaanKota(false);
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      setPerencanaanOPD(true);
      setMasterUsulanOpd(true);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(true);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setUsulanLaporan(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/MasterUsulan/mastermandatori") {
      setDashboard(false);
      setPerencanaanKota(false);
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      setPerencanaanOPD(true);
      setMasterUsulanOpd(true);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(true);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setUsulanLaporan(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/MasterUsulan/masterinisiatif") {
      setDashboard(false);
      setPerencanaanKota(false);
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      setPerencanaanOPD(true);
      setMasterUsulanOpd(true);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(true);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setUsulanLaporan(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/pohonkinerjaopd") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(true);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/pohoncascadingopd") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // data master
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(true);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/useropd") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(true);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (
      url == "/rencanakinerja" ||
      url == `/rencanakinerja/${id}/edit` ||
      url == `/rencanakinerja/${id}/tambah` ||
      url == `/rencanakinerja/manual_ik/${id}` ||
      url == `/rencanakinerja/${id}`
    ) {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(true);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(true);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/rincianbelanja") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(true);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
    }
    if (url == "/musrenbang") {
      setDashboard(false);
      setTematikKota(false);
      setPerencanaanKota(false);
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setPerencanaan(true);
      setUsulanLaporan(true);
      setMusrenbang(true);
      setPokokPikiran(false);
      setMandatori(false);
      setInisiatif(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/pokokpikiran") {
      setDashboard(false);
      setTematikKota(false);
      setPerencanaanKota(true);
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setPerencanaan(true);
      setUsulanLaporan(true);
      setMusrenbang(false);
      setPokokPikiran(true);
      setMandatori(false);
      setInisiatif(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
      setRencanaKinerja(false);
    }
    if (url == "/mandatori") {
      setDashboard(false);
      setTematikKota(false);
      setPerencanaanKota(true);
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setUsulanLaporan(true);
      setPerencanaan(true);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(true);
      setInisiatif(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
      setRencanaKinerja(false);
    }
    if (url == "/inisiatif") {
      setDashboard(false);
      setTematikKota(false);
      setPerencanaanKota(true);
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setUsulanLaporan(true);
      setPerencanaan(true);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setInisiatif(true);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
      setRencanaKinerja(false);
    }
    if (url == "/manajemenresiko") {
      setDashboard(false);
      setTematikKota(false);
      setPerencanaanKota(true);
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setUsulanLaporan(false);
      setRencanaKinerja(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/pohoncascading") {
      // SLIDE MENU
      // super_admin
      setPerencanaanKota(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(true);
      setUsulanLaporan(false);

      // HALAMAN
      setDashboard(false);
      // perencanaan pemda
      setTematikKota(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setUserOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setPermasalahanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(true);
      setPerencanaanManajemenResiko(false);
    }
  }, [url, id]);

  return (
    <div className="flex">
      {/* tombol sidebar zoom 150% */}
      {isZoomed && (
        <div
          className={`fixed top-1 bg-gradient-to-bl from-[#1b1c1c] to-[#212121] border border-white p-2 cursor-pointer duration-200 text-white rounded-md z-50 ${!isOpen ? 'rotate-180 ' : 'left-[13rem]'}`}
          onClick={() => toggleSidebar()}
        >
          <TbCircleArrowLeftFilled />
        </div>
      )}

      {/* awal sidebar */}
      <div className={`bg-gradient-to-bl from-[#1b1c1c] to-[#212121] overflow-y-auto text-white h-full ${isOpen ? 'w-64 py-5 px-3' : 'w-0'} duration-300 fixed custom-scrollbar`}>
        <div className="flex items-center justify-center">
          <Image
            className="mb-3 transition-all duration-300 ease-in-out"
            src="/logo.png"
            alt="logo"
            width={!isZoomed ? 80 : 80}
            height={!isZoomed ? 80 : 80}
          />
        </div>
        {/* tombol sidebar default */}
        {!isZoomed && (
          <div
            className={`fixed top-1 p-2 mt-5 cursor-pointer border border-white text-white duration-200 rounded-md z-50 ${!isOpen ? 'rotate-180 bg-gray-800' : 'left-[13rem]'}`}
            onClick={toggleSidebar}
          >
            <TbCircleArrowLeftFilled />
          </div>
        )}
        {/* {!isZoomed && (
          <FiChevronsLeft
            className={`absolute cursor-pointer -right-7 top-1 border-2 bg-gray-900 text-white rounded-md ${
              !isOpen && 'rotate-180'
            }`}
            onClick={toggleSidebar}
          />
        )} */}
        {/* header sidebar */}
        <h2 className='font-bold text-center'>
          {appName}
        </h2>

        <ul className="pt-6">
          {/* LABEL DASHBOARD */}
          <Link href="/">
            <li className={`flex items-center font-medium gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ${Dashboard ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
              <TbHome className="text-xl" />
              <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Dashboard</span>
            </li>
          </Link>
          {/* LABEL DATA MASTER */}
          {User?.roles == 'super_admin' &&
            <DataMasterMenu />
          }
          {/* LABEL PERENCANAAN PEMDA */}
          {(User?.roles == 'super_admin' || User?.roles == 'reviewer') &&
            <>
              <li
                className={`flex font-medium items-center gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
                onClick={() => setPerencanaanKota(PerencanaanKota ? false : true)}
              >
                <TbBuildingFortress className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Perencanaan Pemda</span>
              </li>
              {/* SUB MENU PERENCANAAN PEMDA */}
              {User?.roles != 'reviewer' ?
                <div className={`transition-all duration-300 ease-in-out ${PerencanaanKota ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                  <Link href="/tematikpemda">
                    <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${TematikKota ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                      <TbArrowUpFromArc className="text-xl" />
                      <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Tematik Pemda</span>
                    </li>
                  </Link>
                  <Link href="/pohonkinerjapemda">
                    <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${KotaPohonKinerjaKota ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                      <TbBinaryTree className="text-xl" />
                      <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja Pemda</span>
                    </li>
                  </Link>
                  {/* LABEL RPJMD */}
                  <li
                    className={`flex items-center font-medium gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
                    onClick={() => setRPJMD(RPJMD ? false : true)}
                  >
                    <TbCalendarShare className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>RPJMD</span>
                  </li>
                  {/* SUB MENU RPJMD */}
                  <div className={`transition-all duration-300 ease-in-out ${RPJMD ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <Link href="/visi">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Visi ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbHexagonLetterV className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Visi</span>
                      </li>
                    </Link>
                    <Link href="/misi">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Misi ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbHexagonLetterM className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Misi</span>
                      </li>
                    </Link>
                    <Link href="/tujuanpemda">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${TujuanPemda ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbMapPin className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Tujuan Pemda</span>
                      </li>
                    </Link>
                    <Link href="/sasaranpemda">
                      <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${SasaranPemda ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbTarget className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Sasaran Pemda</span>
                      </li>
                    </Link>
                    <Link href="/ikupemda">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${IKU ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbChartBar className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>IKU</span>
                      </li>
                    </Link>
                  </div>
                </div>
                :
                <div className={`transition-all duration-300 ease-in-out ${PerencanaanKota ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                  <Link href="/pohonkinerjapemda">
                    <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${KotaPohonKinerjaKota ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                      <TbBinaryTree className="text-xl" />
                      <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja Pemda</span>
                    </li>
                  </Link>
                </div>
              }
            </>
          }
          {/* PERENCANAAN OPD */}
          <PerencanaanOpdMenu />
          {/* LABEL PERENCANAAN ASN */}
          {(User?.roles == 'eselon_1' || User?.roles == 'eselon_2' || User?.roles == 'eselon_3' || User?.roles == 'eselon_4' || User?.roles == 'level_1' || User?.roles == 'level_2' || User?.roles == 'level_3' || User?.roles == 'level_4') &&
            <li
              className={`flex font-medium items-center gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
              onClick={() => setPerencanaan(Perencanaan ? false : true)}
            >
              <TbBuildingFortress className="text-xl" />
              <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Perencanaan</span>
            </li>
          }
          {/* SUB MENU PERENCANAAN ASN */}
          <div className={`transition-all duration-300 ease-in-out ${Perencanaan ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            {/* LABEL USULAN ASN */}
            {User?.roles == 'level_3' &&
              <li
                className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
                onClick={() => setUsulanLaporan(UsulanLaporan ? false : true)}
              >
                <TbApps className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Usulan</span>
              </li>
            }
            {/* subs menu USULAN ASN */}
            <div className={`transition-all duration-300 ease-in-out ${UsulanLaporan ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="/musrenbang">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Musrenbang ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBook2 className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Musrenbang</span>
                </li>
              </Link>
              <Link href="/pokokpikiran">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${PokokPikiran ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBulb className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pokok Pikiran</span>
                </li>
              </Link>
              <Link href="/mandatori">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Mandatori ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbFileAlert className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Mandatori</span>
                </li>
              </Link>
              <Link href="/inisiatif">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Inisiatif ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbTooltip className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Inisiatif Bupati</span>
                </li>
              </Link>
            </div>
            <Link href="/pohonkinerjaopd">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${pohonKinerjaOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbBinaryTree className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja</span>
              </li>
            </Link>
            <Link href="/pohoncascading">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${PohonCascading ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbBinaryTree2 className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Cascading</span>
              </li>
            </Link>
            <Link href="/rencanakinerja">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${RencanaKinerja ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbChecklist className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Rencana Kinerja</span>
              </li>
            </Link>
            {(User?.roles == 'level_2' || User?.roles == 'level_3') &&
              <Link href="/manajemenresiko">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${PerencanaanManajemenResiko ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbRefreshAlert className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Manajemen Resiko</span>
                </li>
              </Link>
            }
          </div>
          <LaporanMenu />
          {/* LOGOUT */}
          <li className="flex font-medium items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl" onClick={() => logout()}>
            <TbLogout className="text-xl text-red-500" />
            <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

