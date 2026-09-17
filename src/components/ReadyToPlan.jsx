import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import BackgroundImage from "/assets/ready-to-plan.webp";

export const ReadyToPlan = () => {
  return (
    // Hero section with background image
    <Box maxW="1200px" mx="auto" px={[6, 8, 10]} py={[8, 10, 12]}>
      <Box
        position="relative"
        height={["240px", "320px", "350px", "420px"]}
        borderRadius="2xl"
        overflow="hidden"
        backgroundImage={`url(${BackgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        {/* Dark overlay */}
        <Box position="absolute" inset={0} bg="blackAlpha.500" />

        {/* Main Hero heading */}
        <Box position="relative" zIndex={1} color="white" px={6}>
          <Heading as="h2" fontSize={["2xl", "3xl", "4xl"]} mb={3}>
            Ready to plan?
          </Heading>

          {/* Short description */}
          <Text fontSize={["md", "lg"]} mb={6}>
            Make your week easier, one meal at a time.
          </Text>

          {/* Button that navigates to the meal planner page */}
          <Button
            as={RouterLink}
            to="/meal-planner"
            bg="#AFC3A5"
            color="white"
            size={["md", "lg"]}
            px={[5, 8]}
            _hover={{ bg: "#D5E2CC" }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
