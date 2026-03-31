<template>
  <q-page class="bg-grey-2">

    <!-- Toolbar di dalam page -->
    <!-- <q-toolbar class="bg-primary text-white sticky-toolbar">
      <q-btn flat round dense icon="arrow_back" />
      <q-toolbar-title>
        Artikel Panjang
      </q-toolbar-title>
      <q-btn flat round dense icon="share" />
    </q-toolbar> -->

    <!-- Content -->
    <div class="q-pa-md article">

      <h1>Judul Artikel Panjang</h1>

      <p v-for="(p, i) in paragraphs" :key="i">
        {{ p }}
      </p>

    </div>

  </q-page>
</template>

<script setup>

const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non tortor nec
dolor pellentesque luctus. Vivamus viverra, purus sit amet hendrerit
tristique, sapien turpis cursus neque, vitae porta risus lacus quis nisi.
Mauris consequat elit sed arcu viverra, sit amet facilisis massa tristique.

Praesent faucibus risus sit amet turpis tempor, non interdum mi condimentum.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
cubilia curae; Cras vulputate magna at tortor suscipit, sed tincidunt
sapien ultricies.

Suspendisse potenti. Integer quis mauris nec lorem tincidunt tempor.
Donec feugiat lacus ac urna efficitur, quis convallis justo vestibulum.
Sed nec ligula ut arcu viverra dignissim.

Aliquam erat volutpat. Vestibulum sit amet justo sed massa bibendum
mollis. Cras sed diam vitae erat fermentum tristique. Pellentesque
habitant morbi tristique senectus et netus et malesuada fames ac turpis
egestas.

Morbi vel tincidunt lorem. Vestibulum ante ipsum primis in faucibus
orci luctus et ultrices posuere cubilia curae; Donec volutpat
scelerisque odio, nec vestibulum purus convallis sit amet.
`

// buat ±2000 kata dengan repeat
const paragraphs = Array(40).fill(text)

</script>

<style scoped>

.article{
  max-width: 800px;
  margin: auto;
  line-height: 1.8;
  font-size: 16px;
}

/* agar toolbar tetap di atas saat scroll */
.sticky-toolbar{
  position: sticky;
  top: 0;
  z-index: 10;
}

</style>
