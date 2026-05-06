<template>
  <div class="flex flex-center row">
    <DotLottieVue ref="lottieRef" style="height: auto; width: 650px; " autoplay loop
      src="/lottie/used_1_404.json" />
    <q-card-actions class="col-12 q-pa-none" align="center">
      <slot></slot>
    </q-card-actions>
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
</script>
