<script lang="ts">


</script>

<template>
    <ion-page>
        <ion-header><ion-toolbar>
<ion-title>Solana dApp</ion-title>

        </ion-toolbar></ion-header>
        <ion-content class="ion-padding">
            <div class="container tab-one-container flex justify-around">
            <ion-text>Welcome to Yatori's nuxt/ionic dApp template!</ion-text>
            <ion-text class="">Get Started by clicking the button below</ion-text>
            <ion-button @click="() => navigateTo('/tabs/tab1')">Continue</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<style lang="css" scoped>
.tab-one-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

</style>