import { useChat } from "@/services/chat";
import { useAnswer, useOffer } from "@/services/rtc";
import { ChatMessage } from "@/types";
import { ref } from "vue";

export const userName = ref<string>(`user_${new Date().getTime()}`);
export const connections = ref<any[]>([]);

let senMessage: Awaited<ReturnType<typeof useChat>>;

export async function initApp() {
  senMessage = await useChat(userName.value, onMessage);
  senMessage("enter", "");
}

async function onMessage(from: string, data: ChatMessage) {
  switch (data.type) {
    case "enter":
      makeOffer(from);
      break;

    case "ice":
      handleIce(from, data.data);
      break;

    case "offer":
      makeAnswer(from, data.data);
      break;

    case "answer":
      handleAnswer(from, data.data);
      break;

    default:
      break;
  }
}

async function makeOffer(from: string) {
  const { oppositeStream, pc } = await useOffer(senMessage);
  connections.value.push({ from, pc, oppositeStream });
}

async function makeAnswer(from: string, data: any) {
  const { oppositeStream, pc } = await useAnswer(data, senMessage);
  connections.value.push({ from, pc, oppositeStream });
}

async function handleAnswer(from: string, data: any) {
  const connection = connections.value.find((f) => f.from == from);
  await connection.pc.setRemoteDescription(new RTCSessionDescription(data));
}

async function handleIce(from: string, data: any) {
  const connection = connections.value.find((f) => f.from == from);
  connection.pc.addIceCandidate(new RTCIceCandidate(data));
}
