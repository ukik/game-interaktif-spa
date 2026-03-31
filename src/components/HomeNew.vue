<template>
  <div class="row q-col-gutter-md q-px-sm">
    <div v-for="i in 6" class="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-xs-6">
      <q-btn to="/product" class="full-width q-pa-none " no-caps flat>
        <q-card flat bordered>
          <img style="height: 170px" src="https://cdn.quasar.dev/img/parallax2.jpg" />

          <q-card-section class="text-body2">
            PAKET JUPITER
            <!-- <q-item-label class="text-body2">Have a drink.</q-item-label> -->
          </q-card-section>
        </q-card>
      </q-btn>
    </div>
  </div>
</template>
