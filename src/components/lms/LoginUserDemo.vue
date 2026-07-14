<template>
  <div>
    <q-select
      behavior="dialog"

      option-value="id"
      option-label="name"
      :emit-value="false"
      map-options
      v-model="model"
      :options="options"
      label="Pilih Demo User"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-avatar>
              <q-img
                :src="scope.opt?.url_image"
                @error="scope.opt.url_image = global_url_image"
                :error-src="global_url_image"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.name }}</q-item-label>
            <q-item-label caption>{{ scope.opt.email }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>
              <q-chip :label="scope.opt.role" text-color="white" :class="[roleColor(scope.opt.role)]"></q-chip>
            </q-item-label>
          </q-item-section>
        </q-item>


        <q-separator></q-separator>
      </template>
    </q-select>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useGlobalStore } from "src/stores/lms/GlobalStore";

export default {
  data() {
    return {
      model: null,
    };
  },
  computed: {
    ...mapState(useGlobalStore, {
      options: "get_data_global_list_demo",
    }),
    ...mapState(useAuthStore, ["form_login"]),
  },
  methods: {
    roleColor(val) {
      switch (val) {
        case 'principal':
          return 'bg-teal';
        case 'teacher':
          return 'bg-red';
        case 'student':
          return 'bg-cyan';
        case 'parent':
          return 'bg-orange';
      }
    }
  },
  watch: {
    model(val) {
      console.log(val);
      this.form_login["email"] = val["email"];
      this.form_login["password"] = val["raw_password"];
    },
  },
};
</script>
