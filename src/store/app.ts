import { useChat } from "@/services/chat";
import { ChatMessage, Session } from "@/types";
import { shallowReactive, ref } from "vue";
import { handleAnswer, handleIce, makeAnswer, makeOffer } from "./session";

export const userName = ref<string>(`user_${new Date().getTime()}`);
export const connections = shallowReactive<Session[]>([]);

let senMessage: Awaited<ReturnType<typeof useChat>>;

export async function initApp() {
  senMessage = await useChat(userName.value, onMessage);
  senMessage("enter", userName.value);
}

async function onMessage(message: ChatMessage) {
  switch (message.type) {
    case "enter":
      makeOffer(message.from, senMessage);
      break;

    case "ice":
      handleIce(message.from, message.data);
      break;

    case "offer":
      makeAnswer(message.from, message.data, senMessage);
      break;

    case "answer":
      handleAnswer(message.from, message.data);
      break;

    default:
      break;
  }
}
