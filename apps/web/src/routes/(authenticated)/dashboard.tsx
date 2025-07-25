import { H1 } from "@/components/ui/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <H1>Dashboard</H1>
    </div>
  );
}
