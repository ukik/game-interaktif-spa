const routes = [

  // BANK QUIZ
  {
    path: "/lms-quiz-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_quiz_index',
    component: () => import("pages/quiz/quiz_bank/LmsQuizIndexPage.vue"),
    meta: {
      logged: true,
      title: "Bank Quiz",
      description: "Halaman untuk membuat, mengelola, dan menggunakan berbagai jenis soal interaktif seperti Arrange, Match, Benar atau Salah, Essay, Pilihan Ganda, dan Jawaban Singkat.",
      page_type: 'index',
      sidebar_id: 2,
    },
    beforeEnter: (to, from, next) => {
      console.log('beforeEnter lms_quiz_index')
      next()
    },
  },
  {
    path: "/lms-quiz-show/:slug",
    name: 'lms_quiz_show',
    component: () => import("pages/quiz/quiz_bank/LmsQuizShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Bank Quiz",
      description: "Halaman detail yang menampilkan informasi soal, konfigurasi, materi pembelajaran, dan pengaturan kuis interaktif yang dapat digunakan dalam proses belajar mengajar.",
      page_type: 'show',
      sidebar_id: 2,
    },
  },

]

export default routes
