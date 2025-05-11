"use client";

import { useEffect, useState } from "react";
import { getBookingHistory } from "@/lib/booking-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/date-utils";
import { generatePDF } from "@/lib/pdf-generator";
import { toast } from "sonner";
import { Download, Plane, TicketX } from "lucide-react";

export default function BookingHistory() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // In a real app, this would be an API call
        const data = await getBookingHistory();
        setBookings(data);
      } catch (error) {
        toast.error("Failed to load booking history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDownloadTicket = (booking: any) => {
    generatePDF({
      bookingReference: booking.reference,
      passengerName: booking.passengerName,
      flight: booking.flight,
      price: booking.price,
      bookingDate: new Date(booking.bookingDate),
    });
    
    toast.success("Ticket downloaded!");
  };

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="rounded-lg border border-dashed p-12 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <TicketX className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-semibold">No Bookings Found</h3>
        <p className="mb-6 max-w-md text-muted-foreground">
          You haven't made any bookings yet. Start by searching for flights and make your first booking.
        </p>
        <Button>Search Flights</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.reference} className="overflow-hidden">
          <CardHeader className="bg-muted/50 p-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <CardTitle className="text-lg">Booking #{booking.reference}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Booked on {formatDate(new Date(booking.bookingDate))}
                </p>
              </div>
              <Badge variant="outline" className="w-fit">
                {booking.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Passenger</p>
                <p className="font-medium">{booking.passengerName}</p>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex flex-col">
                  <div className="mb-4 flex items-center">
                    <div className="mr-3 h-8 w-8 rounded bg-muted p-1">
                      <Plane className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {booking.flight.airline} {booking.flight.flightNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(booking.flight.departureTime)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-bold">
                          {formatTime(booking.flight.departureTime)}
                        </p>
                        <p className="text-sm">
                          {booking.flight.origin.city} ({booking.flight.origin.code})
                        </p>
                      </div>
                      
                      <div className="flex w-20 flex-col items-center">
                        <div className="h-[2px] w-full bg-border"></div>
                        <p className="my-1 text-xs text-muted-foreground">
                          {Math.floor(booking.flight.duration / 60)}h {booking.flight.duration % 60}m
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-lg font-bold">
                          {formatTime(booking.flight.arrivalTime)}
                        </p>
                        <p className="text-sm">
                          {booking.flight.destination.city} ({booking.flight.destination.code})
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Amount Paid</p>
                      <p className="text-lg font-bold">₹{booking.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t bg-muted/20 p-4">
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-2"
              onClick={() => handleDownloadTicket(booking)}
            >
              <Download className="h-4 w-4" />
              Download Ticket
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}