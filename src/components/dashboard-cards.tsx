"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Database,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "Active users this month",
  },
  {
    title: "Database Queries",
    value: "1.2M",
    change: "+8.2%",
    trend: "up",
    icon: Database,
    description: "Queries executed today",
  },
  {
    title: "API Requests",
    value: "847K",
    change: "-2.1%",
    trend: "down",
    icon: Activity,
    description: "Requests in last 24h",
  },
  {
    title: "Revenue",
    value: "$24,567",
    change: "+15.3%",
    trend: "up",
    icon: TrendingUp,
    description: "Monthly recurring revenue",
  },
];

export function DashboardCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant={stat.trend === "up" ? "default" : "destructive"}
                className={`text-xs ${
                  stat.trend === "up"
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                {stat.change}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
