import { getAirportById } from './airports';
import { faker } from './faker';

// In a real application, this would be fetched from a database
export function getFlightById(id: string) {
  // If no flight found with this ID, generate one
  // In a real app, we would return null or fetch from DB
  const fromAirport = getAirportById('DEL');
  const toAirport = getAirportById('BOM');
  
  if (!fromAirport || !toAirport) {
    return null;
  }
  
  const airlines = ["IndiGo", "Air India", "SpiceJet", "Vistara", "Go Air"];
  const airline = airlines[Math.floor(Math.random() * airlines.length)];
  
  const departureTime = new Date();
  departureTime.setHours(5 + Math.floor(Math.random() * 17));
  departureTime.setMinutes(Math.floor(Math.random() * 60));
  
  // Random duration between 1h 30m and 3h 30m (in minutes)
  const durationMinutes = 90 + Math.floor(Math.random() * 120);
  
  const arrivalTime = new Date(departureTime);
  arrivalTime.setMinutes(arrivalTime.getMinutes() + durationMinutes);
  
  return {
    id,
    airline,
    flightNumber: `${airline.substring(0, 2).toUpperCase()}${100 + Math.floor(Math.random() * 900)}`,
    origin: fromAirport,
    destination: toAirport,
    departureTime,
    arrivalTime,
    duration: durationMinutes,
    price: 2000 + Math.floor(Math.random() * 1000),
    stops: 0,
    onTimePerformance: 70 + Math.floor(Math.random() * 30),
    aircraft: ["Boeing 737", "Airbus A320", "Boeing 777", "Airbus A380"][Math.floor(Math.random() * 4)],
    amenities: faker.randomArrayItems(
      ["Wi-Fi", "In-flight Entertainment", "Power Outlets", "Extra Legroom", "Meal Service"],
      1 + Math.floor(Math.random() * 4)
    ),
  };
}