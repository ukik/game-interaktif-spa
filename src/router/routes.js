import routes_quiz_action_public from "./routes_quiz_action_public";
import routes_quiz_action from "./routes_quiz_action";

import routes_quiz_report from "./routes_quiz_report";
import routes_quiz_report_public from "./routes_quiz_report_public";

import routes_quiz_intro from "./routes_quiz_intro";
import routes_quiz_intro_public from "./routes_quiz_intro_public";

import routes_account from "./routes_account";
import routes_collection from "./routes_collection";
import routes_activity from "./routes_activity";
import routes_stats from "./routes_stats";
import routes_notifications from "./routes_notifications";


const routes = [
  {
    path: "/QuizReportLayout",
    component: () => import("layouts/QuizReportLayout.vue"),
    children: [
      ...routes_quiz_report,
      ...routes_quiz_report_public,
    ]
  },
  {
    path: "/QuizActionNoHeaderLayout",
    component: () => import("layouts/QuizActionNoHeaderLayout.vue"),
    children: [
      ...routes_quiz_action,
      ...routes_quiz_action_public,
      ...routes_quiz_intro,
      ...routes_quiz_intro_public,
      // {
      //   path: '/quiz/index',
      //   name: 'quiz_index',
      //   component: () => import('pages/quiz/QuizIndex.vue'),
      //   meta: {
      //     title: 'QuizIndex - Yuvoria GAME',
      //     meta: [
      //       { name: 'description', content: 'QuizIndex - Yuvoria GAME' }
      //     ]
      //   }
      // },

      // {
      //   path: '/quiz/report/:quiz(arrange|match|boolean|essay|multiple|shortanswer)/:slug/:mode(teacher|all)', // tugas_id
      //   name: 'quiz_report_public',
      //   component: () => import('pages/quiz/report/QuizReportTeacher.vue'),
      //   meta: {
      //     logged: false,
      //     title: 'Report Quiz',
      //     meta: [
      //       { name: 'description', content: 'Report Quiz' }
      //     ]
      //   }
      // },

    ]
  },

  {
    path: "/QuizActionLayout",
    component: () => import("layouts/QuizActionLayout.vue"),
    children: [
      // {
      //   path: "/dashboard",
      //   name: 'dashboard',
      //   component: () => import("pages/IndexPage.vue"),
      //   meta: {
      //     logged: true,
      //     title: "Dashboard STARKY",
      //     meta: [{ name: "description", content: "Dashboard" }],
      //   },
      // },

      {
        path: "/",
        name: 'dashboard',
        component: () => import("pages/dashboard/LmsDashboardPage.vue"),
        meta: {
          logged: true,
          title: "Home STARKY",
          meta: [{ name: "description", content: "Home" }],
        },
      },
      {
        path: "/tugas-statistik",
        name: 'dashboard_tugas_statistik',
        component: () => import("pages/dashboard/LmsDashboardTugasStatistikPage.vue"),
        meta: {
          logged: false,
          title: "Home STARKY",
          meta: [{ name: "description", content: "Home" }],
        },
      },
      ...routes_account,
      ...routes_collection,
      ...routes_activity,
      ...routes_stats,
      ...routes_notifications,
    ]
  },

  {
    path: "/MainLayout",
    component: () => import("layouts/MainLayout.vue"),
    children: [





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




      // {
      //   path: "/A",
      //   component: () => import("pages/GradientAPage.vue"),
      // },
      // {
      //   path: "/B",
      //   component: () => import("pages/GradientBPage.vue"),
      // },
      // {
      //   path: "/C",
      //   component: () => import("pages/GradientCPage.vue"),
      // },
      // {
      //   path: "/home",
      //   name: "home",
      //   component: () => import("pages/Home.vue"),
      //   meta: {
      //     title: "Beranda - Yuvoria SNACK",
      //     meta: [{ name: "description", content: "Beranda produk." }],
      //   },
      // },
      // {
      //   path: "/product/:id?",
      //   name: "product",
      //   component: () => import("pages/Product.vue"),
      //   meta: {
      //     title: "Product - Yuvoria SNACK",
      //     meta: [{ name: "description", content: "Deskripsi produk." }],
      //   },
      // },
      // {
      //   path: "/list",
      //   name: "list",
      //   component: () => import("pages/List.vue"),
      //   meta: {
      //     title: "List - Yuvoria SNACK",
      //     meta: [{ name: "description", content: "List produk" }],
      //   },
      // },


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
