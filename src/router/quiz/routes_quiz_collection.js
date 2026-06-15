const routes = [
  // BANK MODUL
  {
    path: "/lms-modul-index",
    name: 'lms_modul_index',
    component: () => import("pages/quiz/quiz_koleksi/LmsModulIndexPage.vue"),
    meta: {
      logged: true,
      title: "Bank Modul",
      meta: [{ name: "description", content: "Bank Modul" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-modul-show/:slug",
    name: 'lms_modul_show',
    component: () => import("pages/quiz/quiz_koleksi/LmsModulShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Bank Modul",
      meta: [{ name: "description", content: "Detail Bank Modul" }],
      page_type: 'show',
    },
  },
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
