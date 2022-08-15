import { ref } from "vue";
import { SendMessage } from "./chat";

export const localStream = ref<MediaStream>();

async function getLocalStream() {
  if (localStream.value) return localStream.value;

  localStream.value = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  return localStream.value;
}

export async function recordScreen() {
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

export async function useOffer(send: SendMessage) {
  const oppositeStream = ref<MediaStream>();

  let pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:23.21.150.121",
          "stun:stun01.sipphone.com",
          "stun:stun.ekiga.net",
          "stun:stun.fwdnet.net",
          "stun:stun.ideasip.com",
          "stun:stun.iptel.org",
          "stun:stun.rixtelecom.se",
          "stun:stun.schlund.de",
          "stun:stunserver.org",
          "stun:stun.softjoys.com",
          "stun:stun.voiparound.com",
          "stun:stun.voipbuster.com",
          "stun:stun.voipstunt.com",
          "stun:stun.voxgratia.org",
          "stun:stun.xten.com",
        ],
      },
    ],
  });

  const stream = await getLocalStream();
  stream.getTracks().forEach((track) => pc.addTrack(track, localStream.value!));
  pc.onicecandidate = (e) => send("ice", e.candidate);
  pc.ontrack = (e) => (oppositeStream.value = e.streams[0]);
  let offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  send("offer", offer);
  return { pc, oppositeStream };
}

export async function useAnswer(offer: any, send: SendMessage) {
  const oppositeStream = ref<MediaStream>();

  let pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:23.21.150.121",
          "stun:stun01.sipphone.com",
          "stun:stun.ekiga.net",
          "stun:stun.fwdnet.net",
          "stun:stun.ideasip.com",
          "stun:stun.iptel.org",
          "stun:stun.rixtelecom.se",
          "stun:stun.schlund.de",
          "stun:stunserver.org",
          "stun:stun.softjoys.com",
          "stun:stun.voiparound.com",
          "stun:stun.voipbuster.com",
          "stun:stun.voipstunt.com",
          "stun:stun.voxgratia.org",
          "stun:stun.xten.com",
        ],
      },
    ],
  });

  const stream = await getLocalStream();
  stream.getTracks().forEach((track) => pc.addTrack(track, localStream.value!));
  pc.onicecandidate = (e) => send("ice", e.candidate);
  pc.ontrack = (e) => (oppositeStream.value = e.streams[0]);
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  send("answer", answer);
  return { pc, oppositeStream };
}
