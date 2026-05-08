"use client";

import { useState } from "react";
import { useRegion } from "@/contexts/RegionContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ROICalculator() {
  const { currency, exchangeRate } = useRegion();
  const [dailyFuel, setDailyFuel] = useState<number>(1000); // e.g. liters of diesel
  const [dieselPrice, setDieselPrice] = useState<number>(1.2); // price per liter in USD
  const [gasPrice, setGasPrice] = useState<number>(0.5); // price per m3 in USD

  const [savings, setSavings] = useState<{ monthly: number, yearly: number } | null>(null);

  const calculateSavings = () => {
    // Simplified Mock Logic:
    // Assume 1L Diesel ~ 1m3 Gas in energy, but gas boiler is 10% more efficient
    const dailyDieselCost = dailyFuel * (dieselPrice * exchangeRate);

    // Gas volume needed (factor in efficiency)
    const dailyGasVolume = dailyFuel * 0.9;
    const dailyGasCost = dailyGasVolume * (gasPrice * exchangeRate);

    const dailySavings = dailyDieselCost - dailyGasCost;

    setSavings({
      monthly: dailySavings * 30,
      yearly: dailySavings * 365
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-12 border-border shadow-sm">
      <CardHeader className="bg-muted/50 border-b">
        <CardTitle className="text-2xl text-primary">ROI & Fuel Efficiency Calculator</CardTitle>
        <CardDescription>
          Compare your current diesel consumption against a Taiguo WNS Gas Boiler.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Daily Diesel Consumption (Liters)</label>
            <Input
              type="number"
              value={dailyFuel}
              onChange={(e) => setDailyFuel(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Diesel Price per Liter ({currency})</label>
            <Input
              type="number"
              value={dieselPrice * exchangeRate}
              onChange={(e) => setDieselPrice(Number(e.target.value) / exchangeRate)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Gas Price per m³ ({currency})</label>
            <Input
              type="number"
              value={gasPrice * exchangeRate}
              onChange={(e) => setGasPrice(Number(e.target.value) / exchangeRate)}
            />
          </div>
        </div>

        <Button
          className="w-full mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
          onClick={calculateSavings}
        >
          Calculate Projected Savings
        </Button>

        {savings && (
          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h4 className="text-lg font-semibold text-primary mb-2">Projected Savings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Savings</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(savings.monthly)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Yearly Savings</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(savings.yearly)}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">* Estimates based on 95% WNS Gas Boiler efficiency vs standard 85% Diesel.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
