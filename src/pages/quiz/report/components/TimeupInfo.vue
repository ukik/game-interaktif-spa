<template>
  <q-card class="q-ma-sm" bordered flat>
    <q-item class="" :class="[tugas?.status_durasi?.status == 'selesai' ? 'text-red' : 'text-positive']">
      <q-item-section avatar top>
        <q-avatar :icon="tugas?.status_durasi?.status == 'selesai' ? 'lock' : 'task_alt'"
          :color="tugas?.status_durasi?.status == 'selesai' ? 'red' : 'positive'" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="text-uppercase text-bold">{{ tugas?.status_durasi?.status
          }}</q-item-label>
        <q-item-label class="text-caption">{{ tugas?.status_durasi?.text }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  props: ['tugas']
}
</script>
