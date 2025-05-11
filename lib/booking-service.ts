import { faker } from './faker';
import { getFlightById } from './flights';

// In a real app, this would be fetched from a database
export async function getBookingHistory() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate some random bookings
  const bookings = [];
  
  for (let i = 0; i < 5; i++) {
    const flightId = `FL-${faker.randomUUID().substring(0, 8)}`;
    const flight = getFlightById(flightId);
    
    if (flight) {
      // Calculate a date in the past for the booking
      const bookingDate = new Date();
      bookingDate.setDate(bookingDate.getDate() - Math.floor(Math.random() * 30));
      
      bookings.push({
        reference: faker.generateBookingReference(),
        passengerName: faker.generateName(),
        flight,
        price: flight.price,
        bookingDate,
        status: i === 0 ? 'Upcoming' : 'Completed',
      });
    }
  }
  
  return bookings;
}

export async function createBooking(data: any) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would store data in a database
  return {
    reference: faker.generateBookingReference(),
    ...data,
    bookingDate: new Date(),
    status: 'Confirmed',
  };
}