const routes_quiz_report_public = [
  {
    path: '/quiz/report/:quiz(arrange|match|boolean|essay|multiple|shortanswer)/:slug/:mode(teacher|all)', // tugas_id
    name: 'quiz_report_public',
    component: () => import('pages/quiz/report/QuizReportTeacher.vue'),
    meta: {
      logged: false,
      title: 'Report Quiz',
      meta: [
        { name: 'description', content: 'Report Quiz' }
      ]
    }
  },

]

export default routes_quiz_report_public
