export const getTokenAccount = async (owner: string, mintAddress: string) => {
    const config = useRuntimeConfig();
    // TODO: ERROR HANDLING
    const response: any = await $fetch(`https://kouba.io/get-token-account`, {
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
    return response.data as string
}