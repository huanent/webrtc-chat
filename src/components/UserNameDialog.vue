<script lang="ts" setup>
import { userName, initApp } from "@/store/app";
import { ref } from "vue";
const show = ref(true);

function startApp() {
  show.value = false;
  initApp();
}
</script>

<template>
  <ElDialog v-model="show" :show-close="false" title="请输入用户名">
    <ElForm>
      <ElFormItem label="name">
        <ElInput v-model="userName" />
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
