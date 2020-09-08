<template>
  <video-player class="player fill" :stream="oppositeStream" />
  <video-player
    class="player fill"
    :stream="localStream"
    :float="!!oppositeStream"
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
</style>


