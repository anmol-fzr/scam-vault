import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/blocks/hero";
import { Features } from "@/components/blocks/features";
import { ContactUs } from "@/components/blocks/contact-us";
import { Footer } from "@/components/blocks/footer";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="absolute w-screen max-w-screen overflow-hidden">
      <Hero />
      <Features />
      <ContactUs />
      <Footer />
    </div>
  );
}
