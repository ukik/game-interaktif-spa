const routes_quiz_report = [
  {
    path: '/quiz/report/:quiz/:slug/:siswa_id', // tugas_id
    name: 'quiz_report',
    component: () => import('pages/quiz/report/QuizReport.vue'),
    meta: {
      logged: false,
      title: 'QuizReport - Yuvoria GAME',
      meta: [
        { name: 'description', content: 'QuizReport - Yuvoria GAME' }
      ]
    }
  },



  // {
  //   path: '/quiz/report/arrange/:slug', // tugas_id
  //   name: 'quiz_report_arrange',
  //   component: () => import('pages/quiz/report/QuizReportArrange.vue'),
  //   meta: {
  //     logged: false,
  //     title: 'QuizReportArrange - Yuvoria GAME',
  //     meta: [
  //       { name: 'description', content: 'QuizReportArrange - Yuvoria GAME' }
  //     ]
  //   }
  // },
  // {
  //   path: '/quiz/report/boolean/:slug', // tugas_id
  //   name: 'quiz_report_boolean',
  //   component: () => import('pages/quiz/report/QuizReportBoolean.vue'),
  //   meta: {
  //     logged: false,
  //     title: 'QuizReportBoolean - Yuvoria GAME',
  //     meta: [
  //       { name: 'description', content: 'QuizReportBoolean - Yuvoria GAME' }
  //     ]
  //   }
  // },
  // {
  //   path: '/quiz/report/essay/:slug', // tugas_id
  //   name: 'quiz_report_essay',
  //   component: () => import('pages/quiz/report/QuizReportEssay.vue'),
  //   meta: {
  //     logged: false,
  //     title: 'QuizReportEssay - Yuvoria GAME',
  //     meta: [
  //       { name: 'description', content: 'QuizReportEssay - Yuvoria GAME' }
  //     ]
  //   }
  // },
  // {
  //   path: '/quiz/report/match/:slug', // tugas_id
  //   name: 'quiz_report_match',
  //   component: () => import('src/pages/quiz/report/QuizReportMatch.vue'),
  //   meta: {
  //     logged: false,
  //     title: 'QuizReportMatch - Yuvoria GAME',
  //     meta: [
  //       { name: 'description', content: 'QuizReportMatch - Yuvoria GAME' }
  //     ]
  //   }
  // },
  // {
  //   path: '/quiz/report/multiple/:slug', // tugas_id
  //   name: 'quiz_report_multiple',
  //   component: () => import('pages/quiz/report/QuizReportMultiple.vue'),
  //   meta: {
  //     logged: false,
  //     title: 'QuizReportMultiple - Yuvoria GAME',
  //     meta: [
  //       { name: 'description', content: 'QuizReportMultiple - Yuvoria GAME' }
  //     ]
  //   }
  // },
  // {
  //   path: '/quiz/report/shortanswer/:slug', // tugas_id
  //   name: 'quiz_report_shortanswer',
  //   component: () => import('pages/quiz/report/QuizReportShortAnswer.vue'),
  //   meta: {
  //     logged: false,
  //     title: 'QuizReportShortAnswer - Yuvoria GAME',
  //     meta: [
  //       { name: 'description', content: 'QuizReportShortAnswer - Yuvoria GAME' }
  //     ]
  //   }
  // },

]

export default routes_quiz_report
