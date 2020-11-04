import { ref } from "vue";
import { getLocalStream } from "../utils/rtc";
import { createIM } from "../utils/im";

export const localCamera = ref(null);
export const localSrceen = ref(null);
export const remoteCamera = ref(null);
export const remoteSrceen = ref(null);

export async function enterRoom(roomId, isOffer) {
  const sendMsg = await createIM(roomId, async (e) => {
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
  localCamera.value = await getLocalStream();
  pc.addStream(localCamera.value);
  pc.onicecandidate = (e) => sendMsg("ice", e.candidate);
  pc.onaddstream = (e) => (remoteCamera.value = e.stream);

  if (isOffer) {
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendMsg("offer", offer);
  }
}
