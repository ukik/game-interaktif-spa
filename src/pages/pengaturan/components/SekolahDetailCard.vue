<template>
  <q-card flat bordered>
    <!-- <q-card-actions align="left">
        <div class="text-h6">PROFIL</div>
      </q-card-actions> -->

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
    >
      <q-tab name="school" label="SEKOLAH" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="school" class="q-pa-none">
        <template v-if="item?.id">
          <q-card-actions align="center" class="q-py-md">
            <!-- <q-parallax :height="250"> -->
            <q-avatar size="240px">
              <q-img
                :src="item?.url_image"
                @error="item.url_image = global_url_image"
                error-src="global_url_image"
              />
            </q-avatar>
            <!-- <div class="col-12 text-center">
                <q-chip class="q-mt-md" color="primary" text-color="white">ID: {{ item?.id }}</q-chip>
              </div> -->
            <!-- </q-parallax> -->
          </q-card-actions>
          <q-separator></q-separator>
          <q-card-section class="q-pa-sm">
            <q-list separator bordered class="text-dark">
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>ID</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{
                    item?.id
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Nama</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{
                    item?.nama
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Email</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{
                    item?.email
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Telpon</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{
                    item?.telpon
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Whatsapp</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{
                    item?.whatsapp
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>NPSN</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{
                    item?.npsn
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Jenjang</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{
                    item?.jenjang
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Provinsi</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark text-capitalize">{{
                    item?.provinsi
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Kota</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark text-capitalize">{{
                    item?.kota
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Kecamatan</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark text-capitalize">{{
                    item?.kecamatan
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Kode Pos</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark text-capitalize">{{
                    item?.kode_pos
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-item-label lines="1" caption>Alamat</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-dark text-right">{{
                    item?.alamat
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label lines="1" caption>Dibuat</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{
                    item?.created_at_human
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </template>
        <EmptyBlock v-else></EmptyBlock>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>


<script>
export default {
  props: ['item'],
  data() {
    return {
      tab: "school",
    };
  },
}
</script>
