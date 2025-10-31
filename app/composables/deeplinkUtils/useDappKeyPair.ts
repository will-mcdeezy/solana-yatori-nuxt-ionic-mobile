import nacl from "tweetnacl"

export const useDappKeyPair = ref(nacl.box.keyPair());