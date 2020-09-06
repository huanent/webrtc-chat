import { createIM } from "./im";

export async function getLocalStream() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  return stream;
}

export async function createRoom(isOffer, localStream, callback) {
  const sendMsg = await createIM("23432", async (e) => {
    if (e.type == "ice" && e.data) {
      console.log(e);
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

  pc.addStream(localStream);

  pc.onicecandidate = (e) => sendMsg("ice", e.candidate);

  pc.onaddstream = (e) => callback(e.stream);

  if (isOffer) {
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendMsg("offer", offer);
  }
}
