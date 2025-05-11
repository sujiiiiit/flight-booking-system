import { Suspense } from "react";
import BookingDetails from "@/components/booking/booking-details";
import { Loader2 } from "lucide-react";

export default function BookingPage({
  searchParams,
}: {
  searchParams: {
    flightId?: string;
    price?: string;
  };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Complete Your Booking</h1>
      
      <Suspense
        fallback={
          <div className="flex h-96 w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading booking details...</span>
          </div>
        }
      >
        <BookingDetails 
          flightId={searchParams.flightId || ""} 
          price={searchParams.price ? parseFloat(searchParams.price) : 0} 
        />
      </Suspense>
    </div>
  );
}