const routes_quiz_action_public = [
  {
    path: '/quiz/action/:quiz(arrange)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_arrange',
    component: () => import('pages/quiz/action/QuizActionArrange.vue'),
    meta: {
      logged: false,
      title: 'Quiz Arrange',
      meta: [
        { name: 'description', content: 'QuizActionArrange - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(boolean)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_boolean',
    component: () => import('pages/quiz/action/QuizActionBoolean.vue'),
    meta: {
      logged: false,
      title: 'Quiz Boolean',
      meta: [
        { name: 'description', content: 'QuizActionBoolean - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(essay)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_essay',
    component: () => import('pages/quiz/action/QuizActionEssay.vue'),
    meta: {
      logged: false,
      title: 'Quiz Essay',
      meta: [
        { name: 'description', content: 'QuizActionEssay - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(match)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_match',
    component: () => import('pages/quiz/action/QuizActionMatch.vue'),
    meta: {
      logged: false,
      title: 'Quiz Match',
      meta: [
        { name: 'description', content: 'QuizActionMatch - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(multiple)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_multiple',
    component: () => import('pages/quiz/action/QuizActionMultiple.vue'),
    meta: {
      logged: false,
      title: 'Quiz Multiple',
      meta: [
        { name: 'description', content: 'QuizActionMultiple - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(shortanswer)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_shortanswer',
    component: () => import('pages/quiz/action/QuizActionShortAnswer.vue'),
    meta: {
      logged: false,
      title: 'Quiz ShortAnswer',
      meta: [
        { name: 'description', content: 'QuizActionShortAnswer - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
]

export default routes_quiz_action_public
