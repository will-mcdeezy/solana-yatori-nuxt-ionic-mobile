<script setup lang="ts"></script>

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
        <div><ion-button>Scan a QR code</ion-button></div>
      </div>
    </ion-content>
    <!-- MODAL TO GO HERE -->
  </ion-page>
</template>
