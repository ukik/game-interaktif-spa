const routes_account = [
  // SISWA
  {
    path: "/lms-admin-index",
    name: 'lms_admin_index',
    component: () => import("pages/pengaturan/LmsAdminIndexPage.vue"),
    meta: {
      logged: true,
      title: "Admin",
      meta: [{ name: "description", content: "Admin" }],
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
      meta: [{ name: "description", content: "Detail Admin" }],
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
      meta: [{ name: "description", content: "Siswa" }],
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
      meta: [{ name: "description", content: "Detail Siswa" }],
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
      meta: [{ name: "description", content: "Stakeholder" }],
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
      meta: [{ name: "description", content: "Detail Stakeholder" }],
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
      meta: [{ name: "description", content: "Orangtua" }],
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
      meta: [{ name: "description", content: "Detail Orangtua" }],
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
      meta: [{ name: "description", content: "Sekolah" }],
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
      meta: [{ name: "description", content: "Detail Sekolah" }],
      page_type: 'show',
    },
  },
]

export default routes_account
