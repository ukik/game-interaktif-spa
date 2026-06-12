<template>
  <div>
  <!-- {{ reference }}
  =-=========================
  {{ form_edit.ortu_id }} -->
    <RemoteSelectParent
      :parent="reference.ortu_id"
      @onBubbleEvent="form_edit.ortu_id = $event"
      url="/ajax/parent/search"
    />

    <q-list separator bordered class="text-dark q-mt-md">
      <q-item>
        <q-item-section>
          <q-item-label>Orangtua Terpilih</q-item-label>
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

        <q-item-section side top>
          <q-item-label caption lines="1">{{ item?.created_at_human }}</q-item-label>
          <q-badge class="q-mt-xs">ID: {{ item?.id }}</q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useFormPengaturanSiswaStore } from "src/stores/lms/form/FormPengaturanSiswaStore";
import RemoteSelectParent from "./RemoteSelectParent.vue";

export default {
  data() {
    return {
      // color: ['cyan']
    };
  },
  components: {
    RemoteSelectParent,
  },
  computed: {
    ...mapWritableState(useFormPengaturanSiswaStore, ["form_edit", "selected_parents", "reference"]),
    preview_list() {
      if (this.selected_parents?.length <= 0) {
        let temp = [];
        this.form_edit?.siswa?.parents.forEach((element) => {
          temp.push(element?.parent);
        });

        return temp;
      }
      return this.selected_parents;
    },
  },
  methods: {},
  mounted() {},
};
</script>
