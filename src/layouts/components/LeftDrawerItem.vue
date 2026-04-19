<template>
  <div class="q-pa-none">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list>
      <q-item-label header class="q-py-md">Aktivitas</q-item-label>
      <q-item v-for="(item, index) in aktivitas_items" :key="index" clickable v-ripple>
        <q-item-section avatar>
          <!-- <q-icon :name="item.icon"></q-icon> -->
          <q-avatar color="blue-1" text-color="white">
            <q-icon color="primary" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label header class="q-py-md">Statistik</q-item-label>
      <q-item :inset-level="0.0" v-for="(item, index) in statistik_items" :key="index" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="blue-1" text-color="white">
            <q-icon color="primary" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>


      <q-item-label header class="q-py-md">Koleksi</q-item-label>
      <q-item v-for="(item, index) in koleksi_items" :key="index" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="blue-1" text-color="white">
            <q-icon color="primary" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>


      <q-item-label header class="q-py-md">Pengguna</q-item-label>
      <q-item v-for="(item, index) in pengguna_items" :key="index" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="blue-1" text-color="white">
            <q-icon color="primary" size="18px" :name="item.icon"></q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item?.title }}</q-item-label>
          <q-item-label caption lines="1">{{ item?.subtitle }}</q-item-label>
        </q-item-section>
      </q-item>



      <!-- <q-separator />
      <q-item-label header>Offline</q-item-label>

      <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item> -->
    </q-list>
  </div>
</template>

<script>
const aktivitas_items = [
  {
    id: 1,
    title: "TUGAS",
    subtitle: "Materi Latihan",
    icon: "fa-solid fa-table",
  },
];

const statistik_items = [
  {
    id: 2,
    title: "MODUL",
    subtitle: "Hasil Tugas",
    icon: "fa-solid fa-chart-line",
  },
  {
    id: 3,
    title: "QUIZ",
    subtitle: "Hasil Tugas",
    icon: "fa-solid fa-chart-line",
  },
];

const koleksi_items = [
  {
    id: 2,
    title: "MODUL",
    subtitle: "Bank Materi",
    icon: "fas fa-file-lines",
  },
  {
    id: 3,
    title: "QUIZ",
    subtitle: "Bank Materi",
    icon: "fa-solid fa-clipboard-question",
  },
];

const pengguna_items = [
  {
    id: 0,
    title: "SEKOLAH",
    subtitle: "Profil Informasi",
    icon: "fa-solid fa-house-user",
  },
  {
    id: 1,
    title: "STAKEHOLDER",
    subtitle: "Profil Informasi",
    icon: "fa-solid fa-house-user",
  },
  {
    id: 2,
    title: "ORANGTUA",
    subtitle: "Profil Informasi",
    icon: "fa-solid fa-house-user",
  },
  {
    id: 3,
    title: "SISWA",
    subtitle: "Profil Informasi",
    icon: "fa-solid fa-house-user",
  },
];

const offline = [
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    avatar: "avatar2.jpg",
  },
];

export default {
  setup() {
    return {
      aktivitas_items,
      statistik_items,
      koleksi_items,
      pengguna_items,
      offline,
    };
  },
};
</script>
