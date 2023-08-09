import {
    Box,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
  } from "@chakra-ui/react";
  
import React, {useState } from "react";

export default function QuantitySlider() {
    const [sliderValue, setSliderValue] = useState(23)
  
    const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    }
  
    return (
      <Box pt={6} pb={2} w="300px">
        <Slider aria-label='slider-ex-6' 
         min={23}
         max={273}
         onChange={(val) => setSliderValue(val)}>
          <SliderMark
            value={sliderValue}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
          >
            {sliderValue}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    )
  }