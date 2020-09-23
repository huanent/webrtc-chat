<template>
  <div class="container fill">
    <video-group />
    <ctrl-bar />
    <share-url v-if="showShareUrl" />
    <tool-bar />
    <bullet-subtitles />
  </div>
</template>

<script>
import VideoGroup from "./components/VideoGroup.vue";
import CtrlBar from "./components/CtrlBar.vue";
import ShareUrl from "./components/ShareUrl.vue";
import ToolBar from "./components/ToolBar.vue";
import BulletSubtitles from "./components/BulletSubtitles.vue";
import { isOffer } from "./utils/common";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    VideoGroup,
    CtrlBar,
    ShareUrl,
    ToolBar,
    BulletSubtitles,
  },
  setup() {
    document.addEventListener("dragover", (e) => e.preventDefault());
    const showShareUrl = ref(!isOffer());
    return {
      showShareUrl,
    };
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
