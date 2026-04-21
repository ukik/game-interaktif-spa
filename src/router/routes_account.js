const routes_account = [
  // SISWA
  {
    path: "/lms-siswa-index",
    name: 'lms-siswa-index',
    component: () => import("pages/LmsSiswaIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Siswa",
      meta: [{ name: "description", content: "Index Siswa" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-siswa-show/:slug",
    name: 'lms-siswa-show',
    component: () => import("pages/LmsSiswaShowPage.vue"),
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
    name: 'lms-stakeholder-index',
    component: () => import("pages/LmsStakeholderIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Stakeholder",
      meta: [{ name: "description", content: "Index Stakeholder" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-stakeholder-show/:slug",
    name: 'lms-stakeholder-show',
    component: () => import("pages/LmsStakeholderShowPage.vue"),
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
    name: 'lms-ortu-index',
    component: () => import("pages/LmsParentIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Orangtua",
      meta: [{ name: "description", content: "Index Orangtua" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-ortu-show/:slug",
    name: 'lms-ortu-show',
    component: () => import("pages/LmsParentShowPage.vue"),
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
    name: 'lms-sekolah-index',
    component: () => import("pages/LmsSekolahIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Sekolah",
      meta: [{ name: "description", content: "Index Sekolah" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-sekolah-show/:slug",
    name: 'lms-sekolah-show',
    component: () => import("pages/LmsSekolahShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Sekolah",
      meta: [{ name: "description", content: "Detail Sekolah" }],
      page_type: 'show',
    },
  },
]

export default routes_account
