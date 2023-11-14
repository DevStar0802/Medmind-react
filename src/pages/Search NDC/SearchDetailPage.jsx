import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  Alert,
  AlertIcon,
  StackDivider,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RadioGroup from "../radioGroup";
import { FaPrescription } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import axios from "axios";
import { MyContext } from "../../utilities/MyContext";

import { getDrugContents } from "../../utils";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function SearchDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ndc } = useParams();
  const [quantity, setQuantity] = useState("");
  const [otherPackSizes, setOtherPackSizes] = useState("");
  const [price, setPrice] = useState("");
  const [otherInput, setOtherInput] = useState(false);
  const [alert, setAlert] = useState(false);
  const [pricesArray, setPricesArray] = useState([]);
  const [minPackSize, setMinPackSize] = useState(null);
  const [maxPackSize, setMaxPackSize] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const { cartItemCount, setCartItemCount } = useContext(MyContext);

  const setCartItemsInLocalStorage = () => {
    let stringParsedItems = localStorage.getItem("cartItems");

    if (stringParsedItems === null) {
      stringParsedItems = "[]";
    }

    let cartItems = JSON.parse(stringParsedItems);

    if (typeof cartItems !== typeof []) {
      cartItems = [];
    }

    // Initialize a variable to check if the item already exists in the cart.
    let isItemExists = false;

    // Loop through the existing cart items to find a match.
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].ndc === cartItem.ndc) {
        // If a matching item is found, update its quantity and price.

        cartItems[i].quantity = parseInt(cartItems[i].quantity);
        cartItems[i].price = parseInt(cartItems[i].price);
        cartItems[i].quantity += parseInt(quantity);
        cartItems[i].price += parseInt(price);

        // Set the variable to true and break the loop.
        isItemExists = true;
        break;
      }
    }

    // If the item doesn't already exist, push it into the cartItems array.
    if (!isItemExists) {
      cartItems.push({ ...cartItem, price: price, quantity: quantity });
    }

    const cartItemsString = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", cartItemsString);

    return isItemExists;
  };

  const addCartItem = (event) => {
    event.preventDefault();
    const isItemsExist = setCartItemsInLocalStorage();
    setCartItemCount(isItemsExist ? cartItemCount : cartItemCount + 1);
    navigate("/cart");
  };

  const handleQuantityChange = () => {
    if (!pricesArray.length) return;

    pricesArray.map((item) => {
      if (
        otherPackSizes &&
        (otherPackSizes < minPackSize || otherPackSizes > maxPackSize)
      ) {
        setAlert(true);
      } else if (!otherPackSizes) {
        setOtherInput(false);
        setAlert(false);
      } else {
        setAlert(false);
        setOtherInput(false);
        setQuantity(otherPackSizes);
        if (otherPackSizes == item.units_included_in_base_price) {
          setPrice(item.base_price);
        } else if (
          otherPackSizes >= item.start_package_size &&
          otherPackSizes <= item.end_package_size
        ) {
          const packDifference =
            otherPackSizes - item.units_included_in_base_price;
          let otherPrice =
            packDifference * item.additional_price_per_unit_after_base;
          let finalPrice = item.base_price + otherPrice;
          setPrice(finalPrice.toFixed(2));
        }
      }
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://us-central1-medmind-6f2a3.cloudfunctions.net/getProducts?ndc=${ndc}`
        // `https://us-central1-medmind-6f2a3.cloudfunctions.net/getProducts?ndc=0006010654`
      )
      .then((res) => {
        if (res.data.data.length > 0) {
          console.log("res.data.data", res.data.data);
          const objOfObjects = res.data.data.reduce((acc, cur) => {
            const key = cur.ndc;
            acc[key] = cur;
            return acc;
          }, {});

          setPricesArray(objOfObjects[ndc.replace(/-/g, "")].prices);
          setCartItem(objOfObjects[ndc.replace(/-/g, "")]);
        }
      });
  }, []);

  useEffect(() => {
    if (pricesArray.length) {
      if (location.state && location.state.quantity)
        setQuantity(location.state.quantity.toString());
      else setQuantity(pricesArray[0].end_package_size.toString());
    }
  }, [pricesArray, location.state]);

  useEffect(() => {
    if (pricesArray.length) {
      const newMinPackSize = pricesArray[0].end_package_size;
      const newMaxPackSize =
        pricesArray[pricesArray.length - 1].end_package_size;
      setMinPackSize(newMinPackSize);
      setMaxPackSize(newMaxPackSize);
    }
  }, [pricesArray]);

  useEffect(() => {
    if (pricesArray.length) {
      pricesArray.map((item) => {
        if (item.end_package_size.toString() === quantity) {
          setPrice(item.base_price);
        }
      });
    }
  }, [quantity, pricesArray]);

  const [drugContents, setDrugContents] = useState({
    Indications_and_Usage: "",
    Contraindications: "",
    Warnings: "",
    Precautions: "",
    Adverse_Reactions: "",
    Overdosage: "",
    Dosage_and_Administration: "",
    How_Supplied: "",
  });

  const [selectedKey, setSelectedKey] = useState("");

  const getDrugContents = async () => {
    const res = await axios.get(
      "http://3.93.200.27:1337/api/drugs?filters[NDC][$startsWith]=50090-0481"
    );
    console.log("Drug_________________!", res.data);
    setDrugContents({
      Indications_and_Usage: res.data.data[0].attributes.INDICATIONS_AND_USAGE,
      Contraindications: res.data.data[0].attributes.CONTRAINDICATIONS,
      Warnings: res.data.data[0].attributes.WARNINGS,
      Precautions: res.data.data[0].attributes.PRECAUTIONS,
      Adverse_Reactions: res.data.data[0].attributes.ADVERSE_REACTIONS,
      Overdosage: res.data.data[0].attributes.OVERDOSAGE,
      Dosage_and_Administration:
        res.data.data[0].attributes.DOSAGE_AND_ADMINISTRATION,
      How_Supplied: res.data.data[0].attributes.HOW_SUPPLIED,
    });
    setSelectedKey("Indications_and_Usage");
  };

  useEffect(() => {
    // getDrugContents();
    console.log(quantity, quantity.toString());
  }, [quantity]);

  const handleChangeContentItem = (key) => {
    setSelectedKey(key);
  };

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
        {cartItem && (
          <Flex
            m="30px"
            p="20px"
            justify="space-evenly"
            borderRadius="10px"
            direction={["column", "column", "column", "row", "row"]}
            boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
          >
            <VStack
              align="start"
              justify="space-evenly"
              p={{ base: "2", md: "4" }}
            >
              <VStack align="start">
                <Heading>
                  {cartItem.generic_name} ({cartItem.product_name})
                </Heading>
                <Flex
                  gap={5}
                  align="start"
                  direction={["column", "column", "row", "row", "row"]}
                >
                  <Image
                    src={cartItem.image_url}
                    h="250px"
                    w="250px"
                    borderRadius="10px"
                    boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                    p="5px"
                  />

                  <VStack align="flex-start" ml="2" spacing={"6"}>
                    <HStack
                      bg="gray.100"
                      p="5px"
                      w="90%"
                      h="50px"
                      maxW="600px"
                      borderRadius="10px"
                    >
                      <FaPrescription
                        style={{ margin: "0 0 0 10px" }}
                        color="rgb(20, 66, 114)"
                      />
                      <Text fontWeight="bold" color="rgb(20, 66, 114)">
                        {cartItem.requires_prescription
                          ? "Prescription Required"
                          : "Human OTC product"}
                      </Text>
                    </HStack>

                    <Text fontWeight="bold" align="center">
                      Why does my medication look different ?
                    </Text>
                    <Text maxW="600px">
                      Different manufacturers produce different looking
                      medications to distinguish themselves from one another,
                      but the drug,strength, and ingredients are the same.
                    </Text>
                    <HStack
                      bg="gray.100"
                      borderRadius="10px"
                      justify="center"
                      w="90%"
                      maxW="600px"
                    >
                      {cartItem.requires_prescription && (
                        <Text pt="10px" fontWeight="bold" color="blue.700">
                          Contact your doctor for prescription
                        </Text>
                      )}
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
                  w={{ base: "100%", md: "100%" }}
                >
                  <Text>
                    We think you should know how much your medications cost and
                    why.
                  </Text>
                  <Text>
                    A{" "}
                    <strong>
                      {quantity} count supply of {cartItem.strength}
                      {cartItem.product_name}
                    </strong>{" "}
                    will cost: <strong>${price}</strong>
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
                maxW={{ base: "100%", md: "400px" }}
                w="full"
                mx="50px"
              >
                <VStack gap={1} align="start">
                  <HStack align="baseline">
                    <p>
                      {cartItem.form} • {cartItem.strength} • {quantity} count
                    </p>
                  </HStack>

                  <Heading>${price}</Heading>

                  <Text>Form</Text>
                  <RadioGroup
                    options={[cartItem.form]}
                    name="from"
                    defaultValue={cartItem.form}
                  />

                  <Text>Strength</Text>
                  <RadioGroup
                    options={[cartItem.strength]}
                    name="from"
                    defaultValue={cartItem.strength}
                  />

                  <Text>Quantity</Text>
                  <HStack gap={12}>
                    {pricesArray.length && quantity && (
                      <RadioGroup
                        options={pricesArray.map((item) =>
                          item.end_package_size.toString()
                        )}
                        name="Quantity"
                        defaultValue={quantity}
                        onChange={(value) => {
                          setQuantity(value);
                        }}
                      />
                    )}
                  </HStack>
                  <HStack>
                    {!otherInput && (
                      <Button onClick={() => setOtherInput(true)}>
                        others
                      </Button>
                    )}
                    {otherInput && (
                      <VStack>
                        <InputGroup>
                          <Input
                            pr="4.5rem"
                            type="text"
                            placeholder={`From ${minPackSize} - ${maxPackSize}`}
                            borderColor="#7fa8d4"
                            w="100%"
                            value={otherPackSizes}
                            onChange={(e) => {
                              setOtherPackSizes(e.target.value);
                            }}
                          />
                          <InputRightElement width="3.5rem">
                            <Box
                              cursor="pointer"
                              color="#7fa8d4"
                              onClick={() => handleQuantityChange()}
                            >
                              Done
                            </Box>
                          </InputRightElement>
                        </InputGroup>

                        {alert && (
                          <Alert status="error" color="red" borderRadius="7px">
                            <AlertIcon />
                            Package size must be between {minPackSize}-
                            {maxPackSize}
                          </Alert>
                        )}
                      </VStack>
                    )}
                  </HStack>
                  <Button
                    colorScheme="blue"
                    rightIcon={<RiShoppingCartLine />}
                    w="100%"
                    mt="30px"
                    onClick={(e) => addCartItem(e)}
                  >
                    Add to cart
                  </Button>
                </VStack>
              </VStack>
              <Text color="gray.500" ms="10px">
                *final prices shown at checkout
              </Text>
            </VStack>
          </Flex>
        )}
      </Box>
    </>
  );
}
