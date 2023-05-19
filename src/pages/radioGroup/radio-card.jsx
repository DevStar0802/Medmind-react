import { Box, useRadio } from "@chakra-ui/react";

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" h="auto" m="1 !important">
      <input {...input} height="40px" />
      <Box
        h="auto"
        {...checkbox}
        w={{ base: "100%", md: "fit-content" }}
        // marginStart={{ base: "0 !importanat", md: "1 !important" }}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="sm"
        color="blue.500"
        fontWeight={"bold"}
        border={"1px solid #2b6cb7"}
        _checked={{
          bg: "blue.300",
          color: "white",
          // color: "gray.500",
          borderColor: "blue.300",
          // border: "1px solid ",
          fontWeight: "bold",
        }}
        // _focus={{
        //   boxShadow: "outline",
        // }}
        px={5}
        py={2}
        textAlign="center"
        whiteSpace={{ base: "break-spaces", md: "nowrap" }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
export default RadioCard;
