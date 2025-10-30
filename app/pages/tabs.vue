<script setup lang="ts">
import {
  connectToSolflareToastRef,
  noAmountToastRef,
} from "~/composables/toastRefs/useToast";
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
        <ion-tab-button tab="Scan" href="/tabs/tab3">
          <ion-icon :icon="ioniconsCamera"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <ion-toast
      ref="connectToSolflareToastRef"
      position-anchor="tabTwoHeader"
      position="top"
      swipe-gesture="vertical"
      message="Connect to Solflare before proceeding!"
      :duration="5000"
    ></ion-toast>
    <ion-toast
      ref="noAmountToastRef"
      position-anchor="tabTwoHeader"
      position="top"
      swipe-gesture="vertical"
      message="Enter amount before creating QR-CODE"
      :duration="5000"
    ></ion-toast>
  </ion-page>
</template>
