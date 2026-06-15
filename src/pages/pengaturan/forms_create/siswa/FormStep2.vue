<template>
  <div>
  <!-- {{ reference }}
  =-=========================
  {{ form_create.ortu_id }} -->
    <RemoteSelectParent
      ref="RemoteSelect"
      :parent="reference?.ortu_id"
      @onBubbleEvent="form_create.ortu_id = $event"
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
    ...mapWritableState(useFormPengaturanSiswaStore, ["form_create", "selected_options", "reference"]),
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

      this.form_create['ortu_id'] = selected_options?.map(item => item?.id)
      this.$refs?.RemoteSelect?.setCurrent(selected_options?.map(item => item?.id))

      this.selected_options = selected_options
    }
  },
  mounted() {},
};
</script>
