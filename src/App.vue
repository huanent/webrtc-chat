<template>
  <div class="container fill">
    <video-group />
  </div>
</template>

<script>
import VideoGroup from "./components/VideoGroup.vue";

export default {
  name: "App",
  components: {
    VideoGroup,
  },
};
</script>
;<style scoped>
.container {
  position: fixed;
}
</style>

<style>
.fill {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
