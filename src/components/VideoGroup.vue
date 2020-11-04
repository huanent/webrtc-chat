<template>
  <video-player class="player fill" :stream="remoteCamera" />
  <video-player
    class="player fill"
    :stream="localCamera"
    :float="!!remoteCamera"
  />
</template>

<script>
import { onMounted } from "vue";
import VideoPlayer from "./VideoPlayer.vue";
import { isOffer } from "../utils/common";

import {
  localCamera,
  remoteCamera,
  enterRoom,
} from "../services/streamService";

export default {
  components: {
    VideoPlayer,
  },
  setup() {
    onMounted(async () => {
      enterRoom("1234", isOffer());
    });

    return {
      localCamera,
      remoteCamera,
    };
  },
};
</script>

<style scoped>
</style>


