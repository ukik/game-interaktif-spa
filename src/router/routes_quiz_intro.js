const routes_quiz_intro = [
  {
    path: '/quiz/intro/:slug/:mode(student|teacher|all)', // slug = tugas_id
    name: 'quiz_intro',
    component: () => import('pages/quiz/intro/QuizIntro.vue'),
    meta: {
      logged: false,
      title: 'Intro Quiz',
      meta: [
        { name: 'description', content: 'Intro Quiz' }
      ],
      page_type: 'show',
    }
  },
]

export default routes_quiz_intro
