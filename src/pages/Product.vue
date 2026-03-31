<template>
  <q-page class="q-pb-md">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-btn @click="$router.back" flat round dense icon="arrow_back" class="q-mr-sm" />

        <q-toolbar-title>Produk</q-toolbar-title>

        <!-- <q-btn flat round dense icon="whatshot" /> -->
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white" reveal elevated>
      <q-separator></q-separator>
      <q-toolbar>
        <div class="text-h6 text-blue">Rp. 50000</div>
        <q-space></q-space>
        <q-btn
          unelevated
          dense
          color="positive"
          icon-right="chevron_right"
          label="Save to Order"
        />
      </q-toolbar>
    </q-footer>

    <HomeProductCarousel></HomeProductCarousel>

    <q-item>
      <q-item-section>
        <q-item-label class="text-h6">Nama Produk</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator class="q-my-xs"></q-separator>
    <q-item>
      <q-item-label class=""
        >Deskripsi Produk QToolbar is a component usually part of Layout Header and
        Footer, but it can be used anywhere on the page.</q-item-label
      >
    </q-item>
    <q-separator class="q-my-xs"></q-separator>
    <q-item>
      <q-item-section>
        <q-item-label class="text-h5">Rp. 50000</q-item-label>
        <q-item-label caption class="text-caption">Harga Reguler</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator class="q-my-sm"></q-separator>

    <q-item>
      <q-item-section>
        <q-item-label>
          <q-select
            class=""
            square
            outlined
            v-model="model"
            :options="options"
            label="Size"
          />
        </q-item-label>

        <q-item-label>
          <q-select square outlined v-model="model" :options="options" label="Category" />
        </q-item-label>
        <q-item-label>
          <q-input label="Catatan" square outlined v-model="text" autogrow />
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator class="q-my-sm"></q-separator>

    <q-item>
      <q-item-section>
        <q-item-label>
          <q-input
            placeholder="0"
            input-class="text-center text-h6"
            square
            outlined
            mask="###"
            v-model="text"
          >
            <template v-slot:before>
              <q-btn icon="remove" color="red" class="full-height" />
            </template>
            <template v-slot:after>
              <q-btn icon="add" color="blue" class="full-height" />
            </template>
          </q-input>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-page>
</template>


<script>
import { ref } from "vue";

export default {
  setup() {
    const model = ref(null)
    const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    const text = ref(null)
    return { model, options, text }
  }
}
</script>
