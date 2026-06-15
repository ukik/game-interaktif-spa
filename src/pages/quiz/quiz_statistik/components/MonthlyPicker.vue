<template>
  <div class="q-mr-md">
    <q-input
      dense
      v-model="monthValue"
      id="date-input"
      class="single-month-picker"
      readonly
    >
      <template v-slot:append>
        <q-icon
          name="fa-regular fa-calendar"
          class="cursor-pointer"
          size="1.1rem"
        >
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <div class="q-date__header flex column items-start">
              <span @click="handleToMonthView" class="cursor-pointer"
                >{{ "Year - Month" }}</span
              >
              <div class="text-h5 cursor-pointer" @click="handleToYearView">
                {{ monthValue }}
              </div>
            </div>
            <q-date
              class="date-disable-btn"
              dense
              ref="dateRef"
              v-model="monthValue"
              default-view="Years"
              emit-immediately
              @update:model-value="onUpdate"
              mask="YYYY-MM"
              minimal
              years-in-month-view
              :navigation-min-year-month="minYearMonth"
              :navigation-max-year-month="maxYearMonth"
            >
              <div class="row items-center justify-end date-action-btn">
                <q-btn
                  dense
                  flat
                  v-close-popup
                  class="btn--no-hover"
                  label="Close"
                  color="primary"
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { date, QDate } from 'quasar'
import { ref, computed } from 'vue'

const emit = defineEmits(['selectedDate'])
const props = defineProps({
    month: {
        type: String,
        required: true
    }
})
const monthValue = ref(props.month)
const dateRef = ref(null)
const currentView = ref('Years')

// computed
const minYearMonth = computed(() => {
    const oneYearAgo = date.subtractFromDate(new Date(), { month: 13 })
    return date.formatDate(oneYearAgo, 'YYYY/MM')
})

const maxYearMonth = computed(() => {
    const oneMonthAgo = date.subtractFromDate(new Date(), { month: 1 })
    return date.formatDate(oneMonthAgo, 'YYYY/MM')
})

const onUpdate = () => {
    emit('selectedDate', date.formatDate(new Date(monthValue.value), 'YYYY-MM'))
    setCalendarView('Months')
}

const handleToMonthView = () => {
    setCalendarView('Months')
}
const handleToYearView = () => {
    setCalendarView('Years')
}

const setCalendarView = (view) => {
    currentView.value = view
    dateRef.value?.setView(view)
}
</script>
