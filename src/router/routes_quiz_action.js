const routes_quiz_action = [
  {
    path: '/quiz/action/arrange/:slug',
    name: 'quiz_action_arrange',
    component: () => import('pages/quiz/action/QuizActionArrange.vue'),
    meta: {
      logged: false,
      title: 'QuizActionArrange - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizActionArrange - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/action/boolean/:slug',
    name: 'quiz_action_boolean',
    component: () => import('pages/quiz/action/QuizActionBoolean.vue'),
    meta: {
      logged: true,
      title: 'QuizActionBoolean - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizActionBoolean - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/action/essay/:slug',
    name: 'quiz_action_essay',
    component: () => import('pages/quiz/action/QuizActionEssay.vue'),
    meta: {
      logged: true,
      title: 'QuizActionEssay - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizActionEssay - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/action/match/:slug',
    name: 'quiz_action_match',
    component: () => import('pages/quiz/action/QuizActionMatch.vue'),
    meta: {
      logged: true,
      title: 'QuizActionMatch - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizActionMatch - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/action/multiple/:slug',
    name: 'quiz_action_multiple',
    component: () => import('pages/quiz/action/QuizActionMultiple.vue'),
    meta: {
      logged: true,
      title: 'QuizActionMultiple - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizActionMultiple - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/action/short-answer/:slug',
    name: 'quiz_action_short_answer',
    component: () => import('pages/quiz/action/QuizActionShortAnswer.vue'),
    meta: {
      logged: true,
      title: 'QuizActionShortAnswer - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizActionShortAnswer - Yuvoria GAME' }
      ]
    }
  },
]

export default routes_quiz_action
