const routes_quiz_report = [
  // {
  //   path: '/quiz/report/:quiz(arrange|match|boolean|essay|multiple|shortanswer)/:slug/:siswa_id/:mode(student)', // tugas_id
  //   name: 'quiz_report',
  //   component: () => import('pages/quiz/report/QuizReport.vue'),
  //   meta: {
  //     logged: false,
  //     title: 'Report Quiz',
  //     meta: [
  //       { name: 'description', content: 'Report Quiz' }
  //     ]
  //   },
  //   beforeEnter: (to, from, next) => {
  //     // reject the navigation
  //     console.log('quiz_report')

  //     const allowed = [
  //       'arrange',
  //       'match',
  //       'boolean',
  //       'essay',
  //       'multiple',
  //       'shortanswer'
  //     ]

  //     if (!allowed.includes(to.params.quiz)) {
  //       // return next('/')
  //     }

  //     next()
  //     // return false
  //   },
  // },


]

export default routes_quiz_report
