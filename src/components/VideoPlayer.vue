<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  stream: MediaStream;
  fit?: string;
  muted?: boolean;
  mirror?: boolean;
  label?: string;
}

withDefaults(defineProps<Props>(), { fit: "cover", mirror: true, label: "" });
const video = ref<HTMLVideoElement>();
const player = ref<HTMLDivElement>();
</script>

<template>
  <div ref="player" class="relative transition-all h-full w-full">
    <video
      ref="video"
      class="h-full w-full"
      autoplay
      :muted="muted"
      :style="{ objectFit: fit } as any"
      :class="{ mirror: mirror }"
      :srcObject="stream"
    ></video>
    <div
      v-if="label"
      class="absolute text-center p-2 inset-0 top-auto bg-black/20 text-white"
    >
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.player::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
  background: black;
}

.mirror {
  transform: rotateY(180deg);
}
</style>
