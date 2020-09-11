<template>
  <div class="label-button" @click="onClick">
    <div class="icon" :class="{ selected: selected }" ref="iconContainer"></div>
    <p class="label">{{ label }}</p>
  </div>
</template>
<script>
import { render, ref, onMounted } from "vue";
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const onClick = () => ctx.emit("update:selected", !props.selected);
    const iconContainer = ref(null);

    onMounted(() => {
      let svg = ctx.slots.default()[0];
      if (svg) {
        svg.props.style = {
          minWidth: "40px",
          minHeight: "40px",
        };
      }
      render(svg, iconContainer.value);
    });

    return {
      onClick,
      iconContainer,
    };
  },
};
</script>

<style scoped>
.label-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.label {
  color: white;
  font-size: 10px;
}
.icon {
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.selected {
  background-color: white;
}
</style>