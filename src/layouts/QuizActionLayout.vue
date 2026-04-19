<template>
  <q-layout view="hHh lpR fFf" :style="{ background: getGradientC() }">
    <q-header elevated height-hint="98">
      <!-- <div class="bg-orange text-white sticky-toolbar"> -->
      <q-toolbar class="bg-primary text-white">
        <!-- <q-btn @click="$router.back" flat round dense icon="arrow_back" class="q-mr-sm" /> -->
        <q-toolbar-title class="q-px-xs">📑 Dashboard</q-toolbar-title>
        <q-btn flat round  icon="search" />
        <q-btn flat round  icon="assignment" @click="leftDrawerOpen = true" />
        <q-btn flat round  icon="group_add" @click="leftDrawerOpen = true" />
        <q-btn flat round  icon="logout" @click="onLogoutConfirmDialog"/>
      </q-toolbar>
      <!-- <q-separator></q-separator> -->
      <!-- <q-toolbar class="bg-white text-dark"> Hasil Matching Progress </q-toolbar> -->
      <!-- </div> -->
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <!-- drawer content -->
      <LeftDrawerItem />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="row justify-center">
      <router-view class="col-12 col-xl-6 col-lg-6 col-md-9 col-sm-12 bg-white rounded-borders"
        :class="[is_mobile_size ? '' : 'q-card--borderedX']" />
      <!-- <q-space class="col-12 q-mb-sm"></q-space> -->
    </q-page-container>

    <LogoutConfirmDialog ref="LogoutConfirmDialog"></LogoutConfirmDialog>

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

export default {
  components: {
    LeftDrawerItem
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
  beforeRouteLeave(to, from) {
    return;
    const answer = window.confirm('Do you really want to leave?')
    if (!answer) return false // Cancels the back navigation
  },
  methods: {
    ...mapActions(useAuthStore, ['onLogout']),
    onLogoutConfirmDialog() {
      this.$refs.LogoutConfirmDialog.onOpen(true)
    }
  }
};
</script>
