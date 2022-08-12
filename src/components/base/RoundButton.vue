<template>
  <div class="inline-block transition-all relative transform hover:scale-125">
    <img
      :src="src"
      class="rounded-full m-2 flex items-center justify-center p-2"
      :style="{
        width: size + 'px',
        height: size + 'px',
        backgroundColor: color,
      }"
    />
    <!-- <div v-if="disabled" class="line"></div> -->
  </div>
</template>

<script lang="ts" setup>
interface Props {
  size: number;
  color: string;
  src: string;
  disabled: boolean;
}

withDefaults(defineProps<Props>(), { size: 38, color: "#fff" });
</script>
