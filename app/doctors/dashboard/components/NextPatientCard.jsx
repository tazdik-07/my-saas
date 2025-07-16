"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const nextPatient = {
  name: "John Doe",
  initials: "JD",
  age: 35,
  id: "P12345",
  reason: "Follow-up on medication",
  visitType: "Virtual",
  waitTime: "15 min",
  avatarSrc: "/img/doctor-placeholder.png",
};

export default function NextPatientCard() {
  return (
    <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 border border-gray-600">
      <h2 className="text-2xl font-semibold text-gray-50 mb-4">Next Patient</h2>
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="h-16 w-16 border-2 border-blue-400">
          <AvatarImage src={nextPatient.avatarSrc} alt={nextPatient.name} />
          <AvatarFallback className="text-xl font-bold">{nextPatient.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold text-gray-50">{nextPatient.name}</h3>
          <p className="text-gray-400 text-sm">ID: {nextPatient.id} | Age: {nextPatient.age}</p>
          <p className="text-gray-400">{nextPatient.reason}</p>
          <div className="flex items-center mt-1">
            <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">{nextPatient.visitType}</span>
            <span className="bg-yellow-500 text-gray-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">Wait: {nextPatient.waitTime}</span>
          </div>
        </div>
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center">
        <CheckCircle className="h-5 w-5 mr-2" />
        Start Consultation
      </Button>
    </Card>
  );
}
