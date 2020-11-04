export async function getLocalStream() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  return stream;
}

export async function recordSrceen() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });

  var mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();

  mediaRecorder.ondataavailable = (e) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(e.data);
    a.download = `${new Date().getTime()}.webm`;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
    stream.getTracks().forEach((t) => t.stop());
  };

  return mediaRecorder;
}

export async function createAudioProcessor(stream, callback) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let scriptProcessor = audioContext.createScriptProcessor(0, 1, 1);
  scriptProcessor.onaudioprocess = (e) => {
    let rawData = e.inputBuffer.getChannelData(0);
    callback(rawData);
  };
  let mediaSource = audioContext.createMediaStreamSource(stream);
  mediaSource.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);
  return () => audioContext.close();
}
