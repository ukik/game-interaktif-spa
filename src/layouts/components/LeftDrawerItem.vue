<template>
  <div class="q-pa-none">
    <!-- <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>EMERALD</q-toolbar-title>
    </q-toolbar> -->

    <q-list>
      <q-item-label header class="q-py-md">Dashboard</q-item-label>
      <q-item v-for="(item, index) in dashboard_items" :key="index" :to="{ name: item?.route_name }" clickable v-ripple
        :active="link === item?.route_name" active-class="my-menu-link">
        <q-item-section avatar>
          <!-- <q-icon :name="item.icon"></q-icon> -->
          <q-avatar color="primary" text-color="white">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>


      <q-item-label header class="q-py-md">Notifikasi</q-item-label>
      <q-item v-for="(item, index) in notifikasi_items" :key="index" :to="{ name: item?.route_name }" clickable v-ripple
        :active="link === item?.route_name" active-class="my-menu-link">
        <q-item-section avatar>
          <!-- <q-icon :name="item.icon"></q-icon> -->
          <q-avatar color="primary" text-color="white">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>


      <q-item-label header class="q-py-md">Aktivitas</q-item-label>
      <q-item v-for="(item, index) in aktivitas_items" :key="index" :to="{ name: item?.route_name }" clickable v-ripple
        :active="link === item?.route_name" active-class="my-menu-link">
        <q-item-section avatar>
          <!-- <q-icon :name="item.icon"></q-icon> -->
          <q-avatar color="primary" text-color="white">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label header class="q-py-md">Statistik</q-item-label>
      <q-item :inset-level="0.0" v-for="(item, index) in statistik_items" :key="index" :to="{ name: item?.route_name }" clickable v-ripple
        :active="link === item?.route_name" active-class="my-menu-link">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label header class="q-py-md">Statistik</q-item-label>
      <q-item :inset-level="0.0" v-for="(item, index) in log_items" :key="index" :to="{ name: item?.route_name }" clickable v-ripple
        :active="link === item?.route_name" active-class="my-menu-link">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>


      <q-item-label header class="q-py-md">Koleksi</q-item-label>
      <q-item v-for="(item, index) in koleksi_items" :key="index" :to="{ name: item?.route_name }" clickable v-ripple
        :active="link === item?.route_name" active-class="my-menu-link">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>


      <q-item-label header class="q-py-md">Pengguna</q-item-label>
      <q-item v-for="(item, index) in pengguna_items" :key="index" :to="{ name: item?.route_name }" clickable v-ripple
        :active="link === item?.route_name" active-class="my-menu-link">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>



      <!-- <q-separator />
      <q-item-label header>Offline</q-item-label>

      <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item> -->
    </q-list>
  </div>
</template>

<script>
const notifikasi_items = [
  {
    id: 1,
    title: "PESAN TUGAS",
    subtitle: "Tugas Terbaru",
    icon: "alarm",
    route_name: 'lms_notification_tugas_index',
  },
  {
    id: 2,
    title: "PESAN HASIL",
    subtitle: "Nilai Terbaru",
    icon: "alarm_on",
    route_name: 'lms_notification_quiz_hasil_index',
  },
];

const dashboard_items = [
  {
    id: 1,
    title: "GENERAL",
    subtitle: "Tugas Publish",
    icon: "widgets",
    route_name: 'dashboard',
  },
  {
    id: 2,
    title: "AKTIVITAS",
    subtitle: "Nilai Submit",
    icon: "dashboard",
    route_name: 'dashboard_tugas_statistik',
  },
];

const aktivitas_items = [
  {
    id: 1,
    title: "DAFTAR TUGAS",
    subtitle: "Kumpulan Latihan",
    icon: "fa-solid fa-table",
    route_name: 'lms-tugas-index',
  },
];

const log_items = [
  {
    id: 1,
    title: "DAFTAR TUGAS",
    subtitle: "Kumpulan Latihan",
    icon: "fa-solid fa-table",
    route_name: 'lms-tugas-index',
  },
];

const statistik_items = [
  {
    id: 2,
    title: "RANKING MODUL",
    subtitle: "Hasil Tugas",
    icon: "fa-solid fa-chart-line",
    route_name: 'lms-tugas-modul-stats-index',
  },
  {
    id: 3,
    title: "RANKING QUIZ",
    subtitle: "Hasil Tugas",
    icon: "fa-solid fa-chart-line",
    route_name: 'lms-tugas-quiz-stats-index',
  },
];

const koleksi_items = [
  {
    id: 2,
    title: "MODUL",
    subtitle: "Bank Materi",
    icon: "fas fa-file-lines",
    route_name: 'lms-modul-index',
  },
  {
    id: 3,
    title: "QUIZ",
    subtitle: "Bank Materi",
    icon: "fa-solid fa-clipboard-question",
    route_name: 'lms-quiz-index',
  },
];

const pengguna_items = [
  {
    id: 0,
    title: "SEKOLAH",
    subtitle: "Profil Informasi",
    icon: "fa-solid fa-house-user",
    route_name: 'lms-sekolah-index',
  },
  {
    id: 1,
    title: "STAKEHOLDER",
    subtitle: "Profil Informasi",
    icon: "fa-solid fa-house-user",
    route_name: 'lms-stakeholder-index',
  },
  {
    id: 2,
    title: "ORANGTUA",
    subtitle: "Profil Informasi",
    icon: "fa-solid fa-house-user",
    route_name: 'lms-ortu-index',
  },
  {
    id: 3,
    title: "SISWA",
    subtitle: "Profil Informasi",
    icon: "fa-solid fa-house-user",
    route_name: 'lms-siswa-index',
  },
];

// const offline = [
//   {
//     id: 5,
//     name: "Brunhilde Panswick",
//     email: "bpanswick4@csmonitor.com",
//     avatar: "avatar2.jpg",
//   },
// ];
import { ref } from 'vue'

export default {
  setup() {
    return {
      log_items,
      notifikasi_items,
      aktivitas_items,
      statistik_items,
      koleksi_items,
      pengguna_items,
      dashboard_items,
      // offline,
      link: ref('')
    };
  },
  watch: {
    '$route.name': function (val) {
      console.log('$route.name', val)
      this.link = val
    }
  },
  mounted() {
    this.link = this.$route.name
  }
};


</script>

<style scoped lang="scss">
.my-menu-link {
  color: #1976D2;
  font-weight: bold;
  background: #8ac6ff34;

  :deep(.text-caption) {
    color: #1976D2;
  }
}
</style>
