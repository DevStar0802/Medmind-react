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
  resolveStyleConfig,
} from "@chakra-ui/react";

function combineLists(lists) {
  if (lists == null || lists == undefined) return;
  let combinedArray = [];
  for (let i = 0; i < lists.length; i++) {
    combinedArray = combinedArray.concat(lists[i]);
  }
  return combinedArray;
}

function combineListsOfLists(results) {
  if (results == null || results == undefined) return;
  const values = Object.values(results);
  if (values == undefined) return;
  const combinedList = combineLists(values);
  let combinedArray = [];
  for (let i = 0; i < combinedList.length; i++) {
    const newItem = combinedList[i * 2 + 1];
    if (newItem != undefined) combinedArray = combinedArray.concat(newItem);
  }

  return combinedArray;
}

function countValues(obj) {
  const result = {};
  if (obj == null || obj == undefined) return;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        const values = Object.values(obj[key]);
        if (obj[key] == null || obj[key] == undefined) continue;

        const combinedList = combineLists(values);
        result[key] = [obj[key].length, combinedList];
      } else {
        result[key] = 1;
      }
    }
  }

  return result;
}

const SearchPage = () => {
  const [product, setProduct] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState("false");
  const [matchNdc, setMatchNdc] = useState("");
  const [results, setResults] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  const getresults = async (searchData) => {
    // setInputValue(searchData);
    if (searchData == null || searchData == undefined) return;

    if (searchData.length > 2) {
      try {
        setLoading("true");
        await axios
          .get(`https://api.medmind.io/api/search_honeybee?query=${searchData}`)
          .then((res) => {
            const result = countValues(res.data.body);
            setResults(result);
          });

        // axios
        //   .get(`api.medmind.io/search?query=${searchData}`)
        //   .then((res) => {
        //     setResults(results + res.data.body);
        //   });

        setLoading("false");
      } catch (error) {
        setLoading("false");
      }
    }
  };
  const getApi = async (searchData) => {
    try {
      setMatchNdc(searchData);
      setLoading("true");
      await axios
        .get(`https://api.medmind.io/api/search_honeybee?query=${searchData}`)
        .then((res) => {
          if (
            res == null ||
            res == undefined ||
            res.data == null ||
            res.data == undefined ||
            res.data.body == undefined ||
            res.data.body == null
          )
            return;

          if (res.data.body && Object.keys(res.data.body).length > 0) {
            setProduct(res.data.body);
            setIsEmpty(false);
          } else {
            setProduct([]);
            setIsEmpty(true);
          }
        });
      // setInputValue("");
      setLoading("false");
    } catch (error) {
      setLoading("false");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    let ndc = form.formBasicEmail.value.trim();
    await getApi(ndc);
  };

  const handleSubmitFromSearch = async (event, result) => {
    event.preventDefault();

    setResults(null);
    setProduct(result);
    setIsEmpty(false);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === null || inputValue === undefined) return;
    setInputValue(inputValue);
    if (inputValue.length > 2) {
      getresults(inputValue);
    }
  };
  const handleQuery = (ndc) => {
    setResults([]);
    setInputValue(ndc);
  };
  return (
    <>
      <VStack mt="10px">
        <Heading textAlign="center">Search </Heading>
        <Form
          onSubmit={(event) =>
            handleSubmitFromSearch(event, combineListsOfLists(results))
          }
          style={{ position: "relative" }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Tooltip label="Enter your Query" placement="auto-start">
              <Form.Control
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search..."
                style={{ width: "300px" }}
              />
            </Tooltip>
            {results &&
              Object.keys(results) &&
              Object.keys(results).length > 0 && (
                <>
                  <Box
                    position="absolute"
                    bg="white"
                    zIndex="999"
                    p="3"
                    boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                    borderRadius="5px"
                    maxH="600px"
                    overflowY="scroll"
                  >
                    {Object.keys(results).map((result, index) => (
                      <Box
                        borderBottom="1px solid #dadada"
                        key={index}
                        align="start"
                        gap={3}
                        px="5px"
                        cursor="pointer"
                        onClick={(event) => {
                          handleSubmitFromSearch(event, results[result][1]);
                        }}
                      >
                        <Text style={{ fontWeight: "600" }} margin="1px">
                          {result}
                        </Text>
                        <Text margin="1px">{results[result][0]} choices</Text>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center">
            {loading === "true" ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Button
                className="w-50 "
                variant="success"
                type="submit"
                loading={loading}
                color="green"
              >
                Search
              </Button>
            )}
          </div>
        </Form>
        {product && product.length > 0 && (
          <>
            {product && product.length > 0 && (
              <VStack>
                {product
                  .filter((finalNDC) => finalNDC.ndc !== matchNdc)
                  .map((item, index) => (
                    <Box
                      w="auto"
                      mt="30px"
                      mx="5px"
                      key={index}
                      borderRadius="10px"
                      boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                      cursor="pointer"
                      onClick={() => {
                        navigate(`/drug/${item.ndc}`);
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
                            {item?.generic_name}
                          </Heading>
                          <Text>{item?.product_name}</Text>
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
                  ))}
              </VStack>
            )}
          </>
        )}
        {isEmpty && (
          <Text fontWeight="bold" fontSize="30px" color="red.500">
            No Result found for following Query
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
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              color="gray.600"
              fontSize="20px"
            >
              Welcome to MedMind - Your Source for Affordable Medications
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              At our website, we are dedicated to revolutionizing access to
              affordable medications. We understand the financial burden that
              high drug costs can place on individuals and families, and we
              believe that everyone should have access to the medications they
              need without breaking the bank. That's why we have partnered
              directly with drug manufacturers to provide you with the lowest
              cost medications available.
            </Text>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              color="gray.600"
              fontSize="20px"
            >
              Our Approach
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We have taken a unique approach to tackle the rising costs of
              medications. By collaborating directly with reputable drug
              manufacturers, we are able to cut out unnecessary intermediaries
              and pass on the savings directly to you. This allows us to offer a
              wide range of high-quality medications at significantly lower
              prices compared to traditional pharmacy channels.
            </Text>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              color="gray.600"
              fontSize="20px"
            >
              Quality and Safety
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We prioritize your health and well-being above all else. Rest
              assured that the medications we offer are sourced directly from
              authorized manufacturers, ensuring their authenticity and quality.
              We work exclusively with trusted pharmaceutical companies that
              adhere to stringent quality control measures and regulatory
              standards.
            </Text>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              color="gray.600"
              fontSize="20px"
            >
              Convenience and Ease
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We understand that obtaining affordable medications should be a
              hassle-free experience. Our user-friendly website is designed to
              make the ordering process quick, easy, and secure. Simply browse
              our extensive selection of medications, add them to your cart, and
              proceed to checkout. We offer multiple payment options and ensure
              discreet packaging for your privacy.
            </Text>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              color="gray.600"
              fontSize="20px"
            >
              Expert Guidance and Support
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We believe that access to affordable medications should be
              accompanied by professional guidance and support. Our team of
              knowledgeable pharmacists is available to answer any questions you
              may have about your medications, potential side effects, or drug
              interactions. We are committed to ensuring that you have the
              information you need to make informed decisions about your
              healthcare.
            </Text>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              color="gray.600"
              fontSize="20px"
            >
              Privacy and Security
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              Protecting your personal information is of utmost importance to
              us. We employ the latest security measures and encryption
              protocols to safeguard your data. You can trust that your privacy
              is our top priority, and we will never share your information with
              third parties without your explicit consent.
            </Text>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              color="gray.600"
              fontSize="20px"
            >
              Our Mission
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              Our mission is to empower individuals to take control of their
              health by providing access to affordable medications without
              compromising on quality. We believe that no one should have to
              choose between their health and their financial well-being.
            </Text>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              color="gray.600"
              fontSize="20px"
            >
              Join Us Today
            </Heading>
            <Text fontSize="md" textAlign="center" color="gray.500">
              We invite you to join us in our mission to make affordable
              medications accessible to all. Together, we can break down the
              barriers that prevent individuals from accessing the treatments
              they need. Explore our website, find the medications you require,
              and experience the convenience and savings firsthand.
            </Text>
            <Text fontSize="md" textAlign="center" color="gray.500">
              At our website, we are committed to delivering affordable
              medications, exceptional customer service, and a brighter,
              healthier future for all. Start saving on your prescription
              medications today and take the first step towards improved
              well-being.
            </Text>
          </Flex>
        </VStack>
      </VStack>
    </>
  );
};

export default SearchPage;
