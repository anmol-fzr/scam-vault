import { H1 } from "@/components/ui/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full">
      <H1>Dashboard</H1>
      <div className="h-full flex items-center justify-center">
        <p>
          Nothing to See Here
        </p>
      </div>
    </div>
  );
}
