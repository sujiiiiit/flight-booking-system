import WalletDashboard from "@/components/wallet/wallet-dashboard";

export default function WalletPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">My Wallet</h1>
      <WalletDashboard />
    </div>
  );
}