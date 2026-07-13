const routes = [
  {
    path: "/",
    name: 'dashboard_quiz_metric',
    component: () => import("pages/quiz/quiz_dashboard/LmsDashboardQuizMetricPage.vue"),
    meta: {
      logged: true,
      title: "Dashboard Tugas Metric",
      description: "Halaman untuk memantau metrik tugas, progres pengerjaan, performa peserta, dan ringkasan aktivitas pembelajaran.",
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
      description: "Halaman statistik tugas yang menampilkan data penyelesaian, hasil penilaian, distribusi nilai, dan analisis aktivitas peserta.",
      page_type: 'index',
    },
  },
]

export default routes
