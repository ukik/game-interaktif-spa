<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">
    <!-- <q-list separator bordered> -->
    <template v-if="get_widget_tugas_overview">

      <SummaryTable :item="get_widget_tugas_overview"></SummaryTable>

      <MonthlyRankingQuizTable class="q-mt-md" :items="get_widget_quiz_score_distribution_monthly"></MonthlyRankingQuizTable>
      <MonthlyRankingModulTable class="q-mt-md" :items="get_widget_modul_score_distribution_monthly"></MonthlyRankingModulTable>
      <SemesterRankingQuizTable class="q-mt-md" :items="get_widget_quiz_score_distribution_semester"></SemesterRankingQuizTable>
      <SemesterRankingModulTable class="q-mt-md" :items="get_widget_modul_score_distribution_semester"></SemesterRankingModulTable>
      <StatistikKategoriTable class="q-mt-md" :items="get_widget_tugas_kategori"></StatistikKategoriTable>
      <StatistikSubmitTable class="q-mt-md" :items="get_widget_tugas_submit"></StatistikSubmitTable>

      <ScoreQuizDistributionByKelasTable class="q-mt-md" :items="get_quiz_score_distribution_by_kelas"></ScoreQuizDistributionByKelasTable>
      <ScoreQuizDistributionByMapelTable class="q-mt-md" :items="get_quiz_score_distribution_by_mapel"></ScoreQuizDistributionByMapelTable>
      <ScoreQuizDistributionByTugasKategoriTable class="q-mt-md" :items="get_quiz_score_distribution_by_tugas_kategori"></ScoreQuizDistributionByTugasKategoriTable>
      <ScoreQuizDistributionByTugasTable class="q-mt-md" :items="get_quiz_score_distribution_by_tugas"></ScoreQuizDistributionByTugasTable>

      <ScoreModulDistributionByKelasTable class="q-mt-md" :items="get_modul_score_distribution_by_kelas"></ScoreModulDistributionByKelasTable>
      <ScoreModulDistributionByMapelTable class="q-mt-md" :items="get_modul_score_distribution_by_mapel"></ScoreModulDistributionByMapelTable>
      <ScoreModulDistributionByTugasKategoriTable class="q-mt-md" :items="get_modul_score_distribution_by_tugas_kategori"></ScoreModulDistributionByTugasKategoriTable>
      <ScoreModulDistributionByTugasTable class="q-mt-md" :items="get_modul_score_distribution_by_tugas"></ScoreModulDistributionByTugasTable>

    </template>

    <EmptyBlock v-else></EmptyBlock>
    <!-- </q-list> -->
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsDashboardTugasStatistikStore } from "src/stores/lms/LmsDashboardTugasStatistikStore";

import MonthlyRankingQuizTable from "./components/tugas_statistik/MonthlyRankingQuizTable.vue";
import MonthlyRankingModulTable from "./components/tugas_statistik/MonthlyRankingModulTable.vue";
import SemesterRankingQuizTable from "./components/tugas_statistik/SemesterRankingQuizTable.vue";
import SemesterRankingModulTable from "./components/tugas_statistik/SemesterRankingModulTable.vue";
import StatistikKategoriTable from "./components/tugas_statistik/StatistikKategoriTable.vue";
import StatistikSubmitTable from "./components/tugas_statistik/StatistikSubmitTable.vue";
import ScoreQuizDistributionByKelasTable from "./components/tugas_statistik/ScoreQuizDistributionByKelasTable.vue";
import ScoreQuizDistributionByMapelTable from "./components/tugas_statistik/ScoreQuizDistributionByMapelTable.vue";
import ScoreQuizDistributionByTugasKategoriTable from "./components/tugas_statistik/ScoreQuizDistributionByTugasKategoriTable.vue";
import ScoreQuizDistributionByTugasTable from "./components/tugas_statistik/ScoreQuizDistributionByTugasTable.vue";

import ScoreModulDistributionByKelasTable from "./components/tugas_statistik/ScoreModulDistributionByKelasTable.vue";
import ScoreModulDistributionByMapelTable from "./components/tugas_statistik/ScoreModulDistributionByMapelTable.vue";
import ScoreModulDistributionByTugasKategoriTable from "./components/tugas_statistik/ScoreModulDistributionByTugasKategoriTable.vue";
import ScoreModulDistributionByTugasTable from "./components/tugas_statistik/ScoreModulDistributionByTugasTable.vue";
import SummaryTable from "./components/tugas_statistik/SummaryTable.vue";

export default {
  components: {
    SummaryTable,

    ScoreQuizDistributionByKelasTable,
    ScoreQuizDistributionByMapelTable,
    ScoreQuizDistributionByTugasKategoriTable,
    ScoreQuizDistributionByTugasTable,

    ScoreModulDistributionByKelasTable,
    ScoreModulDistributionByMapelTable,
    ScoreModulDistributionByTugasKategoriTable,
    ScoreModulDistributionByTugasTable,

    StatistikKategoriTable,
    StatistikSubmitTable,
    MonthlyRankingQuizTable,
    MonthlyRankingModulTable,
    SemesterRankingQuizTable,
    SemesterRankingModulTable,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsDashboardTugasStatistikStore(store);

    const page = currentRoute.query.page || 1;

    await preStore.onIndex(page);
  },
  data() {
    return {
      list_demo: [],
    };
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapState(useLmsDashboardTugasStatistikStore, [
      'get_init_index',
      "get_loading_index",

      'get_widget_tugas_overview',
      'get_widget_tugas_kategori',
      'get_widget_tugas_submit',
      'get_widget_quiz_score_distribution_monthly',
      'get_widget_quiz_score_distribution_semester',
      'get_widget_modul_score_distribution_monthly',
      'get_widget_modul_score_distribution_semester',
      'get_widget_student_performance',
      'get_quiz_score_distribution_by_mapel',
      'get_quiz_score_distribution_by_tugas',
      'get_quiz_score_distribution_by_kelas',
      'get_quiz_score_distribution_by_kategori',
      'get_quiz_score_distribution_by_tugas_kategori',
      'get_modul_score_distribution_by_mapel',
      'get_modul_score_distribution_by_tugas',
      'get_modul_score_distribution_by_kelas',
      'get_modul_score_distribution_by_kategori',
      'get_modul_score_distribution_by_tugas_kategori',


    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsDashboardTugasStatistikStore, ["onIndex", "onChangePage"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
