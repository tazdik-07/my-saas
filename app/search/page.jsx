import SearchClient from "./SearchClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  
  // Only pass search parameters to client, let client handle data fetching
  // This prevents unnecessary server-side data fetching on initial load
  return <SearchClient searchParams={searchParams} />;
}
