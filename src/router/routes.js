import routes_quiz_action_public from "./quiz/routes_quiz_action_public";
import routes_quiz_action from "./quiz/routes_quiz_action";
import routes_quiz_report from "./quiz/routes_quiz_report";
import routes_collection from "./quiz/routes_quiz_collection";
import routes_activity from "./quiz/routes_quiz_activity";
import routes_stats from "./quiz/routes_quiz_stats";
import routes_riwayat from "./quiz/routes_quz_riwayat";
import routes_quiz_intro from "./quiz/routes_quiz_intro";
import routes_quiz_dashboard from "./quiz/routes_quiz_dashboard";




import routes_account from "./routes_account";
import routes_notifications from "./routes_notifications";

const routes = [
  {
    path: "/QuizReportLayout",
    component: () => import("layouts/QuizReportLayout.vue"),
    children: [
      ...routes_quiz_report,
    ]
  },
  {
    path: "/QuizActionNoHeaderLayout",
    component: () => import("layouts/QuizActionNoHeaderLayout.vue"),
    children: [
      ...routes_quiz_action,
      ...routes_quiz_action_public,
      ...routes_quiz_intro,
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
    ]
  },

  {
    path: "/QuizActionLayout",
    component: () => import("layouts/QuizActionLayout.vue"),
    children: [
      ...routes_quiz_dashboard,
      ...routes_account,
      ...routes_collection,
      ...routes_activity,
      ...routes_stats,
      ...routes_notifications,
      ...routes_riwayat,
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
