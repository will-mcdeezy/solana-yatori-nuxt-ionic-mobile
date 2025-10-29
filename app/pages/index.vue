<script lang="ts"></script>

<template>
  <ion-page>
    <ion-header
      ><ion-toolbar>
        <ion-title>Solana dApp</ion-title>
      </ion-toolbar></ion-header
    >
    <ion-content class="ion-padding">
      <div class="container">
        <div class=""><ion-text>Howdy 🤠</ion-text></div>
        <div class="">
          <ion-text
            >Welcome to Yatori's nuxt/ionic dApp template! Get Started by
            clicking the button below 👇</ion-text
          >
        </div>
        <ion-button
          class="bottom-button"
          @click="() => navigateTo('/tabs/tab1')"
          >Continue</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="css" scoped></style>
