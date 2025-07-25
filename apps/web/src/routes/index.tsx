import { LoginForm } from "@/components/login-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionQueryOps } from "@/hooks/auth/useGetSession";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  beforeLoad: async ({ context }) => {
    const { data } = await context.queryClient.fetchQuery(getSessionQueryOps())
    if (data !== null) {
      throw redirect({
        to: "/dashboard"
      })
    }
  },
});

function HomeComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2 h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
