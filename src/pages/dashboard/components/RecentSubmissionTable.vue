<template>

  <q-card>

    <q-card-section>
      <div class="text-h6">Recent Submission</div>
    </q-card-section>

    <q-separator></q-separator>

    <q-markup-table separator="vertical" class="">

      <thead>
        <tr class="text-uppercase bg-grey-2 text-left">
          <th>Judul</th>
          <th>Kategori</th>
          <th>Tipe</th>
          <th>Kelas</th>
          <th>Student</th>
          <th>Score / Ranking</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="items" v-for="(item, index) in items">

          <td>
            <q-item-label lines="1">
              {{ item?.tugas_judul ?? '-' }}
            </q-item-label>
          </td>

          <td class="text-capitalize">{{ item?.content_kategori ?? '-' }}</td>

          <td class="text-capitalize">{{ item?.tugas_kategori ?? '-' }}</td>

          <td class="text-capitalize">{{ item?.kelas ?? '-' }}</td>

          <td><b>{{ item?.siswa_name ?? '-' }}</b></td>

          <td>

            <template v-if="getScore(item) >= 90">
              <q-badge style="width: 35px;" color="positive">
                <span class="text-center full-width">{{ getScore(item) }}</span>
              </q-badge>
              /
              <q-badge style="width: 35px;" color="positive">
                <span class="text-center full-width">{{ getRanking(getScore(item))['grade'] }}</span>
              </q-badge>
            </template>
            <template v-else-if="getScore(item) >= 75">
              <q-badge style="width: 35px;" color="primary">
                <span class="text-center full-width">{{ getScore(item) }}</span>
              </q-badge>
              /
              <q-badge style="width: 35px;" color="primary">
                <span class="text-center full-width">{{ getRanking(getScore(item))['grade'] }}</span>
              </q-badge>
            </template>
            <template v-else-if="getScore(item) >= 60">
              <q-badge style="width: 35px;" color="orange">
                <span class="text-center full-width">{{ getScore(item) }}</span>
              </q-badge>
              /
              <q-badge style="width: 35px;" color="orange">
                <span class="text-center full-width">{{ getRanking(getScore(item))['grade'] }}</span>
              </q-badge>
            </template>
            <template v-else>
              <q-badge style="width: 35px;" color="negative">
                <span class="text-center full-width">{{ getScore(item) }}</span>
              </q-badge>
              /
              <q-badge style="width: 35px;" color="negative">
                <span class="text-center full-width">{{ getRanking(getScore(item))['grade'] }}</span>
              </q-badge>
            </template>
          </td>

          <td>{{ item?.created_at ?? '-' }}</td>

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
    getScore(val) {
      return val?.score ?? 0;
    },
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
