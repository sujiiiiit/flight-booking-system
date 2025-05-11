"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { faker } from "@/lib/faker";
import { getFlightById } from "@/lib/flights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatTime } from "@/lib/date-utils";
import { generatePDF } from "@/lib/pdf-generator";
import { toast } from "sonner";
import { Check, Download, Wallet } from "lucide-react";

interface BookingDetailsProps {
  flightId: string;
  price: number;
}

export default function BookingDetails({ flightId, price }: BookingDetailsProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  
  // Simulate wallet balance (would come from database in real app)
  const [walletBalance, setWalletBalance] = useState(50000);
  
  // Form state
  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Get flight details (in a real app would fetch from API/database)
  const flight = getFlightById(flightId);
  
  if (!flight) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Flight Not Found</CardTitle>
          <CardDescription>
            The flight you're looking for could not be found.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/")}>
            Return to Search
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Check wallet balance
      if (walletBalance < price) {
        toast.error("Insufficient wallet balance");
        setIsSubmitting(false);
        return;
      }
      
      // Process booking (in a real app, this would be an API call)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update wallet balance
      setWalletBalance(prev => prev - price);
      
      // Generate booking reference
      const reference = faker.generateBookingReference();
      setBookingReference(reference);
      
      // Mark as booked
      setIsBooked(true);
      
      // Generate PDF ticket
      generatePDF({
        bookingReference: reference,
        passengerName,
        flight,
        price,
        bookingDate: new Date(),
      });
      
      toast.success("Booking successful!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDownloadTicket = () => {
    generatePDF({
      bookingReference,
      passengerName,
      flight,
      price,
      bookingDate: new Date(),
    });
    
    toast.success("Ticket downloaded!");
  };
  
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          {isBooked ? (
            <>
              <CardHeader className="bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-600 p-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle>Booking Confirmed!</CardTitle>
                </div>
                <CardDescription>
                  Your flight has been booked successfully. Your booking reference is{" "}
                  <span className="font-bold">{bookingReference}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Passenger Details</h3>
                    <p>{passengerName}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Flight Details</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Airline</p>
                        <p>{flight.airline} {flight.flightNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p>{formatDate(flight.departureTime)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p>{flight.origin.city} ({flight.origin.code}) {formatTime(flight.departureTime)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p>{flight.destination.city} ({flight.destination.code}) {formatTime(flight.arrivalTime)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Payment Details</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Amount Paid</p>
                        <p>₹{price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                        <p>Wallet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 px-6 py-4">
                <Button onClick={handleDownloadTicket} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download E-Ticket
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Passenger Information</CardTitle>
                <CardDescription>
                  Fill in the passenger details to complete your booking
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form id="bookingForm" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name (as per ID)</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
      
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Flight Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-medium text-muted-foreground">
                  {flight.airline} {flight.flightNumber}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">{flight.origin.code}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(flight.departureTime)}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(flight.departureTime)}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{flight.destination.code}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(flight.arrivalTime)}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base fare</span>
                  <span>₹{Math.round(price * 0.8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>₹{Math.round(price * 0.2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>₹{price}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="rounded-md bg-muted p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="font-medium">Wallet Balance</span>
                  </div>
                  <span className="font-medium">₹{walletBalance.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-muted/20 flex-col space-y-2 px-6 py-4">
            {!isBooked ? (
              <>
                <Button
                  className="w-full"
                  type="submit"
                  form="bookingForm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  By confirming, you agree to our terms and conditions
                </p>
              </>
            ) : (
              <Button variant="outline" onClick={() => router.push("/bookings")}>
                View All Bookings
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}