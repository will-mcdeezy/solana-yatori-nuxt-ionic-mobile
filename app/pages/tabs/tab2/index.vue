<script setup lang="ts">
import NumberPad from "~/components/NumberPad.vue";
</script>

<template>
  <ion-page>
    <ion-header id="headerAnchor"
      ><ion-toolbar><ion-title>tab 2</ion-title></ion-toolbar></ion-header
    >
    <ion-content>
      <div class="container">
        <NumberPad />
      </div>
    </ion-content>
  </ion-page>
</template>
