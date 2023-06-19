import { HStack, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import RadioCard from "./radio-card";


const RadioGroup = (props) => {
  const { options, name, maxW, ...rest } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    ...rest,
  });
  const group = getRootProps();
  return (
    <HStack
      w={maxW ? { base: "100%", md: maxW } : "full"}
      {...group}
      flexWrap="wrap"
    >
      {options.map((value) => {
        const radio = getRadioProps({ value });

        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default RadioGroup;
