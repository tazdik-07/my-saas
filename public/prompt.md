Build the backend logic for a doctor appointment queue tracking system using Node.js, Prisma ORM, and optionally WebSockets or Socket.io for real-time updates.

🏥 Overview:

Each doctor has a queue of appointments for the day.

Each appointment has a status: waiting, in_progress, done, or skipped.

Patients can view their position in the queue and get live updates.

Doctors can mark appointments as start, done, or skip.

🧠 What to implement:

Prisma schema models for Doctor, Patient, and AppointmentQueue.

A function to fetch today's queue for a doctor ordered by time/status.

A function to start a patient consultation (set status to in_progress), and auto-update others' positions.

A function to mark a consultation as done or skipped.

A query to fetch a patient’s current position in queue.

Estimated wait time calculation using average consultation duration.

Socket.io or pusher events for real-time updates to both doctor and patient clients.

💾 Prisma model example:
Suggest Prisma schema models that can support the above functionality, with proper relations and enums.

🎯 Note:

Prioritize real-time flow using events or polling.

Use mock values and test data for sample logic.