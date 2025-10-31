import { cameraScanModalRef, confirmTransactionModalRef } from "./modalRefs/useModal"

export const scannedQrData = ref()

export const useProcessQrCode = (scanedData: string) => {
    scannedQrData.value = scanedData
    cameraScanModalRef.value.$el.dismiss()
    // TODO - Validation for correct data - throw error toast if not your correct app data!
    confirmTransactionModalRef.value.$el.present()

}