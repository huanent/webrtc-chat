import { ref } from "vue";
import { createConnection } from "./chat";

export const localStream = ref<MediaStream>();
export const oppositeStream = ref<MediaStream>();

async function getLocalStream() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  return stream;
}

export async function createRoom(isOffer: boolean) {
  const send = await createConnection(
    isOffer ? "a" : "b",
    async (from: string, message: any) => {
      console.log(message);
      if (!message || !message.data) return;

      if (message.type == "ice" && message.data) {
        pc.addIceCandidate(new RTCIceCandidate(message.data));
      }

      if (message.type == "offer") {
        await pc.setRemoteDescription(new RTCSessionDescription(message.data));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        send("answer", answer);
      }

      if (message.type == "answer") {
        await pc.setRemoteDescription(new RTCSessionDescription(message.data));
      }
    }
  );

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
  localStream.value = await getLocalStream();

  localStream.value
    .getTracks()
    .forEach((track) => pc.addTrack(track, localStream.value!));

  pc.onicecandidate = (e) => send("ice", e.candidate);
  pc.ontrack = (e) => (oppositeStream.value = e.streams[0]);

  if (isOffer) {
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    send("offer", offer);
  }
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
