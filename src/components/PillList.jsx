import { Box, Text, Wrap, WrapItem } from "@chakra-ui/react";

export const PillList = ({ title, items, bgColor, textColor, center }) => {
  if (!items || items.length === 0) return null;

  return (
    <Box w="100%">
      {/* Display the title when one is provided */}
      {title && (
        <Text fontWeight="bold" mb={2} textAlign={center ? "center" : "left"}>
          {title}
        </Text>
      )}

      {/* Responsive wrapping layout for the pills */}
      <Wrap spacing={2} justify={center ? "center" : "flex-start"} w="100%">
        {/* Loop through the items and create a pill for each one */}
        {items.map((item) => (
          <WrapItem key={item}>
            {/* Style each item */}
            <Box
              px={3}
              py={1}
              borderRadius="full"
              bg={bgColor}
              color={textColor}
              fontSize="sm"
              fontWeight="medium"
              textAlign="center"
            >
              {item}
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
