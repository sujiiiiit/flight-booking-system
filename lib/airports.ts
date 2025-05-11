interface Airport {
  id: string;
  name: string;
  city: string;
  code: string;
}

// This would typically come from a database
const AIRPORTS: Airport[] = [
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

export function getAirportById(id: string): Airport | null {
  return AIRPORTS.find(airport => airport.id === id) || null;
}

export function getAllAirports(): Airport[] {
  return AIRPORTS;
}