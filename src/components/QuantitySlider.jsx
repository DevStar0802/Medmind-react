import {
    Box,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
  } from "@chakra-ui/react";
  
import React, {useState } from "react";

export default function QuantitySlider({quantity, setQuantity, minValue, maxValue}) {
    return (
      <Box pt={6} pb={2} w="300px">
        <Slider aria-label='slider-ex-6' 
         min={minValue}
         max={maxValue}
         onChange={(val) => setQuantity(val)}>
          <SliderMark
            value={quantity}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
          >
            {quantity}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    )
  }