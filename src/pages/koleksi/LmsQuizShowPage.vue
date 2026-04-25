<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">
    <q-card flat bordered>
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
        <q-tab name="quiz" label="QUIZ" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="quiz" class="q-pa-none">
          <template v-if="get_show_payload?.id">
            <q-card-actions align="center" class="q-py-md">
              <q-parallax :height="250">
                <q-img :src="get_show_payload?.url_image" @error="get_show_payload.url_image = global_url_image"
                  error-src="global_url_image" />
              </q-parallax>
            </q-card-actions>
            <q-separator></q-separator>
            <q-card-section class="q-pa-sm">
              <q-list separator bordered class="text-dark">
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>ID</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.id
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <!-- <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>UUID</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark" lines="1">{{
                      get_show_payload?.uuid
                    }}</q-item-label>
                  </q-item-section>
                </q-item> -->
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Status</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">
                      <q-badge class="q-pa-sm" :color="get_show_payload?.status == 'draft' ? 'red' : 'green'"
                        :label="get_show_payload?.status" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Penerbit</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.user?.name
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Kelas</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">
                      {{ getNamaKelasList(get_show_kelas, get_show_payload?.kelas) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Mapel</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.mapel?.nama
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Kategori</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark text-capitalize">{{
                      get_show_payload?.kategori
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Jenjang</q-item-label>
                    <q-item-label class="text-dark" caption>{{
                      get_show_payload?.mapel?.jenjang
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-item-label lines="1" caption>Topik</q-item-label>
                    <q-item-label class="text-dark" text-capitalize caption>{{
                      get_show_payload?.topik
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-item-label lines="1" caption>Sub Topik</q-item-label>
                    <q-item-label class="text-dark text-capitalize" caption>{{
                      get_show_payload?.subtopik
                    }}</q-item-label>
                  </q-item-section>
                </q-item>


                <q-item>
                  <q-item-section avatar>
                    <q-item-label lines="1" caption>Judul</q-item-label>
                    <q-item-label class="text-dark" caption>{{
                      get_show_payload?.judul
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Dibuat</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.created_at_human
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Deskripsi</q-item-label>
                    <q-item-label class="text-dark" caption v-html="get_show_payload?.deskripsi"></q-item-label>
                  </q-item-section>
                </q-item>


              </q-list>
            </q-card-section>
          </template>
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
import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore";

export default {
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsBankQuizStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "quiz",
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
    ...mapState(useLmsBankQuizStore, ["get_show_payload", "get_init_show", "get_show_kelas"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsBankQuizStore, ["onShow", "onChangePage"]),
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
