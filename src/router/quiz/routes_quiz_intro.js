const routes = [
  {
    path: '/quiz/intro/:quiz(arrange|match|boolean|essay|multiple|shortanswer)/:slug/:mode(student)', // slug = tugas_id
    name: 'quiz_intro',
    component: () => import('src/pages/quiz/quiz_game/intro/QuizIntro.vue'),
    meta: {
      logged: true,
      title: 'Intro Quiz',
      description: 'Halaman pengantar kuis yang menampilkan informasi, petunjuk pengerjaan, dan pengaturan sebelum memulai kuis.',
      page_type: 'show',
    }
  },
  {
    path: '/quiz/intro/:quiz(arrange|match|boolean|essay|multiple|shortanswer)/:slug/:mode(teacher|all)', // slug = tugas_id
    name: 'quiz_intro_public',
    component: () => import('src/pages/quiz/quiz_game/intro/QuizIntro.vue'),
    meta: {
      logged: false,
      title: 'Intro Quiz',
      description: 'Halaman pengantar kuis yang menampilkan informasi, petunjuk pengerjaan, dan pengaturan sebelum memulai kuis.',
      page_type: 'show',
    }
  },
]

export default routes
