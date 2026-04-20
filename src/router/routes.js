import routes_quiz_action from "./routes_quiz_action";
import routes_quiz_report from "./routes_quiz_report";
import routes_quiz_intro from "./routes_quiz_intro";

const routes = [
  {
    path: "/QuizReportLayout",
    component: () => import("layouts/QuizReportLayout.vue"),
    children: [
      ...routes_quiz_report,
    ]
  },
  {
    path: "/QuizActionLayout",
    component: () => import("layouts/QuizActionLayout.vue"),
    children: [
      ...routes_quiz_action,
      ...routes_quiz_intro,
      {
        path: '/quiz/index',
        name: 'quiz_index',
        component: () => import('pages/quiz/QuizIndex.vue'),
        meta: {
          title: 'QuizIndex - Yuvoria GAME',
          meta: [
            { name: 'description', content: 'QuizIndex - Yuvoria GAME' }
          ]
        }
      },

    ]
  },

  {
    path: "/",
    component: () => import("layouts/QuizActionLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: 'dashboard',
        component: () => import("pages/IndexPage.vue"),
        meta: {
          logged: true,
          title: "Dashboard STARKY",
          meta: [{ name: "description", content: "Dashboard" }],
        },
      },
      {
        path: "/lms-siswa-index",
        name: 'lms-siswa-index',
        component: () => import("pages/LmsSiswaIndexPage.vue"),
        meta: {
          logged: true,
          title: "Index Siswa",
          meta: [{ name: "description", content: "Index Siswa" }],
        },
      },
      {
        path: "/lms-siswa-show/:slug",
        name: 'lms-siswa-show',
        component: () => import("pages/LmsSiswaShowPage.vue"),
        meta: {
          logged: true,
          title: "Detail Siswa",
          meta: [{ name: "description", content: "Detail Siswa" }],
        },
      },
      // STAKEHOLDER
      {
        path: "/lms-stakeholder-index",
        name: 'lms-stakeholder-index',
        component: () => import("pages/LmsStakeholderIndexPage.vue"),
        meta: {
          logged: true,
          title: "Index Stakeholder",
          meta: [{ name: "description", content: "Index Stakeholder" }],
        },
      },
      {
        path: "/lms-stakeholder-show/:slug",
        name: 'lms-stakeholder-show',
        component: () => import("pages/LmsStakeholderShowPage.vue"),
        meta: {
          logged: true,
          title: "Detail Stakeholder",
          meta: [{ name: "description", content: "Detail Stakeholder" }],
        },
      },
      // PARENT
      {
        path: "/lms-ortu-index",
        name: 'lms-ortu-index',
        component: () => import("pages/LmsParentIndexPage.vue"),
        meta: {
          logged: true,
          title: "Index Orangtua",
          meta: [{ name: "description", content: "Index Orangtua" }],
        },
      },
      {
        path: "/lms-ortu-show/:slug",
        name: 'lms-ortu-show',
        component: () => import("pages/LmsParentShowPage.vue"),
        meta: {
          logged: true,
          title: "Detail Orangtua",
          meta: [{ name: "description", content: "Detail Orangtua" }],
        },
      },
      // SEKOLAH
      {
        path: "/lms-sekolah-index",
        name: 'lms-sekolah-index',
        component: () => import("pages/LmsSekolahIndexPage.vue"),
        meta: {
          logged: true,
          title: "Index Sekolah",
          meta: [{ name: "description", content: "Index Sekolah" }],
        },
      },
      {
        path: "/lms-sekolah-show/:slug",
        name: 'lms-sekolah-show',
        component: () => import("pages/LmsSekolahShowPage.vue"),
        meta: {
          logged: true,
          title: "Detail Sekolah",
          meta: [{ name: "description", content: "Detail Sekolah" }],
        },
      },
    ]
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: '',
        component: () => import("pages/Home.vue"),
        meta: {
          logged: false,
          title: "Home STARKY",
          meta: [{ name: "description", content: "Home" }],
        },
      },
      {
        path: "/login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
        meta: {
          logged: false,
          title: "Login STARKY",
          meta: [{ name: "description", content: "Login produk." }],
        },
      },
      {
        path: "/logged",
        name: "logged",
        component: () => import("pages/LoggedPage.vue"),
        meta: {
          logged: true,
          title: "Logged STARKY",
          meta: [{ name: "description", content: "Logged produk." }],
        },
      },




      {
        path: "/A",
        component: () => import("pages/GradientAPage.vue"),
      },
      {
        path: "/B",
        component: () => import("pages/GradientBPage.vue"),
      },
      {
        path: "/C",
        component: () => import("pages/GradientCPage.vue"),
      },
      {
        path: "/home",
        name: "home",
        component: () => import("pages/Home.vue"),
        meta: {
          title: "Beranda - Yuvoria SNACK",
          meta: [{ name: "description", content: "Beranda produk." }],
        },
      },
      {
        path: "/product/:id?",
        name: "product",
        component: () => import("pages/Product.vue"),
        meta: {
          title: "Product - Yuvoria SNACK",
          meta: [{ name: "description", content: "Deskripsi produk." }],
        },
      },
      {
        path: "/list",
        name: "list",
        component: () => import("pages/List.vue"),
        meta: {
          title: "List - Yuvoria SNACK",
          meta: [{ name: "description", content: "List produk" }],
        },
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
