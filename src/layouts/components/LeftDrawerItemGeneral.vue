<template>
  <div class="q-pa-none">
    <!-- <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>EMERALD</q-toolbar-title>
    </q-toolbar> -->

    <q-list>
      <q-item-label header class="q-py-md">Dashboard</q-item-label>
      <q-item
        v-for="(item, index) in dashboard_items"
        :key="index"
        :to="{ name: item?.route_name }"
        clickable
        v-ripple
        :active="link === item?.route_name"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <!-- <q-icon :name="item.icon"></q-icon> -->
          <q-avatar color="primary">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label header class="q-py-md">Notifikasi</q-item-label>
      <q-item
        v-for="(item, index) in notifikasi_items"
        :key="index"
        :to="{ name: item?.route_name }"
        clickable
        v-ripple
        :active="link === item?.route_name"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <!-- <q-icon :name="item.icon"></q-icon> -->
          <q-avatar color="primary">
            <q-icon color="white" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label header class="q-py-md">Pengguna</q-item-label>
      <q-expansion-item v-model="expanded_pengaturan" group="sidebar">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar text-color="white" icon="fa-solid fa-house-user" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-capitalize">PENGATURAN</q-item-label>
            <q-item-label caption lines="1">Setingan Umum</q-item-label>
          </q-item-section>
        </template>

        <q-item
          :inset-level="0.25"
          v-for="(item, index) in pengguna_items"
          :key="index"
          :to="{ name: item?.route_name }"
          clickable
          v-ripple
          :active="link === item?.route_name || link === item?.route_name_show"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-avatar color="grey-2">
              <q-icon color="primary" size="18px" name="arrow_forward_ios"></q-icon>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item?.title }}</q-item-label>
            <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
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
    route_name: "lms_notification_tugas_index",
  },
  {
    id: 2,
    title: "PESAN HASIL",
    subtitle: "Nilai Terbaru",
    icon: "alarm_on",
    route_name: "lms_notification_quiz_hasil_index",
  },
];

const dashboard_items = [
  {
    id: 1,
    title: "GENERAL",
    subtitle: "Tugas Publish",
    icon: "widgets",
    route_name: "dashboard_quiz_metric",
  },
  {
    id: 2,
    title: "AKTIVITAS",
    subtitle: "Nilai Submit",
    icon: "dashboard",
    route_name: "dashboard_tugas_statistik",
  },
];

const pengguna_items = [
  {
    id: 0,
    title: "SEKOLAH",
    subtitle: "Profil Sekolah",
    icon: "fa-solid fa-house-user",
    route_name: "lms_sekolah_index",
    route_name_show: "lms_sekolah_show",
  },
  {
    id: 1,
    title: "STAKEHOLDER",
    subtitle: "Profil Stakeholder",
    icon: "fa-solid fa-house-user",
    route_name: "lms_stakeholder_index",
    route_name_show: "lms_stakeholder_show",
  },
  {
    id: 2,
    title: "ORANGTUA",
    subtitle: "Profil Wali",
    icon: "fa-solid fa-house-user",
    route_name: "lms_ortu_index",
    route_name_show: "lms_ortu_show",
  },
  {
    id: 3,
    title: "SISWA",
    subtitle: "Profil Pelajar",
    icon: "fa-solid fa-house-user",
    route_name: "lms_siswa_index",
    route_name_show: "lms_siswa_show",
  },
];

import { ref } from "vue";

export default {
  setup() {
    return {
      notifikasi_items,
      pengguna_items,
      dashboard_items,
      link: ref(""),
    };
  },
  data() {
    return {
      quiz_lists: [
        {
          id: 1,
          title: "MENYUSUN",
          subtitle: "Arrange",
        },
        {
          id: 2,
          title: "BENAR / SALAH",
          subtitle: "Boolean",
        },
        {
          id: 3,
          title: "MENCOCOKKAN",
          subtitle: "Match",
        },
        {
          id: 4,
          title: "PILIHAN GANDA",
          subtitle: "Multiple",
        },
        {
          id: 5,
          title: "ISIAN SINGKAT",
          subtitle: "Shortanswer",
        },
        {
          id: 6,
          title: "ESAI",
          subtitle: "Essay",
        },
      ],

      expanded_bank: false,
      expanded_nilai: false,
      expanded_ranking: false,
      expanded_tugas: false,
      expanded_pengaturan: false,
    };
  },
  watch: {
    "$route.name": function (val) {
      console.log("$route.name", val);
      this.link = val;

      this.expanded_bank = false;
      this.expanded_nilai = false;
      this.expanded_ranking = false;
      this.expanded_tugas = false;
      this.expanded_pengaturan = false;

      switch (val) {
        // case "lms_quiz_index":
        //   this.expanded_bank = true;
        //   break;
        // case "lms_tugas_quiz_log_index":
        //   this.expanded_nilai = true;
        //   break;
        // case "lms_tugas_quiz_stats_index":
        //   this.expanded_ranking = true;
        //   break;
        // case "lms_tugas_index":
        //   this.expanded_tugas = true;
        //   break;
        case "lms_sekolah_index":
        case "lms_stakeholder_index":
        case "lms_ortu_index":
        case "lms_siswa_index":
        case "lms_sekolah_show":
        case "lms_stakeholder_show":
        case "lms_ortu_show":
        case "lms_siswa_show":
          this.expanded_pengaturan = true;
          break;
      }
    },
  },
  mounted() {
    this.link = this.$route.name;

    // if (this.$route?.name == "lms_quiz_index") this.expanded_bank = true;
    // if (this.$route?.name == "lms_tugas_quiz_log_index") this.expanded_nilai = true;
    // if (this.$route?.name == "lms_tugas_quiz_stats_index") this.expanded_ranking = true;
    // if (this.$route?.name == "lms_tugas_index") this.expanded_tugas = true;
    switch (this.$route?.name) {
        case "lms_sekolah_index":
        case "lms_stakeholder_index":
        case "lms_ortu_index":
        case "lms_siswa_index":
        case "lms_sekolah_show":
        case "lms_stakeholder_show":
        case "lms_ortu_show":
        case "lms_siswa_show":
        this.expanded_pengaturan = true;
        break;
    }
  },
};
</script>

<style scoped lang="scss">
.my-menu-link {
  color: #1976d2;
  font-weight: bold;
  background: #8ac6ff34;

  :deep(.text-caption) {
    color: #1976d2;
  }
}
</style>
