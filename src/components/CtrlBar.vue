<template>
  <div class="ctrl-bar">
    <round-button src="icon/microphone.svg"> </round-button>
    <round-button src="icon/camera.svg"> </round-button>
    <round-button color="red" src="icon/close.svg"> </round-button>
  </div>
</template>
<script>
import RoundButton from "./base/RoundButton.vue";
export default {
  components: {
    RoundButton,
  },
};
</script>
<style scoped>
.ctrl-bar {
  position: absolute;
  bottom: 20px;
  margin: 0 auto;
  left: 0;
  right: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 100%;
  height: 100%;
}
</style>

