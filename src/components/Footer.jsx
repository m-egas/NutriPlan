import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "/assets/logo.webp";

// 1. Define navigation items
const exploreLinks = [
  { label: "Recipes", to: "/recipes" },
  { label: "Planner", to: "/meal-planner" },
  { label: "Grocery List", to: "/grocery-list" },
];

const informationLinks = [
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

// 2. Define shared styles
const linkStyles = {
  fontSize: "sm",
  color: "gray.600",
  _hover: {
    color: "#7A8F70",
    textDecoration: "none",
  },
};

export const Footer = () => {
  return (
    // Footer background and top border
    <Box bg="#F7F5F0" borderTop="1px" borderColor="gray.200" mt={10}>
      {/* Responsive content container and columns */}
      <Box maxW="1200px" mx="auto" px={[6, 8, 10]} py={[10, 12, 14]}>
        <Flex
          direction={["column", "column", "row"]}
          justify="space-between"
          align={["center", "center", "start"]}
          gap={10}
        >
          {/* Logo */}
          <VStack align={["center", "center", "start"]} spacing={3}>
            <Image
              src={Logo}
              alt="WeekyMeals logo"
              width={["150px", "170px", "190px"]}
              height={["34px", "38px", "40px"]}
              objectFit="contain"
            />
            <Text
              fontSize="sm"
              color="black"
              maxW="280px"
              textAlign={["center", "center", "left"]}
            >
              Plan your meals and enjoy your week.
            </Text>
          </VStack>

          {/* Navigation and Information */}
          <Flex gap={[10, 14, 16]} direction="row"></Flex>

          {/* Explore navigation */}
          <VStack align={["center", "center", "start"]} spacing={3}>
            <Heading as="h3" fontSize="sm" color="gray.800">
              Explore
            </Heading>

            {exploreLinks.map((link) => (
              <Link key={link.to} as={RouterLink} to={link.to} {...linkStyles}>
                {link.label}
              </Link>
            ))}
          </VStack>

          {/* Information links */}
          <VStack align={["center", "center", "start"]} spacing={3}>
            <Heading as="h3" fontSize="sm" color="gray.800">
              Information
            </Heading>

            {informationLinks.map((link) => (
              <Link key={link.href} href={link.href} {...linkStyles}>
                {link.label}
              </Link>
            ))}
          </VStack>
        </Flex>

        {/* 10. Separate the footer columns from the copyright */}
        <Divider my={8} />

        {/* Bottom info */}
        <Flex
          justify="space-between"
          align="center"
          direction={["column", "row"]}
          gap={3}
        >
          <Text fontSize="xs" textAlign="center" color="gray.500" width="100%">
            © 2026 NutriPlan. All rights reserved.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
