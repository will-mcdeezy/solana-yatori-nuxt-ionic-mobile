import nacl from "tweetnacl"
import bs58 from 'bs58'
import { useDecryptPayload } from "./useDecryptPayload"
import { useDappKeyPair } from "./useDappKeyPair"


export function handleConnectLink(event: any) {

    if (!event.url) {
        alert("dev-error: handleConnectLink ---> no event.url")
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
            const sharedSecretDapp = nacl.box.before(
                bs58.decode(params.get("solflare_encryption_public_key")!),
                useDappKeyPair.value.secretKey
            );

            const connectData = useDecryptPayload(
                params.get("data")!,
                params.get("nonce")!,
                sharedSecretDapp
            )

            alert(connectData.toString())


        }
    }


}