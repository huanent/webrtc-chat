<template>
  <div class="container fill">
    <video-group />
    <ctrl-bar />
    <tool-bar />
    <scroll-caption />
  </div>
</template>

<script>
import VideoGroup from "./components/VideoGroup.vue";
import CtrlBar from "./components/CtrlBar.vue";
import ToolBar from "./components/ToolBar.vue";
import ScrollCaption from "./components/ScrollCaption.vue";
import { isOffer } from "./services/common";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    VideoGroup,
    CtrlBar,
    ToolBar,
    ScrollCaption,
  },
  setup() {
    document.addEventListener("dragover", (e) => e.preventDefault());
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
