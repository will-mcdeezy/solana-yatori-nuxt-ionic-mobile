<script lang="ts" setup>
import { formatWalletAddress } from "~/composables/blockchainUtils/useBlockchainUtils";
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";
import { qrCodeModalRef } from "~/composables/modalRefs/useModal";
import {
  listeningToWs,
  setUpUsdcWebSocket,
  signatureWithYidConfirmed,
  wsUSDC,
} from "~/composables/websockets/useUsdcWebSocket";

const props = defineProps<{
  amount: string;
}>();

const currentYid = ref("");

const openYatoriTelegram = () => {
  navigateTo("https://t.me/+s4NedO5tmS0yM2Rh", { external: true });
};

const generateYid = () => {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.random().toString(36).substring(2, 6);
  return `${timestamp}${random}`;
};

const qrModalWillPresent = () => {
  currentYid.value = generateYid();
  setUpUsdcWebSocket(currentYid.value);
};

const dismissQrModal = () => {
  qrCodeModalRef.value.$el.dismiss();
};

const qrModalDidDismiss = () => {
  currentYid.value = "";
  wsUSDC?.close();
  listeningToWs.value = "closed";
  signatureWithYidConfirmed.value = false;
};
</script>

<template>
  <ion-modal
    ref="qrCodeModalRef"
    class=""
    @ionModalWillPresent="() => qrModalWillPresent()"
    @ionModalDidDismiss="() => qrModalDidDismiss()"
  >
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
        <UsdcQrCode
          v-if="listeningToWs === 'open' && !signatureWithYidConfirmed"
          class="qrCode"
          :amount="props.amount"
          :currentYid="currentYid"
          :include_rent="false"
        />
        <ion-spinner
          class="spinner"
          v-if="listeningToWs !== 'open' && !signatureWithYidConfirmed"
        />
        <ion-text v-if="signatureWithYidConfirmed" color="success"
          >CONFIRMED!</ion-text
        >
        <div class="questions-wrapper">
          <ion-text>Questions?👇 </ion-text
          ><ion-button class="" @click="openYatoriTelegram"
            >Join the Yatori Telegram Chat
          </ion-button>
        </div>
      </div>
      <div class=""></div>
    </ion-content>
  </ion-modal>
</template>

<style lang="css" scoped>
.qrCode {
  margin: auto;
}

.spinner {
  margin: auto;
}

.questions-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 40px;
  gap: 1rem;
}
</style>
