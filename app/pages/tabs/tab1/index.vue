<script setup lang="ts">
import { getTokenAccount } from "~/composables/blockchainHttpsRequests/getTokenAccount";
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";
import { deeplinkConnectSuccessful } from "~/composables/toastRefs/useToast";

const getUsdcAddress = async () => {
  useSolflareSession.value.usdcAddress = await getTokenAccount(
    useSolflareSession.value.connectedAddress,
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  );
};
</script>

<template>
  <ion-page>
    <ion-header id="tabOneHeader"
      ><ion-toolbar><ion-title>tab 1</ion-title></ion-toolbar></ion-header
    >
    <ion-content>
      <div class="container">
        <div class="">
          <ion-text>YATORI QR TEMPLATE</ion-text>
        </div>
        <div class="solflare-connection-info">
          <div>
            <ion-text class="bold-text">connectedAddress</ion-text>
            <ion-text>{{ ` ${useSolflareSession.connectedAddress}` }}</ion-text>
          </div>
          <div>
            <ion-text class="bold-text">usdcAddress: </ion-text>
            <ion-text>{{ ` ${useSolflareSession.usdcAddress}` }}</ion-text>
          </div>
          <div>
            <ion-text class="bold-text">deeplinkPubkey: </ion-text>
            <ion-text>{{ ` ${useSolflareSession.deeplinkPubkey}` }}</ion-text>
          </div>
          <div>
            <ion-text class="bold-text">Session: </ion-text>
            <ion-text>{{ ` ${useSolflareSession.session}` }}</ion-text>
          </div>
          <div>
            <ion-text class="bold-text">isConnected: </ion-text>
            <ion-text>{{ ` ${useSolflareSession.isConnected} ` }}</ion-text>
          </div>
          <div></div>
        </div>

        <ion-button @click="useConnectToSolflare">{{
          useSolflareSession.isConnected
            ? "Connect to Solflare AGAIN"
            : "Connect to Solflare"
        }}</ion-button>
      </div>
    </ion-content>
    <ion-toast
      ref="deeplinkConnectSuccessful"
      position-anchor="tabOneHeader"
      position="top"
      swipe-gesture="vertical"
      color="success"
      message="Connected to Solflare!"
      @ionToastDidPresent="() => getUsdcAddress()"
      :duration="5000"
    ></ion-toast>
  </ion-page>
</template>

<style lang="css" scoped>
.solflare-connection-info {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* or 16px, adjust as needed */
}

.bold-text {
  font-weight: 700;
}
</style>
