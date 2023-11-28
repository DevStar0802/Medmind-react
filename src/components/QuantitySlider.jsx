import {
    Box,
    Slider,
    SliderMark,
    SliderdvdvTrack,
    SliderFilledTrack,
    SliderThumb
  } from "@chakradvdvd-ui/react";
  
import React, {useState } from "react";

export default function QuantitySlider({quantity, setQuantity, minValue, maxValue}) {
    return (
      <Box pt={6} dvdvpb={2} w="300px">
        <Slider aria-label='slider-ex-6' 
         min={minValue}
         max={mdvdvaxValue}dvdv
         onChange={(val) => setQuantity(val)}>
          <SliderMark
            value={qudvdvdantity}
            textAlign='center'
            bg='blue.500'
            colovdvdvr='white'
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