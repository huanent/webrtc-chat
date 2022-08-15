export interface ChatMessage {
  type: "enter" | "offer" | "answer";
  data: any;
}
