<template>
  <div v-if="get_aktivitas_payload_status_durasi?.status == 'selesai'" class="ribbon" :class="[`pos-${position}`, `shape-${shape}`]" :style="cssVars">
    <div class="ribbon-shape">
      <span class="ribbon-text">
        <slot>TIME'S UP</slot>
      </span>
    </div>
  </div>
</template>

<script setup>
import { mapState } from "pinia";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";
import { computed } from "vue";

const props = defineProps({
  position: {
    type: String,
    default: "top-right",
  },

  shape: {
    type: String,
    default: "skew",
  },

  backgroundColor: {
    type: String,
    default: "#6980fe",
  },

  textColor: {
    type: String,
    default: "#ffffff",
  },

  size: {
    type: String,
    default: "200px",
  },

  bandSize: {
    type: String,
    default: "62px",
  },

  fontSize: {
    type: String,
    default: "20px",
  },
});

const cssVars = computed(() => ({
  "--size": props.size,
  "--band-size": props.bandSize,
  "--color": props.backgroundColor,
  "--text-color": props.textColor,
  "--font-size": props.fontSize,
}));
</script>

<script>
export default {
  computed: {
    ...mapState(useLmsTugasStore, ['get_aktivitas_payload_status_durasi']),
  },
  mounted() {
    console.log('useLmsTugasStore', this.get_aktivitas_payload_status_durasi)
  }
};
</script>

<style scoped>
/* =========================================================
   ROOT
========================================================= */

.ribbon {
  --size: 200px;
  --band-size: 62px;
  --color: #6980fe;
  --text-color: white;
  --font-size: 20px;
  --offset: 38px;

  position: relative;
  width: var(--size);
  height: var(--size);

  overflow: hidden;
}

/* =========================================================
   SHAPE WRAPPER
========================================================= */

.ribbon-shape {
  position: absolute;
}

/* =========================================================
   TEXT
========================================================= */

.ribbon-text {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--text-color);
  font-size: var(--font-size);
  font-weight: bold;
  letter-spacing: 2px;
  white-space: nowrap;

  z-index: 2;
}

/* =========================================================
   SHAPE : SKEW
========================================================= */

.shape-skew .ribbon-shape {
  width: 280px;
  height: var(--band-size);

  background: var(--color);
}

/* ---------- TOP RIGHT ---------- */

.pos-top-right.shape-skew .ribbon-shape {
  top: var(--offset);
  right: -72px;

  transform: rotate(45deg);
}

/* ---------- TOP LEFT ---------- */

.pos-top-left.shape-skew .ribbon-shape {
  top: var(--offset);
  left: -72px;

  transform: rotate(-45deg);
}

/* ---------- BOTTOM RIGHT ---------- */

.pos-bottom-right.shape-skew .ribbon-shape {
  bottom: var(--offset);
  right: -72px;

  transform: rotate(-45deg);
}

/* ---------- BOTTOM LEFT ---------- */

.pos-bottom-left.shape-skew .ribbon-shape {
  bottom: var(--offset);
  left: -72px;

  transform: rotate(45deg);
}

/* =========================================================
   SHAPE : TRIANGLE
========================================================= */

.shape-triangle .ribbon-shape {
  width: 100%;
  height: 100%;
  background: var(--color);
}

/* TOP RIGHT */
.pos-top-right.shape-triangle .ribbon-shape {
  clip-path: polygon(100% 0, 0 0, 100% 100%);
}

/* TOP LEFT */
.pos-top-left.shape-triangle .ribbon-shape {
  clip-path: polygon(0 0, 0 100%, 100% 0);
}

/* BOTTOM RIGHT */
.pos-bottom-right.shape-triangle .ribbon-shape {
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

/* BOTTOM LEFT */
.pos-bottom-left.shape-triangle .ribbon-shape {
  clip-path: polygon(0 0, 100% 100%, 0 100%);
}

/* =========================================================
   TRIANGLE TEXT POSITION
========================================================= */

/* TOP RIGHT */
.pos-top-right.shape-triangle .ribbon-text {
  top: 30px;
  left: 65px;

  transform: rotate(45deg);
}

/* TOP LEFT */
.pos-top-left.shape-triangle .ribbon-text {
  top: 30px;
  left: -65px;

  transform: rotate(-45deg);
}

/* BOTTOM RIGHT */
.pos-bottom-right.shape-triangle .ribbon-text {
  bottom: 30px;
  left: 65px;

  transform: rotate(-45deg);
}

/* BOTTOM LEFT */
.pos-bottom-left.shape-triangle .ribbon-text {
  bottom: 30px;
  left: -65px;

  transform: rotate(45deg);
}

/* =========================================================
   SHAPE : CLIP
========================================================= */

.shape-clip .ribbon-shape {
  width: 100%;
  height: 100%;

  background: var(--color);
}

/* TOP RIGHT */
.pos-top-right.shape-clip .ribbon-shape {
  clip-path: polygon(100% 0, 20% 0, 100% 80%);
}

/* TOP LEFT */
.pos-top-left.shape-clip .ribbon-shape {
  clip-path: polygon(0 0, 0 80%, 80% 0);
}

/* BOTTOM RIGHT */
.pos-bottom-right.shape-clip .ribbon-shape {
  clip-path: polygon(100% 20%, 100% 100%, 20% 100%);
}

/* BOTTOM LEFT */
.pos-bottom-left.shape-clip .ribbon-shape {
  clip-path: polygon(0 20%, 80% 100%, 0 100%);
}

/* =========================================================
   CLIP TEXT
========================================================= */

.pos-top-right.shape-clip .ribbon-text {
  top: 28px;
  left: 58px;

  transform: rotate(45deg);
}

.pos-top-left.shape-clip .ribbon-text {
  top: 28px;
  left: -58px;

  transform: rotate(-45deg);
}

.pos-bottom-right.shape-clip .ribbon-text {
  bottom: 28px;
  left: 58px;

  transform: rotate(-45deg);
}

.pos-bottom-left.shape-clip .ribbon-text {
  bottom: 28px;
  left: -58px;

  transform: rotate(45deg);
}
</style>
