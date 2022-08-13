//https://huanent-deno-socket.deno.dev/list

export function createConnection(
  name: string,
  onMessage: (from: string, message: string) => {}
) {
  return new Promise<any>((resolve, reject) => {
    const ws = new WebSocket(
      `wss://huanent-deno-socket.deno.dev/enter?name=${name}`
    );

    function sendMessage(type: string, data: any) {
      ws.send(
        JSON.stringify({
          type: type,
          data: data,
        })
      );
    }

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      onMessage(message.from, message.data);
    };

    ws.onopen = () => resolve(sendMessage);
    ws.onerror = () => reject();
  });
}
