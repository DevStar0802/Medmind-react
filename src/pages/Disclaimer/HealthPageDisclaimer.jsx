import { Flex, ListItem, OrderedList, Text, VStack } from "@chakra-ui/react";
import React from "react";

const HealthPageDisclaimer = () => {
  return (
    <>
      <VStack h="75vh" overflowY="scroll" align="start" p="10px">
        <Text>
          The Health AI Chat feature provided on this website is intended for
          informational purposes only and should not be considered a substitute
          for professional medical advice, diagnosis, or treatment. The
          information provided by the AI chat feature is not exhaustive and may
          not cover all aspects of your health concerns.
        </Text>
        <Text>By using the Health AI Chat feature, you acknowledge that:</Text>
        <OrderedList>
          <ListItem>
            No Medical Advice: The information provided by the AI chat feature
            should not be relied upon as a substitute for medical advice from a
            qualified healthcare professional. Always seek the advice of a
            licensed medical practitioner for personalized healthcare guidance.
          </ListItem>
          <ListItem>
            Limited Liability: The website and its creators, including its
            employees, agents, and representatives, shall not be held liable for
            any direct, indirect, incidental, consequential, or special damages
            arising from the use of the Health AI Chat feature. Use it at your
            own risk.
          </ListItem>
          <ListItem>
            Accuracy of Information: While efforts are made to provide accurate
            and up-to-date information, there is no guarantee of the accuracy,
            completeness, or reliability of the information provided by the AI
            chat feature. It is essential to consult a healthcare professional
            or seek medical advice for any specific health concerns or
            conditions.
          </ListItem>
          <ListItem>
            No Doctor-Patient Relationship: The use of the Health AI Chat
            feature does not establish a doctor-patient relationship between you
            and the website or its contributors. It is not a substitute for a
            face-to-face consultation with a qualified healthcare professional.
          </ListItem>
          <ListItem>
            User Responsibility: You are solely responsible for evaluating the
            information provided by the AI chat feature and determining its
            suitability for your individual circumstances. Do not disregard
            professional medical advice or delay in seeking it based on
            information obtained through the AI chat feature.
          </ListItem>
          <ListItem>
            Third-Party Content: The website may provide links or references to
            third-party websites or resources for additional information. These
            links are provided for convenience only and do not imply endorsement
            or guarantee the accuracy of the content. The website shall not be
            held liable for any information provided by third-party websites.
          </ListItem>
          <ListItem>
            Jurisdiction: The laws and regulations governing healthcare and
            medical practice may vary in different jurisdictions. The Health AI
            Chat feature may not be applicable or compliant with the laws and
            regulations of your jurisdiction. Use it in accordance with the laws
            and regulations applicable to your location.
          </ListItem>
        </OrderedList>
        <Text>
          By using the Health AI Chat feature, you agree to the terms and
          conditions outlined in this disclaimer. If you do not agree with any
          part of this disclaimer, please refrain from using the AI chat feature
          on this website.
        </Text>
      </VStack>
    </>
  );
};

export default HealthPageDisclaimer;
