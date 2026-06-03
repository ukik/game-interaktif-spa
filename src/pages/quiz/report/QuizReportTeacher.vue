<template>
  <q-page class="justify-start items-start q-pa-sm">

    <q-card flat bordered>
      <q-tabs v-model="tab" :key="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
        <q-tab name="tab1" label="FINAL" />
        <q-tab v-if="$route?.params.mode != 'all'" name="tab2" label="TUGAS" />
      </q-tabs>

      <q-separator />

      <keep-alive>
        <q-tab-panels keep-alive v-model="tab" animated>
          <q-tab-panel name="tab1" class="q-pa-none">

            <!-- TAB 1 -->

            <q-tabs key="tab1_sub" v-model="tab1_sub" dense inline-label indicator-color="transparent"
              active-color="white" class="bg-teal text-grey-4 shadow-2">
              <q-tab name="tab1_sub1" label="STATISTIK" icon="analytics" />
              <q-tab name="tab1_sub2" label="RIWAYAT" icon="archive" />
            </q-tabs>

            <TimeupInfo v-if="$route?.params.mode != 'all'" :tugas="get_report_tugas"></TimeupInfo>

            <q-tab-panels keep-alive v-model="tab1_sub" animated>
              <q-tab-panel name="tab1_sub1" class="q-pa-none q-px-sm">
                <template v-if="get_json">

                  <component ref="unsubmit" v-if="tab == 'tab1'" v-bind:is="component.statistik"
                    :record_quiz="get_json">
                  </component>

                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
              <q-tab-panel name="tab1_sub2" class="q-pa-none">

                <template v-if="get_checking">
                  <component v-bind:is="component.checking" :checking="get_checking"></component>
                </template>
                <EmptyBlock v-else></EmptyBlock>

              </q-tab-panel>
            </q-tab-panels>

          </q-tab-panel>


          <q-tab-panel v-if="$route?.params.mode != 'all'" name="tab2" class="q-pa-none">

            <q-tabs key="tab2_sub" v-model="tab2_sub" dense inline-label indicator-color="transparent"
              active-color="white" class="bg-teal text-grey-4 shadow-2">
              <q-tab name="tab2_sub1" label="PESERTA" icon="person" />
              <q-tab name="tab2_sub2" label="DESKRIPSI" icon="description" />
            </q-tabs>

            <q-tab-panels keep-alive v-model="tab2_sub" animated>
              <q-tab-panel name="tab2_sub1" class="q-pa-none q-px-sm">

                <template v-if="get_peserta_payload?.id && !get_init_peserta">
                  <ShowTabPesertaCard @onRefresh="onRefreshPeserta"
                    :get_peserta_payload="get_peserta_payload?.tugas_siswa">
                  </ShowTabPesertaCard>
                </template>
                <InitLoading v-else-if="get_init_peserta"></InitLoading>
                <EmptyBlock v-else></EmptyBlock>

              </q-tab-panel>
              <q-tab-panel name="tab2_sub2" class="q-pa-none">
                <template v-if="get_report_tugas">
                  <ShowTabTugasCard :payload="get_report_tugas"></ShowTabTugasCard>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
            </q-tab-panels>



          </q-tab-panel>
        </q-tab-panels>
      </keep-alive>
    </q-card>
  </q-page>

</template>

<script>
import { useLmsTugasQuizStatsStore } from "src/stores/lms/LmsTugasQuizStatsStore.js";
// import { myMixin } from "./mixinReport.js";
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
import ShowTabTugasCard from "./components/ShowTabTugasCard.vue";



export default {
  // mixins: [myMixin],
  async preFetch({ store, currentRoute }) {
    // const slug = currentRoute.params?.slug || ""; // tugas_id
    const mode = currentRoute.params?.mode || ""; // mode
    console.log('QuizReportTeacher')
    if(mode == 'teacher') await useLmsTugasQuizStatsStore(store).onReport();
  },
  components: {
    TimeupInfo,
    ShowTabTugasCard,
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
      if (val == 'tab1') {
        this.$refs.submit?.onStop()
      }
      if (val == "tab2") {
        this.$refs.submit?.onStop();
        this.$refs.unsubmit?.onStop();
        this.onPeserta(this.$route.params?.slug);
      }
    },
  },
  computed: {
    ...mapState(useLmsTugasStore, ["get_peserta_payload", "get_init_peserta"]),
    ...mapState(useLmsTugasQuizStatsStore, [
      "get_report_tugas",
    ]),
    // get_r
    get_checking() {
      const obj = this.json?.checking
      if(!obj) return false
      console.log('obj', obj)
      let html = [];
      for (const key in obj) {
        if (!Object.hasOwn(obj, key)) continue;
        html.push(obj[key]);
      }
      return html.length > 0 ? html : null
    },
    get_json() {
      return this.json
    },
  },
  methods: {
    ...mapActions(useLmsTugasStore, ["onPeserta"]),
    onRefreshPeserta() {
      this.onPeserta(this.$route.params?.slug, true);
    },
  },
  mounted() {
    const params = this.$route?.params
    const data = JSON.parse(localStorage.getItem("record_quiz_"+params?.quiz+'2'));
    console.log('mounted', data)
    if (!data) {
      alert("Data quiz tidak ditemukan!");
      throw new Error("record_quiz kosong");
    }
    this.json = data
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
      json: null,
      initTimeout: null,
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
