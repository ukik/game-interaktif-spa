<template>
  <q-card>

    <q-card-section>
      <div class="text-h6">Dashboard</div>
    </q-card-section>

    <q-separator></q-separator>

    <q-list separator class="row bg-white">

      <div class="col-xs-12 col-sm-6">
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="assignment" />
          </q-item-section>

          <q-item-section>Total Tugas</q-item-section>
          <q-item-section side class="text-h6">{{ Number(item?.total_tugas ?? 0) }}</q-item-section>
        </q-item>
      </div>
      <div class="col-xs-12 col-sm-6 row">
        <q-separator vertical></q-separator>
        <q-item class="col">
          <q-item-section avatar>
            <q-avatar color="pink" text-color="white" icon="assignment" />
          </q-item-section>

          <q-item-section>Total Expired</q-item-section>
          <q-item-section side class="text-h6">{{ Number(item?.total_expired ?? 0) }}</q-item-section>
        </q-item>
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-item>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="assignment" />
          </q-item-section>

          <q-item-section>Total Publish</q-item-section>
          <q-item-section side class="text-h6">{{ Number(item?.total_publish ?? 0) }}</q-item-section>
        </q-item>
      </div>
      <div class="col-xs-12 col-sm-6 row">
        <q-separator vertical></q-separator>
        <q-item class="col">
          <q-item-section avatar>
            <q-avatar color="orange" text-color="white" icon="assignment" />
          </q-item-section>

          <q-item-section>Total Draft</q-item-section>
          <q-item-section side class="text-h6">{{ Number(item?.total_draft ?? 0) }}</q-item-section>
        </q-item>
      </div>

    </q-list>
  </q-card>
</template>

<script>
export default {
  props: ['item'],

}

</script>
