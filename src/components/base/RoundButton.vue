<template>
  <div class="btn">
    <img
      :src="src"
      :style="{
        width: size + 'px',
        height: size + 'px',
        backgroundColor: color,
      }"
    />
    <div v-if="disabled" class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: "#fff",
    },
    src: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.btn {
  display: inline-block;
  transition: all 0.3s;
  position: relative;
}

.btn img {
  border-radius: 50%;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.btn:hover {
  transform: scale(1.2);
}

.line {
  width: 50%;
  height: 3%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transform: rotate(-45deg);
}
</style>