import {
  Home,
  Database,
  User,
  Building2,
  Briefcase,
  MapPin,
  CalendarCheck,
  Clock,
  BadgeDollarSign,
  Wallet,
  User2Icon,
  Logs,
  Users,
  FileText,
  Settings,
  Wallet2,
  Banknote,
} from "lucide-react";

export const departments = [
  "Human Resources",
  "Finance",
  "Marketing",
  "IT Department",
  "Operations",
  "Sales",
  "Customer Service",
];

export const positions = [
  "Manager",
  "Supervisor",
  "Staff",
  "Coordinator",
  "Analyst",
  "Specialist",
  "Assistant",
];



const dataSubPaths = [
  "karyawan",
  "departemen",
  "jabatan",
  "cabang",
  "cuti",
  "jam-kerja",
  "jenis-tunjangan",
  "gaji-pokok",
  "tunjangan",
];

const laporanSubPaths = ["laporan/presensi-gaji"];

export const getMenuItems = (pathname: string) => {
  const isDataActive = dataSubPaths.some((p) =>
    pathname.startsWith(`/admin/${p}`)
  );
  const isLaporanActive = laporanSubPaths.some((p) =>
    pathname.startsWith(`/admin/${p}`)
  );

  return [
    {
      title: "Dashboard",
      url: `/admin`,
      icon: Home,
      isActive: pathname === "/admin",
    },
    {
      title: "Data",
      icon: Database,
      isActive: isDataActive,
      items: [
        {
          title: "Karyawan",
          url: `/admin/karyawan`,
          icon: User,
          isActive: pathname === "/admin/karyawan",
        },
        {
          title: "Departemen",
          url: `/admin/departemen`,
          icon: Building2,
          isActive: pathname === "/admin/departemen",
        },
        {
          title: "Jabatan",
          url: `/admin/jabatan`,
          icon: Briefcase,
          isActive: pathname === "/admin/jabatan",
        },
        {
          title: "Cabang",
          url: `/admin/cabang`,
          icon: MapPin,
          isActive: pathname === "/admin/cabang",
        },
        {
          title: "Cuti",
          url: `/admin/cuti`,
          icon: CalendarCheck,
          isActive: pathname === "/admin/cuti",
        },
        {
          title: "Jam Kerja",
          url: `/admin/jam-kerja`,
          icon: Clock,
          isActive: pathname === "/admin/jam-kerja",
        },
        {
          title: "Jenis Tunjangan",
          url: `/admin/jenis-tunjangan`,
          icon: BadgeDollarSign,
          isActive: pathname === "/admin/jenis-tunjangan",
        },
        {
          title: "Tunjangan",
          url: `/admin/tunjangan`,
          icon: BadgeDollarSign,
          isActive: pathname === "/admin/tunjangan",
        },
      ],
    },
    {
      title: "Pinjaman",
      url: `/admin/pinjaman`,
      icon: Wallet2,
      isActive: pathname === "/admin/pinjaman",
    },
    {
      title: "Simpanan",
      url: `/admin/simpanan`,
      icon: Banknote,
      isActive: pathname === "/admin/simpanan",
    },
    {
      title: "Gaji",
      url: `/admin/gaji`,
      icon: Wallet,
      isActive: pathname === "/admin/gaji",
    },
    {
      title: "Akun",
      url: `/admin/accounts`,
      icon: User2Icon,
      isActive: pathname === "/admin/accounts",
    },
    {
      title: "Monitoring Presensi",
      url: `/admin/monitoring`,
      icon: Logs,
      isActive: pathname === "/admin/monitoring",
    },
    {
      title: "Pengajuan Absen",
      url: `/admin/pengajuan`,
      icon: Users,
      isActive: pathname === "/admin/pengajuan",
    },
    {
      title: "Laporan",
      icon: FileText,
      isActive: isLaporanActive,
      items: [
        {
          title: "Presensi dan Gaji",
          url: `/admin/laporan/presensi-gaji`,
          icon: FileText,
          isActive: pathname === "/admin/laporan/presensi-gaji"
        },
      ],
    },
    {
      title: "Utilities",
      url: `/admin/utilities`,
      icon: Settings,
      isActive: pathname === "/admin/utilities",
    },
  ];
};

