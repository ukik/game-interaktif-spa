const routes_notifications = [
  {
    path: "/lms-notification-tugas-index",
    name: 'lms_notification_tugas_index',
    component: () => import("pages/lms_notification_tugas/Index.vue"),
    meta: {
      logged: true,
      title: "Notifikasi Tugas",
      meta: [{ name: "description", content: "Notifikasi Tugas" }],
      page_type: 'show',
    },
  },
  {
    path: "/lms-notification-tugas-show/:slug",
    name: 'lms_notification_tugas_show',
    component: () => import("pages/lms_notification_tugas/Show.vue"),
    meta: {
      logged: true,
      title: "Detail Notifikasi Tugas",
      meta: [{ name: "description", content: "Detail Notifikasi Tugas" }],
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
      meta: [{ name: "description", content: "Notifikasi Nilai" }],
      page_type: 'show',
    },
  },
  {
    path: "/lms-notification-quiz-hasil-show/:slug",
    name: 'lms_notification_quiz_hasil_show',
    component: () => import("pages/lms_notification_quiz_hasil/Show.vue"),
    meta: {
      logged: true,
      title: "Detail Notifikasi Nilai",
      meta: [{ name: "description", content: "Detail Notifikasi Nilai" }],
      page_type: 'show',
    },
  },


]

export default routes_notifications
