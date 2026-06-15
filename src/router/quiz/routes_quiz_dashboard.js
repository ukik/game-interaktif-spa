const routes = [
  {
    path: "/",
    name: 'dashboard_quiz_metric',
    component: () => import("pages/quiz/quiz_dashboard/LmsDashboardQuizMetricPage.vue"),
    meta: {
      logged: true,
      title: "Home STARKY",
      meta: [{ name: "description", content: "Home" }],
    },
  },
  {
    path: "/tugas-statistik",
    name: 'dashboard_tugas_statistik',
    component: () => import("pages/quiz/quiz_dashboard/LmsDashboardTugasStatistikPage.vue"),
    meta: {
      logged: false,
      title: "Home STARKY",
      meta: [{ name: "description", content: "Home" }],
    },
  },
]

export default routes
