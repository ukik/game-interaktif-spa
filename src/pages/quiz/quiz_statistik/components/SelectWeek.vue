<template>
  <q-select
    :option-label="optionLabel"
    :option-value="optionValue"
    clearable
    emit-value
    map-options
    class="full-width q-mt-md"
    :multiple="false"
    filled
    v-model="current"
    :use-input="true"
    input-debounce="300"
    label="Mingguan"
    :options="options"
    style="width: 250px"
    :behavior="is_mobile_size ? 'dialog' : 'dialog'"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-avatar>
            {{ scope.opt.value }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-uppercase">{{ scope.opt.label }}</q-item-label>
          <q-item-label caption
            >( {{ scope.opt.begin_date }} s/d {{ scope.opt.end_date }} )</q-item-label
          >
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
// format YYYY-MM-DD
const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
};

// cari Senin (ISO)
const getMonday = (date) => {
  const d = new Date(date);

  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);

  d.setDate(diff);

  return d;
};

// generate ISO week
const generateISOWeeks = (year) => {
  const weeks = [];

  const jan4 = new Date(year, 0, 4);
  const start = getMonday(jan4);

  let weekIndex = 1;

  while (true) {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    if (start.getFullYear() > year && end.getFullYear() > year) {
      break;
    }

    weeks.push({
      value: weekIndex,
      label: `MINGGU ${weekIndex}`,
      begin_date: formatDate(start),
      end_date: formatDate(end),
    });

    start.setDate(start.getDate() + 7);
    weekIndex++;
  }

  return weeks;
};

// cari week sekarang
const getCurrentWeekIndex = (weeks, year) => {
  const today = new Date();

  if (today.getFullYear() !== year) {
    return 1;
  }

  for (const week of weeks) {
    const start = new Date(week.begin_date);
    const end = new Date(week.end_date);

    // sampai 23:59:59
    end.setHours(23, 59, 59, 999);

    if (today >= start && today <= end) {
      return week.value;
    }
  }

  return 1;
};

export default {
  props: {
    week: {
      default: null,
    },
    year: {
      default: null,
    },
    label: {
      type: String,
      default: "",
    },

    optionLabel: {
      type: String,
      default: "label",
    },

    optionValue: {
      type: String,
      default: "value",
    },
  },

  emits:['onBubbleEvent'],
  watch: {
    current: {
      handler(val) {
  console.log("WATCH FIRED", val);
  if(!val) return
  this.$emit("onBubbleEvent", val);
},
      immediate: true,
    },
  },

  data() {
    return {
      loading: false,
      current: null,
      options: [],
    };
  },

  mounted() {
    let weeks = generateISOWeeks(this.year);
    this.options = weeks;

    if (!this.normalizeToString(this.week)) {
      let currentWeek = getCurrentWeekIndex(weeks, this.year);
      this.current = weeks[currentWeek]?.value;
    } else {
      this.current = this.week
    }
  },
};
</script>
