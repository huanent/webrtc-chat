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
import { isOffer } from "../utils/common";

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
        isOffer(),
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
  transition: all 0.3s;
}

.float {
  width: 150px;
  height: 100px;
  border-radius: 5%;
  left: 15px;
  top: 15px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.397) 5px 5px 10px;
}
</style>


