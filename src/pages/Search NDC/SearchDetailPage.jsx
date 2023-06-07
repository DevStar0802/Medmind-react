import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  ListItem,
  Radio,
  Text,
  UnorderedList,
  VStack,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RadioGroup from "../radioGroup";
import { FaPrescription } from "react-icons/fa";
const SearchDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromOptions = [location.state.fromName];
  const strengthOptions = [location.state.strengthName];
  const [pricesArray, setPricesArray] = useState(location.state.pricesName);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    setQuantity(pricesArray[0].end_package_size.toString());
  }, [pricesArray]);
  useEffect(() => {
    pricesArray.map((item) => {
      if (item.end_package_size.toString() === quantity) {
        setPrice(item.total_price);
      }
    });
  }, [quantity]);

  return (
    <>
      <Box>
        <HStack
          justify="end"
          mt="5px"
          p="5px"
          px="10px"
          borderRadius="5px"
          boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
          wrap="wrap"
        >
          <Button
            onClick={() => {
              navigate("/searchPage");
            }}
          >
            Back
          </Button>
        </HStack>
        <Flex
          m="30px"
          p="20px"
          justify="space-evenly"
          // wrap="wrap"
          borderRadius="10px"
          direction={["column", "column", "column", "row", "row"]}
          // mt="60px"
          boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
        >
          <VStack
            align="start"
            justify="space-evenly"
            p={{ base: "2", md: "4" }}
          >
            <VStack align="start">
              <Heading>{location.state.tabletName}</Heading>
              <Flex
                gap={5}
                align="start"
                direction={["column", "column", "row", "row", "row"]}
              >
                <Image
                  src={location.state.imageName}
                  h="250px"
                  w="250px"
                  borderRadius="10px"
                  boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                  // border="1px solid"
                  p="5px"
                />

                <VStack align="flex-start" ml="2" spacing={"6"}>
                  <HStack
                    // gap={1}

                    bg="gray.100"
                    p="5px"
                    // w="600px"
                    h="50px"
                    borderRadius="10px"
                    // w={["200px", "250px", "300px", "600px"]}
                    w="90%"
                    maxW="600px"
                  >
                    <FaPrescription
                      style={{ margin: "0 0 0 10px" }}
                      color="rgb(20, 66, 114)"
                    />
                    <Text fontWeight="bold" color="rgb(20, 66, 114)">
                      Prescription Required
                    </Text>
                  </HStack>

                  <Text fontWeight="bold" align="center">
                    Why does my medication look different ?
                  </Text>
                  <Text maxW="600px">
                    Different manufacturers produce different looking
                    medications to distinguish themselves from one another, but
                    the drug,strength, and ingredients are the same.
                  </Text>
                  <HStack
                    bg="gray.100"
                    borderRadius="10px"
                    // w="600px"
                    justify="center"
                    w="90%"
                    maxW="600px"
                  >
                    <Text pt="10px" fontWeight="bold" color="blue.700">
                      Contact your doctor for prescription
                    </Text>
                  </HStack>
                </VStack>
              </Flex>
            </VStack>
            <VStack align="start" w="full">
              <Heading fontSize="30px">Transparent pricing </Heading>
              <VStack
                bg="blue.50"
                p="30px"
                borderRadius="10px"
                // w="870px"
                w={{ base: "100%", md: "100%" }}
              >
                <Text>
                  We think you should know how much your medications cost and
                  why.
                </Text>
                <Text>
                  A{" "}
                  <strong>
                    {quantity} count supply of {location.state.strengthName}{" "}
                    {location.state.tabletName}
                  </strong>{" "}
                  will cost :
                </Text>
              </VStack>
            </VStack>
          </VStack>
          <VStack align="start">
            <Heading fontSize="23px" ms="10px">
              Price Calculator
            </Heading>
            <VStack
              flexWrap="wrap"
              borderRadius="10px"
              border="1px solid rgb(191, 204, 181)"
              p="20px"
              // w={["300px", "400px"]}
              maxW={{ base: "100%", md: "400px" }}
              w="full"
              mx="50px"
            >
              <VStack gap={1} align="start">
                <Heading>{location.state.tabletName}</Heading>
                <HStack align="baseline">
                  <Text>{location.state.fromName}</Text>
                  <Text>•</Text>
                  <Text>{location.state.strengthName}</Text>
                  <Text>•</Text>
                  <Text>{quantity} count</Text>
                </HStack>
                <Heading>$ {price}</Heading>
                <Text>Form</Text>
                <RadioGroup
                  options={fromOptions}
                  name="from"
                  defaultValue={fromOptions[0]}
                  onChange=""
                />
                <Text>Strength</Text>
                <RadioGroup
                  options={strengthOptions}
                  name="from"
                  defaultValue={strengthOptions[0]}
                  onChange=""
                />
                <Text>Quantity</Text>
                <HStack gap={2}>
                  <RadioGroup
                    options={pricesArray.map((item) =>
                      item.end_package_size.toString()
                    )}
                    name="Quantity"
                    defaultValue={pricesArray[0].end_package_size.toString()}
                    onChange={(value) => {
                      setQuantity(value);
                    }}
                  />
                </HStack>
              </VStack>
            </VStack>
            <Text color="gray.500" ms="10px">
              *final prices shown at checkout
            </Text>
          </VStack>
        </Flex>
      </Box>
    </>
  );
};

export default SearchDetailPage;