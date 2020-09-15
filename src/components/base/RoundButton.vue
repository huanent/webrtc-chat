<template>
  <div
    class="btn"
    :style="{ width: size + 'px', height: size + 'px', backgroundColor: color }"
  >
    <slot></slot>
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
  },
};
</script>

<style scoped>
.btn {
  border-radius: 50%;
  margin: 10px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.btn:hover {
  transform: scale(1.2);
}
</style>