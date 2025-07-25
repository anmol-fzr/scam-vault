import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import "../index.css";

export interface RouterAppContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Scam Vault Dashboard",
      },
      {
        name: "description",
        content: "A free, public API that collects and shares information about ongoing scams, helping developers and platforms protect users from fraud.",
      },
    ],
    links: [{
      rel: "icon",
      href: "/favicon.ico",
    },
    ],
  }),
});

function RootComponent() {
  // const isFetching = useRouterState({
  //   select: (s) => s.isLoading,
  // });

  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <div className="grid grid-rows-[auto_1fr] h-svh">
          {/*
          {isFetching ? <Loader /> : <Outlet />}
          */}
          <Outlet />
        </div>
        <Toaster richColors />
      </ThemeProvider>
      {/*
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
      */}
    </>
  );
}
