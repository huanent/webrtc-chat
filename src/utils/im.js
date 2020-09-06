const drone = new Scaledrone("7NguiHAOub46ZJaj");

export function createIM(id, callback) {
  const room = drone.subscribe(id);
  room.on("data", callback);

  return new Promise((rs, rj) => {
    room.on("open", (error) => (error ? rj() : js()));
  });
}
