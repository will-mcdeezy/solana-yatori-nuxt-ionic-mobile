export function formatWalletAddress(address: string, startLength: number = 4, endLength: number = 4): string {
    if (address.length <= startLength + endLength) {
        return address;
    }
    const start = address.slice(0, startLength);
    const end = address.slice(-endLength);
    return `${start}...${end}`;
}