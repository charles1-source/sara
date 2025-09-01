"use client"

import React, { useState } from "react"

// Add custom window interface to fix TypeScript error
declare global {
  interface Window {
    __chatInitialized?: boolean;
  }
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, GraduationCap, Sparkles, RotateCcw } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Load chat history from localStorage when component mounts
  React.useEffect(() => {
    let isMounted = true;
    
    // Function to initialize chat
    const initializeChat = () => {
      try {
        const savedHistory = localStorage.getItem("chatHistory")
        if (savedHistory && isMounted) {
          const parsedHistory = JSON.parse(savedHistory) as Message[]
          if (parsedHistory.length > 0) {
            setMessages(parsedHistory)
            setShowQuickActions(false)
          }
        }
        // Mark initialization as complete if component is still mounted
        if (isMounted) {
          setIsInitialized(true)
        }
      } catch (error) {
        console.error("Error loading chat history:", error)
        if (isMounted) {
          setIsInitialized(true)
        }
      }
    }
    
    // Initialize chat after a short delay to ensure stable rendering
    const timeoutId = setTimeout(initializeChat, 100);
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    }
  }, [])

  const quickActions = [
    "How do I enroll for next semester?",
    "What documents do I need for graduation?",
    "How can I request my transcript?",
    "What are the prerequisites for Computer Science courses?",
    "When is the enrollment period?",
    "How do I check my grades?",
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, customMessage?: string) => {
    e.preventDefault()
    const messageContent = customMessage || input
    if (!messageContent.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setShowQuickActions(false)

    try {
      // Keep track of conversation history for context
      const conversationHistory = [...messages, userMessage]
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationHistory.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseText = await response.text()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
      }

      // Update messages and save to localStorage atomically
      setMessages((prev) => {
        const updatedMessages = [...prev, assistantMessage];
        // Save conversation to local storage for persistence
        try {
          localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
        } catch (error) {
          console.error("Error saving chat history:", error);
        }
        return updatedMessages;
      })
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again or contact the registrar office directly at (053) 570-2303 / Local 104.",
      }
      
      // Update messages and save to localStorage atomically, even for errors
      setMessages((prev) => {
        const updatedMessages = [...prev, errorMessage];
        try {
          localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
        } catch (storageError) {
          console.error("Error saving error message to chat history:", storageError);
        }
        return updatedMessages;
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (question: string) => {
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent
    handleSubmit(syntheticEvent, question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#ffc500]/10 to-[#7ebb15]/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:text-white transition-colors duration-300">
          <CardHeader className="bg-gradient-to-r from-[#7ebb15] to-[#ffc500] dark:from-[#7ebb15] dark:to-[#ffc500] text-white rounded-t-xl relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7ebb15]/20 to-[#ffc500]/20 backdrop-blur-sm"></div>
            <div className="relative flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/30">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold tracking-tight">SARA</CardTitle>
                <p className="text-blue-100 font-medium">Student Academic Registration Assistant</p>
                <p className="text-blue-200/80 text-sm mt-1">
                  Saint Joseph College Registrar Office • Maasin City, Southern Leyte
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // Clear messages and reset state
                    setMessages([])
                    setShowQuickActions(true)
                    setIsLoading(false)
                    
                    // Clear localStorage
                    try {
                      localStorage.removeItem("chatHistory")
                    } catch (error) {
                      console.error("Error clearing chat history:", error)
                    }
                  }}
                  className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                  title="New conversation"
                >
                  <RotateCcw className="h-5 w-5 text-white" />
                  <span className="sr-only">New conversation</span>
                </Button>
                <ThemeToggle />
                <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Online • AI</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm dark:border-gray-700 transition-colors duration-300">
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] p-6">
              {isInitialized && messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="relative mb-6 inline-block">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#7ebb15] to-[#ffc500] rounded-3xl flex items-center justify-center shadow-lg">
                      <Bot className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ffc500] rounded-full flex items-center justify-center shadow-md">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Welcome to SARA! 👋</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed transition-colors duration-300">
                    I'm here to help you with registration, enrollment, and academic requirements.
                  </p>

                  {showQuickActions && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 justify-center">
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-1 transition-colors duration-300"></div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-full transition-colors duration-300">
                          Popular Questions
                        </p>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-1 transition-colors duration-300"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="lg"
                            className="text-left justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-[#7ebb15]/10 hover:to-[#ffc500]/10 dark:hover:from-gray-700 dark:hover:to-gray-700 border-gray-200 dark:border-gray-700 hover:border-[#ffc500] dark:hover:border-[#ffc500] bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
                            onClick={() => handleQuickAction(action)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#7ebb15] rounded-full mt-2 group-hover:bg-[#7ebb15] transition-colors"></div>
                              <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                                {action}
                              </span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {!isInitialized && (
                <div className="flex justify-center items-center h-full">
                  <div className="flex flex-col items-center">
                    <div className="flex space-x-2 items-center mb-4">
                      <div className="w-3 h-3 bg-[#7ebb15] rounded-full animate-bounce"></div>
                      <div
                        className="w-3 h-3 bg-[#ffc500] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-[#7ebb15] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Loading your conversation...</span>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 mb-6 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="bg-gradient-to-br from-[#7ebb15] to-[#ffc500] flex-shrink-0 shadow-lg border-2 border-white">
                      <AvatarFallback className="bg-transparent">
                        <Bot className="h-5 w-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-[#7ebb15] to-[#ffc500] text-white ml-auto shadow-lg"
                        : "bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-gray-800 dark:text-gray-100 shadow-md"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed font-medium">{message.content}</p>
                  </div>

                  {message.role === "user" && (
                    <Avatar className="bg-gradient-to-br from-gray-500 to-gray-600 flex-shrink-0 shadow-lg border-2 border-white">
                      <AvatarFallback className="bg-transparent">
                        <User className="h-5 w-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 mb-6">
                  <Avatar className="bg-gradient-to-br from-[#7ebb15] to-[#ffc500] flex-shrink-0 shadow-lg border-2 border-white">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="h-5 w-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl px-4 py-3 shadow-md transition-colors duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-2 items-center">
                                              <div className="w-2.5 h-2.5 bg-[#7ebb15] rounded-full animate-bounce"></div>
                      <div
                        className="w-2.5 h-2.5 bg-[#ffc500] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2.5 h-2.5 bg-[#7ebb15] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 italic ml-2">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>

            <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-6 rounded-b-xl transition-colors duration-300">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about enrollment, grades, requirements..."
                    className="pr-4 pl-4 py-3 border-gray-200 dark:border-gray-700 focus:border-[#7ebb15] dark:focus:border-[#7ebb15] focus:ring-2 focus:ring-[#ffc500]/20 dark:focus:ring-[#ffc500]/20 rounded-xl bg-white dark:bg-gray-700 dark:text-white shadow-sm text-sm transition-colors duration-300"
                    disabled={isLoading}
                  />
                </div>
                                  <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-[#7ebb15] to-[#ffc500] hover:from-[#7ebb15] hover:to-[#ffc500] hover:brightness-95 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Office Hours: Monday-Friday 8:00 AM - 5:00 PM</span>
                </div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 transition-colors duration-300"></div>
                <span>Contact: (053) 570-8236</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">
            Powered by AI • Saint Joseph College Computer Studies Department
          </p>
        </div>
      </div>
    </div>
  )
}
