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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RadioGroup from "../radioGroup";
import { FaPrescription } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import axios from "axios";
import { MyContext } from "../../utilities/MyContext";

export default function SearchDetailPage() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("");
  const [otherPackSizes, setOtherPackSizes] = useState("");
  const [price, setPrice] = useState("");
  const [otherQuantity, setOtherQuantity] = useState();
  const [otherInput, setOtherInput] = useState(false);
  const [alert, setAlert] = useState(false);
  const location = useLocation();
  const fromOptions = [location.state.fromName];
  const strengthOptions = [location.state.strengthName];
  const [pricesArray, setPricesArray] = useState("");
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
    navigate("/checkout");
  };

  const handleQuantityChange = () => {
    if (pricesArray == null || pricesArray == undefined || pricesArray != "")
      return;

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
    if (pricesArray !== "") {
      if (location.state.quantity) {
        setQuantity(location.state.quantity);
      } else {
        setQuantity(pricesArray[0].end_package_size.toString());
      }
    }
  }, [location.state.quantity, pricesArray]);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-medmind-6f2a3.cloudfunctions.net/getProducts?ndc=${location.state.ndcName}`
      )
      .then((res) => {
        if (res.data.data.length > 0) {
          console.log("res.data.data", res.data.data);
          const objOfObjects = res.data.data.reduce((acc, cur) => {
            const key = cur.ndc;
            acc[key] = cur;

            return acc;
          }, {});

          setPricesArray(objOfObjects[location.state.ndcName].prices);
          setCartItem(objOfObjects[location.state.ndcName]);
        }
      });
  }, []);

  useEffect(() => {
    if (pricesArray !== "") {
      const newMinPackSize = pricesArray[0].end_package_size;
      const newMaxPackSize =
        pricesArray[pricesArray.length - 1].end_package_size;

      setMinPackSize(newMinPackSize);
      setMaxPackSize(newMaxPackSize);
    }
  }, [pricesArray]);

  useEffect(() => {
    if (pricesArray !== "") {
      pricesArray.map((item) => {
        if (item.end_package_size.toString() === quantity) {
          setPrice(item.base_price);
        }
      });
    }
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
              <Heading>
                {location.state.genericName} ({location.state.tabletName})
              </Heading>
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
                      {location.state.requiresPrescription
                        ? "Prescription Required"
                        : "Human OTC product"}
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
                    {location.state.requiresPrescription && (
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
                  onChange=""
                  defaultValue={fromOptions[0]}
                />
                <Text>Strength</Text>
                <RadioGroup
                  options={strengthOptions}
                  name="from"
                  onChange=""
                  defaultValue={strengthOptions[0]}
                />
                <Text>Quantity</Text>
                <HStack gap={12}>
                  {pricesArray !== "" && (
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
                {/* <HStack gap={2}>
                  <RadioGroup
                    options={pricesArray
                      .filter(
                        (value, index, array) =>
                          array.findIndex(
                            (item) =>
                              item.units_included_in_base_price ===
                              value.units_included_in_base_price
                          ) === index
                      )
                      .map((item) =>
                        item.units_included_in_base_price.toString()
                      )}
                    name="Quantity"
                    defaultValue={pricesArray[0].units_included_in_base_price.toString()}
                    onChange={(value) => {
                      setQuantity(value);
                    }}
                  />
                </HStack> */}
                {/* <QuantitySlider quantity={quantity} setQuantity={setQuantity} minValue={minPackSize} maxValue={maxPackSize} /> */}
                <HStack>
                  {!otherInput && (
                    <Button onClick={() => setOtherInput(true)}>others</Button>
                  )}
                  {otherInput && (
                    <VStack>
                      <InputGroup>
                        <Input
                          pr="4.5rem"
                          type="text"
                          placeholder={`From ${minPackSize} - ${maxPackSize}`}
                          borderColor="#7fa8d4"
                          w="300px"
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
                  w="300px"
                  mt="30px"
                  textAlign={"left"}
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
      </Box>
    </>
  );
}
