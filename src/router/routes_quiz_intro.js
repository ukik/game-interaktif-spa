const routes_quiz_intro = [
  {
    path: '/quiz/intro/:quiz(arrange|match|boolean|essay|multiple|shortanswer)/:slug/:mode(student)', // slug = tugas_id
    name: 'quiz_intro',
    component: () => import('pages/quiz/intro/QuizIntro.vue'),
    meta: {
      logged: true,
      title: 'Intro Quiz',
      meta: [
        { name: 'description', content: 'Intro Quiz' }
      ],
      page_type: 'show',
    }
  },
]

export default routes_quiz_intro
