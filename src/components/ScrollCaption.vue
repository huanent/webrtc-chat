<template>
  <div class="caption">
    <div v-if="recognizing" class="item current">
      <div>{{ recognizing.zh }}</div>
      <div>{{ recognizing.en }}</div>
    </div>
    <div v-for="(item, index) in messages" :key="index" class="item">
      <div>{{ item.zh }}</div>
      <div>{{ item.en }}</div>
    </div>
  </div>
</template>

<script>
import { messages, recognizing } from "../services/asr";
export default {
  setup() {
    return {
      messages,
      recognizing,
    };
  },
};
</script>

<style scoped >
.caption {
  position: absolute;
  bottom: 100px;
  right: 0;
  left: 0;
  margin: auto;
  overflow-y: hidden;
  text-align: center;
  color: white;
  mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 1))
  );
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 1))
  );
  font-size: 12px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.514);
  display: flex;
  flex-direction: column-reverse;
  width: 400px;
  height: 200px;
}

.caption:hover {
  overflow-y: overlay;
  mask-image: none;
  -webkit-mask-image: none;
}

.caption::-webkit-scrollbar {
  width: 5px;
}
/*正常情况下滑块的样式*/
.caption::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/
.caption:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
/*鼠标悬浮在滑块上时滑块的样式*/
.caption::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
/*正常时候的主干部分*/
.caption::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.301);
}
/*鼠标悬浮在滚动条上的主干部分*/
.caption::-webkit-scrollbar-track:hover {
  background-color: rgba(0, 0, 0, 0.01);
}

.item {
  padding: 5px 20px;
}

.current {
  font-size: 14px;
}
</style>