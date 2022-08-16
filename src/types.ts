export interface ChatMessage {
  type: "enter" | "offer" | "answer" | "ice";
  data: any;
}
