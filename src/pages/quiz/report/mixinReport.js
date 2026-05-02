import { mapActions, mapState, mapWritableState } from "pinia";
import { useLmsTugasQuizStatsStore } from "src/stores/lms/LmsTugasQuizStatsStore";

export const myMixin = {
  data() {
    return {
      list_questions: [],
    };
  },
  watch: {
  },
  computed: {
    ...mapState(useLmsTugasQuizStatsStore, [
      'get_init_report',
      "get_report",
      "get_report_unsubmit",
      "get_report_submit",
      // "get_report_unsubmit_checking"
    ]),
    get_report_unsubmit_checking() { // DUMMY
      const lc = JSON.parse(localStorage.getItem('record_quiz_arrange2'))
      return lc.checking
    }
  },
  methods: {
    ...mapActions(useLmsTugasQuizStatsStore, ["onReport"]),
  },

};
