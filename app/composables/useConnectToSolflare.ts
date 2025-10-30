import bs58 from "bs58";
import { App } from "@capacitor/app";
import { handleDeepLink } from "./deeplinkUtils/handleDeepLink";
import { useDappKeyPair } from "./deeplinkUtils/useDappKeyPair";


export const useConnectToSolflare = async () => {
    const params = new URLSearchParams({
        dapp_encryption_public_key: bs58.encode(useDappKeyPair.value.publicKey) as string,
        cluster: "mainnet-beta",
        // For solflare, app_url needs to be https:// universal associated deeplink, it will not work with URL scheme, but phantom will :) 
        app_url: "https://yatori.io/", // Look up universal linking documentation - this is where you set up AppIcon and all the meta data for your app
        redirect_link: "solana-yatori-nuxt-ionic-mobile:///onConnectSolflare", // Unique scheme - you set in either xcode or info for iOS, etc for Android
    });
    const solflareUrl = `https://solflare.com/ul/v1/connect?${String(params)}`;
    await navigateTo(solflareUrl, { external: true })
    App.addListener('appUrlOpen', handleDeepLink)
}