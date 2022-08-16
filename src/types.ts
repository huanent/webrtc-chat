import { Ref } from "vue";

export interface ChatMessage {
  type: "enter" | "offer" | "answer" | "ice";
  from: string;
  data: any;
}

export interface Session {
  name: string;
  peerConnection: RTCPeerConnection;
  stream: Ref<MediaStream | undefined>;
}
