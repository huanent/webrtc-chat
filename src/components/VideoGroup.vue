<script lang="ts" setup>
import VideoPlayer from "./VideoPlayer.vue";
import { localStream } from "../services/rtc";
import { connections } from "@/stores/app";
</script>

<template>
  <div>
    <VideoPlayer
      v-for="connection of connections"
      :key="connection.name"
      class="w-32 h-32"
      :stream="connection.stream!"
    />
    <VideoPlayer class="w-32 h-32" :stream="localStream!" />
  </div>
</template>
