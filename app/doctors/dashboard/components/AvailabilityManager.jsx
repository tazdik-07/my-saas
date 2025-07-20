"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";

export function AvailabilityManager() {
  const [availability, setAvailability] = useState({
    isAvailable: true,
    resumeAppointmentsDate: "",
    dailyAvailability: {
      Monday: [{ start: "09:00", end: "13:00" }, { start: "14:00", end: "18:00" }],
      Tuesday: [{ start: "09:00", end: "13:00" }, { start: "14:00", end: "18:00" }],
      Wednesday: [],
      Thursday: [{ start: "09:00", end: "13:00" }, { start: "14:00", end: "18:00" }],
      Friday: [{ start: "09:00", end: "13:00" }, { start: "14:00", end: "18:00" }],
      Saturday: [],
      Sunday: [],
    },
    holidays: [{ date: "2025-12-25", reason: "Christmas" }],
  });

  const handleToggleAvailability = () => {
    setAvailability((prev) => ({ ...prev, isAvailable: !prev.isAvailable }));
  };

  const handleResumeDateChange = (e) => {
    setAvailability((prev) => ({ ...prev, resumeAppointmentsDate: e.target.value }));
  };

  const handleDailyAvailabilityChange = (day, index, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      dailyAvailability: {
        ...prev.dailyAvailability,
        [day]: prev.dailyAvailability[day].map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  const addTimeSlot = (day) => {
    setAvailability((prev) => ({
      ...prev,
      dailyAvailability: {
        ...prev.dailyAvailability,
        [day]: [...prev.dailyAvailability[day], { start: "", end: "" }],
      },
    }));
  };

  const removeTimeSlot = (day, index) => {
    setAvailability((prev) => ({
      ...prev,
      dailyAvailability: {
        ...prev.dailyAvailability,
        [day]: prev.dailyAvailability[day].filter((_, i) => i !== index),
      },
    }));
  };

  const handleHolidayChange = (index, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      holidays: prev.holidays.map((holiday, i) =>
        i === index ? { ...holiday, [field]: value } : holiday
      ),
    }));
  };

  const addHoliday = () => {
    setAvailability((prev) => ({ ...prev, holidays: [...prev.holidays, { date: "", reason: "" }] }));
  };

  const removeHoliday = (index) => {
    setAvailability((prev) => ({ ...prev, holidays: prev.holidays.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Availability updated:", availability);
    // Here you would typically send data to your backend API
    alert("Availability updated successfully!");
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="bg-[#1c2434] border border-gray-700/50 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Manage Availability</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAvailable"
              checked={availability.isAvailable}
              onCheckedChange={handleToggleAvailability}
              className="border-gray-500 data-[state=checked]:bg-teal-600"
            />
            <Label htmlFor="isAvailable" className="text-gray-300">Available for appointments</Label>
          </div>
          {!availability.isAvailable && (
            <div className="mt-4">
              <Label htmlFor="resumeDate" className="text-gray-300">Resume appointments on:</Label>
              <Input
                id="resumeDate"
                type="date"
                value={availability.resumeAppointmentsDate}
                onChange={handleResumeDateChange}
                className="bg-[#0b1220] border-gray-700 text-white mt-1"
              />
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Daily Time Slots</h4>
          {daysOfWeek.map((day) => (
            <div key={day} className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <h5 className="font-medium text-white mb-2">{day}</h5>
              {availability.dailyAvailability[day].map((slot, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="time"
                    value={slot.start}
                    onChange={(e) => handleDailyAvailabilityChange(day, index, "start", e.target.value)}
                    className="bg-[#0b1220] border-gray-700 text-white flex-1"
                  />
                  <span>-</span>
                  <Input
                    type="time"
                    value={slot.end}
                    onChange={(e) => handleDailyAvailabilityChange(day, index, "end", e.target.value)}
                    className="bg-[#0b1220] border-gray-700 text-white flex-1"
                  />
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeTimeSlot(day, index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addTimeSlot(day)} className="mt-2 border-gray-600 hover:bg-gray-700/50 hover:text-white">
                Add Slot
              </Button>
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Holidays</h4>
          {availability.holidays.map((holiday, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <Input
                type="date"
                value={holiday.date}
                onChange={(e) => handleHolidayChange(index, "date", e.target.value)}
                className="bg-[#0b1220] border-gray-700 text-white flex-1"
              />
              <Input
                type="text"
                placeholder="Reason"
                value={holiday.reason}
                onChange={(e) => handleHolidayChange(index, "reason", e.target.value)}
                className="bg-[#0b1220] border-gray-700 text-white flex-1"
              />
              <Button type="button" variant="destructive" size="sm" onClick={() => removeHoliday(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addHoliday} className="mt-2 border-gray-600 hover:bg-gray-700/50 hover:text-white">
            Add Holiday
          </Button>
        </div>

        <Button type="submit" className="btn-primary w-full">Save Availability</Button>
      </form>
    </div>
  );
}