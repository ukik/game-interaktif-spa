const routes_stats = [
  // STATS MODUL
  {
    path: "/lms-tugas-modul-stats-index",
    name: 'lms_tugas_modul_stats_index',
    component: () => import("pages/statistik/LmsTugasModulStatsIndexPage.vue"),
    meta: {
      logged: true,
      title: "Ranking Modul",
      meta: [{ name: "description", content: "Ranking Modul" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-modul-stats-show/:slug",
    name: 'lms_tugas_modul_stats_show',
    component: () => import("pages/statistik/LmsTugasModulStatsShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Ranking Modul",
      meta: [{ name: "description", content: "Detail Ranking Modul" }],
      page_type: 'show',
    },
  },
  // STATS QUIZ
  {
    path: "/lms-tugas-quiz-stats-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_tugas_quiz_stats_index',
    component: () => import("pages/statistik/LmsTugasQuizStatsIndexPage.vue"),
    meta: {
      logged: true,
      title: "Ranking Quiz",
      meta: [{ name: "description", content: "Ranking Quiz" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-tugas-quiz-stats-show/:slug",
    name: 'lms_tugas_quiz_stats_show',
    component: () => import("pages/statistik/LmsTugasQuizStatsShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Ranking Quiz",
      meta: [{ name: "description", content: "Detail Ranking Quiz" }],
      page_type: 'show',
    },
  },

]

export default routes_stats
