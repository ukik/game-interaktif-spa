<template>
  <q-card-actions align="center" class="q-py-md">
    <q-parallax :height="is_mobile_size ? 250 : 450">
      <q-img position="50% 0%" :src="get_show_payload?.url_image" @error="get_show_payload.url_image = global_url_image"
        error-src="global_url_image" />
    </q-parallax>
  </q-card-actions>
  <q-separator></q-separator>
  <q-card-section class="q-pa-sm">
    <q-list separator bordered class="q-mb-md">
      <q-item :class="[get_show_payload?.status_durasi?.status == 'selesai' ? 'text-red' : 'text-positive']">
        <q-item-section avatar top>
          <q-avatar :icon="get_show_payload?.status_durasi?.status == 'selesai' ? 'lock' : 'task_alt'"
            :color="get_show_payload?.status_durasi?.status == 'selesai' ? 'red' : 'positive'" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-uppercase text-bold">{{ get_show_payload?.status_durasi?.status
            }}</q-item-label>
          <q-item-label class="text-caption">{{ get_show_payload?.status_durasi?.text }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator></q-separator>
      <q-card-actions class="q-pa-none">
        <q-item class="col-6">
          <q-item-section avatar top>
            <q-avatar icon="access_alarm" color="blue" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">Mulai</q-item-label>
            <q-item-label lines="1" caption>{{ get_show_payload?.begin_date }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator vertical></q-separator>
        <q-item class="col">
          <q-item-section avatar top>
            <q-avatar icon="access_alarm" color="blue" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">Selesai</q-item-label>
            <q-item-label lines="1" caption>{{ get_show_payload?.end_date }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>
      <q-separator></q-separator>
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
            <q-chip class="q-mx-none" icon="face" color="transparent" :label="get_show_payload?.tugas_hasil_count"></q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
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
            <q-chip class="q-mx-none" icon="face" color="transparent" :label="get_show_payload?.tugas_siswa_count"></q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <!-- <q-item-section>
          <q-item-label lines="1" caption>Visibilitas</q-item-label>
        </q-item-section> -->
        <q-item-section >
          <q-item-label class="text-dark text-center">
            <q-chip class="q-mx-none" text-color="white"
              :icon="get_show_payload?.visibility == 'private' ? 'lock' : 'lock_open'"
              :color="get_show_payload?.visibility == 'private' ? 'red' : 'green'"
              :label="get_show_payload?.visibility" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>



    <q-list separator bordered class="text-dark">
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>ID</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">{{
            get_show_payload?.id
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Dibuat</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">{{
            get_show_payload?.created_at_human
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Status</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">
            <q-badge class="q-pa-sm" :color="get_show_payload?.status == 'draft' ? 'red' : 'green'"
              :label="get_show_payload?.status" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Guru</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">{{
            get_show_payload?.user?.name
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Prioritas</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">{{
            get_show_payload?.priority
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Prioritas</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">{{
            get_show_payload?.priority
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Kelas</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark"><q-badge class="q-py-xs" color="cyan"
              :label="get_show_payload?.kelas?.nama" /></q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Mapel</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">{{
            get_show_payload?.mapel?.nama
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="q-mb-sm" lines="1" caption>Kategori</q-item-label>

          <q-item-label class="text-dark text-capitalize">{{
            get_show_payload?.tugas_kategori?.nama
          }}</q-item-label>

          <q-item-label caption >{{
            get_show_payload?.tugas_kategori?.deskripsi
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Jenjang</q-item-label>
          <q-item-label class="text-dark" caption>{{
            get_show_payload?.mapel?.jenjang?.replace(/,/g, ", ")
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-item-label lines="1" caption>Judul</q-item-label>
          <q-item-label class="text-dark" caption>{{
            get_show_payload?.judul
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Deskripsi</q-item-label>
          <q-item-label class="text-dark" caption v-html="get_show_payload?.deskripsi"></q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Catatan</q-item-label>
          <q-item-label class="text-dark" caption v-html="get_show_payload?.catatan"></q-item-label>
        </q-item-section>
      </q-item>


    </q-list>
  </q-card-section>
</template>

<script>
export default {
  props: ['get_show_payload', 'get_show_kelas'],
};
</script>
