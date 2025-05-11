"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAirportById } from "@/lib/airports";
import Link from "next/link";

interface FlightSearchSummaryProps {
  searchParams: {
    from?: string;
    to?: string;
    departure?: string;
    return?: string;
    passengers?: string;
    tripType?: string;
  };
}

export default function FlightSearchSummary({
  searchParams,
}: FlightSearchSummaryProps) {
  const fromAirport = searchParams.from ? getAirportById(searchParams.from) : null;
  const toAirport = searchParams.to ? getAirportById(searchParams.to) : null;
  
  const departureDate = searchParams.departure
    ? new Date(searchParams.departure)
    : null;
    
  const returnDate = searchParams.return 
    ? new Date(searchParams.return) 
    : null;
    
  const passengers = searchParams.passengers || "1";
  const isRoundTrip = searchParams.tripType === "roundTrip";

  return (
    <div className="rounded-lg bg-card p-6 shadow">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center md:flex-row md:gap-8">
          {fromAirport && toAirport ? (
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
              <div className="text-center md:text-left">
                <div className="text-lg font-bold md:text-xl">{fromAirport.city}</div>
                <div className="text-sm text-muted-foreground">{fromAirport.code}</div>
              </div>
              
              <div className="flex w-20 items-center justify-center">
                <div className="hidden h-[2px] w-12 bg-border md:block"></div>
                <ArrowRight className="mx-2 h-5 w-5" />
                <div className="hidden h-[2px] w-12 bg-border md:block"></div>
              </div>
              
              <div className="text-center md:text-left">
                <div className="text-lg font-bold md:text-xl">{toAirport.city}</div>
                <div className="text-sm text-muted-foreground">{toAirport.code}</div>
              </div>
            </div>
          ) : (
            <div className="text-lg font-bold">Flight Search</div>
          )}

          <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground md:mt-0">
            <div>
              {departureDate ? format(departureDate, "dd MMM, yyyy") : ""}
              {isRoundTrip && returnDate
                ? ` - ${format(returnDate, "dd MMM, yyyy")}`
                : ""}
            </div>
            <div>{passengers} Passenger{parseInt(passengers) !== 1 ? "s" : ""}</div>
          </div>
        </div>

        <Link className='gap-1 flex items-center px-4 py-2 border rounded-full' href={'/'}>
          <ArrowLeft className="h-4 w-4" />
          Modify Search
        </Link>
      </div>
    </div>
  );
}