const routes = [

  // Log QUIZ
  {
    path: "/lms-tugas-quiz-log-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_tugas_quiz_log_index',
    component: () => import("pages/quiz/quiz_riwayat/LmsTugasQuizLogIndexPage.vue"),
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
    component: () => import("pages/quiz/quiz_riwayat/LmsTugasQuizLogShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Nilai Quiz",
      meta: [{ name: "description", content: "Detail Nilai Quiz" }],
      page_type: 'show',
    },
  },

]

export default routes
