<template>
  <q-list class="q-px-sm">
    <template v-for="i in 5">
      <q-item
        class="q-pr-none"
        :class="[i <= 0 ? 'q-pt-none' : '']"
        :clickable="false"
        v-ripple="false"
      >
        <q-item-section thumbnail side>
          <img
            @click="$router.push('/product')"
            class="full-height"
            src="https://cdn.quasar.dev/img/mountains.jpg"
          />
        </q-item-section>
        <q-item-section top>
          <q-item-label class="text-dark" lines="2"
            >Tebus Harga Hemat 1 Cup Manis</q-item-label
          >
          <q-item-label caption lines="2"
            >The QList and QItem are a group of components which can work together to
            present multiple line items vertically as a single continuous element.
          </q-item-label>

          <q-item-label class="q-pt-md">
            <q-card-actions class="q-pa-none" align="between">
              <q-item-label>Rp. 30000</q-item-label>

              <q-btn
                unelevated
                size="md"
                no-caps
                icon="add"
                dense
                color="positive"
                label="Tambah"
              />
            </q-card-actions>
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>
