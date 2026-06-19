const routes = [
  {
    path: '/quiz/action/:quiz(arrange)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_arrange',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionArrange.vue'),
    meta: {
      logged: false,
      title: 'Quiz Arrange',
      meta: [
        { name: 'description', content: 'Quiz Arrange' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(boolean)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_boolean',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionBoolean.vue'),
    meta: {
      logged: false,
      title: 'Quiz Boolean',
      meta: [
        { name: 'description', content: 'Quiz Boolean' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(essay)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_essay',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionEssay.vue'),
    meta: {
      logged: false,
      title: 'Quiz Essay',
      meta: [
        { name: 'description', content: 'Quiz Essay' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(match)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_match',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionMatch.vue'),
    meta: {
      logged: false,
      title: 'Quiz Match',
      meta: [
        { name: 'description', content: 'Quiz Match' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(multiple)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_multiple',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionMultiple.vue'),
    meta: {
      logged: false,
      title: 'Quiz Multiple',
      meta: [
        { name: 'description', content: 'Quiz Multiple' }
      ],
      page_type: 'show',
    }
  },
  {
    path: '/quiz/action/:quiz(shortanswer)/:slug/:mode(teacher|all)', // slug == tugas_id
    name: 'quiz_action_public_shortanswer',
    component: () => import('src/pages/quiz/quiz_game/action/QuizActionShortAnswer.vue'),
    meta: {
      logged: false,
      title: 'Quiz ShortAnswer',
      meta: [
        { name: 'description', content: 'Quiz ShortAnswer' }
      ],
      page_type: 'show',
    }
  },
]

export default routes
