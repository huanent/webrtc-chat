<script lang="ts" setup>
import { onMounted, ref } from "vue";
import VideoPlayer from "./VideoPlayer.vue";
import { oppositeStream, createRoom, localStream } from "../services/rtc";
import { isOffer } from "../services/common";
import { eventBus } from "../services/common";

createRoom(isOffer());
</script>

<template>
  <VideoPlayer class="player fill" :stream="oppositeStream!" />
  <VideoPlayer
    class="player fill"
    :stream="localStream!"
    :float="!!oppositeStream"
  />
</template>
