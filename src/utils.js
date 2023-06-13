var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const hitChatGpt = async (messageArray, setMessages) => {
  const response = await fetch("https://us-central1-medmind-6f2a3.cloudfunctions.net/streamOpenAIResponse", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
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
      let updatedMessageArray = [...newMessageArray]
      updatedMessageArray[updatedMessageArray.length - 1].content += decodedValue;
      setMessages(updatedMessageArray);
    } catch(exception){
      console.error(exception);
    }

    pump(); // Call pump again to keep reading the stream
  };

  pump(); // Start the stream processing
};
