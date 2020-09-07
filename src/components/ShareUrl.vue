<template>
  <svg
    t="1599484068752"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="7284"
    width="35"
    height="35"
    v-show="!expand"
    @click="onClick"
  >
    <path
      d="M234.666667 640v149.333333h159.978666v64H234.666667a64 64 0 0 1-64-64v-149.333333h64z m618.666666 0v149.333333a64 64 0 0 1-64 64h-160.021333v-64H789.333333v-149.333333h64z m-85.333333-160v64H256v-64h512zM789.333333 170.666667a64 64 0 0 1 64 64v149.333333h-64v-149.333333h-160V170.666667H789.333333zM394.666667 170.666667v64H234.666667v149.333333H170.666667v-149.333333a64 64 0 0 1 64-64h160z"
      p-id="7285"
      fill="#ffffff"
    ></path>
  </svg>
  <div class="qrcode fill" v-show="expand">
    <svg
      t="1599484634741"
      class="icon"
      viewBox="0 0 1045 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7469"
      width="35"
      height="35"
      @click="onClick"
    >
      <path
        d="M282.517333 213.376l-45.354666 45.162667L489.472 512 237.162667 765.461333l45.354666 45.162667L534.613333 557.354667l252.096 253.269333 45.354667-45.162667-252.288-253.44 252.288-253.482666-45.354667-45.162667L534.613333 466.624l-252.096-253.226667z"
        p-id="7470"
        fill="#ffffff"
      ></path>
    </svg>
    <canvas ref="qrcode"></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import QRCode from "qrcode";

export default {
  setup() {
    const expand = ref(false);
    const qrcode = ref(null);

    const onClick = () => (expand.value = !expand.value);

    onMounted(() => {
      QRCode.toCanvas(
        qrcode.value,
        location.href + "?is-offer=true",
        {
          margin: 1,
          width: 300,
        },
        function (error) {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    });

    return {
      expand,
      onClick,
      qrcode,
    };
  },
};
</script>

<style scoped>
.icon {
  position: absolute;
  top: 15px;
  right: 15px;
  transition: all 0.3s;
}

.icon:hover {
  transform: scale(1.1);
}

.qrcode {
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcode canvas {
  width: 400px;
  width: 400px;
}
</style>