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
    let ndc = form.formBasicEmail.value;

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
              .filter((finalNDC) => finalNDC.ndc === matchNdc)
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
      </VStack>
    </>
  );
};

export default SearchPage;
