import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { RecipesPage } from "./pages/RecipesPage";
import { RecipePage } from "./pages/RecipePage";
import { MealPlannerPage } from "./pages/MealPlannerPage";
import { GroceryListPage } from "./pages/GroceryListPage";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Box bg="#F7F5F0" minH="100vh">
        <Box maxW="1400px" mx="auto">
          <Header />

          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* All recipes */}
            <Route path="/recipes" element={<RecipesPage />} />

            {/* Recipe detail */}
            <Route path="/recipes/:recipeId" element={<RecipePage />} />

            {/* Meal Planner */}
            <Route path="/meal-planner" element={<MealPlannerPage />} />

            {/* Grocery List */}
            <Route path="/grocery-list" element={<GroceryListPage />} />
          </Routes>

          <Footer />
        </Box>
      </Box>
    </BrowserRouter>
  );
};
