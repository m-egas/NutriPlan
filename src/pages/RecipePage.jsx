import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { data } from "../utils/data";
import { PillList } from "../components/PillList";

export const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  // Find the matching recipe in the data
  const recipe = data.hits.find(
    (item) => item.recipe.label === decodeURIComponent(recipeId),
  )?.recipe;

  // Show a fallback when the recipe cannot be found
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <Box
      minH="100vh"
      bg="#F7F5F0"
      pt={[6, 8, 12]}
      pb={[6, 8, 12]}
      px={[2, 4, 6]}
    >
      {/* Recipe Card */}
      <Box
        maxW="750px"
        mx="auto"
        bg="white"
        borderRadius={["lg", "xl", "2xl"]}
        boxShadow={["sm", "md"]}
        position="relative"
        overflow="hidden"
      >
        {/* Back button */}
        <IconButton
          aria-label="Back to recipes"
          icon={<Text fontSize={["lg", "xl"]}>←</Text>}
          position="absolute"
          top={[2, 4]}
          left={[2, 4]}
          zIndex={2}
          borderRadius="full"
          variant="ghost"
          color="gray.600"
          _hover={{
            bg: "gray.100",
            color: "orange.500",
          }}
          onClick={() => navigate("/recipes")}
        />

        {/* Close button */}
        <IconButton
          aria-label="Close recipe"
          icon={<Text fontSize={["lg", "xl"]}>×</Text>}
          position="absolute"
          top={[2, 4]}
          right={[2, 4]}
          zIndex={2}
          borderRadius="full"
          variant="ghost"
          color="gray.600"
          _hover={{
            bg: "gray.100",
            color: "black",
          }}
          onClick={() => navigate("/")}
        />

        {/* Recipe header */}
        <VStack
          spacing={[3, 4]}
          pt={[8, 10, 16]}
          px={[4, 6, 10]}
          pb={[5, 6, 10]}
        >
          {/* Recipe title */}
          <Heading
            textAlign="center"
            fontSize={["lg", "2xl", "3xl"]}
            lineHeight="1.2"
            color="gray.800"
            px={[10, 12, 16]}
          >
            {recipe.label}
          </Heading>

          {/* Recipe image */}
          <Image
            src={recipe.image}
            alt={recipe.label}
            borderRadius={["md", "lg", "xl"]}
            width="100%"
            maxH={["220px", "350px", "450px"]}
            objectFit="cover"
          />

          {/* Meal type */}
          <Text color="gray.500" fontSize="sm" textAlign="center">
            {recipe.mealType.join("/").toUpperCase()}
          </Text>
        </VStack>

        {/* Two-column layout */}
        <SimpleGrid
          columns={[1, 2]}
          spacing={[6, 8]}
          px={[4, 6, 10]}
          pb={[6, 8, 10]}
          alignItems="flex-start"
        >
          {/* Left column */}
          <VStack align="start" spacing={4} width="100%">
            {/* Cooking time */}
            <Text>
              <Text as="span" fontWeight="bold">
                Cooking time:{" "}
              </Text>
              {recipe.totalTime > 0
                ? `${recipe.totalTime} min`
                : "Not specified"}
            </Text>

            {/* Dish type */}
            {recipe.dishType && recipe.dishType.length > 0 && (
              <Text>
                <Text as="span" fontWeight="bold">
                  Dish:{" "}
                </Text>
                {recipe.dishType[0]}
              </Text>
            )}

            {/* Servings */}
            <Text>
              <Text as="span" fontWeight="bold">
                Servings:{" "}
              </Text>
              {recipe.yield}
            </Text>

            {/* Ingredients */}
            <Box width="100%">
              <Text fontWeight="bold" mb={2}>
                Ingredients:
              </Text>

              <VStack align="start" spacing={1}>
                {recipe.ingredientLines.map((ingredient, index) => (
                  <Text key={index} fontSize="sm">
                    • {ingredient}
                  </Text>
                ))}
              </VStack>
            </Box>

            {/* Link to the original recipe for preparation instructions */}
            <Button
              as="a"
              href={recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              bg="#AFC3A5"
              color="white"
              width={["100%", "auto"]}
              _hover={{ bg: "#D5E2CC" }}
            >
              View full recipe
            </Button>
          </VStack>

          {/* Right column: labels and nutritional information */}
          <VStack align="start" spacing={4} width="100%">
            <PillList
              title="Health Labels"
              items={recipe.healthLabels}
              bgColor="purple.300"
              textColor="purple.950"
            />

            <PillList
              title="Diet"
              items={recipe.dietLabels}
              bgColor="blue.100"
              textColor="blue.950"
            />

            <PillList
              title="Cautions"
              items={recipe.cautions}
              bgColor="red.400"
              textColor="red.950"
            />

            {/* Total Nutrients */}
            <Box width="100%">
              <Text fontWeight="bold" mb={2}>
                Total Nutrients:
              </Text>

              <VStack align="start" spacing={1} fontSize="sm">
                <Text>
                  Energy:{" "}
                  {Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} kcal
                </Text>

                <Text>
                  Protein: {Math.round(recipe.totalNutrients.PROCNT.quantity)} g
                </Text>

                <Text>
                  Fat: {Math.round(recipe.totalNutrients.FAT.quantity)} g
                </Text>

                <Text>
                  Carbs: {Math.round(recipe.totalNutrients.CHOCDF.quantity)} g
                </Text>

                <Text>
                  Cholesterol:{" "}
                  {Math.round(recipe.totalNutrients.CHOLE.quantity)} mg
                </Text>

                <Text>
                  Sodium: {Math.round(recipe.totalNutrients.NA.quantity)} mg
                </Text>
              </VStack>
            </Box>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
};
