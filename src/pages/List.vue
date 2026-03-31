<template>
  <q-page class="q-pb-md">
    <q-header class="bg-white" unelevated>
      <q-toolbar class="bg-white">
        <q-btn
          color="primary"
          @click="$router.back"
          flat
          round
          dense
          icon="arrow_back"
          class="q-mr-sm"
        />

        <!-- <q-toolbar-title>Produk </q-toolbar-title> -->
        <q-item @click="$refs.ListDialogStore?.onOpen" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary">
              <q-icon name="store"></q-icon>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" class="text-dark text-bold"
              >Toko Sawojajar
            </q-item-label>
            <q-item-label lines="1" caption
              >{{ gap }} - {{ Page_ListMenuCategory }}</q-item-label
            >
          </q-item-section>
          <q-item-section side top style="padding-left: 8px">
            <q-icon
              style="margin-top: -5px"
              color="black"
              name="arrow_drop_down"
            ></q-icon>
          </q-item-section>
        </q-item>
        <q-space></q-space>

        <q-btn color="primary" flat round dense icon="whatshot" />
      </q-toolbar>
      <q-separator></q-separator>
      <!-- <ListMenuCategory
        @onBubbleEvent="gotScroll"
        id="Page_ListMenuCategory"
        :tab="getCurrent"
      ></ListMenuCategory> -->

      <!-- <q-separator></q-separator> -->
    </q-header>

    <q-page-sticky position="top" :offset="[0, sticky_gap]">
      <ListMenuCategory
        class="bg-white"
        :style="`width:${getScreenWidth}px;`"
        @onBubbleEvent="gotScroll"
        id="Page_ListMenuCategory"
        :tab="getCurrent"
      ></ListMenuCategory>
      <q-separator></q-separator>
    </q-page-sticky>

    <div :style="`height: ${gap}px`"></div>

    <div id="section1" v-intersection="onScroll1" class="q-px-sm text-h6 q-mt-md">
      1 App Exclusive
    </div>
    <ListExclusive></ListExclusive>

    <div id="section2" v-intersection="onScroll2" class="q-px-sm text-h6 q-mt-md">
      2 Today Special
    </div>
    <ListSpecial></ListSpecial>

    <div id="section3" v-intersection="onScroll3" class="q-px-sm text-h6 q-mt-md">
      3 Nice Deals
    </div>
    <ListDeal></ListDeal>

    <div id="section4" v-intersection="onScroll4" class="q-px-sm text-h6 q-mt-md">
      4 Paket Acara
    </div>
    <ListPackage></ListPackage>

    <div id="section5" v-intersection="onScroll5" class="q-px-sm text-h6 q-mt-md">
      Paha Depan
    </div>
    <ListColumn></ListColumn>

    <div id="section6" v-intersection="onScroll6" class="q-px-sm text-h6 q-mt-md">
      Minuman
    </div>
    <ListDrink></ListDrink>

    <ListDialogStore ref="ListDialogStore"></ListDialogStore>
  </q-page>
</template>

<script setup>
// import { useRoute } from 'vue-router'
// import useRouteMetaSafe from 'src/composables/useRouteMetaSafe'
// const route = useRoute()
// useRouteMetaSafe({ title: route.title, meta: route.meta })
</script>

<script>
import ListSpecial from "src/components/ListSpecial.vue";
import { ref } from "vue";

import { scroll } from "quasar";
import ListDialogStore from "src/components/ListDialogStore.vue";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

// takes an element object
function scrollToElement(el, gap) {
  const target = getScrollTarget(el);
  const offset = el.offsetTop - 110 - gap; // 155 adalah toolbar menu
  const duration = 500;
  console.log("offset", offset);
  setVerticalScrollPosition(target, offset, duration);
}

export default {
  data() {
    return {
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      text1: null,
      text2: null,
      text3: null,
      text4: null,
      text5: null,
      text6: null,
      Page_ListMenuCategory: 0,
      gap: 100,
      sticky_gap: 0,
      gap_scroll: 0,
    };
  },
  computed: {
    getScreenWidth() {
      return this.$q.screen?.width;
    },
    getCurrent() {
      if (this.text1) {
        return 1;
      }

      if (!this.text1 && this.text2) {
        return 2;
      }

      if (!this.text1 && !this.text2 && this.text3) {
        return 3;
      }

      if (!this.text1 && !this.text2 && !this.text3 && this.text4) {
        return 4;
      }

      if (!this.text1 && !this.text2 && !this.text3 && !this.text4 && this.text5) {
        return 5;
      }

      if (
        !this.text1 &&
        !this.text2 &&
        !this.text3 &&
        !this.text4 &&
        !this.text5 &&
        this.text6
      ) {
        return 6;
      }

      if (!this.text6) {
        return 6;
      }
    },
  },
  watch: {},
  methods: {
    gotScroll(val) {
      var element = document.getElementById(`section${val}`);
      if (element) scrollToElement(element, this.gap_scroll);
    },
    onScroll1(info) {
      this.text1 = info.isIntersecting;
    },
    onScroll2(info) {
      this.text2 = info.isIntersecting;
    },
    onScroll3(info) {
      this.text3 = info.isIntersecting;
    },
    onScroll4(info) {
      this.text4 = info.isIntersecting;
    },
    onScroll5(info) {
      this.text5 = info.isIntersecting;
    },
    onScroll6(info) {
      this.text6 = info.isIntersecting;
    },
  },
  async mounted() {
    setTimeout(() => {
      var element = document.getElementById("Page_ListMenuCategory");
      var position = element?.getBoundingClientRect();
      var x = position?.left;
      var y = position?.top;
      this.Page_ListMenuCategory = y;
      if (y <= 0) {
        this.gap = 155;
        this.sticky_gap = 55;
        this.gap_scroll = 56;
      }
    }, 500);
  },
};
</script>

<style>
#DialogListStore .q-dialog__inner {
  height: 75%;
}

#Page_ListMenuCategory .q-page-sticky,
.q-page-sticky {
  z-index: 99 !important;
  width: 100%;
}
</style>
