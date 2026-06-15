<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">
    <!-- <q-list separator bordered> -->
    <template v-if="get_summary">

      <SummaryTable :item="get_summary"></SummaryTable>

      <DeadlineTable class="q-mt-md" :items="get_deadline"></DeadlineTable>
      <RecentSubmissionTable class="q-mt-md" :items="get_recent_submission"></RecentSubmissionTable>
      <AktivitasNewestTable class="q-mt-md" :items="get_aktivitas"></AktivitasNewestTable>
      <ContentGrowthTable class="q-mt-md" :items="get_growth"></ContentGrowthTable>
      <PublishStatusTable class="q-mt-md" :items="get_publish_status"></PublishStatusTable>
      <TopMapelTable class="q-mt-md" :items="get_top_mapel"></TopMapelTable>
      <RoleDistributionTable class="q-mt-md" :items="get_role_distribution"></RoleDistributionTable>
      <ScoreQuizDistributionTable class="q-mt-md" :items="get_score_quiz_distribution"></ScoreQuizDistributionTable>
      <ScoreModulDistributionTable class="q-mt-md" :items="get_score_modul_distribution"></ScoreModulDistributionTable>
      <TopKelasTable class="q-mt-md" :items="get_top_kelas"></TopKelasTable>
      <QuizCategoryTable class="q-mt-md" :items="get_quiz_kategori"></QuizCategoryTable>
      <ModulCategoryTable class="q-mt-md" :items="get_modul_kategori"></ModulCategoryTable>
      <QuizPopulerTable class="q-mt-md" :items="get_quiz_populer"></QuizPopulerTable>
      <ModulPopulerTable class="q-mt-md" :items="get_modul_populer"></ModulPopulerTable>
      <TopTeacherTable class="q-mt-md" :items="get_top_teacher"></TopTeacherTable>
      <TopSiswaTable class="q-mt-md" :items="get_top_siswa"></TopSiswaTable>
      <SubmitProgressTable class="q-mt-md" :items="get_submit_progress"></SubmitProgressTable>
      <DistribusiTipeTugasTable class="q-mt-md" :items="get_widget_tugas_type_distribution"></DistribusiTipeTugasTable>

    </template>

    <EmptyBlock v-else></EmptyBlock>
    <!-- </q-list> -->
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsDashboardStore } from "src/stores/lms/LmsDashboardStore";

import DeadlineTable from "./components/quiz_metric/DeadlineTable.vue";
import RecentSubmissionTable from "./components/quiz_metric/RecentSubmissionTable.vue";
import AktivitasNewestTable from "./components/quiz_metric/AktivitasNewestTable.vue";
import ContentGrowthTable from "./components/quiz_metric/ContentGrowthTable.vue";
import PublishStatusTable from "./components/quiz_metric/PublishStatusTable.vue";
import TopMapelTable from "./components/quiz_metric/TopMapelTable.vue";
import RoleDistributionTable from "./components/quiz_metric/RoleDistributionTable.vue";
import ScoreQuizDistributionTable from "./components/quiz_metric/ScoreQuizDistributionTable.vue";
import ScoreModulDistributionTable from "./components/quiz_metric/ScoreModulDistributionTable.vue";
import TopKelasTable from "./components/quiz_metric/TopKelasTable.vue";
import QuizCategoryTable from "./components/quiz_metric/QuizCategoryTable.vue";
import ModulCategoryTable from "./components/quiz_metric/ModulCategoryTable.vue";
import QuizPopulerTable from "./components/quiz_metric/QuizPopulerTable.vue";
import ModulPopulerTable from "./components/quiz_metric/ModulPopulerTable.vue";
import TopTeacherTable from "./components/quiz_metric/TopTeacherTable.vue";
import TopSiswaTable from "./components/quiz_metric/TopSiswaTable.vue";
import SubmitProgressTable from "./components/quiz_metric/SubmitProgressTable.vue";
import DistribusiTipeTugasTable from "./components/quiz_metric/DistribusiTipeTugasTable.vue";
import SummaryTable from "./components/quiz_metric/SummaryTable.vue";


export default {
  components: {
    SummaryTable,
    DistribusiTipeTugasTable,
    SubmitProgressTable,
    TopSiswaTable,
    TopTeacherTable,
    ModulPopulerTable,
    QuizPopulerTable,
    ModulCategoryTable,
    QuizCategoryTable,
    TopKelasTable,
    ScoreModulDistributionTable,
    ScoreQuizDistributionTable,
    RoleDistributionTable,
    TopMapelTable,
    PublishStatusTable,
    ContentGrowthTable,
    DeadlineTable,
    RecentSubmissionTable,
    AktivitasNewestTable
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsDashboardStore(store);

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
    ...mapState(useLmsDashboardStore, [
      'get_init_index',
      "get_loading_index",

      'get_summary',
      'get_growth',
      'get_publish_status',
      'get_role_distribution',
      'get_score_quiz_distribution',
      'get_score_modul_distribution',
      'get_top_mapel',
      'get_top_kelas',
      'get_top_teacher',
      'get_top_siswa',
      'get_quiz_populer',
      'get_modul_populer',
      'get_submit_progress',
      'get_deadline',
      'get_aktivitas',
      'get_recent_submission',
      'get_quiz_kategori',
      'get_modul_kategori',
      'get_widget_tugas_type_distribution',

    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsDashboardStore, ["onIndex", "onChangePage"]),
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
