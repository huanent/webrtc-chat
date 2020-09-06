<template>
  <div class="container fill">
    <video-group />
    <ctrl-bar />
  </div>
</template>

<script>
import VideoGroup from "./components/VideoGroup.vue";
import CtrlBar from "./components/CtrlBar.vue";

export default {
  name: "App",
  components: {
    VideoGroup,
    CtrlBar,
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
