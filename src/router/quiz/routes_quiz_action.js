const routes = [
  {
    path: '/quiz/action/:quiz(arrange)/:slug/:mode(student)', // slug == tugas_id
    name: 'quiz_action_arrange',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionArrange.vue'),
    meta: {
      logged: true,
      title: 'Quiz Arrange',
      meta: [
        { name: 'description', content: 'QuizActionArrange - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(boolean)/:slug/:mode(student)', // slug == tugas_id
    name: 'quiz_action_boolean',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionBoolean.vue'),
    meta: {
      logged: true,
      title: 'Quiz Boolean',
      meta: [
        { name: 'description', content: 'QuizActionBoolean - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(essay)/:slug/:mode(student)', // slug == tugas_id
    name: 'quiz_action_essay',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionEssay.vue'),
    meta: {
      logged: true,
      title: 'Quiz Essay',
      meta: [
        { name: 'description', content: 'QuizActionEssay - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(match)/:slug/:mode(student)', // slug == tugas_id
    name: 'quiz_action_match',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionMatch.vue'),
    meta: {
      logged: true,
      title: 'Quiz Match',
      meta: [
        { name: 'description', content: 'QuizActionMatch - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(multiple)/:slug/:mode(student)', // slug == tugas_id
    name: 'quiz_action_multiple',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionMultiple.vue'),
    meta: {
      logged: true,
      title: 'Quiz Multiple',
      meta: [
        { name: 'description', content: 'QuizActionMultiple - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(shortanswer)/:slug/:mode(student)', // slug == tugas_id
    name: 'quiz_action_shortanswer',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionShortAnswer.vue'),
    meta: {
      logged: true,
      title: 'Quiz ShortAnswer',
      meta: [
        { name: 'description', content: 'QuizActionShortAnswer - Yuvoria GAME' }
      ],
      page_type: 'show',
    }
  },
]

export default routes
