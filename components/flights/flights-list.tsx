"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { faker } from "@/lib/faker";
import { getAirportById } from "@/lib/airports";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDuration, formatTime, getFlightDuration } from "@/lib/date-utils";
import { ArrowRight, Clock, Plane } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const AIRLINE_LOGOS = {
  "IndiGo": "https://images.pexels.com/photos/541384/pexels-photo-541384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Air India": "https://images.pexels.com/photos/541384/pexels-photo-541384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "SpiceJet": "https://images.pexels.com/photos/541384/pexels-photo-541384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Vistara": "https://images.pexels.com/photos/541384/pexels-photo-541384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Go Air": "https://images.pexels.com/photos/541384/pexels-photo-541384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

interface SearchParams {
  from?: string;
  to?: string;
  departure?: string;
  return?: string;
  passengers?: string;
  tripType?: string;
  airline?: string;
  timeOfDay?: string;
  priceRange?: string;
}

export default function FlightsList({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const [bookingAttempts, setBookingAttempts] = useState<Record<string, number>>({});
  const [lastAttemptTime, setLastAttemptTime] = useState<Record<string, number>>({});

  // In a real app, this would be fetched from an API
  const flights = generateFlights(searchParams);

  const handleBookFlight = (flightId: string, basePrice: number) => {
    // Price increase logic based on booking attempts
    const currentTime = Date.now();
    const attempts = bookingAttempts[flightId] || 0;
    const lastAttempt = lastAttemptTime[flightId] || 0;
    
    // Reset attempts if last attempt was more than 10 minutes ago
    const resetTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    const newAttempts = currentTime - lastAttempt > resetTime ? 1 : attempts + 1;
    
    // Update state
    setBookingAttempts({
      ...bookingAttempts,
      [flightId]: newAttempts,
    });
    
    setLastAttemptTime({
      ...lastAttemptTime,
      [flightId]: currentTime,
    });
    
    // Calculate price with potential increase
    const priceIncrease = newAttempts >= 3 ? 0.1 : 0; // 10% increase after 3 attempts
    const finalPrice = basePrice * (1 + priceIncrease);

    // In a real app, this would navigate to a booking page with the flight details
    if (newAttempts >= 3 && newAttempts <= 5) {
      toast.warning(
        "Price has increased due to high demand. Book now to secure this fare!"
      );
    }
    
    router.push(`/booking?flightId=${flightId}&price=${finalPrice}`);
  };

  if (flights.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <Plane className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-semibold">No Flights Found</h3>
        <p className="mb-6 text-muted-foreground">
          We couldn't find any flights matching your search criteria.
        </p>
        <Link href='/'>Modify Search</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Found {flights.length} flights
        </h2>
        <div className="text-sm text-muted-foreground">
          Prices are dynamic and may change based on demand
        </div>
      </div>

      {flights.map((flight) => {
        const attempts = bookingAttempts[flight.id] || 0;
        const lastAttempt = lastAttemptTime[flight.id] || 0;
        const currentTime = Date.now();
        
        // Check if price should be increased (3+ attempts within 5 minutes)
        const fiveMinutes = 5 * 60 * 1000;
        const withinTimeWindow = currentTime - lastAttempt < fiveMinutes;
        const shouldIncreasePrice = attempts >= 3 && withinTimeWindow;
        
        // Apply price increase if conditions are met
        const displayPrice = shouldIncreasePrice
          ? flight.price * 1.1
          : flight.price;

        return (
          <Card
            key={flight.id}
            className="overflow-hidden transition-all hover:shadow-md"
          >
            <CardHeader className="bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-background">
                    <img
                      src={AIRLINE_LOGOS[flight.airline as keyof typeof AIRLINE_LOGOS]}
                      alt={flight.airline}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{flight.airline}</div>
                    <div className="text-xs text-muted-foreground">
                      Flight {flight.flightNumber}
                    </div>
                  </div>
                </div>
                <Badge variant={getTimeBadgeVariant(flight.departureTime)}>
                  {getTimePeriod(flight.departureTime)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-1 items-center justify-between gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatTime(flight.departureTime)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {flight.origin.code}
                    </div>
                  </div>
                  
                  <div className="flex flex-1 flex-col items-center px-2">
                    <div className="text-xs text-muted-foreground">
                      {formatDuration(flight.duration)}
                    </div>
                    <div className="relative w-full">
                      <Progress value={100} className="h-[3px]" />
                      <Plane className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform text-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatTime(flight.arrivalTime)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {flight.destination.code}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      ₹{Math.round(displayPrice)}
                    </div>
                    {shouldIncreasePrice && (
                      <div className="text-xs text-destructive">
                        *Price increased due to high demand
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => handleBookFlight(flight.id, flight.price)}
                    className="w-full md:w-auto"
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t bg-muted/20 p-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  On-time Performance: {flight.onTimePerformance}%
                </div>
                <div>Aircraft: {flight.aircraft}</div>
                <div>
                  Amenities: {flight.amenities.join(", ")}
                </div>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

// Helper function to generate flights based on search params
function generateFlights(searchParams: SearchParams) {
  const fromAirport = searchParams.from ? getAirportById(searchParams.from) : null;
  const toAirport = searchParams.to ? getAirportById(searchParams.to) : null;
  
  if (!fromAirport || !toAirport) {
    return [];
  }
  
  const departureDate = searchParams.departure 
    ? new Date(searchParams.departure) 
    : new Date();
  
  const airlines = ["IndiGo", "Air India", "SpiceJet", "Vistara", "Go Air"];
  const flights = [];
  
  // Generate 10 random flights
  for (let i = 0; i < 10; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const departureTime = new Date(departureDate);
    
    // Set random departure hour between 5 and 22
    departureTime.setHours(5 + Math.floor(Math.random() * 17));
    departureTime.setMinutes(Math.floor(Math.random() * 60));
    
    // Random duration between 1h 30m and 3h 30m (in minutes)
    const durationMinutes = 90 + Math.floor(Math.random() * 120);
    
    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + durationMinutes);
    
    // Random price between ₹2,000 and ₹3,000
    const price = 2000 + Math.floor(Math.random() * 1000);
    
    // Random stops (0, 1, or rarely 2)
    const stopsRandom = Math.random();
    const stops = stopsRandom > 0.6 ? 0 : stopsRandom > 0.9 ? 2 : 1;
    
    flights.push({
      id: `FL-${faker.randomUUID().substring(0, 8)}`,
      airline,
      flightNumber: `${airline.substring(0, 2).toUpperCase()}${100 + Math.floor(Math.random() * 900)}`,
      origin: fromAirport,
      destination: toAirport,
      departureTime,
      arrivalTime,
      duration: durationMinutes,
      price,
      stops,
      onTimePerformance: 70 + Math.floor(Math.random() * 30),
      aircraft: ["Boeing 737", "Airbus A320", "Boeing 777", "Airbus A380"][Math.floor(Math.random() * 4)],
      amenities: faker.randomArrayItems(
        ["Wi-Fi", "In-flight Entertainment", "Power Outlets", "Extra Legroom", "Meal Service"],
        1 + Math.floor(Math.random() * 4)
      ),
    });
  }
  
  return flights;
}

function getTimePeriod(date: Date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 18) return "Afternoon";
  return "Evening";
}

function getTimeBadgeVariant(date: Date) {
  const period = getTimePeriod(date);
  switch (period) {
    case "Morning": return "default";
    case "Afternoon": return "secondary";
    case "Evening": return "outline";
    default: return "default";
  }
}