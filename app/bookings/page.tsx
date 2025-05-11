import BookingHistory from "@/components/booking/booking-history";

export default function BookingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">My Bookings</h1>
      <BookingHistory />
    </div>
  );
}