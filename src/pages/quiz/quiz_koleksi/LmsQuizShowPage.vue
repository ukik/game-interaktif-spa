<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm bg-white">
    <q-card flat bordered>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="tab1" label="QUIZ" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tab1" class="q-pa-none">
          <template v-if="get_show_payload?.id">
            <ShowTab1Card
              :get_show_payload="get_show_payload"
              :get_show_kelas="get_show_kelas"
            ></ShowTab1Card>
          </template>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div style="height: 50px"></div>
    <q-page-sticky v-if="getPageWidth" position="bottom" :offset="[0, 0]">
      <q-card-actions
        align="center"
        class="q-pa-none"
        :style="`width: ${getPageWidth()}px`"
      >
        <q-item
          v-if="(is_teacher || enabled)"
          @click="onOpenDialog"
          class="col-6 text-white bg-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon text-color="white" name="post_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Buat Tugas</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          class="col text-white bg-pink"
          clickable
          v-ripple
          :to="{
            name: 'quiz_intro_public',
            params: {
              mode: 'all',
              quiz: get_show_payload?.kategori,
              slug: get_show_payload?.id,
            },
          }"
        >
          <q-item-section avatar>
            <q-icon text-color="white" name="play_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Coba</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>
    </q-page-sticky>

    <FormCreateTugas ref="FormCreateTugas" model="LmsQuiz"></FormCreateTugas>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore";
import ShowTab1Card from "./components/ShowTab1Card.vue";
import FormCreateTugas from "./components/FormCreateTugas.vue";

export default {
  components: {
    ShowTab1Card,
    FormCreateTugas,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsBankQuizStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    preStore.setKategori(currentRoute.params.quiz)

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "tab1",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapState(useLmsBankQuizStore, [
      "get_show_payload",
      "get_init_show",
      "get_show_kelas",
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsBankQuizStore, ["onShow", "onChangePage"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    onOpenDialog() {
      this.$refs.FormCreateTugas?.onOpen(this.get_show_payload);
    },
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
