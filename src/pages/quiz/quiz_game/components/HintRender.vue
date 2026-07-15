<template>
  <q-card flat bordered class="q-pa-sm">
    <slot></slot>
  </q-card>
</template>
<style>
#hint {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: #333;
  background: #fff;
  /* max-width: 900px; */
  margin: 0 auto;
}

#hint * {
  box-sizing: border-box;
}

#hint h2 {
  margin: 30px 0 15px;
  padding: 12px 18px;
  background: #1976d2;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  border-radius: 8px;
}

#hint h3 {
  margin: 18px 0 8px;
  color: #1565c0;
  font-size: 17px;
  font-weight: 700;
}

#hint p {
  margin: 0 0 15px;
  text-align: justify;
}

#hint ul {
  margin: 0 0 20px 25px;
  padding: 0;
}

#hint li {
  margin-left: 8px;
  margin-bottom: 8px;
}

#hint strong {
  color: #0d47a1;
}

#hint em {
  color: #ef6c00;
  font-style: normal;
  font-weight: bold;
}

#hint hr {
  margin: 35px 0;
  border: none;
  border-top: 2px dashed #d5d5d5;
}

#hint h3 + p,
#hint h3 + ul {
  padding: 12px 16px;
  border-left: 5px solid #2196f3;
  background: #f8fbff;
  border-radius: 6px;
}

#hint h3:nth-of-type(4) + p {
  border-left-color: #43a047;
  background: #f1f8e9;
}

#hint ul:last-child {
  background: #fff8e1;
  border-left: 5px solid #ffb300;
  padding: 15px 20px;
  border-radius: 6px;
}

#hint h2:last-of-type {
  background: #ff9800;
}

#hint h2:first-child {
  margin-top: 0;
}

#hint img {
  max-width: 100%;
  height: auto;
}

#hint table {
  width: 100%;
  border-collapse: collapse;
}

#hint table td,
#hint table th {
  padding: 8px;
  border: 1px solid #ddd;
}

@media (max-width: 768px) {
  #hint {
    font-size: 14px;
  }

  #hint h2 {
    font-size: 19px;
    padding: 10px 14px;
  }

  #hint h3 {
    font-size: 16px;
  }
}
</style>
