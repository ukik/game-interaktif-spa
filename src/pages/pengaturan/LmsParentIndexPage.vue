<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm bg-white">
    <q-form @submit="onSubmit" class="q-mb-md">
      <q-input
        @clear="onSubmit"
        outlined
        bottom-slots
        v-model="my_keyword"
        placeholder="keyword..."
        counter
        maxlength="50"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>

        <template v-slot:hint> Keyword </template>

        <template v-slot:after>
          <q-btn
            unelevated
            class="full-height"
            @click="onSubmit"
            color="primary"
            icon="search"
          ></q-btn>
        </template>
      </q-input>
    </q-form>

    <q-list separator bordered class="bg-white">
      <template v-if="get_index_data.length > 0">
        <q-item
          v-for="(item, index) in get_index_data"
          :key="index"
          clickable
          v-ripple
          :to="{ name: 'lms_ortu_show', params: { slug: item?.id } }"
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
            <q-item-label>{{ item?.name }}</q-item-label>
            <q-item-label caption lines="1"
              ><q-badge color="cyan">ID: {{ item?.id }}</q-badge> {{ item?.email }}
            </q-item-label>
            <!-- <q-item-label caption lines="1">{{ item?.ortu?.nis }} / {{ item?.ortu?.nisn }}</q-item-label> -->
          </q-item-section>

          <q-item-section side>
            <!-- <q-item-label caption lines="1">{{ item?.created_at_human }}</q-item-label> -->
            <q-item-label>
              <q-avatar>
                <q-icon name="group" color="grey" />
                <q-badge floating color="teal">{{ item?.parent?.siswa_count }}</q-badge>
              </q-avatar>
            </q-item-label>
          </q-item-section>
          <!-- <q-badge class="square top badge-left" floating color="cyan">{{
            item?.id
          }}</q-badge> -->
        </q-item>
      </template>

      <EmptyBlock v-else></EmptyBlock>
    </q-list>
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
import { useLmsParentStore } from "src/stores/lms/LmsParentStore";

export default {
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsParentStore(store);

    const page = currentRoute.query.page || 1;

    await preStore.onIndex(page);
  },
  data() {
    return {
      list_demo: [],
      my_keyword: "",
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
    ...mapState(useLmsParentStore, [
      "get_index_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      "get_init_index",
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsParentStore, ["onIndex", "onChangePage", "setKeyword"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    onSubmit() {
      this.setKeyword(this.my_keyword);
      this.$router.replace({
        ...this.$router?.name,
        query: {
          ...this.$route?.query,
          keyword: this.my_keyword,
        },
      });
    },
  },
  async mounted() {
    this.my_keyword = this.$route?.query?.keyword;
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
