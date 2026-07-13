const routes_notifications = [
  {
    path: "/lms-notification-tugas-index",
    name: 'lms_notification_tugas_index',
    component: () => import("pages/lms_notification_tugas/Index.vue"),
    meta: {
      logged: true,
      title: "Notifikasi Tugas",
      description: "Halaman notifikasi tugas yang menampilkan daftar pemberitahuan tugas, pembaruan, dan aktivitas terkait penugasan.",
      page_type: 'index',
    },
  },
  {
    path: "/lms-notification-tugas-show/:slug",
    name: 'lms_notification_tugas_show',
    component: () => import("pages/lms_notification_tugas/Show.vue"),
    meta: {
      logged: true,
      title: "Detail Notifikasi Tugas",
      description: "Halaman detail notifikasi tugas yang menampilkan informasi lengkap mengenai pemberitahuan dan aktivitas tugas.",
      page_type: 'show',
    },
  },
  {
    path: "/lms-notification-quiz-hasil-index",
    name: 'lms_notification_quiz_hasil_index',
    component: () => import("pages/lms_notification_quiz_hasil/Index.vue"),
    meta: {
      logged: true,
      title: "Notifikasi Nilai",
      description: "Halaman notifikasi nilai yang menampilkan daftar pemberitahuan hasil kuis, nilai, dan pembaruan penilaian peserta.",
      page_type: 'index',
    },
  },
  {
    path: "/lms-notification-quiz-hasil-show/:slug",
    name: 'lms_notification_quiz_hasil_show',
    component: () => import("pages/lms_notification_quiz_hasil/Show.vue"),
    meta: {
      logged: true,
      title: "Detail Notifikasi Nilai",
      description: "Halaman detail notifikasi nilai yang menampilkan informasi lengkap mengenai hasil kuis, nilai, dan pemberitahuan penilaian.",
      page_type: 'show',
    },
  },

]

export default routes_notifications
