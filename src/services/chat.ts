//https://huanent-deno-socket.deno.dev/list

export function createConnection(
  name: string,
  onMessage: (from: string, message: string) => {}
) {
  return new Promise<any>((resolve, reject) => {
    const es = new EventSource(
      `https://huanent-deno-chat.deno.dev/api/listen?name=${name}`
    );

    function sendMessage(type: string, data: any) {
      fetch(`https://huanent-deno-chat.deno.dev/api/send?name=${name}`, {
        method: "POST",
        body: JSON.stringify({ type: type, data: data }),
      });
    }

    es.onmessage = (e) => {
      const message = JSON.parse(e.data);
      onMessage(message.from, message.data);
    };

    es.onopen = () => resolve(sendMessage);
    es.onerror = () => reject();
  });
}
