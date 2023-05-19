import {
  Box,
  Card,
  CardBody,
  CardHeader,
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
import { useLocation } from "react-router-dom";
import RadioGroup from "../radioGroup";
import { FaPrescription } from "react-icons/fa";
const SearchDetailPage = () => {
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
      <Flex
        m="20px"
        p="20px"
        justify="space-evenly"
        wrap="wrap"
        // border="1px solid gray"
      >
        <VStack align="start">
          <Heading>{location.state.tabletName}</Heading>
          <HStack gap={2}>
            <Image
              src={location.state.imageName}
              h="250px"
              w="250px"
              borderRadius="10px"
              boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
              // border="1px solid"
              p="5px"
            />
            <VStack>
              <HStack
                // gap={1}
                align="center"
                bg="gray.100"
                p="5px"
                w="600px"
                h="50px"
                borderRadius="10px"
              >
                <FaPrescription style={{ margin: "10px" }} />
                <Text fontWeight="bold">Prescription Required</Text>
              </HStack>
              <VStack w="600px" p="20px">
                <Text fontWeight="bold" align="center">
                  Why does my medication look different ?
                </Text>
                <Text>
                  Different manufacturers produce different looking medications
                  to distinguish themselves from one another, but the
                  drug,strength, and ingredients are the same.
                </Text>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
        <VStack align="start">
          <Heading fontSize="23px" ms="10px">
            Price Calculator
          </Heading>
          <Box
            borderRadius="10px"
            border="1px solid gray"
            p="20px"
            w="400px"
            maxW="400px"
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
              {/* <UnorderedList gap={2}>
                <ListItem>{location.state.fromName}</ListItem>
                <ListItem>{location.state.strengthName}</ListItem>
                <ListItem>{quantity} count</ListItem>
              </UnorderedList> */}

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
          </Box>
          <Text color="gray.500" ms="10px">
            *final prices shown at checkout
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

export default SearchDetailPage;
