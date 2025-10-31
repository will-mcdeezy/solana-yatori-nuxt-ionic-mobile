
export const useProcessingTx = ref<{
    waitingOnSolfalre: boolean,
    waitingOnSigConfirmation: boolean;
    latestSig: string | null;
}>({
    waitingOnSolfalre: false,
    waitingOnSigConfirmation: false,
    latestSig: null
});
