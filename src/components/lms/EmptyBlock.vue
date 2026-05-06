<template>
  <!-- <div class="flex flex-center full-height full-width">
    <NoDataSVG />
  </div> -->

  <div class="flex flex-center q-py-xl">
    <DotLottieVue ref="lottieRef" style="height: auto; width: 100%; " autoplay loop
      src="/lottie/used_1_404.json" />
    <slot></slot>
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
</script>
