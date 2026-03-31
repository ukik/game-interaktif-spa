<template>
  <div class="row q-col-gutter-md q-px-sm">
    <div v-for="i in 6" class="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-xs-6">
      <q-btn to="/product" class="full-width q-pa-none " no-caps flat>
        <q-card flat bordered>
          <img style="height: 170px" src="https://cdn.quasar.dev/img/parallax2.jpg" />

          <q-card-actions align="left">
            <q-item-label lines="2" class="text-body2 text-left"
              >Paha Berkualitas Lezat Boneless 2 Biji</q-item-label
            >
            <q-item-label
              lines="1"
              class="text-subtitle1 text-left text-primary text-bold full-width"
              >Rp. 5000</q-item-label
            >
          </q-card-actions>
          <q-separator></q-separator>
          <q-card-section class="q-pa-sm">
            <q-btn
              rounded
              color="positive"
              class="full-width"
              outline
              label="Tambah"
            ></q-btn>
          </q-card-section>
        </q-card>
      </q-btn>
    </div>
  </div>
</template>
