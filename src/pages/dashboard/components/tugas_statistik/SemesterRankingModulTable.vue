<template>

  <q-card>

    <q-card-section>
      <div class="text-h6">Monthly Ranking Modul</div>
    </q-card-section>

    <q-separator></q-separator>

    <q-markup-table separator="vertical" class="">

      <thead>
        <tr class="text-uppercase bg-grey-2 text-left">
          <th>Period</th>
          <th>Score Group</th>
          <th>AVG</th>
          <th>MIN</th>
          <th>MAX</th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="items" v-for="(item, index) in items">
          <td>{{ item?.period }}</td>
          <td>{{ item?.score_group }}</td>
          <td>{{ item?.avg_score }}</td>
          <td>{{ item?.min_score }}</td>
          <td>{{ item?.max_score }}</td>
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
