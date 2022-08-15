<script lang="ts" setup>
import { onMounted, ref } from "vue";
import VideoPlayer from "./VideoPlayer.vue";
import { localStream } from "../services/rtc";
import { connections } from "@/stores/app";
</script>

<template>
  <VideoPlayer
    v-for="connection of connections"
    :key="connection.from"
    class="player fill"
    :stream="connection.oppositeStream!"
  />
  <VideoPlayer
    class="player fill"
    :stream="localStream!"
    :float="!!connections.length"
  />
</template>
