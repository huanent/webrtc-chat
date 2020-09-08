<template>
  <div
    class="player"
    ref="player"
    @dragstart="dragstart"
    @dragend="dragend"
    :draggable="float"
    :class="{ float: float }"
  >
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
    float: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const video = ref(null);
    const player = ref(null);
    let offset = { x: 0, y: 0 };

    watch(
      () => props.stream,
      () => {
        if (video.value) video.value.srcObject = props.stream;
      }
    );

    watch(
      () => props.float,
      (value) => {
        if (!player.value) return;
        player.value.style.top = value ? "15px" : "0";
        player.value.style.left = value ? "15px" : "0";
      }
    );

    const dragstart = (e) => {
      const rect = e.target.getBoundingClientRect();
      offset.x = e.x - rect.x;
      offset.y = e.y - rect.y;
    };

    const dragend = (e) => {
      e.target.style.top = e.y - offset.y + "px";
      e.target.style.left = e.x - offset.x + "px";
    };

    return {
      video,
      player,
      dragstart,
      dragend,
    };
  },
};
</script>

<style scoped>
.player {
  position: absolute;
  transition: all 0.3s;
}

.player,
video {
  width: 100%;
  height: 100%;
}

.player::after {
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

.float {
  width: 150px;
  height: 100px;
  top: 15px;
  left: 15px;
  border-radius: 5%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.397) 5px 5px 10px;
}
</style>