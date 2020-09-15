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
import { eventBus } from "../utils/common";

export default {
  components: {
    VideoPlayer,
  },
  setup() {
    const localStream = ref(null);
    const oppositeStream = ref(null);
    onMounted(async () => {
      localStream.value = await getLocalStream();
      eventBus.emit("add_local_stream", localStream.value);
      eventBus.on("onaddstream", (e) => (oppositeStream.value = e));
      createRoom(isOffer(), localStream.value);
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


