export const getMemoTokenTransferData = async (from: string, to: string, mintAddress: string, amount: string, yid: string) => {
    const config = useRuntimeConfig();

    // 🔥 GET YOUR YATORI ARROW API KEY HERE --> https://dashboard.yatori.io/signup
    const response: any = await $fetch(`https://arrow-api.yatori.io/v1/token-transfer-memo`, {
        method: 'POST',
        body: {
            from_address: from,
            to_address: to,
            token_mint_address: mintAddress,
            amount: amount,
            yid: yid,
        },
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.public.ARROW_API_KEY
        },
    })
    // TODO: ERROR HANDLING
    return response.data
}