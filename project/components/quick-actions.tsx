"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, GraduationCap, BookOpen, CreditCard, Clock } from "lucide-react"

interface QuickActionsProps {
  onActionClick: (question: string) => void
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const actions = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Enrollment",
      question: "How do I enroll for the next semester?",
      color: "bg-blue-500",
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Graduation",
      question: "What are the requirements for graduation?",
      color: "bg-green-500",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Transcript",
      question: "How can I request my official transcript?",
      color: "bg-purple-500",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Schedule",
      question: "When is the enrollment period?",
      color: "bg-orange-500",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Grades",
      question: "How do I check my grades online?",
      color: "bg-red-500",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Requirements",
      question: "What documents do I need for enrollment?",
      color: "bg-indigo-500",
    },
  ]

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50 bg-transparent"
              onClick={() => onActionClick(action.question)}
            >
              <div className={`${action.color} text-white p-2 rounded-full`}>{action.icon}</div>
              <span className="text-sm font-medium">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
