<script lang="ts" setup>
import "./style.css";
import CtrlBar from "@/components/CtrlBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import ConfigDialog from "./components/ConfigDialog.vue";
import VideoPlayer from "./components/VideoPlayer.vue";
import { useLocalStream } from "@/services/rtc";
import { ref } from "vue";
import { sessions } from "@/store/session";

const localStream = ref<MediaStream>();
const players = new Set<InstanceType<typeof VideoPlayer>>();

document.addEventListener("dragover", (e) => e.preventDefault());

document.addEventListener("pointerdown", () => {
  for (const player of players) {
    player?.play();
  }
});

(async () => {
  localStream.value = await useLocalStream();
})();
</script>

<template>
  <div class="absolute inset-0">
    <VideoPlayer
      v-if="localStream"
      :ref="(c:any) => players.add(c)"
      :stream="localStream"
      class="w-full h-full"
    />
    <CtrlBar />
    <ToolBar />
    <ConfigDialog />
    <div class="absolute top-4 left-4 right-4 space-x-2 flex">
      <template v-for="connection of sessions" :key="connection.name">
        <VideoPlayer
          v-if="connection.stream.value"
          :ref="(c:any) => players.add(c)"
          class="w-64 h-64"
          :stream="connection.stream.value"
          :mirror="false"
          :label="connection.name"
        />
      </template>
    </div>
  </div>
</template>
