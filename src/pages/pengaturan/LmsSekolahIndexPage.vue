<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm bg-white">
    <q-list separator bordered class="q-pa-sm bg-white">
      <template v-if="get_index_data.length > 0">
        <!-- <SekolahDetailCard :item="get_index_data[0]"></SekolahDetailCard> -->
        <!-- <q-item
          v-for="(item, index) in get_index_data"
          :key="index"
          clickable
          v-ripple
          :to="{ name: 'lms_sekolah_show', params: { slug: item?.id } }"
        >
          <q-item-section avatar>
            <q-avatar>
              <q-img
                :src="item?.url_image"
                @error="item.url_image = global_url_image"
                :error-src="global_url_image"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item?.nama }}</q-item-label>
            <q-item-label caption lines="1">{{ item?.email }}</q-item-label>
          </q-item-section>
          <q-item-section side top> </q-item-section>
        </q-item> -->

        <div class="row q-col-gutter-sm">
          <template v-for="(item, index) in get_index_data" :key="index">
            <div class="col-12 col-sm-6">
              <q-card flat bordered>
                <q-img
                  :src="item?.url_image"
                  @error="item.url_image = global_url_image"
                  :error-src="global_url_image"
                />
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Nama</q-item-label>
                      <q-item-label caption>{{ item?.nama }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label>Email</q-item-label>
                      <q-item-label caption>{{ item?.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label>Telpon</q-item-label>
                      <q-item-label caption>{{ item?.telpon }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-separator></q-separator>
                <q-card-actions align="between">
                  <q-btn
                    :to="{ name: 'lms_sekolah_show', params: { slug: item?.id } }"
                    unelevated
                    color="cyan"
                    icon="assignment"
                    label="Detail"
                  ></q-btn>
                  <q-btn
                    @click="onOpenDialog(item)"
                    unelevated
                    color="pink"
                    icon="edit"
                    label="Edit"
                  ></q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </template>
        </div>
      </template>
      <EmptyBlock v-else></EmptyBlock>
    </q-list>

    <FormDialog ref="FormDialog"></FormDialog>

    <div style="height: 47px"></div>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <Pagination
        :current_page="get_index_current_page"
        :last_page="get_index_last_page"
        :disable="get_index_loading"
        @onBubbleEvent="onBubbleEvent"
      ></Pagination>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsSekolahStore } from "src/stores/lms/LmsSekolahStore";
// import SekolahDetailCard from "./components/SekolahDetailCard.vue";
import FormDialog from "./forms/sekolah/FormDialog.vue";

export default {
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsSekolahStore(store);

    const page = currentRoute.query.page || 1;

    await preStore.onIndex(page);
  },
  components: {
    // SekolahDetailCard,
    FormDialog,
  },
  data() {
    return {
      list_demo: [],
    };
  },
  watch: {
    "$route.query": {
      // immediate: true, // 🔥 ini kunci
      deep: true,
      async handler(val) {
        await this.onIndex();
      },
    },
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapState(useLmsSekolahStore, [
      "get_index_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      "get_init_index",
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsSekolahStore, ["onIndex", "onChangePage", "setKeyword"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    onOpenDialog(payload) {
      this.$refs.FormDialog?.onOpen(payload?.id);
    },
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
