<script setup lang="ts">
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { qrCodeModalRef } from "~/composables/modalRefs/useModal";
import {
  connectToSolflareToastRef,
  noAmountToastRef,
} from "~/composables/toastRefs/useToast";
import QrCodeModal from "./modals/QrCodeModal.vue";
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";

const amount = ref<string>("0");

const numberPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

const handleInput = (input: string) => {
  vibrateKeypad();

  if (input === "⌫") {
    amount.value = amount.value.slice(0, -1);
  } else if (input === "." && amount.value.includes(".")) {
    return;
  } else {
    const newAmount = amount.value + input;

    if (isValidInput(newAmount)) {
      amount.value = newAmount;
      checkZeroAmount();
    }
  }
};

const checkZeroAmount = () => {
  const lastElement = amount.value.length - 1;
  if (amount.value === "" || amount.value === "0") {
    amount.value = "0";
  } else if (amount.value[0] === "0" && amount.value[1] !== ".") {
    amount.value = `${amount.value.slice(1)}`;
  } else if (
    amount.value[lastElement] === "." &&
    amount.value[lastElement - 1] === "."
  ) {
    amount.value = amount.value.slice(0, -1);
  } else if (Number(amount.value) > 9999.99) {
    amount.value = "9999.99";
  } else {
    limitDecimalPlaces(amount.value);
  }
};

function limitDecimalPlaces(strValue: string, decimalPlaces = 2) {
  // Find the decimal point
  const decimalIndex = strValue.indexOf(".");

  // If there's no decimal point or not enough decimal places, return as is
  if (
    decimalIndex === -1 ||
    strValue.length - decimalIndex - 1 <= decimalPlaces
  ) {
    return (amount.value = strValue);
  }

  // Truncate the string at the desired number of decimal places
  amount.value = strValue.slice(0, decimalIndex + decimalPlaces + 1);
}

const vibrateKeypad = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

const isValidInput = (input: string) => {
  const parts = input.split(".");
  if (parts.length > 2) return false;
  if (parts[1] && parts[1].length > 2) return false;
  return !isNaN(parseFloat(input));
};

const presentQrCodeModal = () => {
  // first check solflare
  if (!useSolflareSession.value.isConnected) {
    connectToSolflareToastRef.value.$el.present();
    return;
  }

  // then check amount
  if (amount.value === "0") {
    noAmountToastRef.value.$el.present();
    return;
  }

  qrCodeModalRef.value.$el.present();
};
</script>

<template>
  <div>
    <ion-input
      @paste.prevent
      class=""
      v-model="amount"
      type="tel"
      inputmode="none"
      :value="amount"
      :onchange="!amount ? (amount = '0') : null"
    >
    </ion-input>
    <ion-text>USDC</ion-text>
  </div>
  <div class="number-pad-grid">
    <ion-button
      v-for="char in numberPad"
      :key="char"
      @click="() => handleInput(char)"
    >
      {{ char }}
    </ion-button>
  </div>
  <ion-button @click="presentQrCodeModal">Create QR code</ion-button>
  <ion-toast
    ref="connectToSolflareToastRef"
    position-anchor="headerAnchor"
    position="top"
    swipe-gesture="vertical"
    message="Connect to Solflare before proceeding!"
    :duration="5000"
  ></ion-toast>
  <ion-toast
    ref="noAmountToastRef"
    position-anchor="headerAnchor"
    position="top"
    swipe-gesture="vertical"
    message="Enter amount before creating QR-CODE"
    :duration="5000"
  ></ion-toast>
  <QrCodeModal :amount="amount" />
</template>

<style lang="css" scoped>
.number-pad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.number-pad-grid ion-button {
  width: 100%;
  height: 100%;
}
</style>
