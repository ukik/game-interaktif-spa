<template>
  <div class="">
      <q-tabs
        v-model="tab"
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
export default {
  props: ['prop_tab'],
  data() {
    return {
      tab: 'general'
    }
  },
  watch: {
    tab(val) {
      this.$emit('onBubbleEvent', val)
    },
  },
  mounted() {
    this.tab = this.prop_tab
  }
}
</script>
