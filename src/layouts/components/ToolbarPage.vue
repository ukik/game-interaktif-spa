<template>
  <q-toolbar v-if="toolbar" class="text-primary bg-white q-mb-md">
    <q-btn flat round dense icon="home" />
    <q-avatar icon="arrow_forward_ios"></q-avatar>
    <q-toolbar-title class="q-pa-none text-body2"
      >{{ $route?.meta?.title }} {{ $route?.params?.quiz ? `/ ${$route?.params?.quiz}` : '' }}</q-toolbar-title
    >
  </q-toolbar>
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
            case "lms_tugas_index":
            case "lms_quiz_index":
            case "lms_tugas_quiz_log_index":
            case "lms_tugas_quiz_stats_index":
            case "lms_sekolah_index":
            case "lms_stakeholder_index":
            case "lms_ortu_index":
            case "lms_siswa_index":
              this.toolbar = true;
              break;
            default:
              this.toolbar = false;
          }
        });
      },
    },
  },
};
</script>
