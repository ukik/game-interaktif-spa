<template>
  <q-layout view="hHh lpR fFf" class="bg-green-1">
    <q-header elevated height-hint="98" v-if="!getRouteQuery?.no_header">
      <q-toolbar class="bg-primary text-white">
        <q-btn
          v-if="$route.meta?.page_type == 'show'"
          @click="$router.back"
          flat
          round
          dense
          icon="arrow_back"
          class="q-mr-sm"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="mobile"
      bordered
    >
      <!-- drawer content -->
      <LeftDrawerItem />
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="row justify-center">
      <q-page-sticky
        style="z-index: 999"
        v-if="getRouteParams?.mode !== 'student'"
        position="top-left"
        :offset="[0, 0]"
      >
        <GlobalLabel
          shape="skew"
          position="top-left"
          backgroundColor="#6980fe"
          textColor="#ffffff"
          >DEMO</GlobalLabel
        >
      </q-page-sticky>
      <q-page-sticky style="z-index: 999;" position="top-right" :offset="[0, 0]">
        <GlobalLabel shape="skew" position="top-right" backgroundColor="#ff1744" textColor="#ffffff">
          TUTUP
        </GlobalLabel>
      </q-page-sticky>


      <!-- <router-view ref="pageContainer" class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-12 rounded-bordersX"
        :class="[is_mobile_size ? '' : ' q-card--borderedX', is_ipad_lower_size ? 'bg-transparent' : 'bg-white']" /> -->

      <div
        id="main"
        class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-12 rounded-bordersX"
        :class="[
          is_mobile_size ? '' : 'q-card--borderedX',
          is_ipad_lower_size ? 'bg-transparent' : 'bg-whiteX',
        ]"
      >
        <router-view v-slot="{ Component }">
          <component :is="Component" ref="pageContainer" />
        </router-view>
      </div>

      <!-- <q-space class="col-12 q-mb-sm"></q-space> -->
    </q-page-container>

    <LogoutConfirmDialog ref="LogoutConfirmDialog"></LogoutConfirmDialog>
    <!-- <ReportConfirmDialog ref="ReportConfirmDialog"></ReportConfirmDialog> -->

    <!-- <DialogResult></DialogResult> -->

    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref } from "vue";

import LeftDrawerItem from "./components/LeftDrawerItem.vue";
import { mapActions } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";

import MenuProfile from "./components/MenuProfile.vue";

import { useUiStore } from "src/stores/ui";

export default {
  components: {
    LeftDrawerItem,
    MenuProfile,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  watch: {
    "$route.name"(val) {
      console.log("watch");
      this.$nextTick(() => {
        // this.updateWidth() // agar selalu update
      });
    },
  },
  beforeRouteLeave(to, from) {
    return;
    const answer = window.confirm("Do you really want to leave?");
    if (!answer) return false; // Cancels the back navigation
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    onLogoutConfirmDialog() {
      this.$refs.LogoutConfirmDialog.onOpen(true);
    },
    updateWidth() {
      const ui = useUiStore();

      const el = document.querySelector(".q-page-container > #main");

      if (!el) return;

      this.observer?.disconnect();

      this.observer = new ResizeObserver(() => {
        console.log("ResizeObserver");
        ui.setPageWidth(el.offsetWidth);
      });

      this.observer.observe(el);
    },
  },

  mounted() {
    setTimeout(() => {
      this.updateWidth();
    }, 1000);
    // window.addEventListener("resize", this.updateWidth); // 🔥 trigger ulang saat resize
  },

  beforeUnmount() {
    this.observer?.disconnect();
  },

  beforeDestroy() {
    // window.removeEventListener("resize", this.updateWidth);
  },
};
</script>
