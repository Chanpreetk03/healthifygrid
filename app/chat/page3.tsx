"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/scroll-area"
import { Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your HealthifyGrid AI assistant. I can help you with questions about harmonics, power quality, TDD/THD calculations, and regulatory compliance. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (in a real app, you'd call your AI API here)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(userMessage.content),
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Simple response generator (replace with actual AI integration)
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("harmonic") || input.includes("thd") || input.includes("tdd")) {
      return "Harmonics are distortions in electrical waveforms that can cause equipment damage and efficiency losses. THD (Total Harmonic Distortion) measures voltage distortion, while TDD (Total Demand Distortion) measures current distortion relative to maximum demand. Would you like me to explain how to calculate these values or discuss mitigation techniques?"
    }

    if (input.includes("filter") || input.includes("mitigation")) {
      return "There are several harmonic mitigation techniques available:\n\n1. **Passive Filters**: Cost-effective LC filters for specific harmonics\n2. **Active Filters**: Advanced electronic filters that can adapt to changing conditions\n3. **Hybrid Filters**: Combination of passive and active technologies\n4. **Multi-pulse Converters**: Reduce harmonics at the source\n\nWhich type would you like to learn more about?"
    }

    if (input.includes("pserc") || input.includes("regulation") || input.includes("penalty")) {
      return "PSERC (Punjab State Electricity Regulatory Commission) has specific regulations regarding harmonic limits. Exceeding these limits can result in penalties. The permissible TDD limits depend on your Isc/Il ratio according to IEEE 519 standards. Would you like me to help you check your compliance status using our advisory tool?"
    }

    if (input.includes("calculate") || input.includes("cost")) {
      return "I can help you understand the costs associated with harmonics:\n\n• **Energy Losses**: Additional losses in transformers and cables\n• **Equipment Damage**: Reduced lifespan of electrical equipment\n• **Regulatory Penalties**: Fines for exceeding harmonic limits\n• **Downtime Costs**: Production losses due to equipment failures\n\nWould you like to use our cost calculator to estimate these impacts for your system?"
    }

    if (input.includes("hello") || input.includes("hi") || input.includes("help")) {
      return "Hello! I'm here to help you with power quality and harmonics-related questions. I can assist with:\n\n• Understanding harmonics and their effects\n• TDD/THD calculations and compliance\n• Harmonic mitigation strategies\n• Regulatory requirements and penalties\n• Cost analysis of harmonic impacts\n\nWhat specific topic would you like to explore?"
    }

    return "Thank you for your question about power quality. While I specialize in harmonics, TDD/THD, and power quality management, I'd be happy to help you find the right resources. You can also explore our Knowledge Hub for detailed tutorials and case studies, or use our calculators for specific analysis. What specific aspect of power quality are you interested in?"
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">HealthifyGrid AI Assistant</h1>
          <p className="text-xl text-muted-foreground">
            Get instant help with harmonics, power quality, and regulatory compliance
          </p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5 text-primary" />
              Chat with AI Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-secondary" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about harmonics, TDD/THD, regulations, or power quality..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              This AI assistant can help with power quality topics. For complex technical issues, consider consulting
              with our experts.
            </p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setInput("How do I calculate TDD for my system?")}
          >
            <h3 className="font-medium mb-2">Calculate TDD</h3>
            <p className="text-sm text-muted-foreground">Learn how to calculate Total Demand Distortion</p>
          </Card>

          <Card
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setInput("What are the best harmonic mitigation techniques?")}
          >
            <h3 className="font-medium mb-2">Mitigation Techniques</h3>
            <p className="text-sm text-muted-foreground">Explore harmonic filtering solutions</p>
          </Card>

          <Card
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setInput("What are PSERC penalty regulations?")}
          >
            <h3 className="font-medium mb-2">PSERC Regulations</h3>
            <p className="text-sm text-muted-foreground">Understand compliance requirements</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
