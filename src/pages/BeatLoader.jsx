// import "./styles.css";
import React from "react";
import {
  Box,
  Flex,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";

export default function BeatLoader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation1 = prefersReducedMotion
    ? undefined
    : `${keyframe_dot1} infinite 1s linear`;
  const animation2 = prefersReducedMotion
    ? undefined
    : `${keyframe_dot2} infinite 1s linear`;
  const animation3 = prefersReducedMotion
    ? undefined
    : `${keyframe_dot3} infinite 1s linear`;
  return (
    <Flex>
      <Box style={styles.dot1} animation={animation1} />
      <Box style={styles.dot2} animation={animation2} />
      <Box style={styles.dot3} animation={animation3} />
    </Flex>
  );
}

const keyframe_dot1 = keyframes`
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1.5);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
`;
const keyframe_dot2 = keyframes`
 0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 1.5);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
`;
const keyframe_dot3 = keyframes`
 0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
`;

const styles = {
  dot1: {
    position: "relative",
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "rgb(47, 133, 90)",
    color: "rgb(47, 133, 90)",
    display: " inline-block",
    margin: "0 2px",
  },
  dot2: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "rgb(47, 133, 90)",
    color: "#rgb(47, 133, 90)",
    display: "inline-block",
    margin: "0 2px",
  },

  dot3: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "rgb(47, 133, 90)",
    display: "inline-block",
    margin: "0 2px",
  },
};
