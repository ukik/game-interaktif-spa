<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">
    <q-card flat bordered>
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
        <q-tab name="modul" label="MODUL" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="modul" class="q-pa-none">
          <template v-if="get_show_payload?.id">
            <ShowTab1Card :get_show_payload="get_show_payload" :get_show_kelas="get_show_kelas"></ShowTab1Card>
          </template>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div style="height: 50px"></div>


    <q-page-sticky position="bottom" :offset="[0, 0]">
      <q-card-actions align="center" class="q-pa-none" :style="`width: ${getPageWidth}px`">
        <q-item @click="onOpenDialog" class="col-6 text-white bg-primary" clickable v-ripple>
          <q-item-section avatar>
            <q-icon text-color="white" name="post_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Buat Tugas</q-item-label>
            <!-- <q-item-label class="text-white" caption>{{ get_show_payload?.tugas_hasil_count }} siswa</q-item-label> -->
          </q-item-section>
          <!-- <q-item-section avatar>
            <q-icon text-color="white" name="navigate_next" />
          </q-item-section> -->
        </q-item>
        <q-item class="col-6 text-white bg-positive" clickable v-ripple>
          <q-item-section avatar>
            <q-icon text-color="white" name="bar_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Leaderboard</q-item-label>
            <!-- <q-item-label class="text-white" caption>{{ get_show_payload?.tugas_hasil_count }} siswa</q-item-label> -->
          </q-item-section>
          <!-- <q-item-section avatar>
            <q-icon text-color="white" name="navigate_next" />
          </q-item-section> -->
        </q-item>
      </q-card-actions>
    </q-page-sticky>

    <FormCreateTugas ref="FormCreateTugas"></FormCreateTugas>

  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsBankModulStore } from "src/stores/lms/LmsBankModulStore";
import ShowTab1Card from "./components/ShowTab1Card.vue";
import FormCreateTugas from "../koleksi/components/FormCreateTugas.vue";

export default {
  components: {
    ShowTab1Card, FormCreateTugas
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsBankModulStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "modul",
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
    ...mapState(useLmsBankModulStore, ["get_show_payload", "get_init_show", "get_show_kelas"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsBankModulStore, ["onShow", "onChangePage"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    onOpenDialog() {
      this.$refs.FormCreateTugas?.onOpen()
    }
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
