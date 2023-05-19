const MODEL = "gpt-3.5-turbo";
const MAX_TOKEN = 300;
const TEMPERATURE = 0.4;
const TOP_P = 1.0;
const N = 1;

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer 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"
);

export const hitChatGpt = async (message) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: myHeaders,
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKEN,
      temperature: TEMPERATURE,
      top_p: TOP_P,
      n: N,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 0,
      messages: message,
    }),
  });
  return response;
};
