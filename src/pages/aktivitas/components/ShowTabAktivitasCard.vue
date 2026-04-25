<template>
  <q-card-actions align="center" class="q-py-md">
    <q-parallax :height="is_mobile_size ? 250 : 450">
      <q-img position="50% 0%" :src="get_show_payload?.url_image" @error="get_show_payload.url_image = global_url_image"
        error-src="global_url_image" />
    </q-parallax>
  </q-card-actions>
  <q-separator></q-separator>
  <q-card-section class="q-pa-sm">
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
          <q-item-label lines="1" caption>Penerbit</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">{{
            get_show_payload?.user?.name
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Kelas</q-item-label>
          <q-item-label class="text-dark q-gutter-xs">
            <template v-for="(item, i) in getNamaKelasList(get_show_kelas, get_show_payload?.kelas)">
              <q-badge class="q-py-xs" color="cyan" :label="item" />
            </template>

          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Mapel</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark">{{
            mapel?.nama
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Kategori</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-dark text-capitalize">{{
            get_show_payload?.kategori
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" caption>Jenjang</q-item-label>
          <q-item-label class="text-dark" caption>{{
            mapel?.jenjang?.replace(/,/g, ", ")
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-item-label lines="1" caption>Topik</q-item-label>
          <q-item-label class="text-dark" text-capitalize caption>{{
            get_show_payload?.topik
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-item-label lines="1" caption>Sub Topik</q-item-label>
          <q-item-label class="text-dark text-capitalize" caption>{{
            get_show_payload?.subtopik
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


    </q-list>
  </q-card-section>
</template>

<script>
export default {
  props: ['get_show_payload', 'get_show_kelas', 'mapel'],
};
</script>
