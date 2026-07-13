const routes = [

  // Log QUIZ
  {
    path: "/lms-tugas-quiz-log-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_tugas_quiz_log_index',
    component: () => import("pages/quiz/quiz_riwayat/LmsTugasQuizLogIndexPage.vue"),
    meta: {
      logged: true,
      title: "Nilai Quiz",
      description: "Halaman riwayat nilai kuis yang menampilkan daftar hasil, skor, dan status pengerjaan kuis peserta.",
      page_type: 'index',
      sidebar_id: 2,
    },
  },
  {
    path: "/lms-tugas-quiz-log-show/:slug",
    name: 'lms_tugas_quiz_log_show',
    component: () => import("pages/quiz/quiz_riwayat/LmsTugasQuizLogShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Nilai Quiz",
      description: "Halaman detail nilai kuis yang menampilkan skor, jawaban, waktu pengerjaan, dan ringkasan hasil kuis peserta.",
      page_type: 'show',
      sidebar_id: 2,
    },
  },

]

export default routes
