const routes = [
  // STATS MODUL
  {
    path: "/lms-tugas-modul-stats-index",
    name: 'lms_tugas_modul_stats_index',
    component: () => import("pages/quiz/quiz_statistik/LmsTugasModulStatsIndexPage.vue"),
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
    component: () => import("pages/quiz/quiz_statistik/LmsTugasModulStatsShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Ranking Modul",
      meta: [{ name: "description", content: "Detail Ranking Modul" }],
      page_type: 'show',
    },
  },
]

export default routes
