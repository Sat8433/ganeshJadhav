/**
 * API Route for AI text generation
 * Example endpoint showing how to use the AI configuration system
 */

import { type NextRequest, NextResponse } from "next/server"
import { generateAIText } from "@/lib/actions/ai-helpers"
import { getConfiguredProviders } from "@/lib/ai-config"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Check if any AI provider is configured
    const providers = getConfiguredProviders()
    if (providers.length === 0) {
      return NextResponse.json(
        {
          error: "No AI provider configured",
          message: "Please add OPENAI_API_KEY, DEEPSEEK_API_KEY, or GEMINI_API_KEY to environment variables",
        },
        { status: 503 },
      )
    }

    // Generate text with automatic fallback
    const text = await generateAIText(prompt)

    return NextResponse.json({
      text,
      providers: providers, // Show which providers are available
    })
  } catch (error) {
    console.error("[v0] AI generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate text", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET() {
  const providers = getConfiguredProviders()

  return NextResponse.json({
    configured: providers.length > 0,
    providers,
    message:
      providers.length === 0
        ? "No AI providers configured. Add OPENAI_API_KEY, DEEPSEEK_API_KEY, or GEMINI_API_KEY to environment variables."
        : `${providers.length} AI provider(s) configured: ${providers.join(", ")}`,
  })
}
