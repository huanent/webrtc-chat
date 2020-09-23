<template>
  <div class="caption">
    <div v-for="(item, index) in msgs" :key="index">{{ item }}</div>
  </div>
</template>

<script>
import { onBeforeUnmount, ref } from "vue";
import { eventBus } from "../utils/common";
import { start, stop } from "../utils/tts";
export default {
  setup() {
    const msgs = ref([]);
    eventBus.on("add_local_stream", start);
    eventBus.on("ws_onmessage", (e) => {
      console.log(e);
      msgs.value.push(e);
    });
    onBeforeUnmount(stop);

    return {
      msgs,
    };
  },
};
</script>

<style scoped >
.caption {
  position: absolute;
  bottom: 15px;
  right: 15px;
  max-height: 90%;
  overflow-y: auto;
}
</style>