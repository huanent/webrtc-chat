<template>
  <div class="caption">
    <div v-for="(item, index) in messages" :key="index">
      <div>{{ item.zh }}</div>
      <div>{{ item.en }}</div>
    </div>
    <div v-if="recognizing">
      <div>{{ recognizing.zh }}</div>
      <div>{{ recognizing.en }}</div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";
import { eventBus, isOffer } from "../utils/common";
import { messages, recognizing, startAsr } from "../utils/asr";
import { localStream } from "../utils/rtc";
export default {
  setup() {
    if (!isOffer()) {
      watch(localStream, (value) => {
        if (value) startAsr(value);
      });
    }

    return {
      messages,
      recognizing,
    };
  },
};
</script>

<style scoped >
.caption {
  position: absolute;
  bottom: 100px;
  right: 0;
  left: 0;
  overflow-y: auto;
  text-align: center;
  max-height: 150px;
  color: white;
  font-size: 12px;
}
</style>