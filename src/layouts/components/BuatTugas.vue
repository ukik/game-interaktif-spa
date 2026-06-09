<template>
  <q-btn flat round color="white" icon="add">
    <q-menu>
      <q-list bordered separator style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>Buat Tugas (Quiz)</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Buat Tugas (Modul)</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
