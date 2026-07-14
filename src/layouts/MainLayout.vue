<template>
  <q-layout view="hHh lpR fFf" class="main-bg">
    <q-header elevated>
      <q-toolbar v-if="$route.name == 'home'">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> LABSNIP </q-toolbar-title>

        <div>Versi v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above behavior="mobile" bordered>
    </q-drawer>

    <q-page-container class="row justify-center">
      <!-- class="col-12 col-lg-7 col-md-9 col-sm-12" -->
      <router-view ref="pageContainer"
        :class="[is_mobile_size ? '' : 'q-card--bordered']"
      />
      <DialogAnnouncement></DialogAnnouncement>
    </q-page-container>

    <LogoutConfirmDialog ref="LogoutConfirmDialog"></LogoutConfirmDialog>
    <!-- <ReportConfirmDialog ref="ReportConfirmDialog"></ReportConfirmDialog> -->

    <!-- <DialogResult /> -->

  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import useRouteMetaSafe from 'src/composables/useRouteMetaSafe'
const route = useRoute()
useRouteMetaSafe({ title: route.title, meta: route.meta })
</script>

<script>
import { ref, defineAsyncComponent } from "vue";

import { mapActions } from "pinia";
import { useGlobalStore } from "src/stores/lms/GlobalStore";

const DialogAnnouncement = defineAsyncComponent(() =>
  import("src/components/lms/DialogAnnouncement.vue")
);

export default {
  components: {
    DialogAnnouncement
  },
  methods: {
    ...mapActions(useGlobalStore, ["onRequestDemo"]),
  },
  mounted() {
    this.onRequestDemo()
  },
};
</script>
