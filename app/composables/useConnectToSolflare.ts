import bs58 from "bs58";
import { App } from "@capacitor/app";
import { handleConnectLink } from "./deeplinkUtils/handleConnectLink";
import { useDappKeyPair } from "./deeplinkUtils/useDappKeyPair";


export const useConnectToSolflare = async () => {
    const params = new URLSearchParams({
        dapp_encryption_public_key: bs58.encode(useDappKeyPair.value.publicKey),
        cluster: "mainnet-beta",
        app_url: "solana-yatori-nuxt-ionic-mobile://", // Register your own unique scheme here on xcode / Android studio
        redirect_link: "solana-yatori-nuxt-ionic-mobile://onConnectSolflare", // Register your own unique scheme here on xcode / Android studio
    });
    const solflareURL = `https://solflare.com/ul/v1/connect?${String(params)}`;
    await navigateTo(solflareURL, { external: true })
    App.addListener('appUrlOpen', handleConnectLink)
}