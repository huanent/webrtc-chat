<template>
  <div class="tool-bar">
    <label-button label="翻译" v-model:selected="selectedTranslation">
      <svg
        t="1599821942993"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6445"
      >
        <path
          d="M742.250667 554.666667v32.426666H832v156.373334h-89.749333v69.333333H687.36v-69.333333H597.333333v-156.373334h90.026667V554.666667h54.890667zM768 192a64 64 0 0 1 64 64v256h-64V256H213.333333v384l135.68-0.042667 0.021334 66.944L441.408 640 554.666667 639.957333v64l-92.501334 0.021334-143.274666 103.786666a21.333333 21.333333 0 0 1-33.856-17.28V704L213.333333 704a64 64 0 0 1-64-64V256a64 64 0 0 1 64-64h554.666667z m-81.536 433.066667h-37.461333v70.4h37.461333v-70.4z m93.717333 0H743.04v70.4h37.162667v-70.4zM519.893333 320L576 528.533333h-57.173333l-9.706667-40.661333h-58.496l-9.706667 40.661333H384L439.872 320h80z m-39.616 45.376h-0.512l-19.157333 80.533333h38.570667l-18.901334-80.533333z"
          p-id="6446"
          :fill="selectedTranslation ? '#ddd' : '#ffffff'"
        ></path>
      </svg>
    </label-button>

    <label-button label="录制" @click="record"  :class="{ record: recorder }">
      <svg
        t="1600856667784"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6448"
      >
        <path
          d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m53.333333 256h-106.666666a53.333333 53.333333 0 0 0-53.333334 53.333334v106.666666a53.333333 53.333333 0 0 0 53.333334 53.333334h106.666666a53.333333 53.333333 0 0 0 53.333334-53.333334v-106.666666a53.333333 53.333333 0 0 0-53.333334-53.333334z"
          p-id="6449"
          fill="#ffffff"
        ></path>
      </svg>
    </label-button>
  </div>
</template>

<script>
import { ref } from "vue";
import LabelButton from "./base/LabelButton.vue";
import { recordSrceen } from "../utils/rtc";

export default {
  components: {
    LabelButton,
  },
  setup() {
    const selectedTranslation = ref(false);
    const recorder = ref(null);

    const record = async () => {
      if (!recorder.value) recorder.value = await recordSrceen();
      else recorder.value.stop();
    };

    return {
      selectedTranslation,
      record,
      recorder,
    };
  },
};
</script>

<style scoped>
.tool-bar {
  position: absolute;
  right: 15px;
  bottom: 15px;
}

.record {
  animation: wave 1s linear infinite;
}

@keyframes wave {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>