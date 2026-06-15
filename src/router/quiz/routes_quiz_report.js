const routes = [
  {
    path: '/quiz/report/:quiz(arrange|match|boolean|essay|multiple|shortanswer)/:slug/:mode(teacher|all)', // tugas_id
    name: 'quiz_report_public',
    component: () => import('src/pages/quiz/quiz_game/report/QuizReportTeacher.vue'),
    meta: {
      logged: false,
      title: 'Report Quiz',
      meta: [
        { name: 'description', content: 'Report Quiz' }
      ]
    }
  },
  {
    path: '/quiz/report/:quiz(arrange|match|boolean|essay|multiple|shortanswer)/:slug/:siswa_id/:mode(student)', // tugas_id
    name: 'quiz_report',
    component: () => import('src/pages/quiz/quiz_game/report/QuizReport.vue'),
    meta: {
      logged: false,
      title: 'Report Quiz',
      meta: [
        { name: 'description', content: 'Report Quiz' }
      ]
    },
    beforeEnter: (to, from, next) => {
      // reject the navigation
      console.log('quiz_report')

      const allowed = [
        'arrange',
        'match',
        'boolean',
        'essay',
        'multiple',
        'shortanswer'
      ]

      if (!allowed.includes(to.params.quiz)) {
        // return next('/')
      }

      next()
      // return false
    },
  },
]

export default routes
