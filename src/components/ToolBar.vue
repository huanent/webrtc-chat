<script lang="ts" setup>
import { ref } from "vue";
import LabelButton from "./base/LabelButton.vue";
import { recordScreen } from "../services/rtc";

const recorder = ref();

const record = async () => {
  if (!recorder.value) {
    recorder.value = await recordScreen();
  } else {
    recorder.value.stop();
    recorder.value = null;
  }
};
</script>

<template>
  <div class="absolute right-4 bottom-4">
    <LabelButton
      label="录制"
      src="icon/lz.svg"
      :class="{ record: recorder }"
      @click="record"
    />
  </div>
</template>

<style scoped>
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
