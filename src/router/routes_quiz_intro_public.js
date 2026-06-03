const routes_quiz_intro_public = [
  {
    path: '/quiz/intro/:slug/:mode(teacher|all)', // slug = tugas_id
    name: 'quiz_intro_public',
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

export default routes_quiz_intro_public
