import { ref } from "vue";
import { createAudioProcessor } from "../utils/rtc";
import transcode from "../utils/transcode";

let _closeAudioContextHandler = null;
let _audioData = [];
let _threshold = 0.2;
let _speaking = false;
let _muteTime = timeNow();

export const messages = ref([]);

export function start(stream) {
  if (_closeAudioContextHandler) closeAudioContextHandler();
  _closeAudioContextHandler = createAudioProcessor(stream, (e) => {
    speakChecker(Math.max.apply(Math, e));
    if (_speaking) _audioData.push(...transcode(e));
  });
}

async function speakChecker(e) {
  if (e > _threshold) _muteTime = timeNow();
  if (_speaking) {
    if (e < _threshold && timeNow() - _muteTime > 1000) {
      _speaking = false;
      wsSend(
        _wss.shift(),
        "189993a680091a4f5b2f0de36e53c992",
        "7ac8d8cf08c0678d762b8ca14d40fc02",
        "5f3a30fa",
        _audioData
      );
    }
  } else {
    if (e > _threshold) {
      _muteTime = timeNow();
      _speaking = true;
      _wss.push(
        await connectWs(
          "189993a680091a4f5b2f0de36e53c992",
          "7ac8d8cf08c0678d762b8ca14d40fc02"
        )
      );
    }
  }
}

function timeNow() {
  return new Date().getTime();
}
