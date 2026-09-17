import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import HowItWorksImage from "/assets/how-it-works.webp";
export const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Discover",
      description: "Find recipes that you love.",
    },
    { number: "2", title: "Plan", description: "Build your weekly meal plan." },
    { number: "3", title: "Shop", description: "Get your grocery list ready." },
    {
      number: "4",
      title: "Cook",
      description: "Enjoy delicious homemade meals.",
    },
  ];
  return (
    // Main section container
    <Box maxW="1200px" mx="auto" px={[5, 6, 8, 10]} py={[10, 14, 18, 20]}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={[8, 10, 14]}
        align="center"
      >
        {/* Image */}
        <Box flex="1" width="100%">
          <Image
            src={HowItWorksImage}
            alt="Preparing a meal"
            width="100%"
            height={["240px", "320px", "350px", "420px"]}
            objectFit="cover"
            borderRadius="2xl"
          />
        </Box>

        {/* How It Works */}
        <VStack flex="1" align="start" spacing={[5, 6]} width="100%">
          {/* Section heading */}
          <Box>
            <Heading
              as="h2"
              fontSize={["2xl", "3xl", "3xl"]}
              color="gray.800"
              mb={2}
            >
              How It Works
            </Heading>

            <Text color="gray.600" fontSize={["sm", "md"]} maxW="500px">
              Plan your meals, organize your groceries, and enjoy cooking.
            </Text>
          </Box>

          {/* Steps */}
          <VStack align="start" spacing={[2, 3]} width="100%">
            {steps.map((step) => (
              <Box
                key={step.number}
                width="100%"
                p={[2, 3]}
                borderRadius="xl"
                transition="all 0.2s"
                _hover={{
                  bg: "#F0F3EC",
                  transform: { base: "none", md: "translateX(6px)" },
                }}
              >
                <Flex align="flex-start" gap={[3, 4]}>
                  {/* Step number */}
                  <Box
                    minW={["36px", "40px"]}
                    h={["36px", "40px"]}
                    borderRadius="full"
                    bg="#D5E2CC"
                    color="gray.800"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize={["sm", "md"]}
                  >
                    {step.number}
                  </Box>

                  {/* Step content */}
                  <Box>
                    <Heading
                      as="h3"
                      fontSize={["md", "lg"]}
                      color="gray.800"
                      mb={1}
                    >
                      {step.title}
                    </Heading>

                    <Text fontSize={["xs", "sm"]} color="gray.600">
                      {step.description}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
};
