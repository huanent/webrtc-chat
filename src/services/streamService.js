import { ref } from "vue";
import { getLocalStream } from "../utils/rtc";
import * as imService from "./imService";

export const localCamera = ref(null);
export const remoteCamera = ref(null);

export async function enterRoom(roomId, isOffer) {
  await imService.create(roomId, async (e) => {
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
  pc.onicecandidate = (e) => imService.send("ice", e.candidate);
  pc.onaddstream = (e) => (remoteCamera.value = e.stream);

  if (isOffer) {
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    imService.sendÎ("offer", offer);
  }
}
