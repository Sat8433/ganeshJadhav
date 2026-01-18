"use server"

import { createClient } from "@/lib/supabase/server"

export async function searchProperties(city: string, searchTerm: string) {
  const supabase = await createClient()

  // Use raw SQL query for reliable ILIKE pattern matching
  const { data, error, count } = await supabase
    .rpc("search_properties", {
      search_city: city,
      search_term: `%${searchTerm}%`,
    })
    .select("*", { count: "exact" })

  return { data, error, count }
}
