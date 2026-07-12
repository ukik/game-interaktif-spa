const routes = [

  // STATS QUIZ
  {
    path: "/lms-tugas-quiz-stats-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_tugas_quiz_stats_index',
    component: () => import("pages/quiz/quiz_statistik/LmsTugasQuizStatsIndexPage.vue"),
    meta: {
      logged: true,
      title: "Ranking Quiz",
      meta: [{ name: "description", content: "Ranking Quiz" }],
      page_type: 'index',
      sidebar_id: 1,
    },
  },
  {
    path: "/lms-tugas-quiz-stats-show/:slug",
    name: 'lms_tugas_quiz_stats_show',
    component: () => import("pages/quiz/quiz_statistik/LmsTugasQuizStatsShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Ranking Quiz",
      meta: [{ name: "description", content: "Detail Ranking Quiz" }],
      page_type: 'show',
      sidebar_id: 1,
    },
  },

]

export default routes
