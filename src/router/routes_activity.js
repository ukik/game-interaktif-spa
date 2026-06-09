const routes_activity = [
  // BANK TUGAS
  {
    path: "/lms-tugas-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_tugas_index',
    component: () => import("pages/aktivitas/LmsTugasIndexPage.vue"),
    meta: {
      logged: true,
      title: "Tugas Quiz",
      meta: [{ name: "description", content: "Tugas Quiz" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-show/:slug",
    name: 'lms_tugas_show',
    component: () => import("pages/aktivitas/LmsTugasShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Tugas Quiz",
      meta: [{ name: "description", content: "Detail Tugas Quiz" }],
      page_type: 'show',
    },
  },
]

export default routes_activity
