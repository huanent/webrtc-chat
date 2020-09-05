<template>
  <video-player class="player fill" />
</template>

<script>
import VideoPlayer from "./VideoPlayer.vue";

export default {
  components: {
    VideoPlayer,
  },
  setup() {
      

  },
};
</script>

<style scoped>
.player {
  position: absolute;
}
</style>


