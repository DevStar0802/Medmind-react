import { useState } from 'react';
import { Flex, HStack, Link, Text, IconButton, VStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const headerColor = "rgb(32, 33, 36)";

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close the mobile menu
  };

  return (
    <>
      <HStack justify="space-between" align="center" width="100%" px={4} bg={headerColor}>
        <Link
          onClick={() => handleNavigation("/")}
          color="white"
          fontSize={{ base: '16px', md: '20px' }}
          py={3.5}
          sx={{
            '&:focus': { textDecoration: 'none' }, // Remove underline on focus
            '&:active': { color: 'none' } // More pastel color on click (you can adjust this value)
          }}
        >
          MEDMIND
        </Link>

        <HStack
          spacing={5}
          display={{ base: "none", md: "flex", }} // When isOpen is true, hide on small screens
        >
          <Link onClick={() => handleNavigation("/")} color="white">Chat Page</Link>
          <Link onClick={() => handleNavigation("/searchPage")} color="white">Search Page</Link>
          <Link onClick={() => handleNavigation("/aboutPage")} color="white">About</Link>
          <Link onClick={() => handleNavigation("/login")} color="white" border="1px solid grey" px="10px" borderRadius="lg">
            Login</Link>
          <Link onClick={() => handleNavigation("/signup")} color="white"  border="1px solid grey" px="10px" borderRadius="lg">
            Sign Up</Link>

        </HStack>

        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={() => setIsOpen(!isOpen)}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          color="black"
        />
      </HStack>

      {isOpen && (
        <VStack
          bg={headerColor}
          spacing={10}
          width="100%"
          py={4}
          px={8}
          display={{ md: 'none' }}
        >
          <Link onClick={() => handleNavigation("/")} color="white" >Chat Page</Link>
          <Link onClick={() => handleNavigation("/searchPage")} color="white">Search Page</Link>
          <Link onClick={() => handleNavigation("/aboutPage")} color="white">About</Link>
          <Link onClick={() => handleNavigation("/login")} color="white" border="1px solid grey" px="10px" borderRadius="lg">
            Login
          </Link>
          <Link onClick={() => handleNavigation("/signup")} color="white" border="1px solid grey" px="10px" borderRadius="lg">
            Sign Up</Link>
        </VStack>
      )}
    </>
  );
}

export default App;
