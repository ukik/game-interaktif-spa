<template>
  <q-list padding class="q-px-sm q-gutter-y-sm">
    <q-card flat bordered v-for="i in 50">
      <q-item to="/list" clickable v-ripple="{ color: 'blue' }">
        <q-item-section avatar>
          <!-- <q-avatar color="primary" text-color="white" icon="store" /> -->
          <q-icon size="30px" color="red" name="fa-solid fa-store"></q-icon>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-bold">Toko Sukun Malang</q-item-label>
          <q-item-label caption lines="2"
            >Jl. S. Supriadi. Sukun Kec. Suku. Kota Malang</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <!-- <q-item-label caption>5 min ago</q-item-label> -->
          <q-icon name="chevron_right" color="dark" />
        </q-item-section>
      </q-item>
    </q-card>
  </q-list>
</template>
