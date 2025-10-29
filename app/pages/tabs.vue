<script setup lang="ts">
import QrCodeModal from "~/components/modals/QrCodeModal.vue";
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar id="footer" slot="bottom">
        <ion-tab-button tab="home" href="/tabs/tab1">
          <ion-icon :icon="ioniconsHome"></ion-icon>
        </ion-tab-button>
        <ion-tab-button tab="qr-code" href="/tabs/tab2">
          <ion-icon :icon="ioniconsKeypad"></ion-icon>
        </ion-tab-button>
        <ion-tab-button tab="transactions" href="/tabs/tab3">
          <ion-icon :icon="ioniconsList"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <QrCodeModal />
  </ion-page>
</template>
