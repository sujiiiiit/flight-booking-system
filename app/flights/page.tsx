import { Suspense } from "react";
import FlightsList from "@/components/flights/flights-list";
import FlightFilters from "@/components/flights/flight-filters";
import FlightSearchSummary from "@/components/flights/flight-search-summary";
import { Loader2 } from "lucide-react";

export default function FlightsPage({
  searchParams,
}: {
  searchParams: {
    from?: string;
    to?: string;
    departure?: string;
    return?: string;
    passengers?: string;
    tripType?: string;
    airline?: string;
    timeOfDay?: string;
    priceRange?: string;
  };
}) {
  return (
    <div className="max-w-7xl  mx-auto px-4 py-8">
      <FlightSearchSummary searchParams={searchParams} />
      
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <FlightFilters />
        </div>
        <div className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="flex h-96 w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading flights...</span>
              </div>
            }
          >
            <FlightsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}