import SearchForm from "@/components/search/search-form";
import FlightHero from "@/components/home/flight-hero";
import FeaturesSection from "@/components/home/features-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <FlightHero />
      <div className="container mx-auto px-4 py-8">
        <div className="relative -mt-24 rounded-3xl max-w-5xl m-auto bg-card p-6 shadow-[0_2px_12px_0px_rgba(0,0,0,0.04),_0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)]">
          <SearchForm />
        </div>
        <FeaturesSection />
      </div>
    </div>
  );
}