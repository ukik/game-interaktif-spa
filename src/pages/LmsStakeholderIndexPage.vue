<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">
    <q-list separator bordered>
      <template v-if="get_index_data.length > 0">
        <q-item v-for="(item, index) in get_index_data" :key="index" clickable v-ripple
          :to="{ name: 'lms-stakeholder-show', params: { slug: item?.id } }">
          <q-item-section avatar>
            <q-avatar size="55px">
              <q-img :src="item?.url_image" @error="item.url_image = global_url_image" error-src="global_url_image" />
              <!-- <q-badge class="badge-left" floating color="primary">{{ item?.id }}</q-badge> -->
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item?.name }}</q-item-label>
            <q-item-label caption lines="1">{{ item?.email }}</q-item-label>
            <!-- <q-item-label caption lines="1">{{ item?.telpon }} / {{ item?.whatsapp }}</q-item-label> -->
          </q-item-section>

          <q-item-section side top>
            <!-- <q-item-label caption lines="1">{{ item?.created_at_human }}</q-item-label> -->
          </q-item-section>

        </q-item>
      </template>

      <EmptyBlock v-else></EmptyBlock>
    </q-list>
    <div style="height: 47px"></div>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <Pagination :current_page="get_index_current_page" :last_page="get_index_last_page" :disable="get_index_loading"
        @onBubbleEvent="onBubbleEvent"></Pagination>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsSekolahStore } from "src/stores/lms/LmsSekolahStore";

export default {
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsSekolahStore(store);

    const page = currentRoute.query.page || 1;

    await preStore.onIndex(page);
  },
  data() {
    return {
      list_demo: [],
    };
  },
  watch: {
    get_index_data: {
      immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        // const m = [...val, ...val, ...val, ...val, ...val, ...val, ...val, ...val];
        // this.list_demo = m;
        // console.log('get_index_data', m)
      },
    },
    get_index_current_page: {
      immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        // const m = [...val, ...val, ...val, ...val, ...val, ...val, ...val, ...val];
        // this.list_demo = m;
        console.log("get_index_current_page", val);
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
      'get_init_index'
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsSekolahStore, ["onIndex", "onChangePage"]),
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
