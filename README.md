# SkyWay - Flight Booking Platform

A modern flight booking platform built with Next.js, featuring real-time pricing, wallet system, and PDF ticket generation.

![SkyWay Screenshot](https://images.pexels.com/photos/1122462/pexels-photo-1122462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- **Smart Flight Search**: Search flights with auto-suggestions for cities and airports
- **Dynamic Pricing**: Prices adjust based on demand (10% increase after 3 booking attempts within 5 minutes)
- **Wallet System**: Built-in wallet with ₹50,000 starting balance
- **PDF Tickets**: Automatic generation of downloadable e-tickets
- **Booking History**: Track all your past bookings with ticket downloads
- **Responsive Design**: Optimized for all devices
- **Dark Mode**: Built-in light/dark theme support

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod
- **Date Handling**: date-fns
- **Notifications**: Sonner

## Getting Started

1. Clone the repository:
 
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                  # Next.js app router pages
├── components/          
│   ├── booking/         # Booking related components
│   ├── flights/         # Flight search and listing
│   ├── home/           # Landing page components
│   ├── layout/         # Layout components
│   ├── providers/      # Context providers
│   ├── search/         # Search form components
│   ├── ui/             # Reusable UI components
│   └── wallet/         # Wallet management
├── lib/                 # Utility functions
└── public/             # Static assets
```

## Key Features

### Flight Search
- Auto-complete for cities and airports
- Real-time flight suggestions
- Advanced filtering options
  - Time of day (Morning/Afternoon/Evening)
  - Airlines
  - Price range

### Dynamic Pricing
- Base prices between ₹2,000–₹3,000
- 10% price increase after 3 booking attempts
- Price reset after 10 minutes
- Real-time price updates

### Wallet System
- ₹50,000 initial balance
- Automatic deduction on booking
- Transaction history
- Balance tracking

### Booking Management
- Easy booking process
- PDF ticket generation
- Booking history
- Ticket downloads



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern flight booking platforms
- Icons provided by [Lucide](https://lucide.dev)
- UI components by [shadcn/ui](https://ui.shadcn.com)
