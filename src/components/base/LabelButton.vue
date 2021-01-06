<template>
  <div class="label-button">
    <div class="icon" :class="{ selected: selected }">
      <img :src="src" />
    </div>
    <p class="label">{{ label }}</p>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      default: "",
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.label-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 10px;
}

.label {
  color: white;
  font-size: 10px;
  margin: 5px;
}

.icon {
  border-radius: 50%;
  padding: 8px;
  display: flex;
}

.selected {
  background-color: rgba(255, 255, 255, 0.5);
}

.icon img {
  width: 30px;
  height: 30px;
}
</style>