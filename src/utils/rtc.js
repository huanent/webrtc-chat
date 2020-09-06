import { createIM } from "./im";

export async function getLocalStream() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  return stream;
}

export async function createRoom(isOffer, callback) {
  const im = await createIM("23432", async (e) => {
    if (e.type == "ice") {
      pc.addIceCandidate(new RTCIceCandidate(e.candidate));
    }

    if ((e.type = "offer")) {
      await pc.setRemoteDescription(new RTCSessionDescription(e.sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer.sdp);
      im.send({ type: "answer", sdp: answer.sdp });
    }

    if ((e.type = "answer")) {
      await pc.setRemoteDescription(e.sdp);
    }
  });

  let pc = new RTCPeerConnection();
  pc.onicecandidate((e) => im.send({ type: "ice", ice: e.candidate }));
  pc.onaddstream((e) => callback(e.stream));

  if (isOffer) {
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer.sdp);
    im.send({ type: "offer", sdp: offer.sdp });
  }
}
