const routes_quiz_report = [

  {
    path: '/quiz/report/arrange',
    name: 'quiz_report_arrange',
    component: () => import('pages/quiz/report/QuizReportArrange.vue'),
    meta: {
      title: 'QuizReportArrange - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizReportArrange - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/report/boolean',
    name: 'quiz_report_boolean',
    component: () => import('pages/quiz/report/QuizReportBoolean.vue'),
    meta: {
      title: 'QuizReportBoolean - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizReportBoolean - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/report/essay',
    name: 'quiz_report_essay',
    component: () => import('pages/quiz/report/QuizReportEssay.vue'),
    meta: {
      title: 'QuizReportEssay - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizReportEssay - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/report/match',
    name: 'quiz_report_match',
    component: () => import('src/pages/quiz/report/QuizReportMatch.vue'),
    meta: {
      title: 'QuizReportMatch - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizReportMatch - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/report/multiple',
    name: 'quiz_report_multiple',
    component: () => import('pages/quiz/report/QuizReportMultiple.vue'),
    meta: {
      title: 'QuizReportMultiple - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizReportMultiple - Yuvoria GAME' }
      ]
    }
  },
  {
    path: '/quiz/report/short-answer',
    name: 'quiz_report_short_answer',
    component: () => import('pages/quiz/report/QuizReportShortAnswer.vue'),
    meta: {
      title: 'QuizReportShortAnswer - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizReportShortAnswer - Yuvoria GAME' }
      ]
    }
  },

]

export default routes_quiz_report
