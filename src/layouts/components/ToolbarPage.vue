<template>
  <div class="full-width">
    <q-toolbar
      v-if="toolbar"
      class="text-primary bg-white"
      :class="[is_ipad_lower_size ? '' : 'q-mb-mdX']"
    >
      <q-btn flat round dense icon="home" to="/" />
      <q-avatar icon="arrow_forward_ios"></q-avatar>
      <q-toolbar-title class="q-pa-none text-body2"
        >{{ $route?.meta?.title }}
        {{ $route?.params?.quiz ? `/ ${$route?.params?.quiz}` : "" }}</q-toolbar-title
      >
    </q-toolbar>
    <!-- v-if="is_ipad_lower_size"  -->
    <q-separator color="grey-4"></q-separator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolbar: false,
    };
  },
  watch: {
    "$route.name": {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          switch (val) {
            // case "lms_tugas_index":
            // case "lms_quiz_index":
            // case "lms_tugas_quiz_log_index":
            // case "lms_tugas_quiz_stats_index":
            // case "lms_sekolah_index":
            // case "lms_stakeholder_index":
            // case "lms_ortu_index":
            // case "lms_siswa_index":
            //   this.toolbar = true;
            //   break;

            case "dashboard_quiz_metric":
            case "dashboard_tugas_statistik":
              this.toolbar = false;
              break;
            default:
              this.toolbar = true;
              break;
          }
        });
      },
    },
  },
};
</script>
