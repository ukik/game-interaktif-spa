<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <!-- <div style="font-size: 30vh">
        404
      </div> -->
      <Lottie_2_404></Lottie_2_404>

      <div class="text-h4 q-mb-lg" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn round to="/" color="pink" size="xl" icon="home" />
      <!-- <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      /> -->
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ErrorNotFound'
});
</script>
