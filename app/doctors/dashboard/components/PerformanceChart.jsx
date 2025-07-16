"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";

export default function PerformanceChart() {
  const [performanceMetric, setPerformanceMetric] = useState("revenue");

  return (
    <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 border border-gray-600">
      <h2 className="text-2xl font-semibold text-gray-50 mb-4">7-Day Performance</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-medium">7-Day Performance</span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              performanceMetric === "revenue" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setPerformanceMetric("revenue")}
          >
            Revenue
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              performanceMetric === "volume" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setPerformanceMetric("volume")}
          >
            Volume
          </Button>
        </div>
      </div>
      <div className="h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
        <LineChart className="h-16 w-16 text-gray-500" />
        Sparkline Chart Placeholder
      </div>
    </Card>
  );
}
