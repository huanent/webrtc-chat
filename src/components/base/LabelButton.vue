<script lang="ts" setup>
interface Props {
  label: string;
  src: string;
  selected?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="inline-flex items-center justify-center flex-col mx-2">
    <div class="rounded-full p-2 flex" :class="selected ? 'bg-white/50' : ''">
      <img :src="src" class="w-8 h-8" />
    </div>
    <p class="text-white m-1 text-xs">{{ label }}</p>
  </div>
</template>
