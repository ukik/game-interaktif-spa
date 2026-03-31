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
"linear-gradient(135deg,#3b82f6,#8b5cf6)",
"linear-gradient(135deg,#2563eb,#7c3aed)",
"linear-gradient(135deg,#1d4ed8,#6d28d9)",
"linear-gradient(135deg,#1e40af,#5b21b6)",

"linear-gradient(135deg,#93c5fd,#c4b5fd)",
"linear-gradient(135deg,#bfdbfe,#ddd6fe)",
"linear-gradient(135deg,#dbeafe,#ede9fe)",
"linear-gradient(135deg,#eff6ff,#f5f3ff)",
"linear-gradient(135deg,#e0e7ff,#ede9fe)",

"linear-gradient(135deg,#38bdf8,#a78bfa)",
"linear-gradient(135deg,#0ea5e9,#8b5cf6)",
"linear-gradient(135deg,#0284c7,#7c3aed)",
"linear-gradient(135deg,#0369a1,#6d28d9)",
"linear-gradient(135deg,#075985,#5b21b6)",

"linear-gradient(135deg,#7dd3fc,#c4b5fd)",
"linear-gradient(135deg,#bae6fd,#ddd6fe)",
"linear-gradient(135deg,#e0f2fe,#ede9fe)",
"linear-gradient(135deg,#f0f9ff,#f5f3ff)",
"linear-gradient(135deg,#f8fafc,#faf5ff)",

"linear-gradient(135deg,#60a5fa,#c084fc)",
"linear-gradient(135deg,#3b82f6,#a855f7)",
"linear-gradient(135deg,#2563eb,#9333ea)",
"linear-gradient(135deg,#1d4ed8,#7e22ce)",
"linear-gradient(135deg,#1e40af,#6b21a8)",

"linear-gradient(135deg,#93c5fd,#d8b4fe)",
"linear-gradient(135deg,#bfdbfe,#e9d5ff)",
"linear-gradient(135deg,#dbeafe,#f3e8ff)",
"linear-gradient(135deg,#eff6ff,#faf5ff)",
"linear-gradient(135deg,#eef2ff,#f5f3ff)",

"linear-gradient(135deg,#22d3ee,#a78bfa)",
"linear-gradient(135deg,#06b6d4,#8b5cf6)",
"linear-gradient(135deg,#0891b2,#7c3aed)",
"linear-gradient(135deg,#0e7490,#6d28d9)",
"linear-gradient(135deg,#155e75,#5b21b6)",

"linear-gradient(135deg,#67e8f9,#c4b5fd)",
"linear-gradient(135deg,#a5f3fc,#ddd6fe)",
"linear-gradient(135deg,#cffafe,#ede9fe)",
"linear-gradient(135deg,#ecfeff,#f5f3ff)",
"linear-gradient(135deg,#f0fdff,#faf5ff)",

"linear-gradient(135deg,#818cf8,#c084fc)",
"linear-gradient(135deg,#6366f1,#a855f7)",
"linear-gradient(135deg,#4f46e5,#9333ea)",
"linear-gradient(135deg,#4338ca,#7e22ce)",
"linear-gradient(135deg,#3730a3,#6b21a8)",

"linear-gradient(135deg,#a5b4fc,#d8b4fe)",
"linear-gradient(135deg,#c7d2fe,#e9d5ff)",
"linear-gradient(135deg,#e0e7ff,#f3e8ff)",
"linear-gradient(135deg,#eef2ff,#faf5ff)",
"linear-gradient(135deg,#f1f5f9,#f8fafc)"
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
