import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import "../index.css";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

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
          <KeybindingsProvider>
            <Outlet />
          </KeybindingsProvider>
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

const KeybindingsProvider = ({ children }) => {
  const theme = useTheme();

  useHotkeys('alt+t', evt => {
    evt.preventDefault()
    theme.setTheme(curr => {
      toast.info(`Theme Changed to ${curr === "light" ? "Dark" : "Light"} `)
      return curr === "light" ? "dark" : "light"
    })
  })

  return children
}
