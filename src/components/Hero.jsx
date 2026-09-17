import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import cover from "/assets/cover.webp";

export const Hero = () => {
  return (
    <Box
      position="relative"
      minH={["380px", "480px", "560px"]}
      backgroundImage={`url(${cover})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex"
      alignItems="flex-end"
      justifyContent="center"
    >
      {/* Dark overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.400"
      />
      {/* Hero content */}
      <VStack
        position="relative"
        zIndex={1}
        textAlign="center"
        color="white"
        spacing={[4, 5]}
        maxW="750px"
        px={[5, 6, 8]}
        pb={[5, 10, 14]}
      >
        {/* Main Hero heading */}
        <Heading as="h1" fontSize={["3xl", "4xl", "5xl"]} lineHeight="1.1">
          Plan your meals.
          <br /> Enjoy your week.
        </Heading>

        {/* Short description of the application */}
        <Text fontSize={["sm", "md", "lg"]} maxW={["320px", "500px", "600px"]}>
          Discover delicious recipes, organize your meals for the week, and
          create your grocery list automatically.
        </Text>

        {/* Button that navigates to the Recipes page */}
        <Button
          as={RouterLink}
          to="/recipes"
          size={["md", "lg"]}
          bg="#AFC3A5"
          color="white"
          px={[5, 8]}
          _hover={{ bg: "#D5E2CC" }}
        >
          Explore Recipes
        </Button>
      </VStack>
    </Box>
  );
};
