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
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
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
