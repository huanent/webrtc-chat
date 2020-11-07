<template>
  <div class="caption">
    <div v-for="(item, index) in msgs" :key="index">{{ item }}</div>
  </div>
</template>

<script>
import { onBeforeUnmount, ref } from "vue";
export default {
  setup() {
    const msgs = ref([]);

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