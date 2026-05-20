<template>

  <q-card>

    <q-card-section>
      <div class="text-h6">Quiz Populer</div>
    </q-card-section>

    <q-separator></q-separator>

    <q-markup-table separator="vertical" class="">

      <thead>
        <tr class="text-uppercase bg-grey-2 text-left">
          <th>Judul</th>
          <th>Total Attempt</th>
          <th>Total Siswa</th>
          <th>Kategori</th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="items" v-for="(item, index) in items">
          <td>{{ item?.judul ?? '-' }}</td>
          <td>{{ Number(item?.total_attempt ?? 0) }}</td>
          <td>{{ Number(item?.total_attempt ?? 0) }}</td>
          <td class="text-capitalize">{{ (item?.kategori ?? '') }}</td>
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
