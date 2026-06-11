<template>
  <!-- {{ get_index_unread }} -->
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md bg-white">
    <q-form @submit="onSubmit" class="q-mb-md">
      <!-- {{ tab }} -- {{ keyword }} -->
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
        <!-- <template v-slot:before>
            <q-icon name="flight_takeoff" />
          </template> -->

        <template v-slot:prepend>
          <!-- <q-icon v-if="keyword !== ''" name="close" @click="keyword = ''" class="cursor-pointer" /> -->
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

    <q-list separator bordered>
      <!-- <template v-if="get_index_data.length > 0"> -->
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab
          name="index"
          replace
          :to="{
            query: {
              ...$route.query,
              status: '',
            },
          }"
          label="Semua"
        />
        <q-route-tab
          name="index_unread"
          replace
          :to="{
            query: {
              ...$route.query,
              status: 'unread',
            },
          }"
          label="Belum Dibaca"
        />
        <q-route-tab
          name="index_read"
          replace
          :to="{
            query: {
              ...$route.query,
              status: 'read',
            },
          }"
          label="Dibaca"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="index" class="q-pa-none">
          <template v-if="get_index_data?.length > 0">
            <SlideItem
              v-for="(item, index) in get_index_data"
              :item="item"
              :index="index"
              :onRead="() => onRead(item?.id)"
              :onDelete="() => onDelete(item?.id)"
            ></SlideItem>

            <q-separator></q-separator>
            <q-card-actions class="" align="evenly">
              <q-btn
                unelevated
                @click="onOpenDialogDeleteAll"
                label="Bersihkan Semua"
                icon="delete"
                color="red"
                dense
              />
              <q-btn
                unelevated
                @click="onOpenDialogCheckAll"
                label="Centang Semua"
                icon="done_all"
                color="positive"
                dense
              />
            </q-card-actions>
          </template>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="index_unread" class="q-pa-none">
          <template v-if="get_index_unread_data?.length > 0">
            <SlideItem
              v-for="(item, index) in get_index_unread_data"
              :item="item"
              :index="index"
              :onRead="() => onRead(item?.id)"
              :onDelete="() => onDelete(item?.id)"
            ></SlideItem>
          </template>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="index_read" class="q-pa-none">
          <template v-if="get_index_read_data?.length > 0">
            <SlideItem
              v-for="(item, index) in get_index_read_data"
              :item="item"
              :index="index"
              :onRead="() => onRead(item?.id)"
              :onDelete="() => onDelete(item?.id)"
            ></SlideItem>
          </template>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>

      <!-- </template> -->

      <!-- <EmptyBlock v-else></EmptyBlock> -->
    </q-list>
    <div style="height: 47px"></div>

    <q-page-sticky v-if="get_index_data?.length > 0" position="bottom" :offset="[0, 0]">
      <Pagination
        :current_page="get_index_current_page"
        :last_page="get_index_last_page"
        :disable="get_index_loading"
        @onBubbleEvent="onBubbleEvent"
      ></Pagination>
    </q-page-sticky>

    <ConfirmCekAllDialog
      ref="ConfirmCekAllDialog"
      :onAction="onReadAll"
    ></ConfirmCekAllDialog>
    <ConfirmDeleteAllDialog
      ref="ConfirmDeleteAllDialog"
      :onAction="onDeleteAll"
    ></ConfirmDeleteAllDialog>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState, mapWritableState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsNotificationQuizHasilStore } from "src/stores/lms/LmsNotificationQuizHasilStore";
import SlideItem from "./components/SlideItem.vue";
import { useRouterStore } from "src/stores/auth/RouterStore";
import ConfirmCekAllDialog from "./components/ConfirmCekAllDialog.vue";
import ConfirmDeleteAllDialog from "./components/ConfirmDeleteAllDialog.vue";

export default {
  components: {
    SlideItem,
    ConfirmCekAllDialog,
    ConfirmDeleteAllDialog,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsNotificationQuizHasilStore(store);

    const page = (currentRoute.query.page && Number(currentRoute.query.page)) || 1;

    preStore.keyword = currentRoute.query?.keyword ?? "";

    switch (currentRoute.query?.status) {
      case "unread":
        preStore.tab = "index_unread";
        break;
      case "read":
        preStore.tab = "index_read";
        break;
      default:
        preStore.tab = "index";
        break;
    }

    await preStore.onIndex(Number(page));
  },
  data() {
    return {
      list_demo: [],
      my_keyword: "",
      // tab: 'tab1'
    };
  },
  watch: {
    $route: {
      // immediate: true, // 🔥 ini kunci
      deep: true,
      async handler(val) {
        console.log("CHANGE ROUTE", val?.query?.status);

        // sync tab
        switch (val?.query?.status) {
          case "unread":
            this.tab = "index_unread";
            break;

          case "read":
            this.tab = "index_read";
            break;

          default:
            this.tab = "index";
            break;
        }

        // sync store
        // this.keyword = val?.query?.keyword ?? ''

        // load
        await this.onIndex();
      },
    },
  },
  computed: {
    ...mapState(useRouterStore, ["getRouter"]),
    ...mapWritableState(useLmsNotificationQuizHasilStore, ["tab", "keyword"]),
    ...mapState(useLmsNotificationQuizHasilStore, [
      // "index",
      // "index_read",
      // "index_unread",
      "get_index_data",
      "get_index_read_data",
      "get_index_unread",
      "get_index_unread_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      "get_init_index",
    ]),
  },
  methods: {
    ...mapActions(useRouterStore, ["setRouter"]),
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsNotificationQuizHasilStore, [
      "onIndex",
      "onChangePage",
      "onRead",
      "onDelete",
      "onReadAll",
      "onDeleteAll",
      "setCurrentPage",
      "setKeyword",
    ]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.setCurrentPage(val);
      this.$router.replace({
        ...this.$route?.name,
        query: {
          ...this.$route?.query,
          page: val,
        },
      });
    },
    onOpenDialogCheckAll() {
      this.$refs.ConfirmCekAllDialog.onOpen(true);
    },
    onOpenDialogDeleteAll() {
      this.$refs.ConfirmDeleteAllDialog.onOpen(true);
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

    // WAJIB ada query status
    if (this.$route?.query?.status == undefined)
      this.$router.replace({
        ...this.$route?.name,
        query: {
          ...this.$route?.query,
          status: "",
        },
      });
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
