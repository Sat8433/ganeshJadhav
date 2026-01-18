"use server"

import { createClient, createServiceRoleClient } from "@/lib/supabase/server"

export interface DemoRequestData {
  name: string
  email: string
  phone: string
  company: string
  role: string
  country: string
  message?: string
  consent: boolean
}

export async function submitDemoRequest(data: DemoRequestData) {
  try {
    const supabase = await createServiceRoleClient()

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.company || !data.role || !data.country) {
      return {
        success: false,
        error: "All required fields must be filled",
      }
    }

    if (!data.consent) {
      return {
        success: false,
        error: "You must agree to receive communications",
      }
    }

    console.log("[v0] Attempting to submit demo request for:", data.email)

    // Insert demo request into database
    const { data: demoRequest, error } = await supabase
      .from("demo_requests")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          role: data.role,
          country: data.country,
          message: data.message || "",
          consent: data.consent,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      })

      // Check if table doesn't exist
      if (error.message.includes("demo_requests") && error.code === "PGRST204") {
        return {
          success: false,
          error: "Database table not found. Please run the SQL script to create the demo_requests table first.",
        }
      }

      return {
        success: false,
        error: `Database error: ${error.message}`,
      }
    }

    console.log("[v0] Demo request submitted successfully:", demoRequest?.id)

    return {
      success: true,
      data: demoRequest,
    }
  } catch (error) {
    console.error("[v0] Unexpected error submitting demo request:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getDemoRequests() {
  try {
    const supabase = await createClient()

    const { data: demoRequests, error } = await supabase
      .from("demo_requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching demo requests:", error)
      return {
        success: false,
        error: "Failed to fetch demo requests",
      }
    }

    return {
      success: true,
      data: demoRequests,
    }
  } catch (error) {
    console.error("[v0] Unexpected error fetching demo requests:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

export async function updateDemoRequestStatus(id: string, status: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("demo_requests").update({ status }).eq("id", id).select().single()

    if (error) {
      console.error("[v0] Error updating demo request status:", error)
      return {
        success: false,
        error: "Failed to update demo request status",
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("[v0] Unexpected error updating demo request status:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}
