export async function getLocalStream() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  return stream;
}
