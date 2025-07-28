import { LoginForm } from "@/components/login-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionQueryOps } from "@/hooks/auth/useGetSession";

export const Route = createFileRoute("/auth/login")({
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
    <div className="bg-background relative w-full overflow-hidden h-screen flex items-center">
      <div className="container mx-auto max-w-3xl px-4 py-2 h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="from-primary/20 via-background to-background absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"></div>
          <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>
        <LoginForm />
      </div>
    </div>
  );
}
