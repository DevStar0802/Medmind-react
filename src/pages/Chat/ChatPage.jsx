import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import { hitChatGpt } from "../../utils";
import HealthPageDisclaimer from "../Disclaimer/HealthPageDisclaimer";
const ChatPage = ({ initialMessage, messagesProp }) => {
  const backgroundColor = "white";
  const greenColor = "rgb(96, 153, 102)";
  const headerColor = "rgb(32, 33, 36)";
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(messagesProp);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (initialMessage) handleSendMessage(initialMessage);
    return () => {
      setMessages("");
    };
  }, []);

  const handleSendMessage = (newMessage) => {
    if (!newMessage.trim().length) {
      return;
    }
    const data = newMessage;
    setInputMessage("");
    let callMsgs = [...messages, { role: "user", content: data }];
    setMessages([...callMsgs, { role: "typing", content: "" }]);
    setTimeout(async () => {
    hitChatGpt(callMsgs, setMessages);

      // response.json().then((data) => {
      //   const choices = data.choices;
      //   let responses = [];
      //   choices.forEach((choice) => {
      //     responses.push({
      //       role: "assistant",
      //       content: choice.message.content,
      //     });
      //   });
      //   setMessages((old) => [
      //     ...old.filter((element) => element.role !== "typing"),
      //     ...responses,
      //   ]);
      // });
    }, 0);
  };
  return (
    <Box bg={backgroundColor} h="88vh" maxH="88vh">
      <Card bg={backgroundColor} border="none">
        <CardBody
          justifyContent="center"
          // position="relative"
          // top="0"
          // h={"82vh"}
          maxH={"80vh"}
          // overflow="hidden"
          overflowY="scroll"
        >
          <Messages messages={messages} />
        </CardBody>
        <CardFooter>
          <Flex direction="column" w="full">
            <Flex alignItems="center" padding="2">
              <InputGroup size="md" flexGrow={1}>
                <Input
                  pr="4.5rem"
                  boxShadow="0 0 10px #ccc"
                  placeholder="Type Something..."
                  border="none"
                  borderRadius="5px"
                  outline={"none"}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputMessage);
                    }
                  }}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <InputRightElement width="3.5rem">
                  <Button
                    h="1.75rem"
                    borderRadius="full"
                    marginLeft="10px"
                    size="sm"
                    bg={greenColor}
                    colorScheme="green"
                    disabled={inputMessage.trim().length <= 0}
                    onClick={() => {
                      handleSendMessage(inputMessage);
                      console.log(inputMessage);
                    }}
                  >
                    <AiOutlineSend />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
            <Flex justify="center" align="baseline" p="1px" gap="5px">
              <Text
                cursor="pointer"
                onClick={onOpen}
                fontWeight="bold"
                color="gray.600"
                textDecoration="underline"
              >
                Disclaimer
              </Text>
              <Text color="gray.600">
                This health chat app is intended for informational purposes only
                and should not be used as a substitute for professional medical
                advice .
              </Text>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>

      <Modal
        borderRadius="10px"
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disclaimer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HealthPageDisclaimer />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChatPage;
