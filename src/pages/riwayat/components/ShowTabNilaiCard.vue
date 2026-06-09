<template>

  <q-item-label overline header>Guru</q-item-label>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
        <q-img
          class="rounded-borders"
          :src="item?.user?.url_image"
          @error="item.user.url_image = global_url_image"
          error-src="global_url_image"
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1">{{ item?.user?.name }}</q-item-label>
      <q-item-label caption>{{ item?.created_at_date }} </q-item-label>
    </q-item-section>
  </q-item>

  <q-separator></q-separator>

  <q-item-label overline header>Siswa</q-item-label>
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
  </q-item>

  <q-separator></q-separator>
  <q-card-actions class="q-pa-none">
    <q-item  class="col-6">
      <q-item-section>
        <q-item-label lines="1">Total Soal</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ item?.total_question }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator vertical></q-separator>
    <q-item  class="col">
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
    <q-item  class="col-6">
      <q-item-section>
        <q-item-label lines="1">Total Salah</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ item?.total_question_false }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator vertical></q-separator>
    <q-item  class="col">
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
    <q-item  class="col-6">
      <q-item-section>
        <q-item-label lines="1">Total Percobaan</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ item?.total_check_trail }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator vertical></q-separator>
    <q-item  class="col">
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
    <q-item  class="col-6">
      <q-item-section>
        <q-item-label lines="1">Total Ranking Poin</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ item?.total_rank_point }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator vertical></q-separator>
    <q-item  class="col">
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
    <q-item  class="col-6">
      <q-item-section>
        <q-item-label lines="1">Final Ranking Poin</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ item?.final_rank_point }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator vertical></q-separator>
    <q-item  class="col">
      <q-item-section>
        <q-item-label lines="1">Kelas</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ item?.tugas?.kelas?.nama }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card-actions>


  <q-separator></q-separator>
  <q-card-actions class="q-pa-none">
    <q-item class="full-width">
      <q-item-section>
        <q-item-label lines="1">Kelas</q-item-label>
        <q-item-label class="">
          <textarea readonly class="form-control" rows="8">{{ item?.json }}</textarea>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card-actions>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped lang="css">
.form-control {
    font-size: 13px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(231, 231, 231);
    border-image: initial;
    border-radius: 3px;
    padding: 8px 12px;
    transition: 0.3s;
    width: 100% !important;
}
</style>
