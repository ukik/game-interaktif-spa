<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm">
    <q-card flat bordered>
      <q-tabs :key="tab"  v-model="tab" dense class="text-grey"
        active-color="primary" indicator-color="primary" align="justify">
        <q-tab :key="1" name="tab1" label="Tugas" />
        <q-tab :key="2" name="tab2" :label="get_show_payload?.model" />
        <q-tab :key="3" name="tab3" label="Peserta" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tab1" class="q-pa-none">
          <ShowTabTugasCard v-if="get_show_payload?.id" :get_show_payload="get_show_payload"
            :get_show_kelas="get_show_kelas"></ShowTabTugasCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab2" class="q-pa-none">
          <ShowTabAktivitasCard v-if="get_show_payload?.tugasable?.id" :get_show_payload="get_show_payload?.tugasable"
            :mapel="get_show_payload?.mapel" :get_show_kelas="get_show_kelas"></ShowTabAktivitasCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab3" class="q-pa-none">
          <ShowTabPesertaCard v-if="get_show_payload?.tugas_siswa.length > 0"
            :get_show_payload="get_show_payload?.tugas_siswa"></ShowTabPesertaCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>


  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";
import ShowTabTugasCard from "./components/ShowTabTugasCard.vue";
import ShowTabAktivitasCard from "./components/ShowTabAktivitasCard.vue";
import ShowTabPesertaCard from "./components/ShowTabPesertaCard.vue";

export default {
  components: {
    ShowTabTugasCard, ShowTabAktivitasCard, ShowTabPesertaCard
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasStore(store);

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
    ...mapState(useLmsTugasStore, ["get_show_payload", "get_init_show", "get_show_kelas"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsTugasStore, ["onShow", "onChangePage"]),
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
