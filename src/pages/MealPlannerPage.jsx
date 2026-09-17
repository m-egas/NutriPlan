import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../utils/data";

export const MealPlannerPage = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const meals = ["Breakfast", "Lunch", "Dinner"];
  const createEmptyPlanner = () => {
    return Object.fromEntries(
      days.map((day) => [
        day,
        {
          Breakfast: null,
          Lunch: null,
          Dinner: null,
        },
      ]),
    );
  };

  const [planner, setPlanner] = useState(() => {
    try {
      const savedPlanner = localStorage.getItem("mealPlanner");

      return savedPlanner ? JSON.parse(savedPlanner) : createEmptyPlanner();
    } catch (error) {
      console.error("Error loading meal planner:", error);
      return createEmptyPlanner();
    }
  });
  useEffect(() => {
    localStorage.setItem("mealPlanner", JSON.stringify(planner));
  }, [planner]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

  const {
    isOpen: isSaveModalOpen,
    onOpen: onSaveModalOpen,
    onClose: onSaveModalClose,
  } = useDisclosure();

  const recipes = data.hits.map((item) => item.recipe);

  // Open recipe selector
  const openSelector = (day, meal) => {
    setSelectedSlot({
      day,
      meal,
    });

    setSelectedRecipe(null);
    setSearch("");
  };

  // Close recipe modal
  const closeModal = () => {
    setSelectedSlot(null);
    setSelectedRecipe(null);
    setSearch("");
  };

  // Select recipe
  const selectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Add recipe to planner
  const addRecipe = () => {
    if (!selectedSlot || !selectedRecipe) {
      return;
    }

    setPlanner((current) => ({
      ...current,
      [selectedSlot.day]: {
        ...current[selectedSlot.day],
        [selectedSlot.meal]: selectedRecipe,
      },
    }));

    closeModal();
  };

  // Remove recipe
  const removeRecipe = (day, meal) => {
    setPlanner((current) => ({
      ...current,

      [day]: {
        ...current[day],
        [meal]: null,
      },
    }));
  };

  // Clear all
  const clearAll = () => {
    setPlanner(createEmptyPlanner());
    localStorage.removeItem("mealPlanner");
    toast({
      title: "Meal plan cleared successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  // Save Plan
  const savePlan = () => {
    const selectedRecipes = [];

    days.forEach((day) => {
      meals.forEach((meal) => {
        const recipe = planner[day][meal];

        if (recipe) {
          selectedRecipes.push(recipe);
        }
      });
    });

    // If there are no recipes
    if (selectedRecipes.length === 0) {
      toast({
        title: "No meals selected",
        description: "Please select at least one meal before saving your plan.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      return;
    }

    // Get existing grocery list
    const existingItems = JSON.parse(
      localStorage.getItem("groceryList") || "[]",
    );

    // Get ingredients from selected recipes
    const newIngredients = selectedRecipes.flatMap((recipe) => {
      if (!recipe.ingredients) {
        return [];
      }

      return recipe.ingredients.map((ingredient) => ({
        name: ingredient.food,
        quantity: ingredient.quantity,
        measure: ingredient.measure,
        category: ingredient.foodCategory,
        checked: false,
      }));
    });

    // Start with existing grocery items
    const combinedItems = [...existingItems];

    // Add only ingredients that don't already exist
    newIngredients.forEach((ingredient) => {
      const ingredientName = ingredient.name
        ? ingredient.name.toLowerCase().trim()
        : "";

      const alreadyExists = combinedItems.some((item) => {
        const existingName = item.name ? item.name.toLowerCase().trim() : "";

        return existingName === ingredientName;
      });

      if (!alreadyExists) {
        combinedItems.push({
          ...ingredient,

          id: `${ingredient.name}-${Date.now()}-${Math.random()}`,
        });
      }
    });

    // Save grocery list
    localStorage.setItem("groceryList", JSON.stringify(combinedItems));

    // Open success modal
    onSaveModalOpen();
  };

  // Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.label
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMeal =
      !selectedSlot ||
      !recipe.mealType ||
      recipe.mealType.some(
        (type) => type.toLowerCase() === selectedSlot.meal.toLowerCase(),
      );

    return matchesSearch && matchesMeal;
  });

  return (
    <Box
      as="main"
      bg="#F7F5F0"
      minH="100vh"
      px={[4, 6, 8, 10]}
      py={[6, 8, 10, 12]}
    >
      <Box maxW="1200px" mx="auto">
        {/* Page Header */}
        <VStack spacing={2} mb={[6, 8, 10]} align="start">
          <Heading as="h1" size={["lg", "xl"]} color="gray.800">
            Meal Planner
          </Heading>

          <Text color="gray.600" fontSize={["sm", "md"]}>
            Plan your meals for the week.
          </Text>
        </VStack>

        {/* Planner Card */}
        <Box
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="2xl"
          bg="#E4EBDD"
          boxShadow="sm"
          p={[4, 5, 6, 8]}
        >
          {/* Card Header */}
          <Heading
            as="h2"
            fontSize="lg"
            textAlign="center"
            mb={[6, 8]}
            color="gray.800"
          >
            This Week
          </Heading>

          {/* Week days */}
          <SimpleGrid columns={[1, 2, 3, 5]} spacing={[4, 5, 6]}>
            {days.map((day) => (
              <Box
                key={day}
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="xl"
                bg="#FFFDF8"
                p={[4, 5]}
              >
                {/* Day */}
                <Text
                  fontWeight="bold"
                  fontSize={["sm", "md"]}
                  color="gray.800"
                  textAlign="center"
                  mb={5}
                >
                  {day}
                </Text>

                {/* Meals */}
                <VStack spacing={[4, 5]} align="stretch">
                  {meals.map((meal) => {
                    const recipe = planner[day][meal];

                    return (
                      <Box key={meal}>
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          color="gray.600"
                          mb={2}
                        >
                          {meal}
                        </Text>

                        {/* Selected recipe */}
                        {recipe ? (
                          <Box
                            borderRadius="lg"
                            borderWidth="1px"
                            borderColor="#B8C9AE"
                            bg="#EEF3E9"
                            p={3}
                          >
                            <Text
                              fontSize={["xs", "sm"]}
                              fontWeight="medium"
                              color="gray.800"
                              mb={2}
                            >
                              {recipe.label}
                            </Text>

                            <Button
                              size="xs"
                              variant="ghost"
                              color="gray.500"
                              px={0}
                              onClick={() => removeRecipe(day, meal)}
                              _hover={{
                                bg: "transparent",
                                color: "red.500",
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        ) : (
                          <Button
                            size="sm"
                            width="100%"
                            variant="outline"
                            borderStyle="dashed"
                            borderColor="#B8C9AE"
                            bg="#F7F5F0"
                            color="gray.500"
                            whiteSpace="normal"
                            textAlign="center"
                            onClick={() => openSelector(day, meal)}
                            _hover={{
                              bg: "#EEF3E9",
                              borderColor: "#AFC3A5",
                              color: "gray.800",
                            }}
                          >
                            + Add recipe
                          </Button>
                        )}
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Footer Actions */}
          <Flex
            direction={["column", "row"]}
            justify="center"
            align="center"
            gap={3}
            mt={[8, 10]}
          >
            <Button
              w={["100%", "auto"]}
              bg="gray.800"
              color="white"
              px={8}
              borderRadius="full"
              onClick={savePlan}
              _hover={{
                bg: "gray.700",
              }}
            >
              Save Plan
            </Button>

            <Button
              w={["100%", "auto"]}
              variant="outline"
              bg="white"
              color="gray.800"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="full"
              onClick={clearAll}
              _hover={{
                bg: "white",
                borderColor: "gray.400",
              }}
            >
              Clear all
            </Button>
          </Flex>
        </Box>

        {/* Recipe Selector Modal */}
        {selectedSlot && (
          <Box
            position="fixed"
            inset="0"
            bg="blackAlpha.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={[3, 4]}
            py={4}
            zIndex={20}
          >
            <Box
              bg="white"
              borderRadius="2xl"
              width="100%"
              maxW="550px"
              maxH="90vh"
              overflowY="auto"
              p={[4, 5, 6]}
              position="relative"
              boxShadow="xl"
            >
              {/* Close button */}
              <Button
                position="absolute"
                top={3}
                right={3}
                size="sm"
                variant="ghost"
                borderRadius="full"
                fontSize="xl"
                color="gray.500"
                onClick={closeModal}
                _hover={{
                  bg: "gray.100",
                  color: "gray.800",
                }}
              >
                ×
              </Button>

              {!selectedRecipe ? (
                <>
                  {/* Recipe Selector */}
                  <Heading size="md" color="gray.800" mb={1} pr={8}>
                    Add recipe
                  </Heading>

                  <Text fontSize="sm" color="gray.500" mb={5}>
                    {selectedSlot.day} · {selectedSlot.meal}
                  </Text>

                  {/* Search */}
                  <Input
                    placeholder="Search recipes..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    borderRadius="full"
                    mb={5}
                  />

                  {/* Rrecipe list */}
                  <VStack
                    align="stretch"
                    spacing={2}
                    maxH="350px"
                    overflowY="auto"
                  >
                    {filteredRecipes.map((recipe) => (
                      <Button
                        key={recipe.label}
                        variant="ghost"
                        height="auto"
                        minH="auto"
                        py={3}
                        px={3}
                        justifyContent="flex-start"
                        whiteSpace="normal"
                        textAlign="left"
                        onClick={() => selectRecipe(recipe)}
                        _hover={{
                          bg: "gray.50",
                        }}
                      >
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium" color="gray.800">
                            {recipe.label}
                          </Text>

                          <Text fontSize="xs" color="gray.500">
                            {recipe.mealType ? recipe.mealType.join(" / ") : ""}
                          </Text>
                        </VStack>
                      </Button>
                    ))}
                  </VStack>

                  {/* No recipes */}
                  {filteredRecipes.length === 0 && (
                    <Text textAlign="center" color="gray.500" py={8}>
                      No recipes found.
                    </Text>
                  )}

                  {/* Cancel */}
                  <Flex justify="flex-end" mt={5}>
                    <Button variant="ghost" onClick={closeModal}>
                      Cancel
                    </Button>
                  </Flex>
                </>
              ) : (
                <Box>
                  {/* Recipe Preview */}
                  <Heading
                    size="md"
                    textAlign="center"
                    color="gray.800"
                    mb={5}
                    pr={8}
                  >
                    {selectedRecipe.label}
                  </Heading>

                  {/* Recipe image */}
                  <Image
                    src={selectedRecipe.image}
                    alt={selectedRecipe.label}
                    width="100%"
                    height={["180px", "220px", "240px"]}
                    objectFit="cover"
                    borderRadius="xl"
                    mb={5}
                  />

                  {/* Meal type */}
                  <Text fontSize="sm" align="center" color="gray.500" mb={5}>
                    {selectedRecipe.mealType
                      ? selectedRecipe.mealType.join(" / ")
                      : ""}
                  </Text>

                  {/* Ingredients */}
                  <Box mb={5}>
                    <Text fontWeight="bold" color="gray.800" mb={3}>
                      Ingredients
                    </Text>

                    {/* Scroll only ingredients */}
                    <Box maxH="140px" overflowY="auto" pr={2}>
                      <VStack align="start" spacing={1}>
                        {selectedRecipe.ingredientLines.map(
                          (ingredient, index) => (
                            <Text key={index} fontSize="sm" color="gray.600">
                              • {ingredient}
                            </Text>
                          ),
                        )}
                      </VStack>
                    </Box>
                  </Box>

                  {/* Health Labels */}
                  {selectedRecipe.healthLabels &&
                    selectedRecipe.healthLabels.length > 0 && (
                      <Box mb={5}>
                        <Text fontWeight="bold" color="gray.800" mb={2}>
                          Health Labels
                        </Text>

                        <Flex wrap="wrap" gap={2}>
                          {selectedRecipe.healthLabels
                            .slice(0, 5)
                            .map((label) => (
                              <Box
                                key={label}
                                px={3}
                                py={1}
                                bg="purple.100"
                                color="purple.800"
                                borderRadius="full"
                                fontSize="xs"
                              >
                                {label}
                              </Box>
                            ))}
                        </Flex>
                      </Box>
                    )}

                  {/* Actions */}
                  <Flex
                    direction={["column", "row"]}
                    justify="flex-end"
                    gap={3}
                    mt={6}
                  >
                    <Button
                      size="sm"
                      w={["100%", "80px"]}
                      borderRadius="full"
                      bg="gray.800"
                      color="white"
                      onClick={addRecipe}
                      _hover={{
                        bg: "gray.700",
                      }}
                    >
                      Add
                    </Button>

                    <Button
                      size="sm"
                      w={["100%", "80px"]}
                      borderRadius="full"
                      bg="gray.800"
                      color="white"
                      onClick={() => setSelectedRecipe(null)}
                      _hover={{
                        bg: "gray.700",
                      }}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Plan Saved Modal */}
        <Modal isOpen={isSaveModalOpen} onClose={onSaveModalClose} isCentered>
          <ModalOverlay />

          <ModalContent borderRadius="2xl" mx={4}>
            {/* Close button */}
            <Button
              position="absolute"
              top={3}
              right={3}
              variant="ghost"
              fontSize="xl"
              color="gray.500"
              borderRadius="full"
              onClick={onSaveModalClose}
              _hover={{
                bg: "gray.100",
                color: "gray.800",
              }}
            >
              ×
            </Button>

            <ModalHeader textAlign="center">Plan saved!</ModalHeader>

            <ModalBody textAlign="center" pb={6}>
              <Text color="gray.600">
                Your meal plan has been saved and the ingredients have been
                added to your grocery list.
              </Text>
            </ModalBody>

            <ModalFooter justifyContent="center" gap={3}>
              <Button
                bg="gray.800"
                color="white"
                px={6}
                borderRadius="full"
                onClick={() => {
                  onSaveModalClose();
                  navigate("/grocery-list");
                }}
                _hover={{
                  bg: "gray.700",
                }}
              >
                Go to Grocery List
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};
