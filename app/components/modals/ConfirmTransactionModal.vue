<script lang="ts" setup>
import bs58 from "bs58";

import { getMemoTokenTransferData } from "~/composables/arrowApi/getMemoTokenTransferData";
import { formatWalletAddress } from "~/composables/blockchainUtils/useBlockchainUtils";
import { useSolflareSession } from "~/composables/deeplinkUtils/useSolflareSession";
import { confirmTransactionModalRef } from "~/composables/modalRefs/useModal";
import { scannedQrData } from "~/composables/useProcessQrCode";
import { useDappKeyPair } from "~/composables/deeplinkUtils/useDappKeyPair";
import nacl from "tweetnacl";
import { useEncryptPayload } from "~/composables/deeplinkUtils/useEncryptPayload";
import { getRecentBlockhash } from "~/composables/blockchainHttpsRequests/getBlockhash";
import { useProcessingTx } from "~/composables/deeplinkUtils/useProcessingTx";
import { getMemoTokenTransferDataWithHash } from "~/composables/arrowApi/getMemoTokenTransferWithHashData";

interface QrCodeData {
  to_address: string;
  amount: string;
  token_mint_address: string;
  include_rent: boolean;
  yid?: string; // optional if sometimes undefined
}

const txData = ref<QrCodeData | null>();

const confirmTransactionModalWillPresent = () => {
  txData.value = JSON.parse(scannedQrData.value);
};

const dismissConfirmTransactionModal = () => {
  confirmTransactionModalRef.value.$el.dismiss();
};

const confirmTransactionModalDidDismiss = () => {
  // Clean up
  scannedQrData.value = false;
  txData.value = null;
  useProcessingTx.value.waitingOnSolfalre;
  useProcessingTx.value.waitingOnSigConfirmation;
  useProcessingTx.value.latestSig = null;
};

// ARROW API -- See docs 👉 https://yatori.io/docs/token-transfer-memo
// If using non-blockhash included transaction - need to import Transaction from solana/web3.js
// const prepareAndSendTx = async () => {
//   let transaction;
//   let baseAmount = Number(txData.value?.amount) * 1000000;
//   if (!txData.value?.include_rent) {
//     transaction = await getMemoTokenTransferData(
//       useSolflareSession.value.connectedAddress,
//       txData.value!.to_address,
//       txData.value!.token_mint_address,
//       baseAmount.toFixed(),
//       txData.value!.yid!
//     );

//     const deserializedTx = Transaction.from(transaction);

//     deserializedTx.recentBlockhash = await getRecentBlockhash("mainnet-beta");

//     const serializedTransaction = deserializedTx.serialize({
//       requireAllSignatures: false,
//     });

//     const payload = {
//       session: useSolflareSession.value.session,
//       // @ts-ignore
//       transaction: bs58.encode(serializedTransaction),
//     };

//     const sharedSecret = nacl.box.before(
//       bs58.decode(useSolflareSession.value.deeplinkPubkey!),
//       useDappKeyPair.value.secretKey
//     );

//     const encryptedResult = useEncryptPayload(payload, sharedSecret);
//     if (!encryptedResult) {
//       throw new Error(
//         "Error: encrypted result not returned. Check useEncryptPayload"
//       );
//     }

//     const params = new URLSearchParams({
//       dapp_encryption_public_key: bs58.encode(useDappKeyPair.value.publicKey),
//       cluster: "mainnet-beta",
//       nonce: bs58.encode(encryptedResult.nonce),
//       redirect_link: "solana-yatori-nuxt-ionic-mobile:///signAndSendUsdc",
//       payload: bs58.encode(encryptedResult.encryptedPayload),
//     });

//     const solflareUrl = `https://solflare.com/ul/v1/signAndSendTransaction?${String(
//       params
//     )}`;

//     useProcessingTx.value.waitingOnSolfalre = true;

//     return navigateTo(solflareUrl, { external: true });
//   }
// };

// ARROW API -- See docs 👉 https://yatori.io/docs/token-transfer-memo-hash
const prepareAndSendHashInlcudedTX = async () => {
  let transaction;
  let baseAmount = Number(txData.value?.amount) * 1000000;
  if (!txData.value?.include_rent) {
    transaction = await getMemoTokenTransferDataWithHash(
      useSolflareSession.value.connectedAddress,
      txData.value!.to_address,
      txData.value!.token_mint_address,
      baseAmount.toFixed(),
      txData.value!.yid!
    );

    const payload = {
      session: useSolflareSession.value.session,
      // @ts-ignore
      transaction: bs58.encode(transaction),
    };

    const sharedSecret = nacl.box.before(
      bs58.decode(useSolflareSession.value.deeplinkPubkey!),
      useDappKeyPair.value.secretKey
    );

    const encryptedResult = useEncryptPayload(payload, sharedSecret);
    if (!encryptedResult) {
      throw new Error(
        "Error: encrypted result not returned. Check useEncryptPayload"
      );
    }

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(useDappKeyPair.value.publicKey),
      cluster: "mainnet-beta",
      nonce: bs58.encode(encryptedResult.nonce),
      redirect_link: "solana-yatori-nuxt-ionic-mobile:///signAndSendUsdc",
      payload: bs58.encode(encryptedResult.encryptedPayload),
    });

    const solflareUrl = `https://solflare.com/ul/v1/signAndSendTransaction?${String(
      params
    )}`;

    useProcessingTx.value.waitingOnSolfalre = true;

    return navigateTo(solflareUrl, { external: true });
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
        <ion-title class="inter-semi-bold" v-if="!useProcessingTx.latestSig"
          >Confirm Payment</ion-title
        >
        <ion-title class="inter-semi-bold" v-if="useProcessingTx.latestSig"
          >Payment Sent</ion-title
        >
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
        <div>
          <a
            v-if="useProcessingTx.latestSig"
            :href="`https://explorer.solana.com/tx/${useProcessingTx.latestSig}`"
            target="_blank"
            rel="noopener noreferrer"
            style="color: #4c8ef7; text-decoration: underline"
          >
            View Transaction on Solana Explorer
          </a>
        </div>
        <div class="spinner-wrapper">
          <ion-text
            class=""
            v-if="
              !useProcessingTx.waitingOnSolfalre && !useProcessingTx.latestSig
            "
            >Confirm to pay ${{ txData!.amount }} to
            {{ formatWalletAddress(txData!.to_address) }}
          </ion-text>
          <ion-spinner
            class="spinner"
            v-if="
              useProcessingTx.waitingOnSolfalre && !useProcessingTx.latestSig
            "
          />
          <ion-text
            v-if="
              useProcessingTx.waitingOnSolfalre && !useProcessingTx.latestSig
            "
            >Confirm inside Solflare</ion-text
          >

          <ion-text v-if="useProcessingTx.latestSig">
            {{ useProcessingTx.latestSig }} <br /><br /><br />
            🔥 Time to start your logic for confirming transaction signature
            based on processed, confirmed, or finalized</ion-text
          >
        </div>
        <div class="button-wrapper">
          <ion-button
            v-if="
              !useProcessingTx.waitingOnSolfalre && !useProcessingTx.latestSig
            "
            @click="() => prepareAndSendHashInlcudedTX()"
            >Confirm Payment in Solflare
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>

<style lang="css" scoped>
.spinner-wraper {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 1rem;
}

.button-wrapper {
  display: flex;
  width: 100%;
  margin-bottom: 48px;
}

.button-wrapper ion-button {
  flex: 1; /* fill the row */
  width: 100%; /* belt & suspenders */
}
</style>
