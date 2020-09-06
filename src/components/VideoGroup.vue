<template>
  <video-player class="player fill" :stream="oppositeStream" />
  <video-player
    class="player fill"
    :stream="localStream"
    :class="{ float: oppositeStream }"
  />
</template>

<script>
import { onMounted, ref } from "vue";
import VideoPlayer from "./VideoPlayer.vue";
import { getLocalStream, createRoom } from "../utils/rtc";

export default {
  components: {
    VideoPlayer,
  },
  setup() {
    const localStream = ref(null);
    const oppositeStream = ref(null);
    onMounted(async () => {
      localStream.value = await getLocalStream();
      createRoom(
        location.search.includes("is-offer"),
        localStream.value,
        (e) => (oppositeStream.value = e)
      );
    });

    return {
      localStream,
      oppositeStream,
    };
  },
};
</script>

<style scoped>
.player {
  position: absolute;
}
.float {
  width: 100px;
  height: 100px;
  left: 15px;
  top: 15px;
}
</style>


