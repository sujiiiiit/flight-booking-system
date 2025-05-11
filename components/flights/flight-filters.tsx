"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterX, SlidersHorizontal } from "lucide-react";

const airlines = [
  { id: "indigo", name: "IndiGo" },
  { id: "airIndia", name: "Air India" },
  { id: "spiceJet", name: "SpiceJet" },
  { id: "vistara", name: "Vistara" },
  { id: "goAir", name: "Go Air" },
];

const timesOfDay = [
  { id: "morning", name: "Morning (5:00 - 11:59)" },
  { id: "afternoon", name: "Afternoon (12:00 - 17:59)" },
  { id: "evening", name: "Evening (18:00 - 23:59)" },
];

export default function FlightFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [priceRange, setPriceRange] = useState([2000, 3000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleAirlineChange = (airlineId: string, checked: boolean) => {
    setSelectedAirlines(prev => 
      checked 
        ? [...prev, airlineId]
        : prev.filter(id => id !== airlineId)
    );
  };

  const handleTimeChange = (timeId: string, checked: boolean) => {
    setSelectedTimes(prev => 
      checked 
        ? [...prev, timeId]
        : prev.filter(id => id !== timeId)
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Price range
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    
    // Airlines
    if (selectedAirlines.length > 0) {
      params.set("airlines", selectedAirlines.join(","));
    } else {
      params.delete("airlines");
    }
    
    // Time of day
    if (selectedTimes.length > 0) {
      params.set("times", selectedTimes.join(","));
    } else {
      params.delete("times");
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setPriceRange([2000, 3000]);
    setSelectedAirlines([]);
    setSelectedTimes([]);
    
    const params = new URLSearchParams(searchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("airlines");
    params.delete("times");
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Card className="sticky top-20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">Filters</CardTitle>
          <CardDescription>Refine your search</CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="h-8 gap-1 text-xs"
        >
          <FilterX className="h-3 w-3" />
          Reset
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="font-medium">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              min={2000}
              max={3000}
              step={100}
              onValueChange={handlePriceChange}
            />
            <div className="flex items-center justify-between">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Airlines */}
        <div className="space-y-4">
          <h3 className="font-medium">Airlines</h3>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <div key={airline.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`airline-${airline.id}`} 
                  checked={selectedAirlines.includes(airline.id)}
                  onCheckedChange={(checked) => 
                    handleAirlineChange(airline.id, checked as boolean)
                  }
                />
                <Label htmlFor={`airline-${airline.id}`}>{airline.name}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Time of Day */}
        <div className="space-y-4">
          <h3 className="font-medium">Departure Time</h3>
          <div className="space-y-2">
            {timesOfDay.map((time) => (
              <div key={time.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`time-${time.id}`} 
                  checked={selectedTimes.includes(time.id)}
                  onCheckedChange={(checked) => 
                    handleTimeChange(time.id, checked as boolean)
                  }
                />
                <Label htmlFor={`time-${time.id}`}>{time.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={applyFilters} 
          className="w-full gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}