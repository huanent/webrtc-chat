import { useChat } from "@/services/chat";
import { useAnswer, useOffer } from "@/services/rtc";
import { ChatMessage, Session } from "@/types";
import { shallowReactive, ref } from "vue";

export const userName = ref<string>(`user_${new Date().getTime()}`);
export const connections = shallowReactive<Session[]>([]);

let senMessage: Awaited<ReturnType<typeof useChat>>;

export async function initApp() {
  senMessage = await useChat(userName.value, onMessage);
  senMessage("enter", "");
}

async function onMessage(message: ChatMessage) {
  switch (message.type) {
    case "enter":
      makeOffer(message.from);
      break;

    case "ice":
      handleIce(message.from, message.data);
      break;

    case "offer":
      makeAnswer(message.from, message.data);
      break;

    case "answer":
      handleAnswer(message.from, message.data);
      break;

    default:
      break;
  }
}

async function makeOffer(from: string) {
  const { oppositeStream, peerConnection } = await useOffer(from, senMessage);

  connections.push({
    name: from,
    peerConnection,
    stream: oppositeStream,
  });
}

async function makeAnswer(from: string, data: any) {
  const { oppositeStream, peerConnection } = await useAnswer(
    from,
    data,
    senMessage
  );
  connections.push({
    name: from,
    peerConnection,
    stream: oppositeStream,
  });
}

async function handleAnswer(from: string, data: any) {
  const connection = connections.find((f) => f.name == from);
  await connection?.peerConnection.setRemoteDescription(
    new RTCSessionDescription(data)
  );
}

async function handleIce(from: string, data: any) {
  if (!data) return;
  const connection = connections.find((f) => f.name == from);
  connection?.peerConnection.addIceCandidate(new RTCIceCandidate(data));
}
