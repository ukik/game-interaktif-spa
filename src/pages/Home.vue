<template>
  <q-page class="q-pb-md">
    <HomeCarousel></HomeCarousel>

    <!-- <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Explore by Category</div>
    </q-card-actions> -->
    <HomeIcon class="q-mt-md"></HomeIcon>

    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Explore by Category</div>
    </q-card-actions>
    <HomeCategory></HomeCategory>

    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">App Exclusive</div>
      <RouterLink to="/list">Lihat Semua</RouterLink>
    </q-card-actions>
    <HomeExclusive></HomeExclusive>

    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Today's Special</div>
      <RouterLink to="/list">Lihat Semua</RouterLink>
    </q-card-actions>
    <HomeExclusive></HomeExclusive>

    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Paket Hemat</div>
      <RouterLink to="/list">Lihat Semua</RouterLink>
    </q-card-actions>
    <HomeExclusive></HomeExclusive>

    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Paket Traveling</div>
      <RouterLink to="/list">Lihat Semua</RouterLink>
    </q-card-actions>
    <HomeExclusive></HomeExclusive>

    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Paket Solo</div>
      <RouterLink to="/list">Lihat Semua</RouterLink>
    </q-card-actions>
    <HomeExclusive></HomeExclusive>

    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Paket Acara</div>
      <RouterLink to="/list">Lihat Semua</RouterLink>
    </q-card-actions>
    <HomeExclusive></HomeExclusive>


    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Explore by Flavor</div>
    </q-card-actions>
    <HomeFlavor></HomeFlavor>


    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">What's New</div>
      <RouterLink to="/list">Lihat Semua</RouterLink>
    </q-card-actions>
    <HomeNew></HomeNew>

    <q-card-actions class="q-mt-md" align="between">
      <div class="text-h6">Best Selling</div>
      <RouterLink to="/list">Lihat Semua</RouterLink>
    </q-card-actions>
    <HomeBestSelling></HomeBestSelling>
  </q-page>
</template>

<script setup>
import HomeCarousel from "src/components/HomeCarousel.vue";
import HomeCategory from "src/components/HomeCategory.vue";
import HomeIcon from "src/components/HomeIcon.vue";
import HomeNew from "src/components/HomeNew.vue";

// import { useRoute } from 'vue-router'
// import useRouteMetaSafe from 'src/composables/useRouteMetaSafe'
// const route = useRoute()
// useRouteMetaSafe({ title: route.title, meta: route.meta })

</script>
