"use client";

import { Bell, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationsDrawer({ notifications }) {
  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 bg-[#0B1220] rounded-lg p-3 border border-gray-800">
              <Bell className="w-5 h-5 text-[#02c39a] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">{notification.type}</p>
                <p className="text-sm text-gray-300">{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No recent activity.</p>
      )}
    </div>
  );
}