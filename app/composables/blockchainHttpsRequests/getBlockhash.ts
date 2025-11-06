export const getRecentBlockhash = async (networkForRPC: string) => {
    const config = useRuntimeConfig();

    // 🔥 See the deployable YUMI MOBILE DEVELOPMENT SERVER CODE HERE --> https://github.com/will-mcdeezy/yumi
    const response: any = await $fetch(`${config.public.YUMI_ENDPOINT}/blockhash`, {
        method: 'POST',
        body: {
            network: networkForRPC
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    // TODO: ERROR HANDLING
    return response.data as string
}