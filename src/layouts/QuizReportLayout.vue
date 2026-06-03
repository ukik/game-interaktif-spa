<template>
  <q-layout view="hHh lpR fFf" :style="{ background: getGradientC() }">
    <!-- <q-header elevated height-hint="98">
      <q-toolbar>
        <q-btn @click="$router.back" flat round dense icon="arrow_back" class="q-mr-sm" />
        <q-toolbar-title class="q-px-xs">📑 Laporan</q-toolbar-title>
        <q-btn flat round dense icon="search" class="q-mr-xs" />
        <q-btn flat round dense icon="group_add" />
      </q-toolbar>
    </q-header> -->

    <q-header elevated height-hint="98">
      <!-- <div class="bg-orange text-white sticky-toolbar"> -->
      <q-toolbar class="bg-primary text-white">

        <q-btn v-if="$route.meta?.page_type == 'show'" @click="$router.back" flat round dense icon="arrow_back" class="q-mr-sm" />

        <q-toolbar-title class="q-px-xs">{{ $route.meta?.title }}</q-toolbar-title>
        <!-- <q-toolbar-title class="q-px-xs">📑 Dashboard</q-toolbar-title> -->
        <!-- <q-btn flat round icon="search" /> -->
        <q-btn flat round icon="assignment" @click="leftDrawerOpen = true" />
        <!-- <q-btn flat round icon="group_add" @click="leftDrawerOpen = true" /> -->
        <MenuProfile @onBubbleEvent="onLogoutConfirmDialog"></MenuProfile>
        <!-- <q-btn flat round icon="logout" @click="onLogoutConfirmDialog" /> -->
      </q-toolbar>
      <!-- <q-separator></q-separator> -->
      <!-- <q-toolbar class="bg-white text-dark"> Hasil Matching Progress </q-toolbar> -->
      <!-- </div> -->
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="row justify-center">
      <!-- <router-view
        class="col-12 col-xl-6 col-lg-6 col-md-9 col-sm-12 bg-white rounded-borders"
        :class="[is_mobile_size ? '' : 'q-card--borderedX']"
      /> -->
      <router-view ref="pageContainer" class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-12 rounded-bordersX"
        :class="[is_mobile_size ? '' : ' q-card--borderedX', is_ipad_lower_size ? 'bg-transparent' : 'bg-white']" />

      <!-- <q-space class="col-12 q-mb-sm"></q-space> -->
    </q-page-container>

    <LogoutConfirmDialog ref="LogoutConfirmDialog"></LogoutConfirmDialog>
    <!-- <ReportConfirmDialog ref="ReportConfirmDialog"></ReportConfirmDialog> -->


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

import { useUiStore } from 'src/stores/ui'

export default {
  components: {
    LeftDrawerItem, MenuProfile
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
    '$route.name'(val) {
      console.log('watch')
      this.$nextTick(() => {
        // this.updateWidth() // agar selalu update
      })
    }
  },
  beforeRouteLeave(to, from) {
    return;
    const answer = window.confirm('Do you really want to leave?')
    if (!answer) return false // Cancels the back navigation
  },
  methods: {
    ...mapActions(useAuthStore, ['onLogout']),
    onLogoutConfirmDialog() {
      this.$refs.LogoutConfirmDialog.onOpen(true)
    },
    updateWidth() {
      const ui = useUiStore();

      const el = document.querySelector(".q-page-container > main");

      if (!el) return;

      this.observer?.disconnect();

      this.observer = new ResizeObserver(() => {
        console.log('ResizeObserver');
        ui.setPageWidth(el.offsetWidth);
      });

      this.observer.observe(el);
    }
  },

  mounted() {
    setTimeout(() => {
      this.updateWidth()
    }, 2000)
    // window.addEventListener("resize", this.updateWidth); // 🔥 trigger ulang saat resize
  },

  beforeUnmount() {
    this.observer?.disconnect()
  },

  beforeDestroy() {
    // window.removeEventListener("resize", this.updateWidth);
  },

};
</script>
