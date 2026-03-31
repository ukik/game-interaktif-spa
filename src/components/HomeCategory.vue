<template>
  <div class="row q-col-gutter-md q-px-sm">
    <div
      v-for="(item, index) in ['EXTREME', 'NAGIH', 'GILA-GILA', 'SO ASU']"
      class="col-xl-2 col-lg-2 col-md-2 col-sm-4 col-xs-6"
    >
      <q-btn to="/list" class="full-width q-pa-none" no-caps flat>
        <q-card flat bordered class="full-width">
          <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" align="center" style="height: 200px">
            <div class="absolute-bottom text-subtitle2 text-center q-pa-sm text-uppercase text-body2">
              {{ item }}
            </div>
          </q-img>
        </q-card>
      </q-btn>
    </div>
  </div>
</template>
