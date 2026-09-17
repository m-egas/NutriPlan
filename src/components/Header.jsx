import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "/assets/logo.webp";

const navItems = [
  { label: "Recipes", mobileLabel: "Recipes", path: "/recipes" },
  { label: "Planner", mobileLabel: "Meal Planner", path: "/meal-planner" },
  { label: "Grocery List", mobileLabel: "Grocery List", path: "/grocery-list" },
];

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      as="header"
      bg="#F7F5F0"
      borderBottom="1px"
      borderColor="gray.200"
      px={[4, 6, 8, 10, 16]}
      py={[3, 4]}
      position="relative"
      zIndex={10}
    >
      <Flex
        w="100%"
        align="center"
        justify="space-between"
        minH={{ base: "52px", md: "60px" }}
      >
        {/* Logo */}
        <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
          <Image
            src={Logo}
            alt="logo"
            width={["140px", "155px", "175px", "190px"]}
            height={["32px", "35px", "38px", "40px"]}
            objectFit="contain"
          />
        </Link>

        {/* Desktop navigation */}
        <HStack spacing={[4, 6, 8]} display={{ base: "none", md: "flex" }}>
          {/* Recipes */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              as={RouterLink}
              to={item.path}
              fontSize={["md", "lg"]}
              fontWeight="medium"
              color="gray.700"
              whiteSpace="nowrap"
              _hover={{
                color: "#7A8F70",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          color="gray.700"
          fontSize="20px"
          _hover={{
            bg: "gray.100",
          }}
        />
      </Flex>

      {/* Mobile Navigation */}
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right={[4, 6]}
          width={["190px", "210px"]}
          bg="#F7F5F0"
          borderRadius="xl"
          boxShadow="0 8px 24px rgba(0, 0, 0, 0.08)"
          p={2}
          display={{ base: "block", md: "none" }}
        >
          <VStack align="stretch" spacing={0}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                display="flex"
                alignItems="center"
                minH="44px"
                px={4}
                py={2}
                fontSize="md"
                fontWeight="medium"
                color="gray.700"
                borderRadius="md"
                cursor="pointer"
                transition="background 0.2s ease, color 0.2s ease"
                _hover={{
                  bg: "#D5E2CC",
                  color: "gray.900",
                  textDecoration: "none",
                }}
                onClick={onToggle}
              >
                {item.label}
              </Link>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};
