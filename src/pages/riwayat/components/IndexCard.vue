<template>
  <q-card
    class="col-12"
    v-for="(item, index) in get_index_data"
    :key="index"
    flat
    bordered
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <q-img
            class="rounded-borders"
            :src="item?.siswa?.url_image"
            @error="item.siswa.url_image = global_url_image"
            error-src="global_url_image"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{ item?.siswa?.name }}</q-item-label>
        <q-item-label caption>{{ item?.created_at_date }} </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-badge class="q-pa-sm" color="green" :label="'ID: ' + item?.id" />
      </q-item-section>
    </q-item>

    <q-separator />
    <q-card-actions class="q-py-none" align="between">
      <q-item
        class="col-auto q-pl-sm"
        :class="[item?.status_durasi?.status == 'selesai' ? 'text-red' : 'text-positive']"
      >
        <q-item-section avatar top>
          <q-avatar icon="home" color="grey-2" text-color="positive" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-uppercase text-bold">{{
            item?.kelas?.nama
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator vertical></q-separator>
      <div>
        <q-btn
          unelevated
          :to="{ name: 'lms-tugas-quiz-log-show', params: { slug: item?.id } }"
          icon="visibility"
          color="primary"
          :label="is_mobile_size ? '' : 'Detail'"
        ></q-btn>

        <q-btn
          unelevated
          class="q-ml-sm"
          :to="{ name: 'lms-tugas-show', params: { slug: item?.id } }"
          icon="edit"
          color="orange"
          :label="is_mobile_size ? '' : 'Edit'"
        ></q-btn>

        <q-btn
          unelevated
          :to="route_play(item)"
          class="q-ml-sm"
          icon="signal_cellular_alt"
          color="teal"
          :label="is_mobile_size ? '' : 'Hasil'"
        ></q-btn>
      </div>
    </q-card-actions>

    <!-- <q-separator /> -->
    <!-- <q-expansion-item>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="assignment" color="grey-2" text-color="orange" />
        </q-item-section>

        <q-item-section class="text-capitalize">
          Detail Tugas ( {{ item?.tugasable?.kategori }} )
        </q-item-section>
      </template> -->

      <q-separator></q-separator>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs col">
          <div class="text-overline">{{ item?.mapel?.nama }}</div>
          <div class="text-h6 text-capitalize q-mb-xs">
            {{ item?.tugasable?.kategori }}
          </div>
          <q-item-label lines="2">
            {{ item?.judul }}
          </q-item-label>
          <q-item-label :lines="is_mobile_size ? 1 : 2" class="text-grey-7" caption>
            {{ item?.tugasable?.judul }}
          </q-item-label>
        </q-card-section>

        <q-card-section class="col-4 flex flex-center justify-end">
          <q-img
            :height="is_mobile_size ? '' : '140px'"
            class="rounded-borders"
            :src="item?.url_image"
            @error="item.url_image = global_url_image"
            error-src="global_url_image"
          />
        </q-card-section>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-actions class="q-pa-none">
        <q-item dense class="col-6">
          <q-item-section>
            <q-item-label lines="1">Total Soal</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.total_question }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator vertical></q-separator>
        <q-item dense class="col">
          <q-item-section>
            <q-item-label lines="1">Total Benar</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.total_question_true }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>

      <q-separator></q-separator>
      <q-card-actions class="q-pa-none">
        <q-item dense class="col-6">
          <q-item-section>
            <q-item-label lines="1">Total Salah</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.total_question_false }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator vertical></q-separator>
        <q-item dense class="col">
          <q-item-section>
            <q-item-label lines="1">Total Siswa Waktu</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.total_time_left }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>

      <q-separator></q-separator>
      <q-card-actions class="q-pa-none">
        <q-item dense class="col-6">
          <q-item-section>
            <q-item-label lines="1">Total Percobaan</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.total_check_trail }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator vertical></q-separator>
        <q-item dense class="col">
          <q-item-section>
            <q-item-label lines="1">Total Score</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.total_current_score }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>

      <q-separator></q-separator>
      <q-card-actions class="q-pa-none">
        <q-item dense class="col-6">
          <q-item-section>
            <q-item-label lines="1">Total Ranking Poin</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.total_rank_point }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator vertical></q-separator>
        <q-item dense class="col">
          <q-item-section>
            <q-item-label lines="1">Final Ranking</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.final_rank }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>

      <q-separator></q-separator>
      <q-card-actions class="q-pa-none">
        <q-item dense class="col-6">
          <q-item-section>
            <q-item-label lines="1">Final Ranking Poin</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.final_rank_point }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator vertical></q-separator>
        <q-item dense class="col">
          <q-item-section>
            <q-item-label lines="1">Kelas</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item?.tugas?.kelas?.nama }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>
    <!-- </q-expansion-item> -->
  </q-card>
</template>

<script>
export default {
  props: ["get_index_data", "get_index_kelas", "route_name", "leaderboard_key"],
  computed: {
    route_play() {
      return function (item) {
        return {
          name: 'quiz_report',
          params: {
            quiz: item?.tugasable?.kategori,
            slug: item?.tugas_id,
            mode: 'student',
            siswa_id: item?.siswa?.id,
          }
        }
      };
    },
  },
};
</script>
