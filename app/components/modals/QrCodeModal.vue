<script lang="ts" setup>
import { qrCodeModalRef } from "~/composables/modalRefs/useModal";

const dismissQrModal = () => {
  qrCodeModalRef.value.$el.dismiss();
};

//     @ionModalDidDismiss="() => ()"
//     @ionModalWillDismiss="() => ()"
//     @ionModalWillPresent="() => ()"
</script>

<template>
  <ion-modal ref="qrCodeModalRef" class="">
    <ion-header class="">
      <ion-toolbar class="">
        <ion-title class="inter-semi-bold">Scan QR</ion-title>
        <ion-buttons class="">
          <ion-button @click="() => dismissQrModal()" fill="clear" class="">
            Back
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding"> </ion-content>
  </ion-modal>
</template>
