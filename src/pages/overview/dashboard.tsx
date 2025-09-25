import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { goldText } from "@/lib/colors";
import { CountryStats } from "@/components/pages/country-stats";
import { GoldPriceChart } from "@/components/pages/gold-price-chart";
import { WorldGoldMap } from "@/components/pages/world-map";

export default function Dashboard() {
  const [selectedCountry, _setSelectedCountry] = useState("United States");

  return (
    <div className="flex-1">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reserves">Reserves</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <CountryStats />

          <div className="grid gap-6 md:grid-cols-2">
            <GoldPriceChart />
            <Card>
              <CardHeader>
                <CardTitle className={goldText}>Global Gold Reserves</CardTitle>
                <CardDescription>
                  Click on a country to view detailed information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WorldGoldMap />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reserves">
          <Card>
            <CardHeader>
              <CardTitle>Gold Reserves Management</CardTitle>
              <CardDescription>
                Manage and track gold reserves for {selectedCountry}
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading">
          <Card>
            <CardHeader>
              <CardTitle>Trading Operations</CardTitle>
              <CardDescription>
                Monitor and manage gold trading operations
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
