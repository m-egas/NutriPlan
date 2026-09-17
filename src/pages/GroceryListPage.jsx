import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
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

export const GroceryListPage = () => {
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("groceryList");

      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Error loading grocery list:", error);
      return [];
    }
  });

  const [newItem, setNewItem] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);
  const toast = useToast();

  const {
    isOpen: isClearAllOpen,
    onOpen: onClearAllOpen,
    onClose: onClearAllClose,
  } = useDisclosure();

  // Load grocery list
  useEffect(() => {
    const loadGroceryList = () => {
      try {
        const savedItems = localStorage.getItem("groceryList");

        setItems(savedItems ? JSON.parse(savedItems) : []);
      } catch (error) {
        console.error("Error loading grocery list:", error);
      }
    };

    loadGroceryList();

    window.addEventListener("storage", loadGroceryList);

    return () => {
      window.removeEventListener("storage", loadGroceryList);
    };
  }, []);

  // Save grocery list whenever it changes
  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(items));
  }, [items]);

  // Convert ingredient categories
  const getCategory = (category) => {
    const value = category?.toLowerCase() || "";

    // Produce
    if (value.includes("vegetable") || value.includes("fruit")) {
      return "Produce";
    }

    // Meat & Seafood
    if (
      value.includes("meat") ||
      value.includes("fish") ||
      value.includes("seafood")
    ) {
      return "Meat & Seafood";
    }

    // Dairy & Eggs
    if (
      value.includes("dairy") ||
      value.includes("cheese") ||
      value.includes("egg")
    ) {
      return "Dairy & Eggs";
    }

    // Bakery & Grains
    if (
      value.includes("bread") ||
      value.includes("rolls") ||
      value.includes("tortillas") ||
      value.includes("grain")
    ) {
      return "Bakery & Grains";
    }

    // Condiments & Oils
    if (
      value.includes("condiment") ||
      value.includes("sauce") ||
      value.includes("oil")
    ) {
      return "Condiments & Oils";
    }

    // Drinks
    if (
      value.includes("water") ||
      value.includes("wine") ||
      value.includes("liquor") ||
      value.includes("beverage")
    ) {
      return "Drinks";
    }

    // Pantry
    if (
      value.includes("chocolate") ||
      value.includes("sugar") ||
      value.includes("syrup") ||
      value.includes("canned") ||
      value.includes("plant-based protein")
    ) {
      return "Pantry";
    }

    return "Other";
  };

  // Check / uncheck item
  const toggleItem = (id) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: !item.checked,
            }
          : item,
      ),
    );
  };

  // Clear entire grocery list
  const clearAll = () => {
    setItems([]);

    localStorage.removeItem("groceryList");
    onClearAllClose();

    toast({
      title: "Grocery list cleared",
      description: "All items have been removed from your list.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  // Remove completed items
  const removeCompleted = () => {
    const completedItems = items.filter((item) => item.checked);

    if (completedItems.length === 0) {
      toast({
        title: "Nothing to remove",
        description: "No completed items have been selected.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      return;
    }

    setItems((currentItems) => currentItems.filter((item) => !item.checked));

    toast({
      title: "Items removed",
      description: `${completedItems.length} completed item${
        completedItems.length > 1 ? "s have" : " has"
      } been removed.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  // Add manual item
  const addItem = () => {
    const trimmedItem = newItem.trim();

    if (!trimmedItem) {
      toast({
        title: "Item required",
        description: "Please enter an item before adding it.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      return;
    }

    const newItemObject = {
      id: Date.now(),
      name: trimmedItem,
      category: "Other",
      checked: false,
    };

    setItems((currentItems) => [...currentItems, newItemObject]);

    setNewItem("");
    setShowAddItem(false);

    toast({
      title: "Item added",
      description: `${trimmedItem} was added to your grocery list.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const categories = [
    { name: "Produce", icon: "🥦" },
    { name: "Condiments & Oils", icon: "🧂" },
    { name: "Meat & Seafood", icon: "🥩" },
    { name: "Bakery & Grains", icon: "🥖" },
    { name: "Dairy & Eggs", icon: "🥛" },
    { name: "Pantry", icon: "🥫" },
    { name: "Drinks", icon: "🥤" },
    { name: "Other", icon: "📦" },
  ];

  return (
    <Box
      as="main"
      bg="#F7F5F0"
      minH="100vh"
      px={[4, 6, 8, 10]}
      py={[6, 8, 10, 12]}
    >
      <Box maxW="850px" mx="auto">
        {/* Page heading */}
        <VStack spacing={2} mb={[6, 10]} align="start">
          <Heading as="h1" size={["lg", "xl"]} color="gray.800">
            Grocery List
          </Heading>
        </VStack>

        {/* Grocery card */}
        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="2xl"
          boxShadow="sm"
          px={[4, 6, 8, 10]}
          py={[5, 6, 8, 10]}
        >
          {/* Card top */}
          <Box position="relative" mb={[6, 10]}>
            <VStack spacing={2} mb={[6, 8]}>
              <Text fontSize={["xl", "2xl"]}>🛒</Text>

              <Heading
                as="h2"
                fontSize={["xl", "2xl"]}
                color="gray.800"
                textAlign="center"
              >
                Weekly Grocery List
              </Heading>
            </VStack>

            {/* Empty state */}
            {items.length === 0 && (
              <Box textAlign="center" py={[8, 10]}>
                <Text color="gray.500" mb={3}>
                  Your grocery list is empty.
                </Text>

                <Text fontSize="sm" color="gray.400">
                  Add recipes to your meal planner and save your plan.
                </Text>
              </Box>
            )}

            {/* Categories */}
            {items.length > 0 && (
              <SimpleGrid
                columns={[1, 2]}
                spacingX={[0, 8, 10]}
                spacingY={[6, 8]}
              >
                {categories.map((category) => {
                  const categoryItems = items.filter(
                    (item) => getCategory(item.category) === category.name,
                  );

                  if (categoryItems.length === 0) {
                    return null;
                  }

                  return (
                    <Box key={category.name}>
                      {/* Category header: icon and category name */}
                      <Flex align="center" gap={2} mb={4}>
                        <Text fontSize="xl">{category.icon}</Text>

                        <Text fontWeight="bold" fontSize="sm" color="gray.700">
                          {category.name}
                        </Text>
                      </Flex>

                      {/* Grocery items inside this category */}
                      <VStack align="stretch" spacing={3}>
                        {categoryItems.map((item) => (
                          <Flex
                            key={item.id}
                            align="center"
                            justify="space-between"
                            gap={3}
                            minW={0}
                          >
                            {/* Checkbox and ingredient name */}
                            <Checkbox
                              isChecked={item.checked}
                              onChange={() => toggleItem(item.id)}
                              colorScheme="green"
                              flex="1"
                              minW={0}
                            >
                              <Text
                                fontSize="sm"
                                color={item.checked ? "gray.400" : "gray.700"}
                                textDecoration={
                                  item.checked ? "line-through" : "none"
                                }
                              >
                                {item.name}
                              </Text>
                            </Checkbox>

                            {/* Quantity */}
                            {item.quantity !== null &&
                              item.quantity !== undefined && (
                                <Text
                                  flexShrink={0}
                                  fontSize="xs"
                                  color="gray.400"
                                  whiteSpace="nowrap"
                                >
                                  {item.quantity}{" "}
                                  {item.measure && item.measure !== "<unit>"
                                    ? item.measure
                                    : ""}
                                </Text>
                              )}
                          </Flex>
                        ))}
                      </VStack>
                    </Box>
                  );
                })}
              </SimpleGrid>
            )}

            {/* Divider between grocery list and actions */}
            <Divider my={8} />

            {/* Remove completed - bottom right */}
            <Flex justify={["stretch", "flex-end"]} mt={4}>
              <Button
                w={{ base: "100%", sm: "auto" }}
                variant="outline"
                borderRadius="full"
                color="gray.800"
                borderColor="gray.300"
                onClick={removeCompleted}
                _hover={{
                  bg: "gray.50",
                  borderColor: "gray.400",
                }}
              >
                Remove completed
              </Button>
            </Flex>
          </Box>

          {/* Grocery list actions */}
          <Flex
            direction={["column", "row"]}
            justify="center"
            align="center"
            gap={3}
          >
            {/* Add a new grocery item */}
            <Button
              w={{ base: "100%", sm: "auto" }}
              variant="outline"
              borderRadius="full"
              bg="gray.900"
              color="white"
              onClick={() => setShowAddItem(true)}
              _hover={{
                bg: "gray.700",
              }}
            >
              + Add item
            </Button>

            {/* Clear all */}
            <Button
              w={{ base: "100%", sm: "auto" }}
              variant="outline"
              bg="white"
              color="gray.800"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="full"
              onClick={onClearAllOpen}
              _hover={{
                bg: "white",
                borderColor: "gray.400",
              }}
            >
              Clear all
            </Button>
          </Flex>

          {/* Add item form - shown when the user clicks "Add item"  */}
          {showAddItem && (
            <Flex
              mt={5}
              direction={["column", "row"]}
              justify="center"
              align="center"
              gap={2}
            >
              {/* New grocery item input */}
              <Input
                size="sm"
                width="100%"
                maxW={["100%", "300px"]}
                placeholder="Add grocery item..."
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addItem();
                  }

                  if (event.key === "Escape") {
                    setShowAddItem(false);
                    setNewItem("");
                  }
                }}
                borderRadius="full"
                borderColor="gray.300"
                autoFocus
              />

              {/* Add the new item */}
              <Button
                w={{ base: "100%", sm: "auto" }}
                size="sm"
                borderRadius="full"
                bg="gray.900"
                color="white"
                onClick={addItem}
                _hover={{
                  bg: "gray.700",
                }}
              >
                Add
              </Button>

              {/* Cancel adding a new item */}
              <Button
                w={{ base: "100%", sm: "auto" }}
                size="sm"
                borderRadius="full"
                variant="outline"
                color="gray.600"
                borderColor="gray.300"
                onClick={() => {
                  setShowAddItem(false);
                  setNewItem("");
                }}
                _hover={{
                  bg: "gray.50",
                }}
              >
                Cancel
              </Button>
            </Flex>
          )}
        </Box>
      </Box>

      {/* Clear All Confirmation Modal */}
      <Modal isOpen={isClearAllOpen} onClose={onClearAllClose} isCentered>
        <ModalOverlay />

        {/* Modal title */}
        <ModalContent
          borderRadius="2xl"
          mx={4}
          maxW={{ base: "calc(100% - 2rem)", sm: "500px" }}
        >
          <ModalHeader
            textAlign="center"
            color="gray.800"
            fontSize={["lg", "xl"]}
          >
            Clear all items?
          </ModalHeader>

          {/* Confirmation message */}
          <ModalBody textAlign="center" pb={6}>
            <Text color="gray.600" fontSize={["sm", "md"]}>
              This will remove all items from your grocery list.
            </Text>
          </ModalBody>

          <ModalFooter
            justifyContent="center"
            gap={3}
            flexDirection={["column", "row"]}
          >
            {/* Confirm clearing the grocery list */}
            <Button
              w={{ base: "100%", sm: "auto" }}
              bg="gray.800"
              color="white"
              px={7}
              borderRadius="full"
              onClick={clearAll}
              _hover={{
                bg: "red.600",
              }}
            >
              Clear all
            </Button>

            {/* Cancel */}
            <Button
              w={{ base: "100%", sm: "auto" }}
              variant="outline"
              borderRadius="full"
              color="gray.600"
              borderColor="gray.300"
              onClick={onClearAllClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
