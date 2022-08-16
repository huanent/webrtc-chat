import { SendMessage } from "@/services/chat";
import { useAnswer, useOffer } from "@/services/rtc";
import { Session } from "@/types";
import { shallowReactive } from "vue";

export const sessions = shallowReactive<Session[]>([]);

export async function makeOffer(from: string, senMessage: SendMessage) {
  const { oppositeStream, peerConnection } = await useOffer(from, senMessage);

  sessions.push({
    name: from,
    peerConnection,
    stream: oppositeStream,
  });
}

export async function makeAnswer(
  from: string,
  data: any,
  senMessage: SendMessage
) {
  const { oppositeStream, peerConnection } = await useAnswer(
    from,
    data,
    senMessage
  );
  sessions.push({
    name: from,
    peerConnection,
    stream: oppositeStream,
  });
}

export async function handleAnswer(from: string, data: any) {
  const connection = sessions.find((f) => f.name == from);
  await connection?.peerConnection.setRemoteDescription(
    new RTCSessionDescription(data)
  );
}

export async function handleIce(from: string, data: any) {
  if (!data) return;
  const connection = sessions.find((f) => f.name == from);
  connection?.peerConnection.addIceCandidate(new RTCIceCandidate(data));
}

export function closeSession(name: string) {
  const session = sessions.find((f) => f.name == name);
  if (!session) return;
  const index = sessions.indexOf(session);
  sessions.splice(index, 1);
  session.peerConnection.close();
}
