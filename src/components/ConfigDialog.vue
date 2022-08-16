<script lang="ts" setup>
import { userName, stun, turn, initApp } from "@/store/app";
import { ref } from "vue";
const show = ref(true);

function startApp() {
  show.value = false;
  initApp();
}
</script>

<template>
  <ElDialog
    v-model="show"
    :show-close="false"
    title="设置"
    :close-on-click-modal="false"
  >
    <ElForm label-width="120px">
      <ElFormItem label="name">
        <ElInput v-model="userName" />
      </ElFormItem>

      <ElFormItem label="stun">
        <ElInput v-model="stun" placeholder="stun:stun.l.google.com:19302" />
      </ElFormItem>

      <ElFormItem label="turn">
        <ElInput v-model="turn" placeholder="turn:huanent.site [1:2]" />
      </ElFormItem>

      <ElFormItem label="turn.userName">
        <ElInput v-model="turn" placeholder="user1" />
      </ElFormItem>

      <ElFormItem label="turn.credential">
        <ElInput v-model="turn" placeholder="password" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" :disabled="!userName" @click="startApp"
          >确定</el-button
        >
      </span>
    </template>
  </ElDialog>
</template>
