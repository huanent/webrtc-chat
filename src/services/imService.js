import { ref } from "vue";

export const messages = ref([]);
const drone = new Scaledrone("7NguiHAOub46ZJaj");
let roomId = null;

export async function create(id, callback) {
  roomId = id;
  const room = drone.subscribe(roomId);
  debugger;
  room.on("data", (msg) => {
    if (drone.clientId == msg.clientId) return;
    messages.value.push(msg);
    callback(msg);
  });

  await new Promise((rs, rj) => {
    room.on("open", (error) => (error ? rj() : rs()));
  });
}

export function send(id, type, data) {
  if (!roomId) throw Error("need create room first");

  drone.publish({
    room: roomId,
    message: {
      type: type,
      data: data,
      clientId: drone.clientId,
    },
  });
}

export function destroy() {
  messages.value = [];
  drone.unsubscribe(roomId);
  roomId = null;
}
