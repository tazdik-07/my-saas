import RecentReviews from "./components/RecentReviews";
import DoctorDashboardClient from "./DoctorDashboardClient";

async function getRecentReviews() {
  // Simulate fetching data from a database
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      patientName: "Alice Wonderland",
      rating: 5,
      comment: "Dr. White was incredibly thorough and empathetic. Highly recommend!",
      date: "2025-07-01",
    },
    {
      patientName: "Bob The Builder",
      rating: 4,
      comment: "Good experience overall. Wait time was a bit long, but the consultation was helpful.",
      date: "2025-06-28",
    },
    {
      patientName: "Charlie Chaplin",
      rating: 5,
      comment: "Excellent doctor! Very knowledgeable and made me feel at ease.",
      date: "2025-06-25",
    },
    {
      patientName: "Diana Ross",
      rating: 3,
      comment: "The diagnosis was accurate, but I felt a bit rushed during the appointment.",
      date: "2025-06-20",
    },
    {
      patientName: "Eve Harrington",
      rating: 5,
      comment: "Professional and caring. All my questions were answered clearly.",
      date: "2025-06-18",
    },
  ];
}

export default async function DashboardServer() {
  const recentReviews = await getRecentReviews();

  return <DoctorDashboardClient recentReviews={recentReviews} />;
}
