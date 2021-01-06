import { ref } from "vue";

export const messages = ref([]);
export const recognizing = ref(null);

export function startAsr(stream) {
  const speechTranslationConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
    "db2a9a09ac264dcd96c7ecae4537a8c6",
    "eastasia"
  );

  speechTranslationConfig.speechRecognitionLanguage = "zh-CN";
  speechTranslationConfig.addTargetLanguage("en-US");
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new SpeechSDK.TranslationRecognizer(
    speechTranslationConfig,
    audioConfig
  );

  recognizer.recognizing = (s, e) => {
    recognizing.value = {
      zh: e.result.text,
      en: e.result.translations.privMap.privValues[0],
    };
  };

  recognizer.recognized = (s, e) => {
    if (e.result.reason == SpeechSDK.ResultReason.NoMatch) {
      console.log("NOMATCH: Speech could not be translated.");
    } else {
      messages.value.push({
        zh: e.result.text,
        en: e.result.translations.privMap.privValues[0],
      });
      recognizing.value = null;
    }
  };

  recognizer.canceled = (s, e) => {
    console.log(`CANCELED: Reason=${e.reason}`);
    if (e.reason == SpeechSDK.CancellationReason.Error) {
      console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
      console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
      console.log("CANCELED: Did you update the subscription info?");
    }
    recognizer.stopContinuousRecognitionAsync();
  };

  recognizer.sessionStopped = (s, e) => {
    console.log("\n    Session stopped event.");
    recognizer.stopContinuousRecognitionAsync();
  };

  recognizer.startContinuousRecognitionAsync();
}
