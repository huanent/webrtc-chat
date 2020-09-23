<template>
  <div v-for="(item, index) in msgs" :key="index">{{ item }}</div>
</template>

<script>
import { onBeforeUnmount, ref } from "vue";
import { eventBus } from "../utils/common";
import { start, stop } from "../utils/tts";
export default {
  setup() {
    const msgs = ref([]);
    eventBus.on("add_local_stream", start);
    eventBus.on("ws_onmessage", (e) => msgs.value.push(e));
    onBeforeUnmount(stop);

    return {
      msgs,
    };
  },
};
</script>

<style>
</style>