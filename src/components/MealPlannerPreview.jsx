import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { data } from "../utils/data";

export const MealPlannerPreview = () => {
  const days = [
    { day: "Monday", meal: "Oven Baked Mexican Rice recipes" },
    { day: "Tuesday", meal: "Mushroom and Spinach Ravioli" },
    { day: "Wednesday", meal: "Homemade Sweet Spaghetti Sauce" },
    { day: "Thursday", meal: "Green coconut curry with salmon" },
    { day: "Friday", meal: "Baked Chicken Parm" },
  ];

  const getRecipe = (mealName) => {
    return data.hits.find((item) => item.recipe.label === mealName)?.recipe;
  };

  return (
    // Main section container
    <Box
      maxW="1200px"
      mx="auto"
      px={[5, 6, 8, 10]}
      pt={[8, 10, 12]}
      pb={[10, 14, 18, 20]}
    >
      {/* Section heading */}
      <Flex justify="space-between" align="center" mb={[5, 8, 10]}>
        <Box>
          {/* Section title */}
          <Heading as="h2" fontSize={["xl", "2xl", "3xl"]} color="gray.800">
            Meal Planner
          </Heading>
        </Box>

        {/* View planner link */}
        <Button
          as={RouterLink}
          to="/meal-planner"
          variant="ghost"
          bg="transparent"
          color="gray.800"
          fontWeight="medium"
          fontSize={["sm", "md"]}
          px={0}
          whiteSpace="nowrap"
          _hover={{ bg: "transparent", color: "#7A8F70" }}
        >
          <Box as="span" display={{ base: "none", sm: "inline" }}>
            View meal planner →
          </Box>

          <Box as="span" display={{ base: "inline", sm: "none" }}>
            View planner →
          </Box>
        </Button>
      </Flex>

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
        {days.map((day) => {
          const recipe = getRecipe(day.meal);

          return (
            <Box
              key={day.day}
              flex="0 0 48%"
              bg="white"
              borderRadius="2xl"
              overflow="hidden"
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
              {/* Day */}
              <Box py={2} textAlign="center" bg="#E8DCC8">
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.700"
                  textTransform="uppercase"
                >
                  {day.day}
                </Text>
              </Box>

              {/* Recipe image */}
              {recipe && (
                <Image
                  src={recipe.image}
                  alt={recipe.label}
                  w="100%"
                  h="130px"
                  objectFit="cover"
                />
              )}

              {/* Recipe information */}
              <Box p={3}>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  textAlign="center"
                  color="gray.800"
                  lineHeight="1.3"
                >
                  {day.meal}
                </Text>

                {recipe?.mealType?.[0] && (
                  <Text
                    mt={1}
                    fontSize="xs"
                    color="gray.500"
                    textAlign="center"
                    textTransform="uppercase"
                  >
                    {recipe?.mealType?.[0]}
                  </Text>
                )}
              </Box>
            </Box>
          );
        })}
      </Flex>

      {/* Tablet and desktop: five-column grid */}
      <SimpleGrid
        display={{ base: "none", md: "grid" }}
        columns={5}
        spacing={{ md: 5, lg: 8 }}
      >
        {days.map((day) => {
          const recipe = getRecipe(day.meal);

          return (
            <Box
              key={day.day}
              bg="white"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
            >
              {/* Day */}
              <Box py={3} textAlign="center" bg="#E8DCC8">
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="gray.700"
                  textTransform="uppercase"
                >
                  {day.day}
                </Text>
              </Box>

              {/* Recipe image */}
              {recipe && (
                <Image
                  src={recipe.image}
                  alt={recipe.label}
                  width="100%"
                  height={{ md: "130px", lg: "180px" }}
                  objectFit="cover"
                />
              )}

              {/* Recipe information */}
              <Box p={4}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  textAlign="center"
                  color="gray.800"
                  lineHeight="1.3"
                >
                  {day.meal}
                </Text>

                {recipe?.mealType?.[0] && (
                  <Text
                    mt={1}
                    fontSize="xs"
                    color="gray.500"
                    textAlign="center"
                    textTransform="uppercase"
                  >
                    {recipe.mealType[0]}
                  </Text>
                )}
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
