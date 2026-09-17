import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const GroceryListPreview = () => {
  const categories = [
    { name: "Produce", icon: "🥦", items: ["Tomatoes", "Onions", "Potatoes"] },
    {
      name: "Meat & Fish",
      icon: "🥩",
      items: ["Chicken breast", "Salmon"],
    },
    { name: "Dairy", icon: "🥛", items: ["Mozzarella", "Milk", "Soja milk"] },
    { name: "Pantry", icon: "🥫", items: ["Pasta", "Olive oil"] },
    { name: "Bakery", icon: "🥖", items: ["Bread", "Croissants"] },
    {
      name: "Frozen",
      icon: "🧊",
      items: ["Frozen vegetables", "Ice cream", "Frozen fruit"],
    },
    { name: "Condiments & Spices", icon: "🧂", items: ["Salt", "Pepper"] },
    { name: "Drinks", icon: "🥤", items: ["Juice", "Water", "Wine"] },
  ];
  return (
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
            Grocery List
          </Heading>
        </Box>

        {/* View grocery list link */}
        <Button
          as={RouterLink}
          to="/grocery-list"
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
            View grocery list →
          </Box>

          <Box as="span" display={{ base: "inline", sm: "none" }}>
            View list →
          </Box>
        </Button>
      </Flex>

      {/* Paper grocery list */}
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        px={[4, 6, 8, 10]}
        py={[5, 7, 9, 10]}
      >
        {/* Paper header */}
        <VStack spacing={1} mb={[6, 8]}>
          <Text fontSize={["xl", "2xl"]}>🛒</Text>

          <Heading
            as="h3"
            fontSize={["lg", "xl", "2xl"]}
            color="gray.800"
            textAlign="center"
          >
            Weekly Grocery List
          </Heading>
        </VStack>

        {/* Categories */}
        <SimpleGrid
          columns={[2, 2, 3, 4]}
          spacingX={[4, 5, 7, 10]}
          spacingY={[6, 7, 8]}
        >
          {categories.map((category) => (
            <Box key={category.name}>
              {/* Category title */}
              <Flex align="center" gap={[2, 3]} mb={2}>
                <Text fontSize={["lg", "xl"]}>{category.icon}</Text>

                <Text
                  fontSize={["xs", "sm"]}
                  fontWeight="bold"
                  color="gray.800"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  lineHeight="1.2"
                >
                  {category.name}
                </Text>
              </Flex>

              {/* Divider */}
              <Box borderTop="1px" borderColor="#E4EBDD" mb={2} />

              {/* Grocery items */}
              <VStack align="stretch" spacing={1}>
                {category.items.map((item) => (
                  <Checkbox key={item} colorScheme="green" size="md" py={1}>
                    <Text fontSize={["xs", "sm"]} color="gray.700">
                      {item}
                    </Text>
                  </Checkbox>
                ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Paper footer */}
        <Box
          borderTop="1px"
          borderColor="#E4EBDD"
          mt={[6, 8]}
          pt={4}
          textAlign="center"
        >
          <Text fontSize="xs" color="gray.500">
            Your weekly shopping made simple.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
