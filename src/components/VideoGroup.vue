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
import { oppositeStream, createRoom, localStream } from "../utils/rtc";
import { isOffer } from "../utils/common";
import { eventBus } from "../utils/common";

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


