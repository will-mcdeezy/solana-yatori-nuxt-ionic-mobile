<script lang="ts" setup>
import { formatWalletAddress } from "~/composables/blockchainUtils.ts/useBlockchainUtils";
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";
import { qrCodeModalRef } from "~/composables/modalRefs/useModal";

const props = defineProps<{
  amount: string;
}>();

const openYatoriTelegram = () => {
  navigateTo("https://t.me/+s4NedO5tmS0yM2Rh", { external: true });
};

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
    <ion-content class="ion-padding"
      ><div class="container">
        <ion-text class=""
          >Scan to pay ${{ props.amount }} USDC to
          {{
            formatWalletAddress(useSolflareSession.connectedAddress)
          }}</ion-text
        >
        <UsdcQrCode class="qrCode" :amount="props.amount" />
        <div class="questions-wrapper">
          <ion-text>Questions?👇 </ion-text
          ><ion-button @click="openYatoriTelegram"
            >Join the Yatori Telegram Chat
          </ion-button>
        </div>
      </div>
      <div class="">
        <!-- <ion-spinner
          v-if="listeningToWs !== 'open'"
          class="w-12 h-12 my-auto"
        /> -->
      </div>
    </ion-content>
  </ion-modal>
</template>

<style lang="css" scoped>
.qrCode {
  margin: auto;
}

.questions-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  text-align: center;
  gap: 1rem;
}
</style>
