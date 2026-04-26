<template>
  <q-card class="col-12" v-for="(item, index) in get_index_data" :key="index" flat bordered>

    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <q-img class="rounded-borders" :src="item?.user?.url_image" @error="item.user.url_image = global_url_image"
            error-src="global_url_image" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{ item?.user?.name }}</q-item-label>
        <q-item-label caption>{{ item?.created_at_date }} </q-item-label>
      </q-item-section>

      <!-- <q-item-section side>
        <q-badge class="q-pa-sm" :color="item?.status == 'draft' ? 'red' : 'green'" :label="item?.status" />
      </q-item-section> -->
      <q-item-section side>
        <q-btn dense :to="{ name: route_name, params: { slug: item?.id } }" icon="edit" color="blue" outline
          :label="is_mobile_size ? '' : 'Edit'"></q-btn>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>

    <q-card-actions class="q-px-md text-caption">
      <!-- <q-item-label caption>ID: {{  }} / Tugas ID: {{ item?.tugasable_id }}</q-item-label> -->
      <!-- <q-item-label lines="1" caption class="text-capitalize"> -->
      <q-badge color="cyan" class="q-pa-xs q-mr-sm" :label="'ID: ' + item?.id" />
      <q-badge color="cyan" class="q-pa-xs q-mr-sm" :label="`ID ${item?.model}: ` + item?.tugasable_id" />
      <q-badge color="cyan" class="q-pa-xs q-mr-sm" :label="'priority: ' + item?.priority" />
      <q-space />
      <!-- <q-badge color="teal" class="q-pa-xs text-uppercase" :label="item?.model" /> -->
      <q-badge class="q-pa-xs text-uppercase" :color="item?.status == 'draft' ? 'red' : 'green'"
        :label="item?.status" />
      <!-- <q-badge color="teal" class="q-pa-xs" :label="'visibility: '+item?.visibility" /> -->
      <!-- </q-item-label> -->
    </q-card-actions>

    <q-separator></q-separator>
    <q-card-actions class="q-pa-none">
      <q-item class="col-6">
        <q-item-section avatar top>
          <q-avatar icon="access_alarm" color="blue" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Mulai</q-item-label>
          <q-item-label lines="1" caption>{{ item?.begin_date }}</q-item-label>
        </q-item-section>

      </q-item>
      <q-separator vertical></q-separator>
      <q-item class="col">
        <q-item-section avatar top>
          <q-avatar icon="access_alarm" color="blue" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Selesai</q-item-label>
          <q-item-label lines="1" caption>{{ item?.end_date }}</q-item-label>
        </q-item-section>

      </q-item>
    </q-card-actions>

    <q-separator />
    <q-item dense>
      <q-item-section avatar>
        <q-avatar>
          <q-icon name="group"></q-icon>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-grey-8">Siswa Mengerjakan </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="items-center">
          <q-chip class="q-mx-none" icon="face" color="transparent" :label="item?.tugas_hasil_count"></q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item dense>
      <q-item-section avatar>
        <q-avatar>
          <q-icon name="group"></q-icon>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-grey-8">Siswa Partisipasi </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="items-center">
          <q-chip class="q-mx-none" icon="face" color="transparent" :label="item?.tugas_siswa_count"></q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>


    <q-separator></q-separator>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col">
        <div class="text-overline">{{ item?.mapel?.nama }}</div>
        <div class="text-h6 text-capitalize q-mb-xs">{{ item?.tugasable?.kategori }} </div>
        <q-item-label lines="2">
          {{ item?.judul }}
        </q-item-label>
        <q-item-label :lines="is_mobile_size ? 1 : 2" class="text-grey-7" caption>
          {{ item?.tugasable?.judul }}
        </q-item-label>
      </q-card-section>

      <q-card-section class="col-4 flex flex-center justify-end">
        <q-img :height="is_mobile_size ? '' : '140px'" class="rounded-borders" :src="item?.url_image"
          @error="item.url_image = global_url_image" error-src="global_url_image" />
      </q-card-section>
    </q-card-section>


    <q-separator />
    <q-card-actions class="q-py-none q-px-md" align="between">

      <q-item class="col-auto q-pl-none"
        :class="[item?.status_durasi?.status == 'selesai' ? 'text-red' : 'text-positive']">
        <q-item-section avatar top>
          <q-avatar :icon="item?.status_durasi?.status == 'selesai' ? 'lock' : 'task_alt'"
            :color="item?.status_durasi?.status == 'selesai' ? 'red' : 'positive'" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-uppercase text-bold">{{ item?.status_durasi?.status }}</q-item-label>
          <q-item-label class="text-caption">{{ item?.status_durasi?.text }}</q-item-label>
        </q-item-section>

      </q-item>
      <q-separator vertical></q-separator>
      <div>
        <div>
          <q-btn :to="{ name: route_name, params: { slug: item?.id } }" icon="visibility" color="primary"
            :label="is_mobile_size ? '' : 'Detail'"></q-btn>

          <q-btn v-if="item?.tugas_hasil_count > 0" class="q-ml-sm" icon="leaderboard" color="orange"
            :label="is_mobile_size ? '' : 'Rank'"></q-btn>

          <q-btn v-if="item?.status_durasi?.status !== 'selesai'" class="q-ml-sm" icon="play_circle" color="pink"
            :label="is_mobile_size ? '' : 'Play'"></q-btn>

        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>


<script>
export default {
  props: ['get_index_data', 'get_index_kelas', 'route_name'],
};
</script>
