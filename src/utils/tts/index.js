import transcode from "./transcode";
import { eventBus } from "../common";
import { connectWs, wsSend } from "./socket";
let _audioContext;
let _audioData = [];
let _speaking = false;
let _muteTime = timeNow();
let _wss = [];

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
  if (e > 0.3) _muteTime = timeNow();
  if (_spaking) {
    if (e < 0.3 && timeNow() - _muteTime > 1000) {
      _spaking = false;
      wsSend(_wss.shift(), key, secert, appId, _audioData);
    }
  } else {
    if (e > 0.3) {
      _muteTime = timeNow();
      _spaking = true;
      _wss.push(await connectWs(key, secert));
    }
  }
}

function timeNow() {
  return new Date().getTime();
}
