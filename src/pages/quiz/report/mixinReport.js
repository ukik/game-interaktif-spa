import { mapActions, mapState, mapWritableState } from "pinia";
import { useLmsTugasQuizStatsStore } from "src/stores/lms/LmsTugasQuizStatsStore";
import { useUiStore } from 'src/stores/ui';

export const myMixin = {
  data() {
    return {
      list_questions: [],
    };
  },
  watch: {
  },
  computed: {
    ...mapWritableState(useUiStore, ['report_confirm_dialog']),
    ...mapState(useLmsTugasQuizStatsStore, [
      'get_init_report',
      "get_report",
      "get_report_tugas",
      "get_report_unsubmit",
      "get_report_unsubmit_checking",
      "get_report_submit",
      "get_report_submit_checking"
    ]),
    // get_report_unsubmit_checkingX() { // DUMMY
    //   let stg = '';
    //   if(this.pathContains('arrange')) stg = 'record_quiz_arrange2'
    //   if(this.pathContains('boolean')) stg = 'record_quiz_boolean2'
    //   if(this.pathContains('essay')) stg = 'record_quiz_essay2'
    //   if(this.pathContains('match')) stg = 'record_quiz_match2'
    //   if(this.pathContains('multiple')) stg = 'record_quiz_multiple2'
    //   if(this.pathContains('shortanswer')) stg = 'record_quiz_shortanswer2'

    //   const lc = JSON.parse(localStorage.getItem(stg))
    //   console.log('get_report_unsubmit_checking', lc.checking)

    //   let html = [];
    //   for (const key in lc?.checking) {
    //     if (!Object.hasOwn(lc?.checking, key)) continue;
    //     html.push(lc?.checking[key]);
    //   }

    //   return html
    // }
  },
  methods: {
    ...mapActions(useLmsTugasQuizStatsStore, ["onReport"]),
    pathContains(keyword) {
      const path = this.$route?.path?.toLowerCase() || ''
      return path.includes(keyword.toLowerCase())
    }
  },

};
