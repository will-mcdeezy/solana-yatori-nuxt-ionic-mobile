export const getRecentBlockhash = async (networkForRPC: string) => {

    const config = useRuntimeConfig();
    const response: any = await $fetch(`${config.public.YUMI_ENDPOINT}/blockhash`, {
        method: 'POST',
        body: {
            network: networkForRPC
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.data as string
}