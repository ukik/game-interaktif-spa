<template>

  <div class="ribbon-demo">
    <span>DEMO</span>
  </div>
</template>


<style scoped>
.ribbon-demo {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
}

.ribbon-demo::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  width: 0;
  height: 0;

  border-style: solid;
  border-width: 200px 200px 0 0;
  border-color: #6980fe transparent transparent transparent;
}

.ribbon-demo span {
  position: absolute;
  top: 35px;
  left: 15px;

  color: white;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 2px;

  transform: rotate(-45deg);
}
</style>
