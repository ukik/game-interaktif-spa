<template>
  <q-page class="q-pa-md">

    <q-toolbar class="bg-primary text-white q-mb-md">
      <q-toolbar-title>50 Gradient Gallery</q-toolbar-title>
    </q-toolbar>

    <div class="row q-col-gutter-md">

      <div
        v-for="(g, i) in gradients"
        :key="i"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="gradient-card">

          <div
            class="gradient-box"
            :style="{ background: g }"
          />

          <q-card-section class="text-caption">
            {{ g }}
          </q-card-section>

        </q-card>
      </div>

    </div>

  </q-page>
</template>

<script setup>

const gradients = [

"linear-gradient(135deg,#60a5fa,#a78bfa)",
"linear-gradient(135deg,#f87171,#fb7185)",
"linear-gradient(135deg,#fb923c,#fbbf24)",
"linear-gradient(135deg,#fbbf24,#a3e635)",
"linear-gradient(135deg,#4ade80,#34d399)",

"linear-gradient(135deg,#34d399,#22d3ee)",
"linear-gradient(135deg,#22d3ee,#38bdf8)",
"linear-gradient(135deg,#38bdf8,#60a5fa)",
"linear-gradient(135deg,#60a5fa,#818cf8)",
"linear-gradient(135deg,#818cf8,#a78bfa)",

"linear-gradient(135deg,#a78bfa,#c084fc)",
"linear-gradient(135deg,#c084fc,#e879f9)",
"linear-gradient(135deg,#e879f9,#fb7185)",
"linear-gradient(135deg,#fb7185,#f87171)",
"linear-gradient(135deg,#f87171,#fb923c)",

"linear-gradient(135deg,#fb923c,#facc15)",
"linear-gradient(135deg,#facc15,#a3e635)",
"linear-gradient(135deg,#a3e635,#4ade80)",
"linear-gradient(135deg,#4ade80,#2dd4bf)",
"linear-gradient(135deg,#2dd4bf,#22d3ee)",

"linear-gradient(135deg,#22d3ee,#38bdf8)",
"linear-gradient(135deg,#38bdf8,#60a5fa)",
"linear-gradient(135deg,#60a5fa,#818cf8)",
"linear-gradient(135deg,#818cf8,#a78bfa)",
"linear-gradient(135deg,#a78bfa,#c084fc)",

"linear-gradient(135deg,#fb7185,#f472b6)",
"linear-gradient(135deg,#f472b6,#e879f9)",
"linear-gradient(135deg,#e879f9,#c084fc)",
"linear-gradient(135deg,#c084fc,#a78bfa)",
"linear-gradient(135deg,#a78bfa,#818cf8)",

"linear-gradient(135deg,#818cf8,#60a5fa)",
"linear-gradient(135deg,#60a5fa,#38bdf8)",
"linear-gradient(135deg,#38bdf8,#22d3ee)",
"linear-gradient(135deg,#22d3ee,#2dd4bf)",
"linear-gradient(135deg,#2dd4bf,#34d399)",

"linear-gradient(135deg,#34d399,#4ade80)",
"linear-gradient(135deg,#4ade80,#a3e635)",
"linear-gradient(135deg,#a3e635,#facc15)",
"linear-gradient(135deg,#facc15,#fb923c)",
"linear-gradient(135deg,#fb923c,#f87171)",

"linear-gradient(135deg,#f87171,#fb7185)",
"linear-gradient(135deg,#fb7185,#f472b6)",
"linear-gradient(135deg,#f472b6,#e879f9)",
"linear-gradient(135deg,#e879f9,#c084fc)",
"linear-gradient(135deg,#c084fc,#a78bfa)",

"linear-gradient(135deg,#a78bfa,#818cf8)",
"linear-gradient(135deg,#818cf8,#60a5fa)",
"linear-gradient(135deg,#60a5fa,#38bdf8)",
"linear-gradient(135deg,#38bdf8,#22d3ee)",
"linear-gradient(135deg,#22d3ee,#2dd4bf)"

];

</script>

<style scoped>

.gradient-card{
  overflow: hidden;
}

.gradient-box{
  height:120px;
  border-radius:6px 6px 0 0;
}

</style>
