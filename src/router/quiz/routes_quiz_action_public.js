const routes = [
  {
    path: '/quiz/action/:quiz(arrange)/:slug/:mode(teacher|all)',
    name: 'quiz_action_public_arrange',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionArrange.vue'),
    meta: {
      logged: false,
      title: 'Quiz Arrange',
      description: 'Kerjakan Quiz Arrange dengan menyusun jawaban dalam urutan yang benar. Media pembelajaran interaktif untuk melatih logika, pemahaman, dan kemampuan berpikir siswa.',
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(boolean)/:slug/:mode(teacher|all)',
    name: 'quiz_action_public_boolean',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionBoolean.vue'),
    meta: {
      logged: false,
      title: 'Quiz Benar/Salah',
      description: 'Kerjakan Quiz Benar/Salah untuk menguji pemahaman materi melalui pilihan benar atau salah secara interaktif dan mudah digunakan.',
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(essay)/:slug/:mode(teacher|all)',
    name: 'quiz_action_public_essay',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionEssay.vue'),
    meta: {
      logged: false,
      title: 'Quiz Essay',
      description: 'Kerjakan Quiz Essay dengan menjawab pertanyaan secara bebas untuk melatih kemampuan berpikir kritis, analisis, dan penalaran siswa.',
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(match)/:slug/:mode(teacher|all)',
    name: 'quiz_action_public_match',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionMatch.vue'),
    meta: {
      logged: false,
      title: 'Quiz Match',
      description: 'Kerjakan Quiz Match dengan mencocokkan pasangan jawaban yang tepat. Cocok untuk melatih daya ingat, pemahaman konsep, dan konsentrasi.',
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(multiple)/:slug/:mode(teacher|all)',
    name: 'quiz_action_public_multiple',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionMultiple.vue'),
    meta: {
      logged: false,
      title: 'Quiz Pilihan Ganda',
      description: 'Kerjakan Quiz Pilihan Ganda untuk menguji pemahaman materi melalui soal interaktif dengan berbagai pilihan jawaban.',
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(shortanswer)/:slug/:mode(teacher|all)',
    name: 'quiz_action_public_shortanswer',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionShortAnswer.vue'),
    meta: {
      logged: false,
      title: 'Quiz Jawaban Singkat',
      description: 'Kerjakan Quiz Jawaban Singkat dengan memberikan jawaban secara langsung untuk mengukur pemahaman konsep dan ketepatan siswa.',
      page_type: 'show',
    }
  },
]

export default routes
