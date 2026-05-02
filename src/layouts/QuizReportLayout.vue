<template>
  <q-layout view="hHh lpR fFf" :style="{ background: getGradientC() }">
    <q-header elevated height-hint="98">
      <!-- <div class="bg-orange text-white sticky-toolbar"> -->
      <q-toolbar>
        <q-btn @click="$router.back" flat round dense icon="arrow_back" class="q-mr-sm" />
        <q-toolbar-title class="q-px-xs">📑 Laporan</q-toolbar-title>
        <q-btn flat round dense icon="search" class="q-mr-xs" />
        <q-btn flat round dense icon="group_add" />
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

import { mapActions } from "pinia";

import { useUiStore } from 'src/stores/ui'

export default {
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
    const answer = window.confirm('Do you really want to leave?')
    if (!answer) return false // Cancels the back navigation
  },
  methods: {
    updateWidth() {
      const ui = useUiStore();

      this.observer = new ResizeObserver((entries) => {
        console.log('ResizeObserver')
        // for (let entry of entries) {
        // ui.setPageWidth(entry.contentRect.width) // kalo pake ini masih dikenakan padding
        // }
        ui.setPageWidth(document.querySelector(".q-page-container > main").offsetWidth);
      });

      this.observer.observe(this.$refs?.pageContainer.$el);
    },
  },

  mounted() {
    this.updateWidth()
    window.addEventListener("resize", this.updateWidth); // 🔥 trigger ulang saat resize
  },

  beforeUnmount() {
    this.observer?.disconnect()
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.updateWidth);
  },
};
</script>
