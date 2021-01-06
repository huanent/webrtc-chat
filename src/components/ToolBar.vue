<template>
  <div class="tool-bar">
    <label-button
      label="字幕"
      src="icon/zm.svg"
      :selected="enableAsr"
      @click="enableAsr = !enableAsr"
    >
    </label-button>

    <label-button
      label="录制"
      src="icon/lz.svg"
      @click="record"
      :class="{ record: recorder }"
    >
    </label-button>
  </div>
</template>

<script>
import { ref } from "vue";
import LabelButton from "./base/LabelButton.vue";
import { recordSrceen } from "../utils/rtc";
import { enableAsr } from "../utils/asr";

export default {
  components: {
    LabelButton,
  },
  setup() {
    const recorder = ref(null);

    const record = async () => {
      if (!recorder.value) {
        recorder.value = await recordSrceen();
      } else {
        recorder.value.stop();
        recorder.value = null;
      }
    };

    return {
      enableAsr,
      record,
      recorder,
    };
  },
};
</script>

<style scoped>
.tool-bar {
  position: absolute;
  right: 15px;
  bottom: 15px;
}

.record {
  animation: wave 1s linear infinite;
}

@keyframes wave {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>