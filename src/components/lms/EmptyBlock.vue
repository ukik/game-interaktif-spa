<template>
  <!-- <div class="flex flex-center full-height full-width">
    <NoDataSVG />
  </div> -->

  <!-- <div class="flex flex-center" style="padding-top:100px;">
    <DotLottieVue ref="lottieRef" style="width: 50%; " autoplay loop
      src="/lottie/used_1_404.json" />
    <slot></slot>
  </div> -->

  <div class="container">
    <DotLottieVue
      class="lottie"
      ref="lottieRef"
      autoplay
      loop
      src="/lottie/used_1_404.json"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
</script>

<style>
.container {
  width: 100%;
  height: calc(100vh - 50px - 50px - 50px - 0px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container .lottie {
  width: 300px;
  height: 300px;
  object-fit: contain;
}
</style>
