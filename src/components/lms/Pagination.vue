<template>
<!-- <div class="q-pa-sm bg-red"> -->
  <!-- <q-card-actions v-if="getPageWidth() > 0" align="center" class="bg-primary" :style="`width: ${getPageWidth()}px`"> -->
  <q-card flat square bordered class="q-pa-sm ">
    <q-card-actions align="center" class="bg-primary rounded-borders row">
      <!-- {{ getPageWidth() }} -->
      <q-pagination style="width: auto;"
        :model-value="current_page"
        @update:model-value="onEmit"
        :max="last_page"
        :disable="disable"
        flat
        color="white"
        active-text-color="primary"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
      />
    </q-card-actions>
  </q-card>
  <!-- </div> -->
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    current_page: {
      default: 0,
    },
    last_page: {
      default: 10,
    },
    disable: {
      default: false,
    },
  },
  emits: ["update:current_page", "onBubbleEvent"],
  methods: {
    onEmit(val) {
      console.log(val);
      this.$emit("onBubbleEvent", val);
      // (val) => $emit('update:current_page', val)
    },
  },
};
</script>
