<template>
  <InitLoading v-if="get_init_report"></InitLoading>

  <q-page v-else class="justify-start items-start q-pa-sm">
    <q-card flat bordered>
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
        <q-tab name="tab1" label="TERBARU" />
        <q-tab name="tab2" label="TERKIRIM" />
      </q-tabs>

      <q-separator />

      <keep-alive>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tab1" class="q-pa-none">

            <q-tabs key="tab1_sub" v-model="tab1_sub" dense inline-label indicator-color="transparent"
              active-color="white" class="bg-teal text-grey-4 shadow-2">
              <q-tab name="tab1_sub1" label="STATISTIK" icon="analytics" />
              <q-tab name="tab1_sub2" label="RIWAYAT" icon="archive" />
            </q-tabs>

            <q-tab-panels  v-if="tab == 'tab1'"  v-model="tab1_sub" animated>
              <q-tab-panel name="tab1_sub1" class="q-pa-none">
                <template v-if="get_report_unsubmit">
                  <CardQuizReportBoolean :record_quiz="get_report_unsubmit">
                  </CardQuizReportBoolean>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
              <q-tab-panel name="tab1_sub2" class="q-pa-none">
                <template v-if="get_report_unsubmit_checking">
                  <CardQuizReportBooleanChecking :checking="get_report_unsubmit_checking">
                  </CardQuizReportBooleanChecking>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
            </q-tab-panels>

          </q-tab-panel>



          <q-tab-panel name="tab2" class="q-pa-none">

            <q-tabs key="tab2_sub" v-model="tab2_sub" dense inline-label indicator-color="transparent"
              active-color="white" class="bg-teal text-grey-4 shadow-2">
              <q-tab name="tab2_sub1" label="STATISTIK" icon="analytics" />
              <q-tab name="tab2_sub2" label="RIWAYAT" icon="archive" />
            </q-tabs>

            <q-tab-panels v-if="tab == 'tab2'" v-model="tab2_sub" animated>
              <q-tab-panel name="tab2_sub1" class="q-pa-none">
                <template v-if="get_report_unsubmit">
                  <CardQuizReportBoolean :record_quiz="get_report_unsubmit">
                  </CardQuizReportBoolean>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
              <q-tab-panel name="tab2_sub2" class="q-pa-none">
                <template v-if="get_report_unsubmit_checking">
                  <CardQuizReportBooleanChecking :checking="get_report_unsubmit_checking"></CardQuizReportBooleanChecking>
                </template>
                <EmptyBlock v-else></EmptyBlock>
              </q-tab-panel>
            </q-tab-panels>


            <template v-if="get_report_submit">
            </template>
            <EmptyBlock v-else></EmptyBlock>
          </q-tab-panel>
        </q-tab-panels>
      </keep-alive>
    </q-card>

  </q-page>
</template>

<script>
import { useLmsTugasQuizStatsStore } from 'src/stores/lms/LmsTugasQuizStatsStore.js';
import { myMixin } from './mixinReport.js'
import CardQuizReportBoolean from './components/CardQuizReportBoolean.vue';
import CardQuizReportBooleanChecking from './components/CardQuizReportBooleanChecking.vue';

export default {
  mixins: [myMixin],
  async preFetch({ store, currentRoute }) {
    const slug = currentRoute.params?.slug || ''; // tugas_id
    await useLmsTugasQuizStatsStore(store).onReport(slug)
  },
  components: {
    CardQuizReportBoolean, CardQuizReportBooleanChecking
  },
  data() {
    return {
      tab: "tab1",
      tab1_sub: 'tab1_sub1',
      tab2_sub: 'tab2_sub1',
    };
  },
};
</script>
