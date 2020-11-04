export function convent(key, srcret, appId, data) {
    let url= await getWebSocketUrl(key, srcret);
    let ws = new WebSocket(url);
    ws.onmessage = (e) => {
      let jsonData = JSON.parse(e.data);
      if (jsonData.data && jsonData.data.result) {
        let data = jsonData.data.result;
        let str = "";
        let ws = data.ws;
        for (let i = 0; i < ws.length; i++) {
          str = str + ws[i].cw[0].w;
        }
        if (str) eventBus.emit("ws_onmessage", str);
        ws.close();
      }
    };
  
    ws.onopen=()=>send(ws,key,srcret,appId,data)
  }


function getWebSocketUrl(key, srcret) {
  return new Promise((resolve) => {
    var url = "wss://iat-api.xfyun.cn/v2/iat";
    var host = "iat-api.xfyun.cn";
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, srcret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${key}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
}

function send(_ws, key, srcret, appId, audioData) {
    _ws.send(
      JSON.stringify({
        common: {
          app_id: appId,
        },
        business: {
          language: "zh_cn",
          domain: "iat",
          vad_eos: 5000,
          dwa: "wpgs",
        },
        data: {
          status: 0,
          format: "audio/L16;rate=16000",
          encoding: "raw",
          audio: toBase64(audioData.splice(0, 1280)),
        },
      })
    );
  
    while (audioData.length > 0) {
      _ws.send(
        JSON.stringify({
          data: {
            status: 1,
            format: "audio/L16;rate=16000",
            encoding: "raw",
            audio: toBase64(audioData.splice(0, 1280)),
          },
        })
      );
    }
  
    _ws.send(
      JSON.stringify({
        data: {
          status: 2,
          format: "audio/L16;rate=16000",
          encoding: "raw",
          audio: "",
        },
      })
    );
  }


function toBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }