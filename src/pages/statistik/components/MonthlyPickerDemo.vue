<template>
  <div>
    <monthly-picker :month="selectedMonth" @selectedDate="handleDateSelected" />
    <p>Your selected month is: {{ selectedMonth }}</p>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import MonthlyPicker from "./MonthlyPicker.vue";

  const selectedMonth = ref("2024-08");

  const handleDateSelected = (date) => {
    selectedMonth.value = date;
  };
</script>
