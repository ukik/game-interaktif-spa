<template>
  <InitLoading v-if="get_init_report"></InitLoading>

  <q-page v-else class="justify-start items-start q-pa-sm">
    <q-card flat bordered>
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
        <q-tab name="tab1" label="FINAL" />
        <q-tab name="tab2" label="PENDING" />
        <q-tab name="tab3" label="RANK" />
        <q-tab name="tab4" label="PESERTA" />
      </q-tabs>

      <q-separator />

      <keep-alive>
        <q-tab-panels keep-alive v-model="tab" animated>
          <q-tab-panel name="tab1" class="q-pa-none">
            <q-tabs key="tab1_sub" v-model="tab1_sub" dense inline-label indicator-color="transparent"
              active-color="white" class="bg-teal text-grey-4 shadow-2">
              <q-tab name="tab1_sub1" label="STATISTIK" icon="analytics" />
              <q-tab name="tab1_sub2" label="checking" icon="archive" />
            </q-tabs>

            <TimeupInfo :tugas="get_report_tugas"></TimeupInfo>

            <q-banner class="bg-primary q-ma-sm text-white rounded-borders">
              <template v-slot:avatar>
                <q-icon name="check_circle_outline" color="white" />
              </template>
              <div class="text-h6">FINAL</div>
              <div class="q-mb-sm">
                Hanya data <b>FINAL</b> yang akan masuk ke
                <b>Leaderboard / Ranking</b>. Masih bisa diganti data baru, sebelum waktu
                <b>Tugas</b> habis
              </div>
            </q-banner>

            <q-tab-panels keep-alive v-model="tab1_sub" animated>
              <q-tab-panel name="tab1_sub1" class="q-pa-none q-px-sm">
                <template v-if="get_report_submit">
                  <component v-if="tab == 'tab1'" v-bind:is="component.statistik" class=""
                    :record_quiz="get_report_submit"></component>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
              <q-tab-panel name="tab1_sub2" class="q-pa-none">
                <template v-if="get_report_submit_checking">
                  <component v-bind:is="component.checking" :checking="get_report_submit_checking"></component>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
            </q-tab-panels>

          </q-tab-panel>

          <q-tab-panel name="tab2" class="q-pa-none">
            <q-tabs key="tab2_sub" v-model="tab2_sub" dense inline-label indicator-color="transparent"
              active-color="white" class="bg-teal text-grey-4 shadow-2">
              <q-tab name="tab2_sub1" label="STATISTIK" icon="analytics" />
              <q-tab name="tab2_sub2" label="checking" icon="archive" />
            </q-tabs>

            <TimeupInfo :tugas="get_report_tugas"></TimeupInfo>


            <q-banner class="bg-primary q-ma-sm text-white rounded-borders">
              <template v-slot:avatar>
                <q-icon name="info_outline" color="white" />
              </template>
              <div class="text-h6">PENDING</div>
              <div class="q-mb-sm">
                Kamu bisa mengganti data yang sudah <b>Terkirim</b> dengan data ini, selama tugas belum tertutup.
                Proses tidak bisa dibatalkan
              </div>
              <template v-if="get_report_unsubmit && get_report_tugas?.status_durasi?.status !== 'selesai'" v-slot:action>
                <div style="height:60px"></div>
                <q-btn @click="onOpen" outline icon-right="send" color="white" label="kirim" />
              </template>
            </q-banner>

            <q-tab-panels keep-alive v-model="tab2_sub" animated>
              <q-tab-panel name="tab2_sub1" class="q-pa-none q-px-sm">
                <template v-if="get_report_unsubmit">
                  <component v-if="tab == 'tab2'" v-bind:is="component.statistik" :record_quiz="get_report_unsubmit">
                  </component>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
              <q-tab-panel name="tab2_sub2" class="q-pa-none">
                <template v-if="get_report_unsubmit_checking">
                  <component v-bind:is="component.checking" :checking="get_report_unsubmit_checking"></component>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
            </q-tab-panels>

          </q-tab-panel>

          <q-tab-panel name="tab3" class="q-pa-none">
            <template v-if="get_rank_payload && !get_init_rank">

              <ShowTabHasilCardEssay v-if="$route?.params?.quiz == 'essay'" @onRefresh="onRefreshShow"
                :payload="get_rank_payload" :top="get_rank_top"></ShowTabHasilCardEssay>

              <ShowTabHasilCard v-else @onRefresh="onRefreshShow" :payload="get_rank_payload" :top="get_rank_top">
              </ShowTabHasilCard>

            </template>
            <InitLoading v-else-if="get_init_rank"></InitLoading>
            <EmptyBlock v-else></EmptyBlock>
          </q-tab-panel>


          <q-tab-panel name="tab4" class="q-pa-none">
            <template v-if="get_peserta_payload?.id && !get_init_peserta">
              <ShowTabPesertaCard @onRefresh="onRefreshPeserta" :get_peserta_payload="get_peserta_payload?.tugas_siswa">
              </ShowTabPesertaCard>
            </template>
            <InitLoading v-else-if="get_init_peserta"></InitLoading>
            <EmptyBlock v-else></EmptyBlock>
          </q-tab-panel>
        </q-tab-panels>
      </keep-alive>
    </q-card>

    <ReportConfirmDialog ref="ReportConfirmDialog" @onBubbleEvent="onBubbleEvent"></ReportConfirmDialog>
  </q-page>
</template>

<script>
import { useLmsTugasQuizStatsStore } from "src/stores/lms/LmsTugasQuizStatsStore.js";
import { myMixin } from "./mixinReport.js";
import CardQuizReportArrange from "./components/CardQuizReportArrange.vue";
import CardQuizReportArrangeChecking from "./components/CardQuizReportArrangeChecking.vue";
import CardQuizReportBoolean from "./components/CardQuizReportBoolean.vue";
import CardQuizReportBooleanChecking from "./components/CardQuizReportBooleanChecking.vue";
import CardQuizReportEssay from "./components/CardQuizReportEssay.vue";
import CardQuizReportEssayChecking from "./components/CardQuizReportEssayChecking.vue";
import CardQuizReportMatch from "./components/CardQuizReportMatch.vue";
import CardQuizReportMatchChecking from "./components/CardQuizReportMatchChecking.vue";
import CardQuizReportMultiple from "./components/CardQuizReportMultiple.vue";
import CardQuizReportMultipleChecking from "./components/CardQuizReportMultipleChecking.vue";
import CardQuizReportShortAnswer from "./components/CardQuizReportShortAnswer.vue";
import CardQuizReportShortAnswerChecking from "./components/CardQuizReportShortAnswerChecking.vue";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore.js";
import { mapActions, mapState } from "pinia";
import ShowTabPesertaCard from "./components/ShowTabPesertaCard.vue";
import ShowTabHasilCard from "./components/ShowTabHasilCard.vue";
import ReportConfirmDialog from "./components/ReportConfirmDialog.vue";
import ShowTabHasilCardEssay from "./components/ShowTabHasilCardEssay.vue";
import TimeupInfo from "./components/TimeupInfo.vue";



export default {
  mixins: [myMixin],
  async preFetch({ store, currentRoute }) {
    const slug = currentRoute.params?.slug || ""; // tugas_id
    const siswa_id = currentRoute.params?.siswa_id || ""; // user_id
    await useLmsTugasQuizStatsStore(store).onReport(slug, siswa_id);
  },
  components: {
    TimeupInfo,
    ReportConfirmDialog,
    ShowTabHasilCard,
    ShowTabHasilCardEssay,
    ShowTabPesertaCard,
    CardQuizReportArrange,
    CardQuizReportArrangeChecking,
    CardQuizReportBoolean,
    CardQuizReportBooleanChecking,
    CardQuizReportEssay,
    CardQuizReportEssayChecking,
    CardQuizReportMatch,
    CardQuizReportMatchChecking,
    CardQuizReportMultiple,
    CardQuizReportMultipleChecking,
    CardQuizReportShortAnswer,
    CardQuizReportShortAnswerChecking,
  },
  watch: {
    tab(val) {
      if (val == "tab3") this.onRank(this.$route.params?.slug);
      if (val == "tab4") this.onPeserta(this.$route.params?.slug);
    },
  },
  computed: {
    ...mapState(useLmsTugasStore, ["get_peserta_payload", "get_init_peserta"]),
    ...mapState(useLmsTugasQuizStatsStore, ["get_rank_payload", "get_rank_top", "get_init_rank"]),
  },
  methods: {
    ...mapActions(useLmsTugasStore, ["onPeserta"]),
    ...mapActions(useLmsTugasQuizStatsStore, ["onRank", "onReplace"]),
    onRefreshPeserta() {
      this.onPeserta(this.$route.params?.slug, true);
    },
    onOpen() {
      this.$refs.ReportConfirmDialog?.onOpen()
    },
    onBubbleEvent() {
      this.onReplace(this.$route?.params?.siswa_id)
    },
    onRefreshShow() {
      this.onShow(this.$route.params?.slug)
    }
  },
  created() {
    const val = this.$route?.params?.quiz;
    if (val == "arrange")
      this.component = {
        statistik: "CardQuizReportArrange",
        checking: "CardQuizReportArrangeChecking",
      };
    if (val == "boolean")
      this.component = {
        statistik: "CardQuizReportBoolean",
        checking: "CardQuizReportBooleanChecking",
      };
    if (val == "essay")
      this.component = {
        statistik: "CardQuizReportEssay",
        checking: "CardQuizReportEssayChecking",
      };
    if (val == "match")
      this.component = {
        statistik: "CardQuizReportMatch",
        checking: "CardQuizReportMatchChecking",
      };
    if (val == "multiple")
      this.component = {
        statistik: "CardQuizReportMultiple",
        checking: "CardQuizReportMultipleChecking",
      };
    if (val == "shortanswer")
      this.component = {
        statistik: "CardQuizReportShortAnswer",
        checking: "CardQuizReportShortAnswerChecking",
      };
  },
  data() {
    return {
      component: {
        statistik: "",
        checking: "",
      },
      tab: "tab1",
      tab1_sub: "tab1_sub1",
      tab2_sub: "tab2_sub1",
    };
  },
};
</script>
