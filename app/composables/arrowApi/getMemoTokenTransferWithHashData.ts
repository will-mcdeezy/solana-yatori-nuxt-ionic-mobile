export const getMemoTokenTransferDataWithHash = async (from: string, to: string, mintAddress: string, amount: string, yid: string) => {
    const config = useRuntimeConfig();
    // BLOCKHASH INCLUDED ENDPOINT!
    try {
        // 🔥 GET YOUR YATORI ARROW API KEY HERE --> https://dashboard.yatori.io/signup
        const response: any = await $fetch(`https://arrow-api.yatori.io/v1/token-transfer-memo-hash`, {
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
                Authorization: `Bearer ${config.public.ARROW_API_KEY}`,
            },
        })
        return response.data
    } catch (e) {
        alert(e)
    }

}