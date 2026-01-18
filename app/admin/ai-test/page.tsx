"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react"

interface TestResult {
  provider: string
  success: boolean
  response?: string
  error?: string
  duration?: number
}

export default function AITestPage() {
  const [prompt, setPrompt] = useState("Describe Mumbai in one sentence.")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [configuredProviders, setConfiguredProviders] = useState<string[]>([])

  const checkConfiguration = async () => {
    try {
      const response = await fetch("/api/ai/generate")
      const data = await response.json()
      setConfiguredProviders(data.providers || [])
    } catch (error) {
      console.error("Failed to check configuration:", error)
    }
  }

  const testAI = async () => {
    setLoading(true)
    setResults([])

    try {
      const startTime = Date.now()
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const duration = Date.now() - startTime
      const data = await response.json()

      if (response.ok) {
        setResults([
          {
            provider: data.providers?.[0] || "Unknown",
            success: true,
            response: data.text,
            duration,
          },
        ])
      } else {
        setResults([
          {
            provider: "All",
            success: false,
            error: data.error || "Unknown error",
            duration,
          },
        ])
      }
    } catch (error) {
      setResults([
        {
          provider: "All",
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Check configuration on mount
  useState(() => {
    checkConfiguration()
  })

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Configuration Test</h1>
        <p className="text-muted-foreground">
          Test your AI providers and verify the fallback system is working correctly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configured Providers</CardTitle>
          <CardDescription>Current AI providers available in your environment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {configuredProviders.length > 0 ? (
              configuredProviders.map((provider, index) => (
                <Badge key={provider} variant={index === 0 ? "default" : "secondary"} className="text-sm">
                  {index === 0 && "Primary: "}
                  {index === 1 && "Backup: "}
                  {index === 2 && "Fallback: "}
                  {provider}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-sm">
                No providers configured
              </Badge>
            )}
          </div>

          <Alert className="mt-4">
            <Sparkles className="h-4 w-4" />
            <AlertDescription>
              Fallback order: <strong>Gemini</strong> → <strong>DeepSeek</strong> → <strong>OpenAI</strong>
            </AlertDescription>
          </Alert>

          <Button onClick={checkConfiguration} variant="outline" size="sm" className="mt-4 bg-transparent">
            Refresh Configuration
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test AI Generation</CardTitle>
          <CardDescription>Enter a prompt to test the AI providers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Prompt</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              rows={3}
              className="resize-none"
            />
          </div>

          <Button onClick={testAI} disabled={loading || !prompt.trim()} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Test AI Generation
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>Response from AI providers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {result.success ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium capitalize">{result.provider}</span>
                  </div>
                  {result.duration && (
                    <Badge variant="outline" className="text-xs">
                      {result.duration}ms
                    </Badge>
                  )}
                </div>

                {result.success ? (
                  <div className="p-3 bg-muted rounded text-sm whitespace-pre-wrap">{result.response}</div>
                ) : (
                  <Alert variant="destructive">
                    <AlertDescription>{result.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Environment Variables</h4>
            <p className="text-sm text-muted-foreground">
              Make sure you've added these keys to your Vercel environment variables (Vars section):
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>
                <code className="bg-muted px-1 rounded">GEMINI_API_KEY</code> - Primary provider
              </li>
              <li>
                <code className="bg-muted px-1 rounded">DEEPSEEK_API_KEY</code> - Backup provider
              </li>
              <li>
                <code className="bg-muted px-1 rounded">OPENAI_API_KEY</code> - Final fallback
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">How Fallback Works</h4>
            <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
              <li>System tries Gemini first (primary)</li>
              <li>If Gemini fails, automatically switches to DeepSeek</li>
              <li>If DeepSeek fails, falls back to OpenAI</li>
              <li>If all fail, returns an error</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
