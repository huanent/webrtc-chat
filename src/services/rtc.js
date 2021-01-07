import { createIM } from "./im";
import { ref } from "vue";

export const localStream = ref(null);
export const oppositeStream = ref(null);

async function getLocalStream() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  return stream;
}

export async function createRoom(isOffer) {
  const sendMsg = await createIM("23432", async (e) => {
    if (e.type == "ice" && e.data) {
      pc.addIceCandidate(new RTCIceCandidate(e.data));
    }

    if (e.type == "offer") {
      await pc.setRemoteDescription(new RTCSessionDescription(e.data));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendMsg("answer", answer);
    }

    if (e.type == "answer") {
      await pc.setRemoteDescription(new RTCSessionDescription(e.data));
    }
  });

  let pc = new RTCPeerConnection();
  localStream.value = await getLocalStream();
  localStream.value
    .getTracks()
    .forEach((track) => pc.addTrack(track, localStream.value));
  pc.onicecandidate = (e) => sendMsg("ice", e.candidate);
  pc.onaddstream = (e) => (oppositeStream.value = e.stream);

  if (isOffer) {
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendMsg("offer", offer);
  }
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
