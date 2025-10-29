<script setup lang="ts">
import QRCodeStyling from "qr-code-styling";
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";

const props = defineProps<{
  amount: string;
  currentYid: string;
  include_rent: boolean; // always false for demo, assumes USDC account already has rent for normal token transfer with memo transactions
}>();

const usdcQrRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // !important - The Yatori template only has logic for non create token account transactions
  // To detect if a "include_rent" transaction is needed, check if the associated token account has the minimum sol balance, and if it does not, change "include_rent" to true
  // If "include_rent" is true, then payer logic aka device that scan qr code will need to use ARROW-API Create Token Account + transfer with memo endpoint
  // For demo purposes, this template only works with receiving addresses that have a current token (USDC) balance or sol rent has already been deposited to the associated token account to activate it
  const qrCodeData = {
    to_address: useSolflareSession.value.connectedAddress,
    amount: props.amount,
    token_mint_address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    include_rent: props.include_rent,
    yid: props.currentYid,
  };

  const qr = new QRCodeStyling({
    width: 285,
    height: 285,
    data: JSON.stringify(qrCodeData),
    dotsOptions: {
      color: "#000",
      type: "dots",
    },
    cornersDotOptions: {
      type: "dot",
      color: "#000",
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      color: "#000",
    },
    backgroundOptions: {},
    image: "/USDC-token.png",
    imageOptions: {
      imageSize: 0.4,
      hideBackgroundDots: true,
      margin: 3,
    },
    qrOptions: {
      typeNumber: 0, // or 10, 12, etc
      errorCorrectionLevel: "L",
    },
  });

  if (usdcQrRef.value) {
    qr.append(usdcQrRef.value);
  }
});
</script>

<template>
  <div ref="usdcQrRef" />
</template>

<style lang="css" scoped>
.qr-wrapper {
  border-radius: 30px;
}
</style>
