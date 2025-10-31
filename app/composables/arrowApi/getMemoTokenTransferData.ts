export const getMemoTokenTransferData = async (from: string, to: string, mintAddress: string, amount: string, yid: string) => {
    const config = useRuntimeConfig();
    // TODO: ERROR HANDLING
    const response: any = await $fetch(`https://kouba.io/memo-token-transfer`, {
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
    return response.data
}