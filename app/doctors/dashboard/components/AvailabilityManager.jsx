"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle, LoaderCircle } from "lucide-react";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AvailabilityManager() {
  const { id: doctorId } = useParams();
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/doctors/${doctorId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch doctor availability");
        }
        const data = await res.json();
        setAvailability(data.doctor.availability || {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchAvailability();
    }
  }, [doctorId]);

  const handleDayToggle = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day] && prev[day].length > 0 ? [] : ["09:00-17:00"], // Default slot or clear
    }));
  };

  const handleSlotChange = (day, index, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: (prev[day] || []).map((slot, i) => (i === index ? value : slot)),
    }));
  };

  const handleAddSlot = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), ""], // Add an empty slot
    }));
  };

  const handleRemoveSlot = (day, index) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/doctors/${doctorId}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availability }),
      });

      if (!res.ok) {
        throw new Error("Failed to save availability");
      }

      alert("Availability saved successfully!");
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("Failed to save availability.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 text-gray-100 rounded-xl shadow-lg border border-gray-600">
        <CardHeader>
          <CardTitle>Availability Manager</CardTitle>
          <CardDescription>Set your consultation hours for each day.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-48">
            <LoaderCircle className="animate-spin w-8 h-8" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 text-gray-100 rounded-xl shadow-lg border border-gray-600">
      <CardHeader>
        <CardTitle>Availability Manager</CardTitle>
        <CardDescription>Set your consultation hours for each day.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weekdays.map((day) => (
            <div key={day} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={(availability[day] || []).length > 0}
                  onCheckedChange={() => handleDayToggle(day)}
                  className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                />
                <Label htmlFor={day} className="text-lg font-medium">
                  {day}
                </Label>
              </div>
              {(availability[day] || []).length > 0 && (
                <div className="ml-6 space-y-2">
                  {(availability[day] || []).map((slot, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={slot}
                        onChange={(e) => handleSlotChange(day, index, e.target.value)}
                        placeholder="e.g., 09:00-13:00, 14:00-17:00"
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSlot(day, index)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSlot(day)}
                    className="bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Slot
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button onClick={handleSave} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white">
          Save Availability
        </Button>
      </CardContent>
    </Card>
  );
}
