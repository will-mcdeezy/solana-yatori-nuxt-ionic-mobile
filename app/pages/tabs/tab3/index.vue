<script setup lang="ts">
import CameraScanModal from "~/components/modals/CameraScanModal.vue";
import ConfirmTransactionModal from "~/components/modals/ConfirmTransactionModal.vue";
import { cameraScanModalRef } from "~/composables/modalRefs/useModal";

const openCameraScanModal = () => {
  cameraScanModalRef.value.$el.present();
};
</script>

<template>
  <ion-page>
    <ion-router-outlet />
    <ion-header
      ><ion-toolbar><ion-title>tab 3</ion-title></ion-toolbar></ion-header
    >
    <ion-content>
      <div class="container">
        <div><ion-text>Scan</ion-text></div>
        <div></div>

        <ion-button @click="openCameraScanModal">Scan a QR code</ion-button>
      </div>
    </ion-content>
    <CameraScanModal />
    <ConfirmTransactionModal />
  </ion-page>
</template>
