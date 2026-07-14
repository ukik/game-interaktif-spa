const routes = [

  // STATS QUIZ
  {
    path: "/lms-tugas-quiz-stats-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_tugas_quiz_stats_index',
    component: () => import("pages/quiz/quiz_statistik/LmsTugasQuizStatsIndexPage.vue"),
    meta: {
      logged: true,
      title: "Ranking Quiz",
      description: "Halaman ranking kuis yang menampilkan peringkat peserta, nilai, dan statistik hasil pengerjaan kuis.",
      page_type: 'index',
      sidebar_id: 2,
    },
  },
  {
    path: "/lms-tugas-quiz-stats-show/:slug",
    name: 'lms_tugas_quiz_stats_show',
    component: () => import("pages/quiz/quiz_statistik/LmsTugasQuizStatsShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Ranking Quiz",
      description: "Halaman detail ranking kuis yang menampilkan informasi peringkat, nilai, dan analisis hasil pengerjaan peserta.",
      page_type: 'show',
      sidebar_id: 2,
    },
  },

]

export default routes
