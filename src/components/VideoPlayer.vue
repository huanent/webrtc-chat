<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

interface Props {
  stream: MediaStream;
  fit?: string;
  muted?: boolean;
  mirror?: boolean;
  float?: boolean;
}

const props = withDefaults(defineProps<Props>(), { fit: "cover" });
const video = ref<HTMLVideoElement>();
const player = ref<HTMLDivElement>();
let offset = { x: 0, y: 0 };

watch(
  () => props.float,
  (value) => {
    if (!player.value) return;
    player.value.style.top = value ? "15px" : "0";
    player.value.style.left = value ? "15px" : "0";
  }
);

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
    class="absolute transition-all h-full w-full"
    :draggable="float"
    :class="{ float: float }"
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

.float {
  width: 150px;
  height: 100px;
  top: 15px;
  left: 15px;
  border-radius: 5%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.397) 5px 5px 10px;
}
</style>
