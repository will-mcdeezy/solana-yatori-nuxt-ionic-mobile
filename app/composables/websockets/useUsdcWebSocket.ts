import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { useSolflareSession } from "../deeplinkUtils/useSolflareSession";


const extractYidFromMemo = (memoString: string) => {
    const yidMatch = memoString.match(/yid:([^"|^\s]+)/);
    return yidMatch ? yidMatch[1] : null;
};

const compareYids = (logsNotification: any, qrCodeYid: string) => {
    try {
        // Extract the memo content from the log string
        const memoContent = logsNotification.match(/"([^"]+)"/)[1];

        // Extract YID from memo
        const memoYid = extractYidFromMemo(memoContent);

        // Compare YIDs and update ref if they match
        if (memoYid && memoYid === qrCodeYid) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error comparing YIDs:", error);
        return false;
    }
};

export let wsUSDC: WebSocket | null = null;

export const listeningToWs = ref<"open" | "error" | "closed" | "waiting">("closed");

export const subscriptionId = ref(null);

export const signatureWithYidConfirmed = ref(false)

export function setUpUsdcWebSocket(currentYid: string) {
    const config = useRuntimeConfig();
    const url = config.public.ZANSHIN_WS as string;

    if (wsUSDC) {
        wsUSDC.close();
    }

    wsUSDC = new WebSocket(url);

    wsUSDC.addEventListener("open", function open() {
        // Subscribe to log
        const subscribeMessage = {
            address: useSolflareSession.value.usdcAddress,
        };

        if (!wsUSDC) {
            // TODO: Create refresh button for user to open
            return;
        }
        wsUSDC.send(JSON.stringify(subscribeMessage));
    });

    wsUSDC.addEventListener("message", function incoming(data) {
        const parsedData = JSON.parse(data.data as string);

        // Store the subscription ID when we receive the initial response
        if (
            parsedData.result !== undefined &&
            typeof parsedData.result === "number"
        ) {
            subscriptionId.value = parsedData.result;
            listeningToWs.value = "open";
        }

        if (parsedData.method === "logsNotification") {
            const logMessages = parsedData.params.result.value.logs;

            // 🔍 NEW: Dynamically search for the memo log that contains both "arrow-api|" and the currentYid
            const memoLog = logMessages.find(
                (log: string) =>
                    log.startsWith("Program log: Memo") &&
                    log.includes("arrow-api|") &&
                    log.includes(`yid:${currentYid}`)
            );

            // Compare YID if log is found
            if (memoLog && compareYids(memoLog, currentYid)) {
                signatureWithYidConfirmed.value = true;
                setTimeout(async () => {
                    await Haptics.impact({ style: ImpactStyle.Heavy });
                }, 1450);
                const unsubMessage = {
                    jsonrpc: "2.0",
                    id: 2,
                    method: "logsUnsubscribe",
                    params: [subscriptionId.value],
                };

                if (!wsUSDC) {
                    // TODO: Create refresh button or warning if for some reason websocket loses state
                    return;
                }

                wsUSDC.send(JSON.stringify(unsubMessage));
            }
        }
    });

    wsUSDC.addEventListener("error", function error(err) {
        console.error("WebSocket Error:", err);
        listeningToWs.value = "error";
        setTimeout(() => setUpUsdcWebSocket(currentYid), 1000);
    });

    wsUSDC.addEventListener("close", function close(event) {
        console.log("Disconnected from USDC WebSocket");
        listeningToWs.value = "closed";
    });
}