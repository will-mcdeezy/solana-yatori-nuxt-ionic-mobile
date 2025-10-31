import nacl from "tweetnacl"
import { Buffer } from "buffer";
export const useEncryptPayload = (payload: any, sharedSecret?: Uint8Array) => {
    if (!sharedSecret) {
        return;
    }
    const nonce = nacl.randomBytes(24);
    const encryptedPayload = nacl.box.after(
        //@ts-ignore
        Buffer.from(JSON.stringify(payload)),
        nonce,
        sharedSecret
    );
    return {
        nonce: nonce,
        encryptedPayload: encryptedPayload
    };
};