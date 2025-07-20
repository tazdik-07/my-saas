"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function ProfileEditor() {
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    specialty: "Cardiologist",
    clinicName: "City Heart Clinic",
    bio: "Experienced cardiologist with a passion for patient care.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // Here you would typically send data to your backend API
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-[#1c2434] border border-gray-700/50 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="bg-[#0b1220] border-gray-700 text-white mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="bg-[#0b1220] border-gray-700 text-white mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            className="bg-[#0b1220] border-gray-700 text-white mt-1"
            disabled
          />
        </div>
        <div>
          <Label htmlFor="specialty" className="text-gray-300">Specialty</Label>
          <Input
            id="specialty"
            name="specialty"
            value={profile.specialty}
            onChange={handleChange}
            className="bg-[#0b1220] border-gray-700 text-white mt-1"
          />
        </div>
        <div>
          <Label htmlFor="clinicName" className="text-gray-300">Clinic Name</Label>
          <Input
            id="clinicName"
            name="clinicName"
            value={profile.clinicName}
            onChange={handleChange}
            className="bg-[#0b1220] border-gray-700 text-white mt-1"
          />
        </div>
        <div>
          <Label htmlFor="bio" className="text-gray-300">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="bg-[#0b1220] border-gray-700 text-white mt-1"
            rows={4}
          />
        </div>
        <Button type="submit" className="btn-primary w-full">Save Changes</Button>
      </form>
    </div>
  );
}