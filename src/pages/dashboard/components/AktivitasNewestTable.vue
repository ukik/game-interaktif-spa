<template>

  <q-card>

    <q-card-section>
      <div class="text-h6">Quiz/Modul Terbaru</div>
    </q-card-section>

    <q-separator></q-separator>

    <q-markup-table separator="vertical" class="">

      <thead>
        <tr class="text-uppercase bg-grey-2 text-left">
          <th>Judul</th>
          <th>Kategori</th>
          <th>Jenis</th>
          <th>Status</th>
          <th>Tanggal</th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="items" v-for="(item, index) in items">

          <td>
            <q-item-label lines="1">{{ item?.judul ?? '-' }}</q-item-label>
          </td>

          <td class="text-capitalize">
            {{ item?.kategori ?? '-' }}
          </td>

          <td>
            {{ (item?.tipe?.toUpperCase() ?? '-') }}
          </td>

          <td>

            <q-badge v-if="item?.status == 'publish'" color="positive">
              Publish
            </q-badge>

            <q-badge v-else color="negative">
              Draft
            </q-badge>

          </td>

          <td>
            {{ dateToLocal(item?.created_at) ?? '-' }}
          </td>

        </tr>

        <tr v-else>
          <td colspan="2" class="text-center">
            Tidak ada data
          </td>
        </tr>

      </tbody>

    </q-markup-table>

  </q-card>

</template>

<script>
export default {
  props: ['items'],
  methods: {
    getStatus(item) {
      const status = item ?? 'normal';

      switch (status) {
        case 'today':
          return `<span class="badge bg-primary">Today</span>`
        case 'urgent':
          return `<span class="badge bg-warning text-dark">Urgent</span>`
        case 'normal':
          return `<span class="badge bg-success">Normal</span>`
        case 'expired':
          return `<span class="badge bg-danger">Expired</span>`
        default:
          return `<span class="badge bg-secondary">No Deadline</span>`

      }
    }
  }
}

</script>
