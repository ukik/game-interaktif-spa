const routes_quiz_intro = [
  {
    path: '/quiz/intro/arrange',
    name: 'quiz_intro_arrange',
    component: () => import('pages/quiz/intro/QuizIntro.vue'),
    meta: {
      title: 'QuizIntro - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizIntro - Yuvoria GAME' }
      ]
    }
  },
]

export default routes_quiz_intro
