const routes_collection = [
  // BANK MODUL
  {
    path: "/lms-modul-index",
    name: 'lms-modul-index',
    component: () => import("pages/koleksi/LmsModulIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Modul",
      meta: [{ name: "description", content: "Index Modul" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-modul-show/:slug",
    name: 'lms-modul-show',
    component: () => import("pages/koleksi/LmsModulShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Modul",
      meta: [{ name: "description", content: "Detail Modul" }],
      page_type: 'show',
    },
  },
  // BANK QUIZ
  {
    path: "/lms-quiz-index",
    name: 'lms-quiz-index',
    component: () => import("pages/koleksi/LmsQuizIndexPage.vue"),
    meta: {
      logged: true,
      title: "Index Quiz",
      meta: [{ name: "description", content: "Index Quiz" }],
      page_type: 'index',
    },
  },
  {
    path: "/lms-quiz-show/:slug",
    name: 'lms-quiz-show',
    component: () => import("pages/koleksi/LmsQuizShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Quiz",
      meta: [{ name: "description", content: "Detail Quiz" }],
      page_type: 'show',
    },
  },

]

export default routes_collection
