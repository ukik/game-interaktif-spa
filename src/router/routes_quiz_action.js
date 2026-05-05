const routes_quiz_action = [
  {
    path: '/quiz/action/arrange/:slug',
    name: 'quiz_action_arrange',
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
    path: '/quiz/action/boolean/:slug',
    name: 'quiz_action_boolean',
    component: () => import('pages/quiz/action/QuizActionBoolean.vue'),
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
    path: '/quiz/action/essay/:slug',
    name: 'quiz_action_essay',
    component: () => import('pages/quiz/action/QuizActionEssay.vue'),
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
    path: '/quiz/action/match/:slug',
    name: 'quiz_action_match',
    component: () => import('pages/quiz/action/QuizActionMatch.vue'),
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
    path: '/quiz/action/multiple/:slug',
    name: 'quiz_action_multiple',
    component: () => import('pages/quiz/action/QuizActionMultiple.vue'),
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
    path: '/quiz/action/shortanswer/:slug',
    name: 'quiz_action_shortanswer',
    component: () => import('pages/quiz/action/QuizActionShortAnswer.vue'),
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

export default routes_quiz_action
