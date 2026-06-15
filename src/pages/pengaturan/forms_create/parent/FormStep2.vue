<template>
  <div>
  <!-- {{ reference }}
  =-=========================
  {{ form_create.siswa_id }} -->
    <RemoteSelectSiswa
      ref="RemoteSelect"
      :parent="reference?.siswa_id"
      @onBubbleEvent="form_create.siswa_id = $event"
      url="/ajax/student/search"
    />

    <q-list separator bordered class="text-dark q-mt-md">
      <q-item>
        <q-item-section>
          <q-item-label>Siswa Terpilih</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-for="(item, index) in preview_list" :key="index">
        <q-item-section avatar top>
          <q-avatar>
            <q-img
              :src="item?.url_image"
              @error="item.url_image = global_url_image"
              :error-src="global_url_image"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item?.name }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.email }}</q-item-label>
        </q-item-section>

        <!-- <q-item-section side top>
          <q-item-label caption lines="1">{{ item?.created_at_human }}</q-item-label>
          <q-badge class="q-mt-xs">ID: {{ item?.id }}</q-badge>
        </q-item-section> -->
        <q-item-section side top>
          <q-btn @click="onRemove(item?.id)" flat unelevated dense color="red" icon="close" round></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useFormPengaturanParentStore } from "src/stores/lms/form/FormPengaturanParentStore";
import RemoteSelectSiswa from "./RemoteSelectSiswa.vue";

export default {
  data() {
    return {
      // color: ['cyan']
    };
  },
  components: {
    RemoteSelectSiswa,
  },
  computed: {
    ...mapWritableState(useFormPengaturanParentStore, ["form_create", "selected_options", "reference"]),
    preview_list() {
      return this.selected_options
    },
  },
  methods: {
    onRemove(id) {
      const selected_options = JSON.parse(JSON.stringify(this.preview_list))
      selected_options.forEach((el, index) => {
        if(id == el?.id) {
          selected_options.splice(index, 1)
        }
      });

      this.form_create['siswa_id'] = selected_options?.map(item => item?.id)
      this.$refs?.RemoteSelect?.setCurrent(selected_options?.map(item => item?.id))

      this.selected_options = selected_options
    }
  },
  mounted() {
      this.$refs?.RemoteSelect?.setCurrent(this.selected_options?.map(item => item?.id))
  },
};
</script>
