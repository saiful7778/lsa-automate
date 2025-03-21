import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="w-full min-h-svh py-4 overflow-x-hidden">
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
