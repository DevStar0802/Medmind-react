import axios from "axios";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const hitChatGpt = async (messageArray, setMessages) => {
  try {
    // 1. Do server-side rendering so that we don't expose our endpoiint
    // 2. IP blacklisting from cloud run
    const response = await fetch(
      "https://openai-service-ur2rlqmbdq-ue.a.run.app/generate_response",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          messages: messageArray,
        }),
      }
    );

    const content_message = {
      role: "assistant",
      content: "",
    };

    let newMessageArray = [...messageArray];
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
        let decodedValue = textDecoder.decode(value);
        let updatedMessageArray = [...newMessageArray];
        updatedMessageArray[updatedMessageArray.length - 1].content +=
          decodedValue;
        setMessages(updatedMessageArray);
      } catch (exception) {
        console.error(exception);
        const content_message = {
          role: "assistant",
          content: "Something wrong happened, please try again later..",
        };

        let newMessageArray = [...messageArray];
        newMessageArray.push(content_message);
        setMessages(newMessageArray);
      }

      pump(); // Call pump again to keep reading the stream
    };

    pump(); // Start the stream processing
  } catch (error) {
    console.error("Failed to fetch from the API", error);
    const content_message = {
      role: "assistant",
      content: "Something wrong happened, please try again later..",
    };

    let newMessageArray = [...messageArray];
    newMessageArray.push(content_message);
    setMessages(newMessageArray);
  }
};

export const getLocalStorageItem = (name) => {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};

export const getDrugContents = async () => {
  const res = await axios.get("http://65.108.24.122:1337/api/drugs");
  return res.data;
};
