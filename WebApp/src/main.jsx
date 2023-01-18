import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
