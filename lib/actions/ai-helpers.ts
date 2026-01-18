"use server"

/**
 * Server-side AI helper functions
 * Provides easy-to-use functions for AI operations with automatic fallback
 */

import { generateText, streamText } from "ai"
import { createStreamableValue } from "@ai-sdk/rsc"
import { withAIFallback, getPrimaryAIConfig, getModelString } from "@/lib/ai-config"

/**
 * Generate text using AI with automatic provider fallback
 */
export async function generateAIText(prompt: string): Promise<string> {
  const result = await withAIFallback(async (config) => {
    const { text } = await generateText({
      model: getModelString(config.provider, config.model),
      prompt,
      apiKey: config.apiKey,
    })
    return text
  })

  return result
}

/**
 * Stream text using AI with automatic provider fallback
 */
export async function streamAIText(prompt: string) {
  const stream = createStreamableValue("")

  const primaryConfig = getPrimaryAIConfig()

  if (!primaryConfig) {
    throw new Error("No AI provider configured")
  }
  ;(async () => {
    try {
      const { textStream } = await streamText({
        model: getModelString(primaryConfig.provider, primaryConfig.model),
        prompt,
        apiKey: primaryConfig.apiKey,
      })

      for await (const delta of textStream) {
        stream.update(delta)
      }

      stream.done()
    } catch (error) {
      console.error("[v0] Stream AI text error:", error)
      stream.error(error)
    }
  })()

  return { output: stream.value }
}

/**
 * Generate structured data using AI with automatic provider fallback
 */
export async function generateAIObject<T>(prompt: string, schema: any): Promise<T> {
  const result = await withAIFallback(async (config) => {
    const { generateObject } = await import("ai")
    const { object } = await generateObject({
      model: getModelString(config.provider, config.model),
      prompt,
      schema,
      apiKey: config.apiKey,
    })
    return object as T
  })

  return result
}
