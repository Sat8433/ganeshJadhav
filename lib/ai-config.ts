/**
 * AI API Configuration with Fallback System
 *
 * This module provides a smart API selection system that automatically
 * falls back to backup providers if the primary one fails.
 *
 * Priority order:
 * 1. Gemini (primary)
 * 2. DeepSeek (backup)
 * 3. OpenAI (final fallback)
 */

export const AI_PROVIDERS = {
  OPENAI: "openai",
  DEEPSEEK: "deepseek",
  GEMINI: "gemini",
} as const

export type AIProvider = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS]

interface AIConfig {
  provider: AIProvider
  model: string
  apiKey: string | undefined
}

/**
 * Get available AI configurations in priority order
 */
export function getAIConfigs(): AIConfig[] {
  const configs: AIConfig[] = []

  // Primary: Gemini (already configured)
  if (process.env.GEMINI_API_KEY) {
    configs.push({
      provider: AI_PROVIDERS.GEMINI,
      model: "gemini-1.5-flash", // Fast and efficient
      apiKey: process.env.GEMINI_API_KEY,
    })
  }

  // Backup: DeepSeek
  if (process.env.DEEPSEEK_API_KEY) {
    configs.push({
      provider: AI_PROVIDERS.DEEPSEEK,
      model: "deepseek-chat", // DeepSeek's main chat model
      apiKey: process.env.DEEPSEEK_API_KEY,
    })
  }

  // Final Fallback: OpenAI
  if (process.env.OPENAI_API_KEY) {
    configs.push({
      provider: AI_PROVIDERS.OPENAI,
      model: "gpt-4o-mini", // Fast and cost-effective
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  return configs
}

/**
 * Get the primary AI configuration
 */
export function getPrimaryAIConfig(): AIConfig | null {
  const configs = getAIConfigs()
  return configs[0] || null
}

/**
 * Get model string for AI SDK
 * Format: "provider/model-name"
 */
export function getModelString(provider: AIProvider, model: string): string {
  return `${provider}/${model}`
}

/**
 * Try multiple AI providers with automatic fallback
 */
export async function withAIFallback<T>(
  operation: (config: AIConfig) => Promise<T>,
  onProviderSwitch?: (provider: AIProvider, error: Error) => void,
): Promise<T> {
  const configs = getAIConfigs()

  if (configs.length === 0) {
    throw new Error(
      "No AI API keys configured. Please add OPENAI_API_KEY, DEEPSEEK_API_KEY, or GEMINI_API_KEY to environment variables.",
    )
  }

  let lastError: Error | null = null

  for (let i = 0; i < configs.length; i++) {
    const config = configs[i]

    try {
      console.log(`[v0] Attempting AI request with ${config.provider}`)
      const result = await operation(config)

      if (i > 0) {
        console.log(`[v0] Successfully fell back to ${config.provider} after ${i} failed attempt(s)`)
      }

      return result
    } catch (error) {
      lastError = error as Error
      console.error(`[v0] ${config.provider} failed:`, error)

      if (onProviderSwitch && i < configs.length - 1) {
        onProviderSwitch(config.provider, error as Error)
      }

      // Continue to next provider
      continue
    }
  }

  // All providers failed
  throw new Error(`All AI providers failed. Last error: ${lastError?.message || "Unknown error"}`)
}

/**
 * Check which AI providers are configured
 */
export function getConfiguredProviders(): AIProvider[] {
  return getAIConfigs().map((config) => config.provider)
}

/**
 * Check if any AI provider is configured
 */
export function hasAIProvider(): boolean {
  return getAIConfigs().length > 0
}
