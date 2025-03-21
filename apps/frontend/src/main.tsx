import { store } from "@/lib/redux/store";
import reportWebVitals from "@/reportWebVitals";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "@/assets/css/styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <RouterProvider router={router} />
          <Toaster />
        </GoogleOAuthProvider>
      </Provider>
    </StrictMode>,
  );
}

if (import.meta.env.MODE === "development") {
  reportWebVitals(console.log);
}
