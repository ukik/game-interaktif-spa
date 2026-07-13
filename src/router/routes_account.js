const routes_account = [
  // SISWA
  {
    path: "/lms-admin-index",
    name: 'lms_admin_index',
    component: () => import("pages/pengaturan/LmsAdminIndexPage.vue"),
    meta: {
      logged: true,
      title: "Admin",
    description: "Halaman manajemen admin yang menampilkan daftar administrator serta pengelolaan akun dan hak akses.",
      page_type: 'index',
    },
  },
  {
    path: "/lms-admin-show/:slug",
    name: 'lms_admin_show',
    component: () => import("pages/pengaturan/LmsAdminShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Admin",
      description: "Halaman detail admin yang menampilkan informasi profil, hak akses, dan aktivitas administrator.",
      page_type: 'show',
    },
  },

  // SISWA
  {
    path: "/lms-siswa-index",
    name: 'lms_siswa_index',
    component: () => import("pages/pengaturan/LmsSiswaIndexPage.vue"),
    meta: {
      logged: true,
      title: "Siswa",
      description: "Halaman manajemen siswa yang menampilkan daftar peserta didik beserta informasi akun dan data akademik.",
      page_type: 'index',
    },
  },
  {
    path: "/lms-siswa-show/:slug",
    name: 'lms_siswa_show',
    component: () => import("pages/pengaturan/LmsSiswaShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Siswa",
      description: "Halaman detail siswa yang menampilkan profil, informasi akun, dan riwayat aktivitas peserta didik.",
      page_type: 'show',
    },
  },
  // STAKEHOLDER
  {
    path: "/lms-stakeholder-index",
    name: 'lms_stakeholder_index',
    component: () => import("pages/pengaturan/LmsStakeholderIndexPage.vue"),
    meta: {
      logged: true,
      title: "Stakeholder",
      description: "Halaman manajemen stakeholder yang menampilkan daftar pengguna dan informasi akun stakeholder.",
      page_type: 'index',
    },
  },
  {
    path: "/lms-stakeholder-show/:slug",
    name: 'lms_stakeholder_show',
    component: () => import("pages/pengaturan/LmsStakeholderShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Stakeholder",
      description: "Halaman detail stakeholder yang menampilkan profil, informasi akun, dan data stakeholder.",
      page_type: 'show',
    },
  },
  // PARENT
  {
    path: "/lms-ortu-index",
    name: 'lms_ortu_index',
    component: () => import("pages/pengaturan/LmsParentIndexPage.vue"),
    meta: {
      logged: true,
      title: "Orangtua",
      description: "Halaman manajemen orang tua yang menampilkan daftar akun wali murid beserta informasi terkait.",
      page_type: 'index',
    },
  },
  {
    path: "/lms-ortu-show/:slug",
    name: 'lms_ortu_show',
    component: () => import("pages/pengaturan/LmsParentShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Orangtua",
      description: "Halaman detail orang tua yang menampilkan profil, informasi akun, dan data wali murid.",
      page_type: 'show',
    },
  },
  // SEKOLAH
  {
    path: "/lms-sekolah-index",
    name: 'lms_sekolah_index',
    component: () => import("pages/pengaturan/LmsSekolahIndexPage.vue"),
    meta: {
      logged: true,
      title: "Sekolah",
      description: "Halaman manajemen sekolah yang menampilkan daftar sekolah beserta informasi dan pengaturan data sekolah.",
      page_type: 'index',
    },
  },
  {
    path: "/lms-sekolah-show/:slug",
    name: 'lms_sekolah_show',
    component: () => import("pages/pengaturan/LmsSekolahShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Sekolah",
      description: "Halaman detail sekolah yang menampilkan profil, informasi, dan data lengkap sekolah.",
      page_type: 'show',
    },
  },
]

export default routes_account
