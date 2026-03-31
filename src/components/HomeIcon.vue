<template>
  <div class="row q-col-gutter-md q-px-sm">
    <div
      v-for="(item, index) in ['Keju', 'Coklat', 'Match', 'BBQ','Salt','Sea Weat']"
      class="col-xl-2 col-lg-2 col-md-2 col-sm-4 col-xs-4"
    >
      <q-btn to="/list" class="full-width q-pa-none" no-caps flat>
        <q-card flat bordered class="full-width">
          <q-card-actions align="center" style="height: 80px" class="relative-position">
            <q-icon size="50px" name="home"></q-icon>
            <!-- <div class="absolute-bottom text-subtitle2 text-center q-pa-sm bg-red bg-transparent">
              {{ item }}
            </div> -->
          </q-card-actions>
          <q-separator></q-separator>
          <q-card-actions class="text-body2" align="center"> {{ item }} </q-card-actions>
        </q-card>
      </q-btn>
    </div>
  </div>
</template>
