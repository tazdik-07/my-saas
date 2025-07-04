"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";

export default function NotificationsDrawer({
  notifications = [
    { id: 1, message: "New appointment with John Doe", time: "2 hours ago" },
    { id: 2, message: "Your profile was updated", time: "1 day ago" },
    { id: 3, message: "Payment received from Jane Smith", time: "3 days ago" },
  ],
  isCollapsed = false,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-lg text-gray-300 hover:text-white hover:bg-gray-700 relative">
          <Bell className={`h-6 w-6 ${!isCollapsed ? "mr-3" : ""}`} />
          <span className={isCollapsed ? "hidden" : ""}>Notifications</span>
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-gray-900 bg-red-500" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] bg-gray-800 text-gray-100 border-l border-gray-700">
        <SheetHeader>
          <SheetTitle className="text-gray-100">Notifications</SheetTitle>
          <SheetDescription className="text-gray-400">
            You have {notifications.length} unread notifications.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No new notifications.</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="p-4 bg-gray-700 rounded-md shadow-sm">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            ))
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Button onClick={() => setOpen(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
