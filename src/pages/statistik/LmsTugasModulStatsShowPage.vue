<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm">
    <q-card flat bordered>
      <q-tabs v-model="tab" :key="tab" dense class="text-grey"
        active-color="primary" indicator-color="primary" align="justify">
        <q-tab :key="1" name="tab1" label="Hasil" />
        <q-tab :key="2" name="tab2" label="Tugas" />
        <q-tab :key="3" name="tab3" label="Aktivitas" />
        <q-tab :key="4" name="tab4" label="Peserta" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tab1" class="q-pa-none">
          <ShowTabHasilCard v-if="get_show_payload?.data.length > 0" @onRefresh="onRefreshShow"
            :get_show_payload="get_show_payload" :get_show_top="get_show_top"></ShowTabHasilCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab2" class="q-pa-none">
          <template v-if="get_show_tugas.length > 0" v-for="(item,index) in get_show_tugas">
            <ShowTabTugasCard  :get_show_payload="item"
              :get_show_kelas="get_show_kelas"></ShowTabTugasCard>
          </template>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab3" class="q-pa-none">
          <template v-if="get_show_tugas.length > 0" v-for="(item,index) in get_show_tugas">
            <ShowTabAktivitasCard :get_show_payload="item?.tugasable"
              :mapel="item?.mapel" :get_show_kelas="get_show_kelas"></ShowTabAktivitasCard>
          </template>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab4" class="q-pa-none">
          <template v-if="get_peserta_payload?.id && !get_init_peserta">
            <ShowTabPesertaCard @onRefresh="onRefreshPeserta" :get_peserta_payload="get_peserta_payload?.tugas_siswa"></ShowTabPesertaCard>
          </template>
          <InitLoading v-else-if="get_init_peserta"></InitLoading>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div style="height: 50px"></div>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <q-card-actions align="center" class="bg-primary q-pa-none" :style="`width: ${getPageWidth()}px`">
        <q-item class="col-12 text-white" clickable v-ripple>
          <q-item-section avatar>
            <q-icon text-color="white" name="bar_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Leaderboard</q-item-label>
            <q-item-label class="text-white" caption>{{ get_show_payload?.tugas_hasil_count }} siswa</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon text-color="white" name="navigate_next" />
          </q-item-section>
        </q-item>
      </q-card-actions>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsTugasModulStatsStore } from "src/stores/lms/LmsTugasModulStatsStore";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";
import ShowTabTugasCard from "./components/ShowTabTugasCard.vue";
import ShowTabAktivitasCard from "./components/ShowTabAktivitasCard.vue";
import ShowTabHasilCard from "./components/ShowTabHasilCard.vue";
import ShowTabPesertaCard from "./components/ShowTabPesertaCard.vue";

export default {
  components: {
    ShowTabTugasCard, ShowTabAktivitasCard, ShowTabHasilCard, ShowTabPesertaCard
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasModulStatsStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "tab1",
    };
  },
  watch: {
    tab(val) {
      if(val == 'tab4') this.onPeserta(this.$route.params?.slug)
    },
    get_show_payload: {
      immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        // const m = [...val, ...val, ...val, ...val, ...val, ...val, ...val, ...val];
        // this.list_demo = m;
        // console.log('get_index_data', m)
      },
    },
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapState(useLmsTugasModulStatsStore, ["get_show_payload", "get_init_show", "get_show_kelas", 'get_show_top', 'get_show_tugas', 'get_show_top']),
    ...mapState(useLmsTugasStore, ["get_peserta_payload","get_init_peserta"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsTugasModulStatsStore, ["onShow", "onChangePage"]),
    ...mapActions(useLmsTugasStore, ["onPeserta"]),

    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    onRefreshPeserta() {
      this.onPeserta(this.$route.params?.slug, true)
    },
    onRefreshShow() {
      this.onShow(this.$route.params?.slug)
    }
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
