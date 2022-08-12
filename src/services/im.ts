const drone = new Scaledrone("7NguiHAOub46ZJaj");

export async function createIM(id: string, callback: any) {
  const room = drone.subscribe(id);
  room.on("data", (msg: any) => {
    if (drone.clientId == msg.clientId) return;
    callback(msg);
  });

  await new Promise((rs, rj) => {
    room.on("open", (error: any) => (error ? rj() : rs(undefined)));
  });

  return (type: any, data: any) =>
    drone.publish({
      room: id,
      message: {
        type: type,
        data: data,
        clientId: drone.clientId,
      },
    });
}
