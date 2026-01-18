# AI Configuration Guide

This project includes a smart AI configuration system with automatic fallback between multiple providers.

## Environment Variables

Add these API keys to your `.env.local` file or Vercel environment variables:

\`\`\`bash
# Primary AI Provider (recommended)
OPENAI_API_KEY=sk-proj-your_openai_api_key_here

# Backup AI Provider
DEEPSEEK_API_KEY=sk-your_deepseek_api_key_here

# Fallback AI Provider (already configured)
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

## Priority Order

The system tries providers in this order:
1. **OpenAI** (primary) - Best quality, reliable
2. **DeepSeek** (backup) - Cost-effective, good performance
3. **Gemini** (fallback) - Fast and efficient

## Usage Examples

### Simple Text Generation

\`\`\`typescript
import { generateAIText } from '@/lib/actions/ai-helpers'

const text = await generateAIText('Write a brief description of Mumbai')
\`\`\`

### Streaming Text

\`\`\`typescript
import { streamAIText } from '@/lib/actions/ai-helpers'

const { output } = await streamAIText('Tell me about real estate trends')
\`\`\`

### API Endpoint

\`\`\`bash
# Check configured providers
curl http://localhost:3000/api/ai/generate

# Generate text
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Describe a property in Mumbai"}'
\`\`\`

## How Fallback Works

1. System tries to use OpenAI first
2. If OpenAI fails (API error, rate limit, etc.), automatically switches to DeepSeek
3. If DeepSeek also fails, falls back to Gemini
4. If all providers fail, returns an error

The fallback is **automatic** and **transparent** - your code doesn't need to handle provider switching.

## Getting API Keys

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and add to `.env.local` as `OPENAI_API_KEY`

### DeepSeek
1. Go to https://platform.deepseek.com/api_keys
2. Create a new API key
3. Copy and add to `.env.local` as `DEEPSEEK_API_KEY`

### Gemini (Already Configured)
- Your Gemini API key is already set up

## Checking Configuration

To see which providers are configured:

\`\`\`typescript
import { getConfiguredProviders, hasAIProvider } from '@/lib/ai-config'

const providers = getConfiguredProviders()
console.log('Available providers:', providers)

if (hasAIProvider()) {
  console.log('✓ AI is ready to use')
}
\`\`\`

## Cost Optimization

- OpenAI: Best for production, $0.15-$0.60 per 1M tokens
- DeepSeek: Most cost-effective, ~$0.28 per 1M tokens
- Gemini: Free tier available, $0.15 per 1M tokens

The system automatically falls back to cheaper options if the primary fails, helping you optimize costs.
