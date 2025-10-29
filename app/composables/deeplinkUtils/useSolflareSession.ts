
export const useSolflareSession = ref<{
    deeplinkPubkey: string,
    session: string;
    connectedAddress: string;
    usdcAddress: string,
    isConnected: boolean;

}>({
    deeplinkPubkey: '',
    session: '',
    connectedAddress: '',
    usdcAddress: '',
    isConnected: false
});


