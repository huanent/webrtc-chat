<script lang="ts" setup>
import { ref, watch } from "vue";

interface Props {
  stream: MediaStream;
  fit?: string;
  muted?: boolean;
  mirror?: boolean;
}

withDefaults(defineProps<Props>(), { fit: "cover" });
const video = ref<HTMLVideoElement>();
const player = ref<HTMLDivElement>();
let offset = { x: 0, y: 0 };

const dragstart = (e: any) => {
  const rect = e.target.getBoundingClientRect();
  offset.x = e.x - rect.x;
  offset.y = e.y - rect.y;
};

const dragend = (e: any) => {
  e.target.style.top = e.y - offset.y + "px";
  e.target.style.left = e.x - offset.x + "px";
};
</script>

<template>
  <div
    ref="player"
    class="relative transition-all h-full w-full"
    @dragstart="dragstart"
    @dragend="dragend"
  >
    <video
      ref="video"
      class="h-full w-full"
      autoplay
      :muted="muted"
      :style="{ objectFit: fit } as any"
      :class="{ mirror: mirror }"
      :srcObject="stream"
    ></video>
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
