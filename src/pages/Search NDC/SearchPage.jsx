import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "../../App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
const SearchPage = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState("false");
  const [matchNdc, setMatchNdc] = useState("");
  const navigate = useNavigate();

  const getApi = async (searchData) => {
    try {
      setMatchNdc(searchData);
      setLoading("true");
      await axios
        .get(
          `https://us-central1-medmind-6f2a3.cloudfunctions.net/getProducts?ndc=${searchData}`
        )
        .then((res) => {
          console.log(res);
          setProduct(res.data.data);
        });

      setLoading("false");
    } catch (error) {
      setLoading("false");
      console.log("error", error);
    }
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    let ndc = form.formBasicEmail.value.trim();

    if (ndc.includes("-")) {
      let splittedVal = ndc.split("-");
      if (splittedVal.join("").length === 11) {
        await getApi(splittedVal.join(""));
      } else {
        let finalNdc = splittedVal.map((portion, index) => {
          let numberOfZeros = 0;
          if ((index === 0 || index === 1) && portion.length < 5 - index) {
            numberOfZeros = 5 - index - portion.length;
          } else if (index === 2 && portion.length < 2) {
            numberOfZeros = 2 - portion.length;
          }
          portion = "0".repeat(numberOfZeros) + portion; //Array(numberOfZeros + 1).join("0")
          return portion;
        });
        await getApi(finalNdc.join(""));
      }
    } else if (ndc.length > 1) await getApi(ndc);
  };

  return (
    <>
      <VStack mt="10px">
        <Heading textAlign="center">Search By Using NDC Number</Heading>
        <Form onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Tooltip label="Enter 11 Digit NDC" placement="auto-start">
              <Form.Control
                type="text"
                placeholder="Enter 11 Digit NDC"
                style={{ width: "300px" }}
              />
            </Tooltip>
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center">
            {loading === "true" ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Button
                className="w-50 opacity-75 "
                variant="success"
                type="submit"
                loading={loading}
              // disabled={loading.toString()}
              >
                Search
              </Button>
            )}
          </div>
        </Form>

        {product && product.length > 0 ? (
          <>
            {product
              // .filter((finalNDC) => finalNDC.ndc === matchNdc)
              .map((item, index) => {
                return (
                  <Box
                    w="auto"
                    mt="30px"
                    mx="5px"
                    key={index}
                    borderRadius="10px"
                    boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                    cursor="pointer"
                    onClick={() => {
                      navigate("/searchDetail", {
                        state: {
                          fromName: item.form,
                          ndcName: item.ndc,
                          tabletName: item.product_name,
                          strengthName: item.strength,
                          imageName: item.image_url,
                          pricesName: item.prices,
                        },
                      });
                    }}
                  >
                    <HStack align="start" p="10px" spacing="15px">
                      <VStack>
                        <Image
                          src={item?.image_url}
                          // height={{ base: "100px", sm: "150px" }}
                          height="150px"
                          width="150px"
                          // width={{ base: "80px", sm: "150px" }}
                          borderRadius="5px"
                          p="5px"
                          boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                        />
                      </VStack>
                      <VStack align="start">
                        <Heading fontSize="24px" color="gray.700">
                          {item?.product_name}
                        </Heading>
                        <Text>{item?.generic_name}</Text>
                        <Flex
                          direction={{ base: "column", lg: "row" }}
                          justify="space-between"
                          align="baseline"
                          w={{ base: "auto", lg: "500px" }}
                        >
                          <HStack align="baseline">
                            <Text>{item?.form}</Text>
                            <Text>•</Text>
                            <Text>{item?.strength}</Text>
                          </HStack>
                          <HStack align="baseline">
                            <Text fontWeight="bold" color="gray.700">
                              Manufacturer :
                            </Text>
                            <Text>{item?.manufacturer_name}</Text>
                          </HStack>
                        </Flex>
                      </VStack>
                    </HStack>
                  </Box>
                );
              })}
          </>
        ) : (
          <Text fontWeight="bold" fontSize="30px" color="red.500">
            Enter NDC Number
          </Text>

        )}
        <VStack
          spacing={5}
          align="stretch"
          maxW="900px"
          m="auto"
          bg="white"
          p={5}
        >
          <Flex bg="gray.100" p={4} borderRadius="md" flexDirection="column">
            <Heading as="h1" size="xl" textAlign="center" color="gray.600" fontSize="20px">

              Welcome to MedMind - Your Source for Affordable Medications
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              At our website, we are dedicated to revolutionizing access to affordable medications. We understand the financial burden that high drug costs can place on individuals and families, and we believe that everyone should have access to the medications they need without breaking the bank. That's why we have partnered directly with drug manufacturers to provide you with the lowest cost medications available.
            </Text>
            <Heading as="h1" size="xl" textAlign="center" color="gray.600" fontSize="20px">
              Our Approach
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We have taken a unique approach to tackle the rising costs of medications. By collaborating directly with reputable drug manufacturers, we are able to cut out unnecessary intermediaries and pass on the savings directly to you. This allows us to offer a wide range of high-quality medications at significantly lower prices compared to traditional pharmacy channels.
            </Text>
            <Heading as="h1" size="xl" textAlign="center" color="gray.600" fontSize="20px">
              Quality and Safety
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We prioritize your health and well-being above all else. Rest assured that the medications we offer are sourced directly from authorized manufacturers, ensuring their authenticity and quality. We work exclusively with trusted pharmaceutical companies that adhere to stringent quality control measures and regulatory standards.
            </Text>
            <Heading as="h1" size="xl" textAlign="center" color="gray.600" fontSize="20px">
              Convenience and Ease
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We understand that obtaining affordable medications should be a hassle-free experience. Our user-friendly website is designed to make the ordering process quick, easy, and secure. Simply browse our extensive selection of medications, add them to your cart, and proceed to checkout. We offer multiple payment options and ensure discreet packaging for your privacy.
            </Text>
            <Heading as="h1" size="xl" textAlign="center" color="gray.600" fontSize="20px">
              Expert Guidance and Support
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We believe that access to affordable medications should be accompanied by professional guidance and support. Our team of knowledgeable pharmacists is available to answer any questions you may have about your medications, potential side effects, or drug interactions. We are committed to ensuring that you have the information you need to make informed decisions about your healthcare.
            </Text>
            <Heading as="h1" size="xl" textAlign="center" color="gray.600" fontSize="20px">
              Privacy and Security
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              Protecting your personal information is of utmost importance to us. We employ the latest security measures and encryption protocols to safeguard your data. You can trust that your privacy is our top priority, and we will never share your information with third parties without your explicit consent.
            </Text>
            <Heading as="h1" size="xl" textAlign="center" color="gray.600" fontSize="20px">
              Our Mission
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              Our mission is to empower individuals to take control of their health by providing access to affordable medications without compromising on quality. We believe that no one should have to choose between their health and their financial well-being.
            </Text>
            <Heading as="h1" size="xl" textAlign="center" color="gray.600" fontSize="20px">
              Join Us Today
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We invite you to join us in our mission to make affordable medications accessible to all. Together, we can break down the barriers that prevent individuals from accessing the treatments they need. Explore our website, find the medications you require, and experience the convenience and savings firsthand.
            </Text>
            <Text fontSize="md" textAlign="center" color="gray.500">
              At our website, we are committed to delivering affordable medications, exceptional customer service, and a brighter, healthier future for all. Start saving on your prescription medications today and take the first step towards improved well-being.
            </Text>

          </Flex>
        </VStack>
      </VStack>
    </>
  );
};

export default SearchPage;
