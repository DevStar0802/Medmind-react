import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import BeatLoader from "../BeatLoader";
const Messages = ({ messages }) => {
  const backgroundColor = "white";
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  return (
    <>
      <Flex
        w="100%"
        h="100%"
        // overflowY="scroll"
        flexDirection="column"
        p="1"
        minH={"79vh"}
        maxH={"79vh"}
        bg={backgroundColor}
      >
        {React.Children.toArray(
          messages.map((item, index) => {
            if (index < 2) return null;
            if (item.role === "user") {
              return (
                <VStack key={index} align="flex-end">
                  <HStack w="full" justify="flex-end">
                    <Text fontWeight={"bold"}>You</Text>
                    <Avatar size="sm" bg="gray" />
                  </HStack>
                  <Flex
                    // w="100%"
                    justify="flex-end"
                    key={index}
                    w={["50", "50", "100%"]}
                  >
                    <Flex
                      // wrap={"wrap"}
                      bg="#eef1ff"
                      color="#727070"
                      minW="100px"
                      maxW="50vh"
                      my="1"
                      p="3"
                      borderRadius={"md"}
                    >
                      <Text
                        fontWeight={"bold"}
                        justify="start"
                        maxW={["29vh", "50vh"]}
                      >
                        {item.content}
                      </Text>
                    </Flex>
                  </Flex>
                </VStack>
              );
            } else {
              return (
                <VStack align={"start"}>
                  <Avatar
                    size={"sm"}
                    bg="gray"
                    icon={<FaRobot color="white" size={"1.5rem"} />}
                  />
                  <Flex key={index} w={["50", "50", "100%"]}>
                    <Flex
                      wrap={"wrap"}
                      bg="green.100"
                      w=""
                      color="#727070"
                      my="1"
                      p="3"
                      borderRadius={"md"}
                    >
                      {item.role === "typing" ? (
                        <BeatLoader />
                      ) : (
                        <Text fontWeight={"bold"} maxW={["29vh", "50vh"]}>
                          {item.content}
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </VStack>
              );
            }
          })
        )}
      </Flex>
      <Flex justify="center">
        <AlwaysScrollToBottom />
      </Flex>
    </>
  );
};

export default Messages;
