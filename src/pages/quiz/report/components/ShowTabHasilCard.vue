<template>

  <div class="q-pa-sm">

    <div class="text-center q-mb-sm">
      <q-btn @click="onRefresh" outline dense icon="refresh" class="q-px-sm" rounded label="refresh" unelevated color="positive"></q-btn>
    </div>

    <q-list v-if="top?.length > 0" separator bordered class="text-dark">

      <q-card-actions class="q-pa-none">
        <div class="col-12 text-center">
          <q-chip class="q-my-sm text-body2" color="grey" text-color="white" icon="star" label="Top 3"></q-chip>
          <q-separator></q-separator>
        </div>


        <template v-for="(item, index) in top">
          <q-card flat square class="col-4">
            <!-- <q-card-actions align="between" class="q-mb-sm q-px-md" :class="['bg-' + getRankColor(index)]">
              <q-item-label class="text-white" lines="1">Score </q-item-label>

              <q-item-label class="text-bold text-white" lines="1">{{ getRanking(item?.score)?.grade }}</q-item-label>
            </q-card-actions> -->

            <q-card-actions align="center" class="q-pt-md">

              <q-avatar class="q-mb-xs" size="75px">
                <q-img fit="fill" :src="item?.siswa?.url_image" @error="item.siswa.url_image = global_url_image"
                  :error-src="global_url_image" />
                <q-badge :color="getRankColor(index)" class="badge-left round q-pa-sm flex flex-center text-body2"
                  style="width:30px; height:30px; " floating>
                  <!-- <q-icon name="fa-brands fa-web-awesome"></q-icon> -->
                  {{ getRankModel_1(item?.total_question_true, 15)?.g }}
                </q-badge>
              </q-avatar>

              <q-item-label class="q-mt-sm col-12 text-center" lines="1">
                {{ item?.siswa?.name }}
              </q-item-label>

              <q-item-label class="q-mt-sm col-12 text-center text-bold" :class="['text-' + getRankColor(index)]"
                lines="1">Rank {{
                  Number(index + 1) }} </q-item-label>

              <!-- <q-item-label class="q-mt-sm col-12 text-center" lines="1" caption>
                {{item?.siswa?.email}}
              </q-item-label> -->

              <!-- <q-avatar :color="getRankColor(index)" text-color="white">
                {{ getRanking(item?.score)?.grade }}
              </q-avatar> -->
              <!-- <q-badge color="transparent" class="round q-ma-xs flex flex-center text-h6" :class="['text-' + getRankColor(index)]"
                style="width:30px; height:30px; " floating>
                A
              </q-badge> -->
            </q-card-actions>

            <q-separator></q-separator>
            <q-card-actions align="between" class="q-px-md" :class="['alert-' + getRankColorBootstrap(index)]">
              <div class="text-bold">
                <q-icon name="fa-brands fa-web-awesome"></q-icon>
              </div>
              <div class="text-caption">{{item?.total_question_true}} / {{item?.total_question }} </div>
            </q-card-actions>


          </q-card>
          <q-separator vertical />
        </template>

      </q-card-actions>
    </q-list>
  </div>

  <q-card-section v-if="payload?.data?.length > 0" class="q-pa-sm">
    <q-list separator bordered class="text-dark">
      <div class="col-12 text-center">
        <q-chip class="q-my-sm text-body2" color="grey" text-color="white" icon="bar_chart"
          label="Leaderboard"></q-chip>
        <q-separator></q-separator>
      </div>
      <q-item v-for="(item, index) in payload?.data">
        <q-item-section avatar>
          <q-avatar :color="getRankColor(index)" class="text-white">
            {{ getRankModel_1(item?.total_question_true, 15)?.g }}
          </q-avatar>
        </q-item-section>
        <q-item-section avatar>
          <q-avatar color="dark">
            <q-img class="rounded-borders" :src="item?.siswa?.url_image"
              @error="item.siswa.url_image = global_url_image" :error-src="global_url_image" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">{{ item?.siswa?.name }}</q-item-label>
          <q-item-label caption>({{item?.total_question_true}} / {{item?.total_question }}) Soal</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-avatar color="grey-2" class="text-dark">
            {{ index + 1 }}
            <q-badge color="transparent" class="round flex flex-center" style="right: -7px;"
              :class="['text-' + getRankColor(index)]" floating>
              <q-icon name="fa-brands fa-web-awesome"></q-icon>
            </q-badge>
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script>
export default {
  props: ['payload', 'top'],
  emits: ['onRefresh'],
  methods: {
    onRefresh() {
      this.$emit('onRefresh')
    }
  }
};
</script>
