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
          class="continue-button"
          @click="() => navigateTo('/tabs/tab1')"
          >Continue</ion-button
        >
      </div>
    </ion-content>
    <!-- Invisible footer that reserves tab bar space -->
  </ion-page>
</template>

<style lang="css" scoped>
/* For ion-button shadow parts css check out https://ionicframework.com/docs/api/button#css-shadow-parts */
.continue-button {
  margin-bottom: 48px;
}
</style>
