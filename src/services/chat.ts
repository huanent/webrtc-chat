//https://huanent-deno-socket.deno.dev/list
import { ChatMessage } from "@/types";

export type SendMessage = ReturnType<typeof getSender>;

export function useChat(
  name: string,
  onMessage: (from: string, message: ChatMessage) => {}
) {
  return new Promise<SendMessage>((resolve, reject) => {
    const es = new EventSource(
      `https://huanent-deno-chat.deno.dev/api/listen?name=${name}`
    );

    es.onmessage = (e) => {
      const message = JSON.parse(e.data);
      onMessage(message.from, message.data);
    };

    es.onopen = () => resolve(getSender(name));
    es.onerror = () => reject();
  });
}

function getSender(name: string) {
  return async function sendMessage(type: string, data: any) {
    await fetch(`https://huanent-deno-chat.deno.dev/api/send?name=${name}`, {
      method: "POST",
      body: JSON.stringify({ type: type, data: data }),
    });
  };
}
