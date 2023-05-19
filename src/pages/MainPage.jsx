import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { hitChatGpt } from "../utils";
import { AiOutlineSend } from "react-icons/ai";
import ChatPage from "./Chat/ChatPage";
const MainPage = () => {
  const [InitialMessage, setInitialMessage] = useState("");
  const [firstRun, setFirstRun] = useState(true);
  const [firstPageLoading, setFirstPageLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const backgroundColor = "white";
  const greenColor = "rgb(96, 153, 102)";
  useEffect(() => {
    handleSendMessage(
      "Act as if you are a licensed healthcare provider can you answer my health related questions, just make sure you look up pubmed data or clinical trail results and answer my health related questions and include the links to data?"
    );
    return () => {
      setFirstRun(true);
    };
  }, []);
  const handleSendMessage = (newMessage) => {
    setFirstPageLoading(true);
    const data = newMessage;
    let callMsgs = [{ role: "user", content: data }];
    setTimeout(async () => {
      let response = await hitChatGpt(callMsgs);
      response.json().then((data) => {
        // setIsTyping(false);
        const choices = data.choices;
        let responses = [...callMsgs];
        choices.forEach((choice) => {
          responses.push({
            role: "assistant",
            content: choice.message.content,
          });
        });
        setMessages([...responses]);
        setFirstPageLoading(false);
      });
    }, 0);
  };
  return (
    <>
      {firstRun && (
        <VStack
          h="93.5vh"
          maxH="93.5vh"
          justify="space-between"
          bg={backgroundColor}
          // wrap="wrap"
          py="15px"
        >
          <VStack
            p="10px"
            gap={5}
            mt="150px"
            wrap={"wrap"}
            // h={"60vh"}
            // maxH={"60vh"}
            maxW={"70vh"}
          >
            <Heading>Ask MedMind A Question </Heading>

            <InputGroup size="lg">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Ask anything..."
                bg="gray.200"
                value={InitialMessage}
                onKeyPress={(e) => {
                  if (!firstPageLoading) {
                    if (e.key === "Enter") {
                      InitialMessage && setFirstRun(false);
                    }
                  }
                }}
                onChange={(e) => {
                  setInitialMessage(e.target.value);
                }}
              />
              <InputRightElement width="3.5rem">
                <Button
                  h="1.75rem"
                  borderRadius="full"
                  size="sm"
                  isLoading={firstPageLoading}
                  // loadingText="Please wait..."
                  bg={greenColor}
                  colorScheme="green"
                  onClick={() => {
                    InitialMessage && setFirstRun(false);
                  }}
                >
                  <AiOutlineSend />
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
          <Flex
            borderRadius="10px"
            direction={"column"}
            maxW={"90%"}
            bg="gray.100"
            h="max-content"
            p="10px"
            mb="10px"
          >
            <Heading align="center" fontSize="20px" color="gray.600">
              Disclaimer
            </Heading>
            <Text color="gray.500" px="10px">
              This health chat app is intended for informational purposes only
              and should not be used as a substitute for professional medical
              advice, diagnosis, or treatment. Always seek the advice of a
              qualified healthcare provider with any questions you may have
              regarding a medical condition. Never disregard professional
              medical advice or delay in seeking it because of information you
              have received through this AI health chat app. If you think you
              may have a medical emergency, call your doctor or emergency
              services immediately. Reliance on any information provided by this
              AI health chat app is solely at your own risk.
            </Text>
          </Flex>
        </VStack>
      )}
      {!firstRun && (
        <ChatPage
          key={firstRun.toString()}
          initialMessage={InitialMessage}
          messagesProp={messages}
        />
      )}
    </>
  );
};

export default MainPage;
