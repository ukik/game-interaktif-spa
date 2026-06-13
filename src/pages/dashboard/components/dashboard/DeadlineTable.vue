<template>

  <q-card>

    <q-card-section>
      <div class="text-h6">Deadline Tugas</div>
    </q-card-section>

    <q-separator></q-separator>

    <q-markup-table separator="vertical" class="">

      <thead>
        <tr class="text-uppercase bg-grey-2 text-left">
          <th>Judul</th>
          <th>Kategori</th>
          <th>Tipe</th>

          <th>Sisa Hari</th>
          <th>Status</th>
          <th>Deadline</th>

          <th>Kelas</th>
          <th>Mapel</th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="items" v-for="(item, index) in items">

          <td>
            <q-item-label lines="1">{{ item?.judul ?? '-' }}</q-item-label>
          </td>
          <td>{{ item?.content_kategori ?? '-' }}</td>
          <td>{{ item?.tugas_kategori ?? '-' }}</td>

          <td>{{ item?.sisa_hari < 0 ? '-' : item?.sisa_hari }}</td>
          <td>
            <q-badge :color="getStatus(item?.deadline_status)" class="text-capitalize">{{ item?.deadline_status }}</q-badge>
          </td>
          <td>{{ item?.end_date ?? '-' }}</td>

          <td>{{ item?.kelas ?? '-' }}</td>
          <td>{{ item?.mapel ?? '-' }}</td>

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
          return 'primary';
          return `<q-badge color="primary">Today</q-badge>`
        case 'urgent':
          return 'orange';
          return `<q-badge color="orange">Urgent</q-badge>`
        case 'normal':
          return 'positive';
          return `<q-badge color="positive">Normal</q-badge>`
        case 'expired':
          return 'negative';
          return `<q-badge color="negative">Expired</q-badge>`
        default:
          return 'cyan';
          return `<q-badge color="cyan">No Deadline</q-badge>`

      }
    }
  }
}

</script>
