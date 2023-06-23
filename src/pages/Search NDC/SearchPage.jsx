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
          <Heading as="h1" size="xl" textAlign="center">
            Welcome to Medmind
          </Heading>

          <Text fontSize="md" textAlign={"center"}>
            At Medmind, we believe that access to reliable healthcare information and personalized support should be readily available to everyone, anytime, and anywhere. Our mission is to empower individuals to take control of their well-being by leveraging the power of artificial intelligence and cutting-edge technology.
          </Text>

          <Heading as="h2" size="lg" textAlign={"center"}>
            Who We Are
          </Heading>

          <Text fontSize="md" textAlign={"center"}>
            Medmind is a revolutionary health chat AI platform that combines the expertise of medical professionals with the intelligence of state-of-the-art natural language processing algorithms. Our team consists of passionate healthcare experts, data scientists, and software engineers who are dedicated to transforming the way people interact with healthcare information and services.
          </Text>

          <Heading as="h2" size="lg" textAlign={"center"}>
            What we do
          </Heading>

          <Text fontSize="md" textAlign={"center"}>
            We provide an intelligent and intuitive chatbot interface that serves as a virtual healthcare companion, accessible 24/7. Whether you have a simple health question, need guidance on a specific condition, or seek advice on healthy living, Medmind is here to assist you. Our AI chatbot is designed to understand your unique needs, offer personalized recommendations, and provide evidence-based information, ensuring you receive accurate and reliable support.
          </Text>

          <Heading as="h2" size="lg" textAlign={"center"}>
            Our Approach
          </Heading>

          <Text fontSize="md" textAlign={"center"}>
            At Medmind, we prioritize user privacy and data security. We adhere to the highest standards of encryption and data protection protocols to safeguard your personal health information. Your trust is of utmost importance to us, and we are committed to maintaining the confidentiality of all interactions within our platform.
            We continuously strive to improve our AI algorithms by incorporating feedback from users and staying updated with the latest advancements in healthcare. Our chatbot undergoes regular updates and enhancements to ensure that it delivers the most relevant and up-to-date information.
          </Text>

          <Heading as="h2" size="lg" textAlign={"center"}>
            Why Choose Medmind
          </Heading>

          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Accessibility
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              Medmind is accessible from any device with an internet connection, making it convenient for you to seek healthcare guidance whenever you need it.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Personalized Support
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              Our AI chatbot is trained to understand your individual needs and provide tailored recommendations, promoting a personalized approach to healthcare.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Reliable Information
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              We collaborate with trusted medical professionals and curate information from reputable sources, ensuring the accuracy and reliability of the information shared.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Empowering Self-Care
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              Medmind encourages you to become an active participant in your well-being by equipping you with the knowledge and tools to make informed decisions about your health.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Continuous Improvement
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              We are committed to enhancing our AI capabilities and expanding our knowledge base to deliver an ever-improving user experience.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Join Us on Your Health Journey
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              We invite you to join us on this transformative health journey. Whether you have a pressing medical concern or simply seek guidance on leading a healthier lifestyle, Medmind is here to support you every step of the way. Our AI chatbot is ready to assist you, providing trustworthy information, compassionate support, and empowering guidance.
              Remember, your health matters, and at Medmind, we strive to make your well-being our top priority. Together, let's unlock the power of AI and take control of our health and happiness.
            </Text>
          </Box>
        </VStack>

      </VStack>
    </>
  );
};

export default SearchPage;
