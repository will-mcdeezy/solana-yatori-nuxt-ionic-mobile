<script setup lang="ts">
import QRCodeStyling from "qr-code-styling";
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";

const props = defineProps<{
  amount: string;
  currentYid: string;
}>();

const usdcQrRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const qrCodeData = {
    to_address: useSolflareSession.value.connectedAddress,
    amount: props.amount,
    token_mint_address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    include_rent: false,
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
