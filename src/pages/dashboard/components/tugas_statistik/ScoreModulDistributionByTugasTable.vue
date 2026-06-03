<template>

  <q-card>
    <q-card-section>
      <div class="text-h6">Score Modul Distribution by Tugas</div>
    </q-card-section>

    <q-separator></q-separator>

    <q-markup-table separator="vertical" class="">

      <thead>
        <tr class="text-uppercase bg-grey-2 text-left">
          <th>Tugas</th>
          <th>Total Submit</th>
          <th class="bg-positive text-white">A+</th>
          <th class="bg-positive text-white">A</th>
          <th class="bg-positive text-white">B+</th>
          <th class="bg-primary text-white">B</th>
          <th class="bg-primary text-white">C+</th>
          <th class="bg-cyan text-white">C</th>
          <th class="bg-red text-white">D+</th>
          <th class="bg-red text-white">D</th>
          <th class="bg-negative text-white">E</th>
          <th>Avg</th>
          <th>Min</th>
          <th>Max</th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="items" v-for="(item, index) in items">
          <td>
            <q-item-label lines="1">{{ item?.tugas }}</q-item-label>
          </td>
          <td>{{ item?.total_submit }}</td>
          <td>{{ item?.score_A_plus }}</td>
          <td>{{ item?.score_A }}</td>
          <td>{{ item?.score_B_plus }}</td>
          <td>{{ item?.score_B }}</td>
          <td>{{ item?.score_C_plus }}</td>
          <td>{{ item?.score_C }}</td>
          <td>{{ item?.score_D_plus }}</td>
          <td>{{ item?.score_D }}</td>
          <td>{{ item?.score_E }}</td>
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
import { mapState } from 'pinia';
import { useGlobalStore } from 'src/stores/lms/GlobalStore';

export default {
  props: ['items'],
  computed: {
    ...mapState(useGlobalStore, [
      'get_data_global_list_kelas',
      'get_data_global',
    ])
  },
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
    },
    getNamaKelas(ids) {
      const list = this.get_data_global_list_kelas ?? {};

      // kalau array
      if (Array.isArray(ids)) {
        return ids.map(id => list[id] ?? null);
      }

      // kalau string "1,2,3"
      if (typeof ids === "string" && ids.includes(",")) {
        return ids.split(",").map(id => list[id.trim()] ?? null);
      }

      // single value
      return list[ids] ?? null;
    }
  }
}

</script>
