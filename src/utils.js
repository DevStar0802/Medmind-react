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

export const hitChatGpt = async (messageArray, setMessages) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKEN,
      temperature: TEMPERATURE,
      top_p: TOP_P,
      n: N,
      stream: true,
      presence_penalty: 0,
      frequency_penalty: 0,
      messages: messageArray,
    }),
  });

  const content_message = {
    role: "assistant",
    content: "",
  };

  let newMessageArray = [...messageArray]
  newMessageArray.push(content_message);
  setMessages(newMessageArray);

  const textDecoder = new TextDecoder();
  const reader = response.body.getReader();

  const pump = async () => {
    const { done, value } = await reader.read();

    if (done) {
      // The stream is finished, return to exit the function
      return;
    }

    try {
      let decodedValue = JSON.parse(textDecoder.decode(value).replace("data:", ""));
      let updatedMessageArray = [...newMessageArray];
      updatedMessageArray[updatedMessageArray.length - 1].content += decodedValue.choices[0].delta.content;
      console.log(updatedMessageArray)
      setMessages(updatedMessageArray);
    } catch(exception){
      console.error(exception);
    }

    pump(); // Call pump again to keep reading the stream
  };

  pump(); // Start the stream processing
};
