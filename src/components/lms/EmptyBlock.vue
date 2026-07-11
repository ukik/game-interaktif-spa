<template>
  <!-- <div class="flex flex-center full-height full-width">
    <NoDataSVG />
  </div> -->

  <div class="flex flex-center" style="padding-top:100px;">
    <DotLottieVue ref="lottieRef" style="width: 50%; " autoplay loop
      src="/lottie/used_1_404.json" />
    <slot></slot>
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
</script>
