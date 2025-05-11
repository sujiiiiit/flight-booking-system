import { CheckCircle2, Clock, Wallet, FileText } from "lucide-react";

const features = [
  {
    icon: <CheckCircle2 className="h-10 w-10 text-blue-500" />,
    title: "Easy Booking",
    description: "Simple and intuitive booking process with just a few clicks",
  },
  {
    icon: <Clock className="h-10 w-10 text-green-500" />,
    title: "Real-Time Updates",
    description: "Get real-time flight information and instant booking confirmations",
  },
  {
    icon: <Wallet className="h-10 w-10 text-amber-500" />,
    title: "Wallet System",
    description: "Manage your bookings with our integrated wallet system",
  },
  {
    icon: <FileText className="h-10 w-10 text-purple-500" />,
    title: "Instant Tickets",
    description: "Download your e-tickets immediately after booking",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Why Choose SkyWay?</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          We offer the best flight booking experience with features designed for your convenience
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border p-6 text-center transition-all hover:shadow-md"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}