<template>
  <!-- :maximized="$q.screen.width <= 768" -->
  <q-dialog
    id="DialogListStore"
    full-width
    full-height
    v-model="dialog_store"
    transition-show="slide-up"
    transition-hide="slide-down"
    position="bottom"
  >
    <q-card>
      <q-card-section class="q-py-none">
        <q-card-actions class="q-pa-none" align="center">
          <div style="height: 5px; width: 50px; margin-top: 10px" class="bg-grey"></div>
        </q-card-actions>

        <q-toolbar style="height: 50px" class="q-pa-none">
          <div class="text-h6">Pilih Toko</div>
          <q-space></q-space>
          <!-- <q-btn dense flat icon="list" @click="rental_vehicle_modal = true"></q-btn> -->
          <q-btn dense flat icon="close" v-close-popup></q-btn>
        </q-toolbar>
      </q-card-section>

      <q-separator />

      <q-card-section style="height: calc(99.5% - 50px - 15px)" class="scroll q-pa-none">
        <ListDialogStoreContent></ListDialogStoreContent>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import ListDialogStoreContent from "./ListDialogStoreContent.vue";

export default {
  data() {
    return {
      dialog_store: false,
    };
  },
  components: {
    ListDialogStoreContent,
  },
  methods: {
    onOpen() {
      this.dialog_store = true;
    },
  },
};
</script>
