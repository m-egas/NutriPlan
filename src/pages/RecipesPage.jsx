import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { data } from "../utils/data";

// Recipes page with search and filtering functionality
export const RecipesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // All recipes from the data source
  const recipes = data.hits;

  // List of health labels from all recipes
  const healthLabels = [
    ...new Set(recipes.flatMap((hit) => hit.recipe.healthLabels)),
  ];

  // Meal type filters
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  // Handle selecting and deselecting meal types
  const handleMealTypeChange = (type) => {
    setSelectedMealTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  };

  // Handle selecting and deselecting health labels
  const handleHealthLabelChange = (label) => {
    setSelectedHealthLabels((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  // Filter recipes based on search, meal type, and health selections
  const filteredRecipes = recipes.filter((hit) => {
    const recipe = hit.recipe;

    const matchesSearch = recipe.label
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMealType =
      selectedMealTypes.length === 0 ||
      recipe.mealType.some((type) =>
        selectedMealTypes.some((selected) =>
          type.toLowerCase().includes(selected.toLowerCase()),
        ),
      );

    const matchesHealth =
      selectedHealthLabels.length === 0 ||
      selectedHealthLabels.every((selected) =>
        recipe.healthLabels.includes(selected),
      );

    return matchesSearch && matchesMealType && matchesHealth;
  });

  return (
    <Box as="main" bg="#F7F5F0" minH="100vh" px={[3, 5, 8]} py={[6, 8, 12]}>
      <Box maxW="1200px" mx="auto">
        {/* Page header */}
        <Heading
          as="h1"
          fontSize={["2xl", "3xl", "4xl"]}
          mb={2}
          color="gray.800"
        >
          Explore Recipes
        </Heading>

        <Text color="gray.600" fontSize={["sm", "md"]} mb={[6, 8, 10]}>
          Find delicious recipes for your weekly meal plan.
        </Text>

        {/* Mobile and Tablet search and filters */}
        <Box display={["block", "none"]} mb={[6, 8, 10]}>
          {/* Search and Filters button */}
          <Flex width="100%" align="center" gap={3}>
            {/* Search */}
            <InputGroup flex="1">
              <InputLeftElement pointerEvents="none">
                <Text color="gray.400" fontSize="md">
                  🔍
                </Text>
              </InputLeftElement>

              <Input
                placeholder="Search recipes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                borderColor="gray.300"
                borderRadius="full"
                bg="white"
                size="sm"
                pl={10}
                _focus={{
                  borderColor: "gray.800",
                }}
              />
            </InputGroup>

            {/* Filters button */}
            <Button
              flexShrink={0}
              bg="#AFC3A5"
              color="white"
              borderRadius="full"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              _hover={{
                bg: "#D5E2CC",
              }}
            >
              {showFilters ? "Hide filters" : "Filters"}
            </Button>
          </Flex>

          {/* Mobile + Tablet filter panel */}
          {showFilters && (
            <Box
              width="100%"
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="xl"
              p={4}
              mt={4}
            >
              {/* Meal Type */}
              <Box mb={6}>
                <Text fontWeight="bold" fontSize="sm" color="gray.800" mb={3}>
                  Meal Type
                </Text>

                <Flex gap={3} wrap="wrap">
                  {mealTypes.map((type) => (
                    <Checkbox
                      key={type}
                      isChecked={selectedMealTypes.includes(type)}
                      onChange={() => handleMealTypeChange(type)}
                      colorScheme="green"
                    >
                      <Text fontSize="sm" color="gray.600">
                        {type}
                      </Text>
                    </Checkbox>
                  ))}
                </Flex>
              </Box>

              {/* Health */}
              <Box>
                <Text fontWeight="bold" fontSize="sm" color="gray.800" mb={3}>
                  Health
                </Text>

                <Flex gap={3} wrap="wrap">
                  {healthLabels.map((label) => (
                    <Checkbox
                      key={label}
                      isChecked={selectedHealthLabels.includes(label)}
                      onChange={() => handleHealthLabelChange(label)}
                      colorScheme="green"
                    >
                      <Text fontSize="sm" color="gray.600">
                        {label}
                      </Text>
                    </Checkbox>
                  ))}
                </Flex>
              </Box>

              {/* Clear filters */}
              {(selectedMealTypes.length > 0 ||
                selectedHealthLabels.length > 0) && (
                <Button
                  variant="outline"
                  bg="white"
                  color="gray.800"
                  size="sm"
                  width="100%"
                  mt={6}
                  borderColor="gray.300"
                  borderRadius="full"
                  onClick={() => {
                    setSelectedMealTypes([]);
                    setSelectedHealthLabels([]);
                  }}
                  _hover={{
                    bg: "gray.50",
                    borderColor: "gray.400",
                    color: "gray.900",
                  }}
                >
                  Clear filters
                </Button>
              )}
            </Box>
          )}
        </Box>

        {/* Main content */}
        <Flex direction={["column", "row"]} align="flex-start" gap={[4, 8, 12]}>
          {/* Desktop sidebar */}
          <Box
            display={["none", "block"]}
            w="240px"
            flexShrink={0}
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="2xl"
            p={6}
          >
            <VStack align="stretch" spacing={[5, 6, 7]}>
              {/* Search */}
              <Box>
                <Text fontWeight="bold" fontSize="sm" color="gray.800" mb={3}>
                  Search
                </Text>

                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Text color="gray.400" fontSize="md">
                      🔍
                    </Text>
                  </InputLeftElement>

                  <Input
                    placeholder="Search recipes..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    borderColor="gray.300"
                    borderRadius="full"
                    size="sm"
                    pl={10}
                    _focus={{
                      borderColor: "gray.800",
                    }}
                  />
                </InputGroup>
              </Box>

              {/* Meal Type */}
              <Box>
                <Text fontWeight="bold" fontSize="sm" color="gray.800" mb={4}>
                  Meal Type
                </Text>

                <VStack align="start" spacing={3}>
                  {mealTypes.map((type) => (
                    <Checkbox
                      key={type}
                      isChecked={selectedMealTypes.includes(type)}
                      onChange={() => handleMealTypeChange(type)}
                      colorScheme="green"
                    >
                      <Text fontSize="sm" color="gray.600">
                        {type}
                      </Text>
                    </Checkbox>
                  ))}
                </VStack>
              </Box>

              {/* Health */}
              <Box>
                <Text fontWeight="bold" fontSize="sm" color="gray.800" mb={4}>
                  Health
                </Text>

                <VStack
                  align="start"
                  spacing={3}
                  maxH="400px"
                  overflowY="auto"
                  pr={2}
                >
                  {healthLabels.map((label) => (
                    <Checkbox
                      key={label}
                      isChecked={selectedHealthLabels.includes(label)}
                      onChange={() => handleHealthLabelChange(label)}
                      colorScheme="green"
                    >
                      <Text fontSize="sm" color="gray.600">
                        {label}
                      </Text>
                    </Checkbox>
                  ))}
                </VStack>
              </Box>

              {/* Clear filters */}
              {(selectedMealTypes.length > 0 ||
                selectedHealthLabels.length > 0) && (
                <Button
                  variant="outline"
                  bg="white"
                  color="gray.800"
                  size="sm"
                  width="100%"
                  borderColor="gray.300"
                  borderRadius="full"
                  onClick={() => {
                    setSelectedMealTypes([]);
                    setSelectedHealthLabels([]);
                  }}
                  _hover={{
                    bg: "gray.50",
                    borderColor: "gray.400",
                    color: "gray.900",
                  }}
                >
                  Clear filters
                </Button>
              )}
            </VStack>
          </Box>

          {/* Recipe results */}
          <Box flex="1" width="100%">
            <SimpleGrid columns={[2, 2, 2, 3]} spacing={[4, 6, 6, 8]}>
              {filteredRecipes.map((hit) => {
                const recipe = hit.recipe;

                return (
                  <Box
                    as={RouterLink}
                    to={`/recipes/${encodeURIComponent(recipe.label)}`}
                    key={recipe.label}
                    display="block"
                    bg="white"
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius={["lg", "xl"]}
                    overflow="hidden"
                    transition="all 0.2s"
                    textDecoration="none"
                    _hover={{
                      shadow: "lg",
                      transform: "translateY(-4px)",
                      textDecoration: "none",
                    }}
                  >
                    {/* Recipe image */}
                    <Image
                      src={recipe.image}
                      alt={recipe.label}
                      width="100%"
                      height={["140px", "180px", "200px"]}
                      objectFit="cover"
                    />

                    {/* Recipe title */}
                    <VStack align="stretch" spacing={3} p={[4, 5]}>
                      <Heading
                        as="h2"
                        fontSize={["sm", "md", "lg"]}
                        color="gray.800"
                        textAlign="center"
                        minH={["45px", "48px"]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {recipe.label}
                      </Heading>
                    </VStack>
                  </Box>
                );
              })}
            </SimpleGrid>

            {/* No results */}
            {filteredRecipes.length === 0 && (
              <Box textAlign="center" py={[10, 16]}>
                <Text color="gray.500">No recipes found.</Text>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
