import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Roboto Flex', sans-serif`,
    body: `'Roboto Flex', sans-serif`,
  },
  styles: {
    global: {
      body: {
        color: "gray.600",
      },
    },
  },
});

export default theme;
