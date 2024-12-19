"use client"

import * as React from "react"
import { Bookmark, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionCardProps {
  question: {
    id: string
    text: string
    type: "multiple_choice" | "short_answer" | "radio" | "checkbox"
    options?: string[]
  }
  onDelete: (id: string) => void
  onTypeChange: (id: string, type: string) => void
  onQuestionChange: (id: string, text: string) => void
  onAnswerChange: (id: string, answer: string) => void
}

export function QuestionCard({
  question,
  onDelete,
  onTypeChange,
  onQuestionChange,
  onAnswerChange,
}: QuestionCardProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false)

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Input
            value={question.text}
            onChange={(e) => onQuestionChange(question.id, e.target.value)}
            className="h-auto border-none bg-gray-100 p-3 text-base font-medium shadow-none focus-visible:ring-0"
          />
          <Select
            value={question.type}
            onValueChange={(value) => onTypeChange(question.id, value)}
          >
            <SelectTrigger className="w-[160px] border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple_choice">Multiple choice</SelectItem>
              <SelectItem value="short_answer">Short answers</SelectItem>
              <SelectItem value="radio">Radio</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pl-4">
          {question.type === "multiple_choice" ? (
            <RadioGroup
              onValueChange={(value) => onAnswerChange(question.id, value)}
              className="space-y-3"
            >
              {["Yes", "No", "Maybe"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                  <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Input
              placeholder="Short-answer Text"
              className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 shadow-none focus-visible:ring-0"
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
            />
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark
              className={cn(
                "h-4 w-4",
                isBookmarked && "fill-current text-primary"
              )}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(question.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

