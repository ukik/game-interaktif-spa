const routes = [
  // BANK TUGAS
  {
    // path: "/lms-tugas-index/:quiz(arrange|match|boolean|essay|multiple|shortanswer)",
    path: "/lms-tugas-index",
    name: 'lms_tugas_index',
    component: () => import("pages/quiz/quiz_tugas/LmsTugasIndexPage.vue"),
    meta: {
      logged: true,
      title: "Tugas Quiz",
      description: "Halaman daftar tugas kuis yang menampilkan seluruh tugas, status pengerjaan, dan informasi penugasan peserta.",
      page_type: 'index',
      sidebar_id: 1,
    },
  },
  {
    path: "/lms-tugas-show/:slug",
    name: 'lms_tugas_show',
    component: () => import("pages/quiz/quiz_tugas/LmsTugasShowPage.vue"),
    meta: {
      logged: true,
      title: "Detail Tugas Quiz",
      description: "Halaman detail tugas kuis yang menampilkan informasi tugas, peserta, jadwal, pengaturan, dan hasil pengerjaan.",
      page_type: 'show',
      sidebar_id: 1,
    },
  },
]

export default routes
