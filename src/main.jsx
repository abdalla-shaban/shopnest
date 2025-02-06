import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./Context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserContextProvider>
        <CartContextProvider>
          <App />
          <Toaster />
          <ReactQueryDevtools />
        </CartContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
