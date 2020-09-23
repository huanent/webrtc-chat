import transcode from "./transcode";
import { connectWs, wsSend } from "./socket";
let _audioContext;
let _audioData = [];
let _speaking = false;
let _muteTime = timeNow();
let _wss = [];
let _threshold = 0.2;

export function stop() {
  if (_audioContext) _audioContext.close();
  _audioData = [];
  _speaking = false;
  _wss = [];
}

export function start(stream) {
  if (_audioContext) _audioContext.close();
  _audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let scriptProcessor = _audioContext.createScriptProcessor(0, 1, 1);
  scriptProcessor.onaudioprocess = (e) => {
    let rawData = e.inputBuffer.getChannelData(0);
    speakChecker(Math.max.apply(Math, rawData));
    if (_speaking) _audioData.push(...transcode(rawData));
  };
  let mediaSource = _audioContext.createMediaStreamSource(stream);
  mediaSource.connect(scriptProcessor);
  scriptProcessor.connect(_audioContext.destination);
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
