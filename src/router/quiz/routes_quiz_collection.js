const routes = [

  // BANK QUIZ
  {
    path: "/lms-quiz-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    name: 'lms_quiz_index',
    component: () => import("pages/quiz/quiz_koleksi/LmsQuizIndexPage.vue"),
    meta: {
      logged: true,
      title: "Bank Quiz",
      meta: [{ name: "description", content: "Bank Quiz" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-quiz-show/:slug",
    name: 'lms_quiz_show',
    component: () => import("pages/quiz/quiz_koleksi/LmsQuizShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Bank Quiz",
      meta: [{ name: "description", content: "Detail Bank Quiz" }],
      page_type: 'show',
    },
  },

]

export default routes
