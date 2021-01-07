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
import { oppositeStream, createRoom, localStream } from "../services/rtc";
import { isOffer } from "../services/common";
import { eventBus } from "../services/common";

export default {
  components: {
    VideoPlayer,
  },
  setup() {
    createRoom(isOffer());

    return {
      localStream,
      oppositeStream,
    };
  },
};
</script>

<style scoped>
</style>


