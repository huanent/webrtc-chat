<template>
  <video-player class="player fill" :stream="localStream" />
</template>

<script>
import { onMounted, ref } from "vue";
import VideoPlayer from "./VideoPlayer.vue";
import { getLocalStream } from "../utils/rtc";

export default {
  components: {
    VideoPlayer,
  },
  setup() {
    const localStream = ref(null);
    onMounted(async () => {
      localStream.value = await getLocalStream();
    });

    return {
      localStream,
    };
  },
};
</script>

<style scoped>
.player {
  position: absolute;
}
</style>


