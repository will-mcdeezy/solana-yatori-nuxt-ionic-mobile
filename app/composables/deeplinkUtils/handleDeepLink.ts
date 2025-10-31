import nacl from "tweetnacl"
import bs58 from 'bs58'
import { useDecryptPayload } from "./useDecryptPayload"
import { useDappKeyPair } from "./useDappKeyPair"
import { useSolflareSession } from "./useSolflareSession"
import { deeplinkConnectSuccessfulToastRef } from "../toastRefs/useToast"
import { useProcessingTx } from "./useProcessingTx"

export function handleDeepLink(event: any) {
    if (!event.url) {
        alert("dev-error: handleDeepLink ---> no event.url")
        return
    }
    if (event.url) {
        const url = new URL(event.url)
        const params = url.searchParams

        if (params.get("errorCode")) {
            const error = Object.fromEntries([...params])
            const message =
                error?.errorMessage ??
                JSON.stringify(Object.fromEntries([...params]), null, 2)
            alert(`error: ${message}`)
            return
        }

        if (/onConnectSolflare/.test(url.pathname)) {

            const deeplinkPubKey = params.get("solflare_encryption_public_key")!

            const sharedSecretDapp = nacl.box.before(
                bs58.decode(deeplinkPubKey!),
                useDappKeyPair.value.secretKey
            );


            const connectData = useDecryptPayload(
                params.get("data")!,
                params.get("nonce")!,
                sharedSecretDapp
            )
            useSolflareSession.value.deeplinkPubkey = deeplinkPubKey
            useSolflareSession.value.session = connectData.session
            useSolflareSession.value.connectedAddress = connectData.public_key
            useSolflareSession.value.isConnected = true
            deeplinkConnectSuccessfulToastRef.value.$el.present()

        }

        if (/signAndSendUsdc/.test(url.pathname)) {
            useProcessingTx.value.waitingOnSolfalre = false

            const sharedSecretDapp = nacl.box.before(
                bs58.decode(useSolflareSession.value.deeplinkPubkey!),
                useDappKeyPair.value.secretKey
            );

            const signAndSendTransactionData = useDecryptPayload(
                params.get("data")!,
                params.get("nonce")!,
                sharedSecretDapp
            );

            const { signature } = signAndSendTransactionData
            useProcessingTx.value.latestSig = signature as string

        }
    }
}