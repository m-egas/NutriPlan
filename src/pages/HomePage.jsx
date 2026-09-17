import { Box } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { PopularRecipesPreview } from "../components/PopularRecipesPreview";
import { HowItWorks } from "../components/HowItWorks";
import { MealPlannerPreview } from "../components/MealPlannerPreview";
import { GroceryListPreview } from "../components/GroceryListPreview";
import { ReadyToPlan } from "../components/ReadyToPlan";

export const HomePage = () => {
  return (
    <Box as="main" minH="100vh">
      <Hero />
      <PopularRecipesPreview />
      <HowItWorks />
      <MealPlannerPreview />
      <GroceryListPreview />
      <ReadyToPlan />
    </Box>
  );
};
