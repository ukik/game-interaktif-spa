const routes_activity = [
  // BANK TUGAS
  {
    path: "/lms-tugas-index",
    name: 'lms-tugas-index',
    component: () => import("pages/aktivitas/LmsTugasIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Tugas",
      meta: [{ name: "description", content: "Index Tugas" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-show/:slug",
    name: 'lms-tugas-show',
    component: () => import("pages/aktivitas/LmsTugasShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Tugas",
      meta: [{ name: "description", content: "Detail Tugas" }],
      page_type: 'show',
    },
  },
]

export default routes_activity
