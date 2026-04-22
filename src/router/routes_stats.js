const routes_stats = [
  // STATS MODUL
  {
    path: "/lms-tugas-modul-stats-index",
    name: 'lms-tugas-modul-stats-index',
    component: () => import("pages/statistik/LmsTugasModulStatsIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Modul Stats",
      meta: [{ name: "description", content: "Index Modul Stats" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-modul-stats-show/:slug",
    name: 'lms-tugas-modul-stats-show',
    component: () => import("pages/statistik/LmsTugasModulStatsShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Modul Stats",
      meta: [{ name: "description", content: "Detail Modul Stats" }],
      page_type: 'show',
    },
  },
  // STATS QUIZ
  {
    path: "/lms-tugas-quiz-stats-index",
    name: 'lms-tugas-quiz-stats-index',
    component: () => import("pages/statistik/LmsTugasQuizStatsIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Quiz Stats",
      meta: [{ name: "description", content: "Index Quiz Stats" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-quiz-stats-show/:slug",
    name: 'lms-tugas-quiz-stats-show',
    component: () => import("pages/statistik/LmsTugasQuizStatsShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Quiz Stats",
      meta: [{ name: "description", content: "Detail Quiz Stats" }],
      page_type: 'show',
    },
  },

]

export default routes_stats
