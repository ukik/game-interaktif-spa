<template>
  <q-layout view="hHh LpR fFf" class="bg-green-1">
    <!-- <q-layout view="hHh lpR fFf" :style="{ background: getGradientC() }"> -->
    <q-header elevated height-hint="98">
      <!-- <div class="bg-orange text-white sticky-toolbar"> -->
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

        <q-toolbar-title class="q-px-xs">{{ $route.meta?.title }}</q-toolbar-title>
        <!-- <q-toolbar-title class="q-px-xs">📑 Dashboard</q-toolbar-title> -->
        <!-- <q-btn flat round icon="search" /> -->
        <BuatTugas />
        <q-btn flat round icon="space_dashboard" @click="onLeftDrawerOpen('general')">
          <q-tooltip>General</q-tooltip>
        </q-btn>
        <q-btn flat round icon="assignment_turned_in" @click="onLeftDrawerOpen('quiz')">
          <q-tooltip>Quiz</q-tooltip>
        </q-btn>
        <MenuProfile @onBubbleEvent="onLogoutConfirmDialog"></MenuProfile>
        <q-btn flat round icon="logout" @click="onLogoutConfirmDialog" />
      </q-toolbar>
      <!-- <q-separator></q-separator> -->
      <!-- <q-toolbar class="bg-white text-dark"> Hasil Matching Progress </q-toolbar> -->
      <!-- </div> -->
    </q-header>

    <!-- behavior="mobile"  -->
    <q-drawer @hide="onHide" @before-show="onBeforeShow" show-if-above v-model="leftDrawerOpen" :width="is_ipad_lower_size ? 350 : 270" side="left"
      :behavior="is_equal_to_lower_laptop ? 'mobile' : 'default'"
      bordered>
      <!-- drawer content -->
      <!-- <LeftDrawerItem /> -->
      <q-slide-transition>
        <LeftDrawerItemQuiz v-if="left_drawer_type == 'quiz'" />
      </q-slide-transition>
      <q-slide-transition>
        <LeftDrawerItemGeneral v-if="left_drawer_type == 'general'" />
      </q-slide-transition>
      <!-- <transition
  enter-active-class="q-transition--slide-right-enter-active"
  leave-active-class="q-transition--slide-left-leave-active"
  mode="out-in"
>
  <component
    :is="left_drawer_type === 'quiz'
      ? 'LeftDrawerItemQuiz'
      : 'LeftDrawerItemGeneral'"
    :key="left_drawer_type"
  />
</transition> -->
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
      <!-- <router-view ref="pageContainer" class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-12 rounded-bordersX"
        :class="[is_mobile_size ? '' : ' q-card--borderedX', is_ipad_lower_size ? 'bg-transparent' : 'bg-white']" /> -->

      <ToolbarPage></ToolbarPage>

      <div
        id="main"
        class="col-12 col-xl-5 col-lg-7 col-md-9 col-sm-12 rounded-bordersX"
        :class="[
          is_mobile_size ? '' : 'q-card--borderedX',
          is_ipad_lower_size ? 'bg-transparent' : 'bg-white',
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
import BuatTugas from "./components/BuatTugas.vue";
import LeftDrawerItemGeneral from "./components/LeftDrawerItemGeneral.vue";

import { useUiStore } from "src/stores/ui";
import ToolbarPage from "./components/ToolbarPage.vue";

import { scroll } from "quasar";
import LeftDrawerItemQuiz from "./components/LeftDrawerItemQuiz.vue";

const { getVerticalScrollPosition } = scroll;

export default {
  components: {
    LeftDrawerItem,
    MenuProfile,
    BuatTugas,
    ToolbarPage,
    LeftDrawerItemGeneral,
    LeftDrawerItemQuiz,
  },
  data() {
    return {
      left_drawer_type: "general",
    };
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
  // watch: {
  //   "$route.name"(val) {
  //     console.log("watch");
  //     this.$nextTick(() => {
  //       // this.updateWidth() // agar selalu update
  //     });
  //   },
  // },
  beforeRouteLeave(to, from) {
    return;
    const answer = window.confirm("Do you really want to leave?");
    if (!answer) return false; // Cancels the back navigation
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useUiStore, ["setPageWidth", "setPageScrollY"]),
    onLogoutConfirmDialog() {
      this.$refs.LogoutConfirmDialog.onOpen(true);
    },
    onLeftDrawerOpen(label) {
      console.log(label, this.left_drawer_type);
      if (label == this.left_drawer_type) {
        this.leftDrawerOpen = false;
        return
      }
      if (label !== this.left_drawer_type) {
        this.left_drawer_type = label;
        this.leftDrawerOpen = true;
      }
    },
    onHide() {
      this.left_drawer_type = "";
    },
    onBeforeShow() {
      if(!this.left_drawer_type) this.left_drawer_type = "general";
    },
    updateWidth() {
      const vm = this;

      const el = document.querySelector(".q-page-container > #main");
      console.log("el", el);
      if (!el) return;

      vm.observer?.disconnect();

      vm.observer = new ResizeObserver(() => {
        console.log("ResizeObserver", el.offsetWidth);
        vm.setPageWidth(el.offsetWidth);
      });

      vm.observer.observe(el);
    },
  },

  mounted() {
    if(!this.is_ipad_lower_size) {
      this.left_drawer_type = "general";
      this.leftDrawerOpen = true
    }

    setTimeout(() => {
      this.updateWidth();
    }, 1000);

    return;
    const vm = this;

    vm.scrollHandler = () => {
      const pos = getVerticalScrollPosition(window);
      console.log(pos);
      vm.setPageScrollY(pos);
    };

    window.addEventListener("scroll", vm.scrollHandler);

    // window.addEventListener("resize", this.updateWidth); // 🔥 trigger ulang saat resize
  },

  beforeUnmount() {
    this.observer?.disconnect();
    // window.removeEventListener("scroll", this.scrollHandler);
  },

  beforeDestroy() {
    // window.removeEventListener("resize", this.updateWidth);
  },
};
</script>
