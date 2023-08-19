import { useState, useEffect } from 'react';
import { Flex, HStack, Link, Text, IconButton, VStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { isTokenValid, signOut } from './utilities/jwt_utilities';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const headerColor = "rgb(32, 33, 36)";
  const location = useLocation();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const isValidToken = await isTokenValid();
        if (isValidToken) {
            navigate('/');
            setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (exception) {
        console.log(exception);
        setIsLoggedIn(false);
      }
    };
  
    checkTokenValidity();
  }, [location.pathname]);
  
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close the mobile menu
  };

  const handleSignOut = async () => {
    await signOut();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const NavLink = ({ path, children, ...rest }) => (
    <Link
      onClick={() => handleNavigation(path)}
      color="white"
      {...rest}
    >
      {children}
    </Link>
  );

  const links = [
    { path: "/", label: "Chat Page" },
    { path: "/searchPage", label: "Search Page" },
    { path: "/aboutPage", label: "About" },
    ...(isLoggedIn 
      ? [
          { path: "/account", label: "Account", border: "1px solid grey", px: "10px", borderRadius: "lg" },
          { action: handleSignOut, label: "Sign Out", border: "1px solid grey", px: "10px", borderRadius: "lg" }
        ] 
      : [
          { path: "/login", label: "Login", border: "1px solid grey", px: "10px", borderRadius: "lg" },
          { path: "/signup", label: "Sign Up", border: "1px solid grey", px: "10px", borderRadius: "lg" }
        ])
  ];

  return (
    <>
      <HStack justify="space-between" align="center" width="100%" px={4} bg={headerColor}>
        <NavLink path="/" fontSize={{ base: '16px', md: '20px' }} py={3.5} sx={{
          '&:focus': { textDecoration: 'none' },
          '&:active': { color: 'none' }
        }}>
          MEDMIND
        </NavLink>

        <HStack spacing={5} display={{ base: "none", md: "flex" }}>
          {links.map(link => (
            link.path 
            ? (
              <NavLink key={link.path} path={link.path} {...(link.border ? { border: link.border, px: link.px, borderRadius: link.borderRadius } : {})}>
                {link.label}
              </NavLink>
            ) 
            : (
              <Text key={link.label} {...(link.border ? { border: link.border, px: link.px, borderRadius: link.borderRadius } : {})} onClick={link.action} cursor="pointer">
                {link.label}
              </Text>
            )
          ))}
        </HStack>

        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={() => setIsOpen(!isOpen)}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          color="black"
        />
      </HStack>

      {isOpen && (
        <VStack bg={headerColor} spacing={10} width="100%" py={4} px={8} display={{ md: 'none' }}>
          {links.map(link => (
            link.path 
            ? (
              <NavLink key={link.path} path={link.path} {...(link.border ? { border: link.border, px: link.px, borderRadius: link.borderRadius } : {})}>
                {link.label}
              </NavLink>
            ) 
            : (
              <Text key={link.label} {...(link.border ? { border: link.border, px: link.px, borderRadius: link.borderRadius } : {})} onClick={link.action} cursor="pointer">
                {link.label}
              </Text>
            )
          ))}
        </VStack>
      )}
    </>
  );
}

export default App;
