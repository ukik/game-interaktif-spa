const routes_riwayat = [
  // Log MODUL
  {
    path: "/lms-tugas-modul-log-index",
    name: 'lms-tugas-modul-log-index',
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
    name: 'lms-tugas-modul-log-show',
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
    path: "/lms-tugas-quiz-log-index",
    name: 'lms-tugas-quiz-log-index',
    component: () => import("pages/riwayat/LmsTugasQuizLogIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Quiz Log",
      meta: [{ name: "description", content: "Index Quiz Log" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-quiz-log-show/:slug",
    name: 'lms-tugas-quiz-log-show',
    component: () => import("pages/riwayat/LmsTugasQuizLogShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Quiz Log",
      meta: [{ name: "description", content: "Detail Quiz Log" }],
      page_type: 'show',
    },
  },

]

export default routes_riwayat
