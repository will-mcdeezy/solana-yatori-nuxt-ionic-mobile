export const getTokenAccount = async (owner: string, mintAddress: string) => {
    const config = useRuntimeConfig();

    // 🔥 GET YOUR YATORI ARROW API KEY HERE --> https://dashboard.yatori.io/signup
    const response: any = await $fetch(`https://arrow-api.yatori.io/v1/get-token-account`, {
        method: 'POST',
        body: {
            owner_address: owner,
            token_address: mintAddress
        },
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.public.ARROW_API_KEY
        },
    })
    // TODO: ERROR HANDLING
    return response.data as string
}