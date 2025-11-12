export const getTokenAccount = async (owner: string, mintAddress: string) => {
    const config = useRuntimeConfig();
    try {


        // 🔥 GET YOUR YATORI ARROW API KEY HERE --> https://dashboard.yatori.io/signup
        const response: any = await $fetch(`https://arrow-api.yatori.io/v1/get-token-account`, {
            method: 'POST',
            body: {
                owner_address: owner,
                token_address: mintAddress
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.public.ARROW_API_KEY}`,
            },
        })
        alert(response.data as string)

        return response.data as string
    } catch (e) {
        alert(e)
    }
}