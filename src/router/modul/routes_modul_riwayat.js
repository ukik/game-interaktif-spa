const routes = [
  // Log MODUL
  {
    path: "/lms-tugas-modul-log-index",
    name: 'lms_tugas_modul_log_index',
    component: () => import("pages/quiz/quiz_riwayat/LmsTugasModulLogIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Modul Log",
      meta: [{ name: "description", content: "Index Modul Log" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-modul-log-show/:slug",
    name: 'lms_tugas_modul_log_show',
    component: () => import("pages/quiz/quiz_riwayat/LmsTugasModulLogShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Modul Log",
      meta: [{ name: "description", content: "Detail Modul Log" }],
      page_type: 'show',
    },
  },

]

export default routes
