<script lang="ts" setup>
import { getMemoTokenTransferData } from "~/composables/arrowApi/getMemoTokenTransferData";
import { formatWalletAddress } from "~/composables/blockchainUtils.ts/useBlockchainUtils";
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";
import { confirmTransactionModalRef } from "~/composables/modalRefs/useModal";
import { scannedQrData } from "~/composables/useProcessQrCode";

interface QrCodeData {
  to_address: string;
  amount: string;
  token_mint_address: string;
  include_rent: boolean;
  yid?: string; // optional if sometimes undefined
}

const txData = ref<QrCodeData | null>();

const waitingOnSolflare = ref(false);

const waitingOnConfirmed = ref(false);

const confirmTransactionModalWillPresent = () => {
  txData.value = JSON.parse(scannedQrData.value);
};

const dismissConfirmTransactionModal = () => {
  confirmTransactionModalRef.value.$el.dismiss();
};

const confirmTransactionModalDidDismiss = () => {
  waitingOnSolflare.value = false;
  waitingOnConfirmed.value = false;
  scannedQrData.value = false;
  txData.value = null;
};

// ARROW API -- See docs 👉 https://yatori.io/docs/token-transfer-memo
const prepareAndSendTx = async () => {
  let transaction;
  let baseAmount = Number(txData.value?.amount) * 1000000;
  if (!txData.value?.include_rent) {
    transaction = await getMemoTokenTransferData(
      useSolflareSession.value.connectedAddress,
      txData.value!.to_address,
      txData.value!.token_mint_address,
      baseAmount.toFixed(),
      txData.value!.yid!
    );

    alert(transaction);
  }
};
</script>

<template>
  <ion-modal
    ref="confirmTransactionModalRef"
    class=""
    @ionModalWillPresent="() => confirmTransactionModalWillPresent()"
    @ionModalDidDismiss="() => confirmTransactionModalDidDismiss()"
  >
    <ion-header class="">
      <ion-toolbar class="">
        <ion-title class="inter-semi-bold">Confirm Payment</ion-title>
        <ion-buttons class="">
          <ion-button
            @click="() => dismissConfirmTransactionModal()"
            fill="clear"
            class=""
          >
            Back
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding"
      ><div class="container">
        <ion-text class=""
          >Confirm to pay ${{ txData!.amount }} to
          {{ formatWalletAddress(txData!.to_address) }}
        </ion-text>

        <div class="">
          <ion-spinner
            class="spinner"
            v-if="waitingOnSolflare || waitingOnConfirmed"
          />
        </div>

        <ion-button @click="() => prepareAndSendTx()"
          >Confirm Payment in Solflare
        </ion-button>
      </div>
      <div class=""></div>
    </ion-content>
  </ion-modal>
</template>

<style lang="css" scoped>
.spinner {
  margin: auto;
}
</style>
