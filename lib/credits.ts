import { createClient } from "@/lib/supabase/server"

export interface CreditCheckResult {
  hasCredits: boolean
  currentCredits: number
  error?: string
}

export interface CreditDeductResult {
  success: boolean
  remainingCredits: number
  error?: string
}

/**
 * Check if user has available credits
 */
export async function checkUserCredits(userId: string): Promise<CreditCheckResult> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("credits").select("credits").eq("user_id", userId).single()

    if (error) {
      return {
        hasCredits: false,
        currentCredits: 0,
        error: error.message,
      }
    }

    return {
      hasCredits: (data?.credits ?? 0) > 0,
      currentCredits: data?.credits ?? 0,
    }
  } catch (error) {
    return {
      hasCredits: false,
      currentCredits: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Deduct credits from user account
 */
export async function deductCredit(userId: string, amount = 1): Promise<CreditDeductResult> {
  try {
    const supabase = await createClient()

    // First check current credits
    const { data: currentData, error: fetchError } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", userId)
      .single()

    if (fetchError) {
      return {
        success: false,
        remainingCredits: 0,
        error: fetchError.message,
      }
    }

    const currentCredits = currentData?.credits ?? 0

    if (currentCredits < amount) {
      return {
        success: false,
        remainingCredits: currentCredits,
        error: "Insufficient credits",
      }
    }

    // Deduct credits
    const { data: updatedData, error: updateError } = await supabase
      .from("credits")
      .update({ credits: currentCredits - amount })
      .eq("user_id", userId)
      .select("credits")
      .single()

    if (updateError) {
      return {
        success: false,
        remainingCredits: currentCredits,
        error: updateError.message,
      }
    }

    return {
      success: true,
      remainingCredits: updatedData?.credits ?? 0,
    }
  } catch (error) {
    return {
      success: false,
      remainingCredits: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Add credits to user account (for purchases or admin actions)
 */
export async function addCredits(userId: string, amount: number): Promise<CreditDeductResult> {
  try {
    const supabase = await createClient()

    // Get current credits
    const { data: currentData, error: fetchError } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", userId)
      .single()

    if (fetchError) {
      return {
        success: false,
        remainingCredits: 0,
        error: fetchError.message,
      }
    }

    const currentCredits = currentData?.credits ?? 0

    // Add credits
    const { data: updatedData, error: updateError } = await supabase
      .from("credits")
      .update({ credits: currentCredits + amount })
      .eq("user_id", userId)
      .select("credits")
      .single()

    if (updateError) {
      return {
        success: false,
        remainingCredits: currentCredits,
        error: updateError.message,
      }
    }

    return {
      success: true,
      remainingCredits: updatedData?.credits ?? 0,
    }
  } catch (error) {
    return {
      success: false,
      remainingCredits: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
