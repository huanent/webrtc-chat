<template>
  <div class="player">
    <video ref="video" autoplay muted :style="{ objectFit: fit }"></video>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    stream: {
      type: MediaStream,
      required: false,
    },
    fit: {
      type: String,
      default: "cover",
    },
  },
  setup() {
    const video = ref(null);

    onMounted(async () => {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      video.value.srcObject = stream;
    });

    return {
      video,
    };
  },
};
</script>

<style scoped>
.player,
video {
  width: 100%;
  height: 100%;
}
</style>