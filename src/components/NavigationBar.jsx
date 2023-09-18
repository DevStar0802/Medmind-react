import { useState, useEffect } from 'react';
import { Flex, HStack, Link, Text, IconButton, VStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { isTokenValid, signOut } from '../utilities/jwt_utilities';
import { RiShoppingCartLine } from 'react-icons/ri';
import { getLocalStorageItem } from '../utils'


export default function NavgiationBar({ cartItemCount, setCartItemCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const headerColor = "rgb(32, 33, 36)";
  const location = useLocation();


  const renderCartWithCount = () => {
    return (
      <HStack cursor="pointer" onClick={() => handleNavigation('/cart')} position="relative">
        <RiShoppingCartLine color="white" size="24px" />
        <Text
          position="absolute"
          left="10px"
          bottom="10px"
          pb="2px"
          bg="red"
          color="white"
          fontSize="12px"
          borderRadius="50%"
          w="20px" 
          h="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {cartItemCount}
        </Text>
      </HStack>
    );
  };

  useEffect(() => {
    let cartItems = getLocalStorageItem('cartItems');

    if (typeof (cartItems) != typeof ([]))
      cartItems = [];

    if (cartItems == null || cartItems == [])
      setCartItemCount(0);
    else
      setCartItemCount(cartItems.length);
  }, []);

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
    handleNavigation('/login');
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
        { path: "/signup", label: "Sign Up", border: "1px solid grey", px: "10px", borderRadius: "lg" },

      ]),
    { path: "/cart", icon: RiShoppingCartLine, action: () => console.log('Go to cart'), size: "20px" },
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
          {links.map((link) => (
            !link.icon
              ? (
                <NavLink key={link.path} path={link.path} {...(link.border ? { border: link.border, px: link.px, borderRadius: link.borderRadius } : {})}>
                  {link.label}
                </NavLink>
              )
              : (
                <NavLink path={link.path} key={link.path}>
                  <HStack key={link.label} cursor="pointer" onClick={link.action} position="relative"> {/* Position the wrapper relative */}
                    {link.icon && <link.icon color="white" size="24px" />}
                    <Text {...(link.border ? { border: link.border, px: link.px, borderRadius: link.borderRadius } : {})}>{link.label}</Text>

                    {/* Cart Item Count */}
                    {link.icon === RiShoppingCartLine && (
                      <Text
                        position="absolute"
                        pb="2px"
                        top="0"
                        right="0"
                        bg="red"
                        color="white"
                        fontSize="12px"
                        borderRadius="50%"
                        w="15px"
                        h="15px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {cartItemCount}
                      </Text>
                    )}
                  </HStack>
                </NavLink>
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
              :
                <HStack key={link.label} cursor="pointer" onClick={link.action}>
                  {link.icon && <link.icon />}
                  <Text {...(link.border ? { border: link.border, px: link.px, borderRadius: link.borderRadius } : {})} color="white">{link.label}</Text>
                </HStack>
          ))}
          {renderCartWithCount()}
        </VStack>
      )}
    </>
  )
} 