"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDownIcon, ArrowUpIcon, CreditCard } from "lucide-react";
import { faker } from "@/lib/faker";
import { formatDate } from "@/lib/date-utils";

export default function WalletDashboard() {
  // In a real app, this would come from an API/database
  const [balance, setBalance] = useState(50000);
  
  // In a real app, this would come from an API call
  const transactions = generateTransactions();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card className="bg-gradient-to-br from-primary-foreground to-card">
          <CardHeader>
            <CardTitle className="text-xl">Your Wallet</CardTitle>
            <CardDescription>Manage your travel funds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-4 text-3xl font-bold">₹{balance.toFixed(2)}</h3>
              <p className="text-sm text-muted-foreground">Available Balance</p>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button className="w-full gap-2">
                <CreditCard className="h-4 w-4" />
                Add Money
              </Button>
              <Button variant="outline" className="w-full">
                History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Activity</CardTitle>
            <CardDescription>
              View your wallet transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="spent">Spent</TabsTrigger>
                <TabsTrigger value="added">Added</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </TabsContent>
              
              <TabsContent value="spent" className="space-y-4">
                {transactions
                  .filter((t) => t.type === "debit")
                  .map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
              </TabsContent>
              
              <TabsContent value="added" className="space-y-4">
                {transactions
                  .filter((t) => t.type === "credit")
                  .map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: any }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <div className={`rounded-full p-2 ${
          transaction.type === "credit" 
            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
        }`}>
          {transaction.type === "credit" ? (
            <ArrowDownIcon className="h-5 w-5" />
          ) : (
            <ArrowUpIcon className="h-5 w-5" />
          )}
        </div>
        <div>
          <p className="font-medium">{transaction.description}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(new Date(transaction.date))}
          </p>
        </div>
      </div>
      <div className={`text-right font-medium ${
        transaction.type === "credit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
      }`}>
        {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toFixed(2)}
      </div>
    </div>
  );
}

function generateTransactions() {
  const transactions = [];
  const now = new Date();
  
  // Initial credit
  transactions.push({
    id: faker.randomUUID(),
    type: "credit",
    amount: 50000,
    description: "Initial wallet balance",
    date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
  });
  
  // Some sample transactions
  for (let i = 0; i < 5; i++) {
    // Random amounts for flight bookings
    const amount = 2000 + Math.floor(Math.random() * 1000);
    
    transactions.push({
      id: faker.randomUUID(),
      type: "debit",
      amount,
      description: `Flight booking: ${faker.generateBookingReference()}`,
      date: new Date(now.getTime() - i * 3 * 24 * 60 * 60 * 1000),
    });
    
    // Add some credits too
    if (i % 2 === 0) {
      transactions.push({
        id: faker.randomUUID(),
        type: "credit",
        amount: 5000 + Math.floor(Math.random() * 5000),
        description: "Wallet recharge",
        date: new Date(now.getTime() - (i * 3 + 1) * 24 * 60 * 60 * 1000),
      });
    }
  }
  
  // Sort by date, newest first
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}