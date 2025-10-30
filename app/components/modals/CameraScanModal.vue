<script setup lang="ts">
import { BrowserQRCodeReader } from "@zxing/browser";
import { cameraScanModalRef } from "~/composables/modalRefs/useModal";
import { useProcessQrCode } from "~/composables/useProcessQrCode";

const currentSegment = ref("scan");
const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const scanFrameRef = ref<HTMLElement | null>(null);

let stream: MediaStream | null = null;
let reader: BrowserQRCodeReader | null = null;
let scanInterval: number | undefined;

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    const video = videoRef.value;
    const canvas = canvasRef.value;

    if (!video || !canvas) {
      return;
    }

    video.srcObject = stream;

    video.onloadedmetadata = async () => {
      await video.play();
      // ✅ Delay to let the layout & video paint catch up
      await new Promise((resolve) => setTimeout(resolve, 350));

      const width = video.videoWidth;
      const height = video.videoHeight;

      if (!width || !height) {
        return;
      }

      canvas.width = width;
      canvas.height = height;

      video.classList.add("active");

      reader = new BrowserQRCodeReader();

      scanInterval = window.setInterval(async () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, width, height);

        try {
          const result = await reader!.decodeFromCanvas(canvas);
          const value = result.getText();
          useProcessQrCode(value);
          stopCamera();
        } catch {
          // ignore scan errors
        }
      }, 400);
    };
  } catch (err) {
    alert("Camera error: " + err);
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
  if (scanInterval) {
    clearInterval(scanInterval);
    scanInterval = undefined;
  }
  reader = null;
};

const onCameraScanModalWillPresent = () => {
  startCamera();
};

const onCameraScanModalWillDismiss = () => {
  stopCamera();
};

const dismissScan = () => {
  cameraScanModalRef.value.$el.dismiss();
};
</script>

<template>
  <ion-modal
    ref="cameraScanModalRef"
    class="scan-qr-modal"
    @ionModalWillDismiss="() => onCameraScanModalWillDismiss()"
    @ionModalDidPresent="() => onCameraScanModalWillPresent()"
  >
    <ion-buttons class="scan-close">
      <div class="scan-close-btn" @click="() => dismissScan()">
        <ion-icon :icon="ioniconsClose" class="scan-close-icon" />
      </div>
    </ion-buttons>

    <ion-text class="scan-directions-text">Scan QR code to pay</ion-text>

    <video ref="videoRef" class="scan-video" muted playsinline></video>

    <canvas ref="canvasRef" class="scan-canvas"></canvas>

    <div ref="scanFrameRef" class="scan-frame"></div>
  </ion-modal>
</template>

<style scoped>
/* Modal background + full-bleed content */
ion-modal::part(content) {
  background: #000 !important;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  border-radius: 0;
  position: relative; /* anchor positioned children */
  overflow: hidden; /* keep video contained */
}

ion-modal::part(backdrop) {
  background: rgba(0, 0, 0, 0.8) !important;
}

/* Ensure Ionic theme var also reflects black */
.scan-qr-modal {
  --background: #000 !important;
}

/* Fullscreen camera preview */
.scan-video {
  position: absolute;
  inset: 0; /* top:0; right:0; bottom:0; left:0; */
  width: 100%;
  height: 100%;
  object-fit: cover; /* fill entire area while preserving aspect */
  z-index: 0;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.scan-video.active {
  opacity: 1;
}

/* Hidden canvas used for decoding frames */
.scan-canvas {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

/* Title text over the video */
.scan-directions-text {
  position: absolute;
  top: 140px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 24px;
  color: #ffffff;
  z-index: 10;
}

/* Close button (top-left) */
.scan-close {
  position: absolute;
  top: 56px;
  left: 16px;
  z-index: 20;
}

.scan-close-btn {
  width: 48px;
  height: 48px;
  border-radius: 9999px; /* pill */
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(153, 148, 148, 0.166);
  cursor: pointer;
}

.scan-close-btn:hover {
  background: rgba(25, 24, 24, 0.16);
}

.scan-close-btn:active {
  background: rgba(25, 24, 24, 0.18);
}

.scan-close-icon {
  color: #f9f9f9;
  font-size: 24px;
}

/* Framing box overlay */
.scan-frame {
  position: absolute;
  /* Centered square, with side padding; adjust top to your UI */
  top: 300px; /* align under any header/address region as you prefer */
  left: 50%;
  width: calc(100% - 64px); /* 32px padding on each side */
  aspect-ratio: 1 / 1;
  transform: translateX(-50%);
  border: 2px solid #ededed;
  border-radius: 30px;
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.4);
  z-index: 9;
  pointer-events: none;
}

/* Normalize any default Ion text transforms */
span {
  text-transform: none;
}
</style>
