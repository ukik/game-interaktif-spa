<template>
  <q-page id="pageList" class="q-pb-md">
    <q-header class="bg-white" unelevated>
      <q-toolbar class="bg-primary text-white">
        <q-btn @click="$router.back" flat round dense icon="arrow_back" class="q-mr-sm" />

        <q-toolbar-title>Produk </q-toolbar-title>

        <!-- <q-btn flat round dense icon="whatshot" /> -->
      </q-toolbar>
      <ListMenuCategory
        @onBubbleEvent="gotScroll"
        id="ListMenuCategory"
        :tab="getCurrent"
      ></ListMenuCategory>

      <q-separator></q-separator>
    </q-header>

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
  </q-page>
</template>

<script>
import ListSpecial from "src/components/ListSpecial.vue";
import { ref } from "vue";

import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

// takes an element object
function scrollToElement(el) {
  const target = getScrollTarget(el);
  const offset = el.offsetTop;
  const duration = 500;
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
      tab: "1",
      setTab: "1",
      ListMenuCategory: 0,
    };
  },
  computed: {
    getCurrent2() {
      switch (this.setTab) {
        case "1":
          this.tab = 1;
          break;
        case "2":
          this.tab = 2;
          break;
        case "3":
          this.tab = 3;
          break;
        case "4":
          this.tab = 4;
          break;
        case "5":
          this.tab = 5;
          break;
      }
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

      if (!this.text5) {
        return 5;
      }
    },
  },
  watch: {},
  methods: {
    gotScroll(val) {
      var element = document.getElementById(`section${val}`);
      if (element) scrollToElement(element);
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
  },
  async mounted() {
    await setTimeout(() => {
      var element = document.getElementById("ListMenuCategory");
      var position = element?.getBoundingClientRect();
      var x = position?.left;
      var y = position?.top;
      this.ListMenuCategory = y;
    }, 1000);
  },
};
</script>

<style>
#pageList .q-page-sticky,
.q-page-sticky {
  z-index: 99 !important;
}
</style>
