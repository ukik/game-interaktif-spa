<template>
  <div class="q-pa-none">
    <!-- <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>EMERALD</q-toolbar-title>
    </q-toolbar> -->

    <q-list>
      <!-- Koleksi -->
      <q-item-label header class="q-py-md"
        >STEP 1 <q-icon name="arrow_right"></q-icon>
      </q-item-label>
      <q-expansion-item v-model="expanded_bank" group="sidebar">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar text-color="white" icon="school" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-capitalize">BANK QUIZ</q-item-label>
            <q-item-label caption lines="1">Pilih Materi</q-item-label>
          </q-item-section>
        </template>

        <q-item
          :inset-level="0.25"
          v-for="(item, index) in quiz_lists"
          :key="index"
          :to="{ name: 'lms_quiz_index', params: { quiz: item?.subtitle } }"
          clickable
          v-ripple
          :active="link === 'lms_quiz_index' && $route?.params?.quiz == item?.subtitle"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-avatar color="grey-2">
              <q-icon color="primary" size="18px" name="arrow_forward_ios"></q-icon>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize">{{ item?.title }}</q-item-label>
            <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>

      <!-- Aktivitas -->
      <q-item-label header class="q-py-md"
        >STEP 2 <q-icon name="arrow_right"></q-icon>
      </q-item-label>
      <q-expansion-item v-model="expanded_tugas" group="sidebar">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar
              text-color="white"
              icon="fa-solid fa-clipboard-question"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-capitalize">TUGAS QUIZ</q-item-label>
            <q-item-label caption lines="1">Kumpulan Latihan</q-item-label>
          </q-item-section>
        </template>

        <q-item
          :inset-level="0.25"
          v-for="(item, index) in quiz_lists"
          :key="index"
          :to="{ name: 'lms_tugas_index', params: { quiz: item?.subtitle } }"
          clickable
          v-ripple
          :active="link === 'lms_tugas_index' && $route?.params?.quiz == item?.subtitle"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-avatar color="grey-2">
              <q-icon color="primary" size="18px" name="arrow_forward_ios"></q-icon>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize">{{ item?.title }}</q-item-label>
            <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>

      <!-- Riwayat -->
      <q-item-label header class="q-py-md"
        >STEP 3 <q-icon name="arrow_right"></q-icon>
      </q-item-label>
      <q-expansion-item v-model="expanded_nilai" group="sidebar">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar text-color="white" icon="fa-solid fa-chart-line" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-capitalize">NILAI QUIZ</q-item-label>
            <q-item-label caption lines="1">Capaian Siswa</q-item-label>
          </q-item-section>
        </template>

        <q-item
          :inset-level="0.25"
          v-for="(item, index) in quiz_lists"
          :key="index"
          :to="{ name: 'lms_tugas_quiz_log_index', params: { quiz: item?.subtitle } }"
          clickable
          v-ripple
          :active="
            link === 'lms_tugas_quiz_log_index' && $route?.params?.quiz == item?.subtitle
          "
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-avatar color="grey-2">
              <q-icon color="primary" size="18px" name="arrow_forward_ios"></q-icon>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize">{{ item?.title }}</q-item-label>
            <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>

      <!-- Statistik -->
      <q-item-label header class="q-py-md"
        >STEP 4 <q-icon name="arrow_right"></q-icon>
      </q-item-label>
      <q-expansion-item v-model="expanded_ranking" group="sidebar">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar text-color="white" icon="emoji_events" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-capitalize">RANKING QUIZ</q-item-label>
            <q-item-label caption lines="1">Agregat Hasil</q-item-label>
          </q-item-section>
        </template>

        <q-item
          :inset-level="0.25"
          v-for="(item, index) in quiz_lists"
          :key="index"
          :to="{ name: 'lms_tugas_quiz_stats_index', params: { quiz: item?.subtitle } }"
          clickable
          v-ripple
          :active="
            link === 'lms_tugas_quiz_stats_index' &&
            $route?.params?.quiz == item?.subtitle
          "
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-avatar color="grey-2">
              <q-icon color="primary" size="18px" name="arrow_forward_ios"></q-icon>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize">{{ item?.title }}</q-item-label>
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

      switch (val) {
        case "lms_quiz_index":
          this.expanded_bank = true;
          break;
        case "lms_tugas_quiz_log_index":
          this.expanded_nilai = true;
          break;
        case "lms_tugas_quiz_stats_index":
          this.expanded_ranking = true;
          break;
        case "lms_tugas_index":
          this.expanded_tugas = true;
          break;
      }
    },
  },
  mounted() {
    this.link = this.$route.name;

    if (this.$route?.name == "lms_quiz_index") this.expanded_bank = true;
    if (this.$route?.name == "lms_tugas_quiz_log_index") this.expanded_nilai = true;
    if (this.$route?.name == "lms_tugas_quiz_stats_index") this.expanded_ranking = true;
    if (this.$route?.name == "lms_tugas_index") this.expanded_tugas = true;
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
