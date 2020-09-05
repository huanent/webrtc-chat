<template>
  <div class="player">
    <video
      ref="video"
      autoplay
      :muted="muted"
      :style="{ objectFit: fit }"
      :class="{ mirror: mirror }"
    ></video>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
export default {
  props: {
    stream: {
      type: MediaStream,
      required: false,
    },
    fit: {
      type: String,
      default: "cover",
    },
    muted: {
      type: Boolean,
      required: false,
      default: true,
    },
    mirror: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props) {
    const video = ref(null);

    watch(
      () => props.stream,
      () => {
        if (video.value) video.value.srcObject = props.stream;
      }
    );

    return {
      video,
    };
  },
};
</script>

<style scoped>
.player {
  position: relative;
}

.player,
video {
  width: 100%;
  height: 100%;
}

.player::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
  background: black;
}

.mirror {
  transform: rotateY(180deg);
}
</style>