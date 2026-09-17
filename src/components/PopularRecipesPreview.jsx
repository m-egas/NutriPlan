import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { data } from "../utils/data";

export const PopularRecipesPreview = () => {
  // Select the recipes that should appear in the Popular Recipes section
  const popularRecipes = data.hits.filter((recipe) =>
    [
      "Potato Gratin",
      "Pizza with taleggio, prosciutto and pear",
      "Blueberry Basil Margarita Cocktail recipes",
      "Seafood Casserole",
    ].includes(recipe.recipe.label),
  );

  return (
    // Main section container
    <Box
      maxW="1200px"
      mx="auto"
      px={[5, 6, 8, 10]}
      py={[10, 14, 18, 20]}
      pb={[4, 6, 8]}
    >
      {/* Section heading and view all button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={[5, 8, 10]}
      >
        {/* Section title */}
        <Heading as="h2" fontSize={["xl", "2xl", "3xl"]} color="gray.800">
          Popular Recipes
        </Heading>

        {/* View all recipes link */}
        <Button
          as={RouterLink}
          to="/recipes"
          variant="ghost"
          bg="transparent"
          color="gray.800"
          fontWeight="medium"
          fontSize={["sm", "md"]}
          px={0}
          _hover={{ bg: "transparent", color: "#7A8F70" }}
        >
          <Box as="span" display={{ base: "none", sm: "inline" }}>
            View meal recipes →
          </Box>
          <Box as="span" display={{ base: "inline", sm: "none" }}>
            View recipes →
          </Box>
        </Button>
      </Box>

      {/* Mobile: horizontal swipe */}
      <Flex
        display={{ base: "flex", md: "none" }}
        overflowX="auto"
        gap={3}
        pb={3}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {popularRecipes.map((item) => (
          //Entire card is clickable
          <Box
            as={RouterLink}
            to={`/recipes/${encodeURIComponent(item.recipe.label)}`}
            key={item.recipe.label}
            flex="0 0 48%"
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            border="1px"
            color="inherit"
            borderColor="gray.200"
            boxShadow="sm"
            transition="all 0.2s"
            display="flex"
            flexDirection="column"
            textDecoration="none"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "lg",
              textDecoration: "none",
            }}
          >
            {/* Recipe image */}
            <Image
              src={item.recipe.image}
              alt={item.recipe.label}
              w="100%"
              h="130px"
              objectFit="cover"
            />

            {/* Recipe title */}
            <Box p={3}>
              <Heading
                as="h3"
                fontSize="sm"
                lineHeight="1.3"
                color="gray.800"
                textAlign="center"
              >
                {item.recipe.label}
              </Heading>
            </Box>
          </Box>
        ))}
      </Flex>

      {/* Tablet and desktop: grid layout */}
      <SimpleGrid
        display={{ base: "none", md: "grid" }}
        columns={4}
        spacing={[5, 8]}
      >
        {popularRecipes.map((item) => (
          <Box
            key={item.recipe.label}
            as={RouterLink}
            to={`/recipes/${encodeURIComponent(item.recipe.label)}`}
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            border="1px"
            color="inherit"
            borderColor="gray.200"
            boxShadow="sm"
            transition="all 0.2s"
            display="flex"
            flexDirection="column"
            textDecoration="none"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "lg",
              textDecoration: "none",
            }}
          >
            {/* Recipe image */}
            <Image
              src={item.recipe.image}
              alt={item.recipe.label}
              w="100%"
              h={["160px", "220px"]}
              objectFit="cover"
            />

            {/* Recipe title */}
            <Box p={5} flex="1">
              <Heading
                as="h3"
                fontSize="lg"
                color="gray.800"
                textAlign="center"
                minH="48px"
              >
                {item.recipe.label}
              </Heading>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
