const routes_riwayat = [
  // Log MODUL
  {
    path: "/lms-tugas-modul-log-index",
    name: 'lms_tugas_modul_log_index',
    component: () => import("pages/riwayat/LmsTugasModulLogIndexPage.vue"),
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
    component: () => import("pages/riwayat/LmsTugasModulLogShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Modul Log",
      meta: [{ name: "description", content: "Detail Modul Log" }],
      page_type: 'show',
    },
  },
  // Log QUIZ
  {
    path: "/lms-tugas-quiz-log-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_tugas_quiz_log_index',
    component: () => import("pages/riwayat/LmsTugasQuizLogIndexPage.vue"),
    meta: {
      logged: true,
      title: "Nilai Quiz",
      meta: [{ name: "description", content: "Nilai Quiz" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-quiz-log-show/:slug",
    name: 'lms_tugas_quiz_log_show',
    component: () => import("pages/riwayat/LmsTugasQuizLogShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Nilai Quiz",
      meta: [{ name: "description", content: "Detail Nilai Quiz" }],
      page_type: 'show',
    },
  },

]

export default routes_riwayat
