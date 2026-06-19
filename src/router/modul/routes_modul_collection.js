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

]

export default routes
