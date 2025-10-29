<script setup lang="ts">
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";
</script>

<template>
  <ion-page>
    <ion-header
      ><ion-toolbar><ion-title>tab 1</ion-title></ion-toolbar></ion-header
    >
    <ion-content>
      <div class="container">
        <div class="">Top wrapper</div>
        <div class="solflare-connection-info">
          <ion-text>{{
            `connectedAddress: ${useSolflareSession.connectedAddress}`
          }}</ion-text>
          <ion-text>{{
            `deeplinkPubkey: ${useSolflareSession.deeplinkPubkey}`
          }}</ion-text>
          <ion-text>{{ `Session:  ${useSolflareSession.session}` }}</ion-text>
          <ion-text>{{
            `IsConnected:  ${useSolflareSession.isConnected} `
          }}</ion-text>
        </div>

        <ion-button @click="useConnectToSolflare">{{
          useSolflareSession.isConnected
            ? "Connect to Solflare AGAIN"
            : "Connect to Solflare"
        }}</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="css" scoped>
.solflare-connection-info {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* or 16px, adjust as needed */
}
</style>
