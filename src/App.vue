<script lang="ts" setup>
import "./style.css";
import CtrlBar from "@/components/CtrlBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import UserNameDialog from "./components/UserNameDialog.vue";
import VideoPlayer from "./components/VideoPlayer.vue";
import { useLocalStream } from "@/services/rtc";
import { ref } from "vue";
import { connections } from "@/store/app";

document.addEventListener("dragover", (e) => e.preventDefault());
const localStream = ref<MediaStream>();

(async () => {
  localStream.value = await useLocalStream();
})();
</script>

<template>
  <div class="absolute inset-0">
    <VideoPlayer v-if="localStream" :stream="localStream" />
    <CtrlBar />
    <ToolBar />
    <UserNameDialog />
    <div class="absolute top-4 left-4 right-4 space-x-2 flex">
      <template v-for="connection of connections" :key="connection.name">
        <VideoPlayer
          v-if="connection.stream.value"
          class="w-64 h-64"
          :stream="connection.stream.value"
          :mirror="false"
          :label="connection.name"
        />
      </template>
    </div>
  </div>
</template>
