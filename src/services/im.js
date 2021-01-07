const drone = new Scaledrone("7NguiHAOub46ZJaj");

export async function createIM(id, callback) {
  const room = drone.subscribe(id);
  room.on("data", (msg) => {
    if (drone.clientId == msg.clientId) return;
    callback(msg);
  });

  await new Promise((rs, rj) => {
    room.on("open", (error) => (error ? rj() : rs()));
  });

  return (type, data) =>
    drone.publish({
      room: id,
      message: {
        type: type,
        data: data,
        clientId: drone.clientId,
      },
    });
}
