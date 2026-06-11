<template>
  <q-card-section class="q-pa-sm">
    <div class="text-center q-mb-sm">
      <q-btn @click="onRefresh" outline dense icon="refresh" class="q-px-sm" rounded label="refresh" unelevated color="positive"></q-btn>
    </div>

    <q-list separator bordered class="text-dark">
      <q-item v-for="(item, index) in get_peserta_payload">
        <q-item-section avatar>
          <q-avatar color="dark">
            <q-img class="rounded-borders" :src="item?.siswa?.url_image"
              @error="item.siswa.url_image = global_url_image" :error-src="global_url_image" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">{{ item?.siswa?.name }}</q-item-label>
          <q-item-label caption>{{ item?.siswa?.email }} </q-item-label>
        </q-item-section>

        <!-- <q-item-section side>
          <q-badge class="q-pa-sm" :color="item?.status == 'draft' ? 'red' : 'green'" :label="item?.status" />
        </q-item-section> -->
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script>
export default {
  props: ['get_peserta_payload'],
  emits: ['onRefresh'],
  methods: {
    onRefresh() {
      this.$emit('onRefresh')
    }
  }
};
</script>
