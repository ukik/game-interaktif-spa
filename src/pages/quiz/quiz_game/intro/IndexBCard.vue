<template>

    <q-card class="full-width" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img
              class="rounded-borders"
              :src="item?.user?.url_image"
              @error="item.user.url_image = global_url_image"
              :error-src="global_url_image"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">{{ item?.user?.name }}</q-item-label>
          <q-item-label caption>{{ item?.created_at_date }} </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge
            class="q-pa-sm"
            :color="item?.status == 'draft' ? 'red' : 'green'"
            :label="item?.status"
          />
        </q-item-section>
      </q-item>

      <q-separator />
      <q-card-actions class="row q-gutter-xs q-px-md">
        <q-badge class="q-pa-sm"> ID: {{ item?.id }} </q-badge>
        <template v-if="item?.kelas">
          <template v-for="(item, i) in getNamaKelasList(get_index_kelas, item?.kelas)">
            <q-badge class="q-pa-sm" color="cyan" :label="item" />
          </template>
        </template>
      </q-card-actions>

      <!-- <q-card-actions align="between" class="q-px-md text-caption">
      <q-badge color="cyan" class="q-pa-xs q-mr-sm" :label="'ID: ' + item?.id" />
      <q-item-label lines="1" class="text-overline">
        {{ item?.mapel?.nama }}
        <q-badge color="cyan" class="q-pa-xs q-mr-sm" :label="'Mapel: ' + item?.mapel?.nama" />
      </q-item-label>
    </q-card-actions> -->

      <q-separator></q-separator>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" class="text-overline">{{
            item?.mapel?.nama
          }}</q-item-label>
          <q-item-label lines="1" caption>{{ item?.topik }}</q-item-label>
        </q-item-section>
        <!-- <q-item-section avatar side>
          <q-avatar color="grey-4">
            {{ item?.id }}
          </q-avatar>
        </q-item-section> -->
      </q-item>

      <q-separator></q-separator>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs col bg-grey-1">
          <div class="text-h6 text-capitalize q-mb-xs">{{ item?.kategori }}</div>
          <q-item-label caption lines="2" class="text-grey-7">
            {{ item?.subtopik }}
          </q-item-label>
          <q-item-label lines="3" class="text-dark">
            {{ item?.judul }}
          </q-item-label>
        </q-card-section>

        <q-card-section class="col-4 flex flex-center justify-end bg-grey-1">
          <q-img
            position="50% 0%"
            :fit="is_mobile_size ? '' : 'cover'"
            :height="is_mobile_size ? '' : '140px'"
            class="rounded-borders bg-white"
            :src="item?.url_image"
            @error="item.url_image = global_url_image"
            :error-src="global_url_image"
          />
        </q-card-section>
      </q-card-section>

    </q-card>

</template>

<script>
export default {
  props: ["item", "get_index_kelas"],
};
</script>
