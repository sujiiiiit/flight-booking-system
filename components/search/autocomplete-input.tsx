"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for airports - in a real app this would come from an API
const AIRPORTS = [
  { id: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', code: 'DEL' },
  { id: 'BOM', name: 'Chhatrapati Shivaji International Airport', city: 'Mumbai', code: 'BOM' },
  { id: 'MAA', name: 'Chennai International Airport', city: 'Chennai', code: 'MAA' },
  { id: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', code: 'BLR' },
  { id: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata', code: 'CCU' },
  { id: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', code: 'HYD' },
  { id: 'GAU', name: 'Lokpriya Gopinath Bordoloi International Airport', city: 'Guwahati', code: 'GAU' },
  { id: 'COK', name: 'Cochin International Airport', city: 'Kochi', code: 'COK' },
  { id: 'PNQ', name: 'Pune Airport', city: 'Pune', code: 'PNQ' },
  { id: 'LKO', name: 'Chaudhary Charan Singh International Airport', city: 'Lucknow', code: 'LKO' },
];

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AutocompleteInput({
  value,
  onChange,
  placeholder = "Search for a city or airport",
}: AutocompleteInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState(AIRPORTS);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      // Find the airport and display its name
      const selected = AIRPORTS.find(
        airport => airport.id === value || airport.city === value
      );
      if (selected) {
        setInputValue(`${selected.city} (${selected.code})`);
      } else {
        setInputValue(value);
      }
    } else {
      setInputValue("");
    }
  }, [value]);

  // In a real app, this would be an API call with debounce
  const fetchSuggestions = (query: string) => {
    if (!query) {
      setSuggestions(AIRPORTS);
      return;
    }

    const filtered = AIRPORTS.filter(
      airport => 
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase()) ||
        airport.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSuggestions(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setOpen(true);
    fetchSuggestions(value);
  };

  const handleSelect = (selectedValue: string) => {
    const selected = AIRPORTS.find(airport => airport.id === selectedValue);
    if (selected) {
      setInputValue(`${selected.city} (${selected.code})`);
      onChange(selected.id);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full"
            onClick={() => setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder={placeholder}
            value={inputValue}
            onValueChange={(value) => {
              setInputValue(value);
              fetchSuggestions(value);
            }}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {suggestions.map((airport) => (
                <CommandItem
                  key={airport.id}
                  value={airport.id}
                  onSelect={handleSelect}
                  className="flex items-center"
                >
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span>{airport.city} ({airport.code})</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {airport.name}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === airport.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}