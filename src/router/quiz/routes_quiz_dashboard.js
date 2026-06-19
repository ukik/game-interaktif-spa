const routes = [
  {
    path: "/",
    name: 'dashboard_quiz_metric',
    component: () => import("pages/quiz/quiz_dashboard/LmsDashboardQuizMetricPage.vue"),
    meta: {
      logged: true,
      title: "Dashboard Tugas Metric",
      meta: [{ name: "description", content: "Dashboard Tugas Metric" }],
      page_type: 'index',
    },
  },
  {
    path: "/dashboard-tugas-statistik",
    name: 'dashboard_tugas_statistik',
    component: () => import("pages/quiz/quiz_dashboard/LmsDashboardTugasStatistikPage.vue"),
    meta: {
      logged: true,
      title: "Dashboard Tugas Statistik",
      meta: [{ name: "description", content: "Dashboard Tugas Statistik" }],
      page_type: 'index',
    },
  },
]

export default routes
