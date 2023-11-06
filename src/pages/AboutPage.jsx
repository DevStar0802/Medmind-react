import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <>
      <Box h="full" w="full" bg="gray.100" p={5} overflow="auto">
        <VStack
          spacing={5}
          align="stretch"
          maxW="900px"
          w="full"
          m="auto"
          bg="white"
          p={5}
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading as="h1" size="xl" textAlign="center">
            Welcome to Medmind
          </Heading>

          <Text fontSize="md" textAlign={"center"}>
            At Medmind, we believe that access to reliable healthcare
            information and personalized support should be readily available to
            everyone, anytime, and anywhere. Our mission is to empower
            individuals to take control of their well-being by leveraging the
            power of artificial intelligence and cutting-edge technology.
          </Text>

          <Heading as="h2" size="lg" textAlign={"center"}>
            Who We Are
          </Heading>

          <Text fontSize="md" textAlign={"center"}>
            Medmind is a revolutionary health chat AI platform that combines the
            expertise of medical professionals with the intelligence of
            state-of-the-art natural language processing algorithms. Our team
            consists of passionate healthcare experts, data scientists, and
            software engineers who are dedicated to transforming the way people
            interact with healthcare information and services.
          </Text>

          <Heading as="h2" size="lg" textAlign={"center"}>
            What we do
          </Heading>

          <Text fontSize="md" textAlign={"center"}>
            We provide an intelligent and intuitive chatbot interface that
            serves as a virtual healthcare companion, accessible 24/7. Whether
            you have a simple health question, need guidance on a specific
            condition, or seek advice on healthy living, Medmind is here to
            assist you. Our AI chatbot is designed to understand your unique
            needs, offer personalized recommendations, and provide
            evidence-based information, ensuring you receive accurate and
            reliable support.
          </Text>

          <Heading as="h2" size="lg" textAlign={"center"}>
            Our Approach
          </Heading>

          <Text fontSize="md" textAlign={"center"}>
            At Medmind, we prioritize user privacy and data security. We adhere
            to the highest standards of encryption and data protection protocols
            to safeguard your personal health information. Your trust is of
            utmost importance to us, and we are committed to maintaining the
            confidentiality of all interactions within our platform. We
            continuously strive to improve our AI algorithms by incorporating
            feedback from users and staying updated with the latest advancements
            in healthcare. Our chatbot undergoes regular updates and
            enhancements to ensure that it delivers the most relevant and
            up-to-date information.
          </Text>

          <Heading as="h2" size="lg" textAlign={"center"}>
            Why Choose Medmind
          </Heading>

          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Accessibility
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              Medmind is accessible from any device with an internet connection,
              making it convenient for you to seek healthcare guidance whenever
              you need it.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Personalized Support
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              Our AI chatbot is trained to understand your individual needs and
              provide tailored recommendations, promoting a personalized
              approach to healthcare.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Reliable Information
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              We collaborate with trusted medical professionals and curate
              information from reputable sources, ensuring the accuracy and
              reliability of the information shared.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Empowering Self-Care
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              Medmind encourages you to become an active participant in your
              well-being by equipping you with the knowledge and tools to make
              informed decisions about your health.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Continuous Improvement
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              We are committed to enhancing our AI capabilities and expanding
              our knowledge base to deliver an ever-improving user experience.
            </Text>
          </Box>
          <Box mt={5}>
            <Heading as="h4" size="md" textAlign={"center"}>
              Join Us on Your Health Journey
            </Heading>
            <Text fontSize="md" textAlign={"center"}>
              We invite you to join us on this transformative health journey.
              Whether you have a pressing medical concern or simply seek
              guidance on leading a healthier lifestyle, Medmind is here to
              support you every step of the way. Our AI chatbot is ready to
              assist you, providing trustworthy information, compassionate
              support, and empowering guidance. Remember, your health matters,
              and at Medmind, we strive to make your well-being our top
              priority. Together, let's unlock the power of AI and take control
              of our health and happiness.
            </Text>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default AboutPage;
