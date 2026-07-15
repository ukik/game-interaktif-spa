<template>
  <div class="">
    <q-tabs
      v-model="left_drawer_type"
      indicator-color="teal"
      active-color="teal"
      class="bg-white text-teal-3"
      inline-label
    >
      <q-tab name="general" label="GENERAL" icon="space_dashboard" />
      <q-tab name="quiz" label="QUIZ" icon="assignment_turned_in" />
    </q-tabs>
    <q-separator></q-separator>
  </div>
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import { useQuizActionLayoutStore } from "src/stores/QuizActionLayoutStore.js";

export default {
  computed: {
    ...mapWritableState(useQuizActionLayoutStore, ['left_drawer_type'])
  }
  // props: ["prop_tab"],
  // data() {
  //   return {
  //     tab: "general",
  //   };
  // },
  // watch: {
  //   tab(val) {
  //     this.$emit("onBubbleEvent", val);
  //   },
  // },
  // mounted() {
  //   this.tab = this.prop_tab;
  // },
  // methods: {
  //   onChangeTab(val) {
  //     this.tab = val;
  //   },
  // },
};
</script>
