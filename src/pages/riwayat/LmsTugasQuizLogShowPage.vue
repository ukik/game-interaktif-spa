<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm">
    <q-card flat bordered>
      <q-tabs
        :key="tab"
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab :key="1" name="tab1" label="Nilai" />
        <q-tab :key="2" name="tab2" :label="getJenis(get_show_payload?.tugasable_type)" />
        <q-tab :key="3" name="tab3" label="Tugas" />
      </q-tabs>

      <q-separator />
      <q-card-actions align="center" class="q-py-sm">
        <q-btn
          unelevated
          :to="route_play"
          class=""
          icon="signal_cellular_alt"
          color="teal"
          label="Detail Nilai"
        ></q-btn>
      </q-card-actions>

      <q-separator></q-separator>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tab1" class="q-pa-none">
          <ShowTabNilaiCard
            v-if="get_show_payload?.id"
            :item="get_show_payload"
          ></ShowTabNilaiCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab2" class="q-pa-none">
          <ShowTabAktivitasCard
            v-if="get_show_payload?.tugasable?.id"
            :get_show_payload="get_show_payload?.tugasable"
            :get_show_kelas="get_data_global_list_kelas"
          ></ShowTabAktivitasCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab3" class="q-pa-none">
          <ShowTabTugasCard
            v-if="get_show_payload?.id"
            :tugas_id="get_show_payload?.tugas_id"
          ></ShowTabTugasCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

  </q-page>
</template>

<script>

import { mapActions, mapState } from "pinia";
import { useLmsTugasQuizLogStore } from "src/stores/lms/LmsTugasQuizLogStore";
import ShowTabTugasCard from "./components/ShowTabTugasCard.vue";
import ShowTabAktivitasCard from "./components/ShowTabAktivitasCard.vue";
import ShowTabNilaiCard from "./components/ShowTabNilaiCard.vue";
import { useGlobalStore } from "src/stores/lms/GlobalStore.js";

export default {
  components: {
    ShowTabTugasCard,
    ShowTabAktivitasCard,
    ShowTabNilaiCard,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasQuizLogStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "tab1",
    };
  },
  computed: {
    ...mapState(useGlobalStore, ["get_data_global_list_kelas"]),
    ...mapState(useLmsTugasQuizLogStore, [
      "get_show_payload",
      "get_init_show",
      "get_show_kelas",
    ]),
    route_play() {
      return {
        name: "quiz_report",
        params: {
          quiz: this.get_show_payload?.tugasable?.kategori,
          slug: this.get_show_payload?.tugas_id,
          mode: "student",
          siswa_id: this.get_show_payload?.siswa?.id,
        },
      };
    },
  },
  methods: {
    ...mapActions(useLmsTugasQuizLogStore, ["onShow", "onChangePage", "onShowTugas"]),
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
