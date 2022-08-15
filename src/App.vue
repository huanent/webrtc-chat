<script lang="ts" setup>
import "./style.css";
import CtrlBar from "@/components/CtrlBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import VideoGroup from "@/components/VideoGroup.vue";
import UserNameDialog from "./components/UserNameDialog.vue";

document.addEventListener("dragover", (e) => e.preventDefault());
</script>

<template>
  <div class="absolute inset-0">
    <VideoGroup />
    <CtrlBar />
    <ToolBar />
    <UserNameDialog />
  </div>
</template>
