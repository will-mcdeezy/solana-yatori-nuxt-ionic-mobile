
export const useSolflareSession = ref<{
    deeplinkPubkey: string,
    session: string;
    connectedAddress: string;
    isConnected: boolean;

}>({
    deeplinkPubkey: '',
    session: '',
    connectedAddress: '',
    isConnected: false
});


