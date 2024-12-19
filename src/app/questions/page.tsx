"use client";

import * as React from "react";
// import axios from "axios"
import { Plus, HelpCircle, Bell } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { QuestionCard } from "@/components/question-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";

interface Question {
  id: string;
  text: string;
  type: "multiple_choice" | "short_answer" | "radio" | "checkbox";
  answer?: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = React.useState<Question[]>([
    {
      id: uuidv4(),
      text: "Are you taking any medications, supplements, or herbal remedies?",
      type: "multiple_choice",
    },
    {
      id: uuidv4(),
      text: "Do you have any allergies?",
      type: "short_answer",
    },
    {
      id: uuidv4(),
      text: "Do you have any allergies?",
      type: "radio",
    },
    {
      id: uuidv4(),
      text: "Do you have any allergies?",
      type: "checkbox",
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        text: "New Question",
        type: "multiple_choice",
      },
    ]);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestionType = (id: string, type: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, type: type as "multiple_choice" | "short_answer" | "radio" | "checkbox"}
          : q
      )
    );
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const updateAnswer = (id: string, answer: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, answer } : q)));
  };

  const handleSubmit = async () => {
    try {
      // await axios.post("/api/questions", { questions })
      // Handle success (e.g., show toast, redirect, etc.)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Error submitting questions:", error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gray-50">
          <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <h1 className="text-xl font-semibold">Questions</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                    <span>Leona</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Add Questions</h2>
            </div>

            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onDelete={deleteQuestion}
                  onTypeChange={updateQuestionType}
                  onQuestionChange={updateQuestionText}
                  onAnswerChange={updateAnswer}
                />
              ))}
            </div>

            <div className="my-8 flex justify-center">
              <Button
                variant="outline"
                className="border-dashed w-full max-w-md"
                onClick={addQuestion}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                className="w-full max-w-md bg-[#ff6b6b] hover:bg-[#ff5252]"
              >
                Submit
              </Button>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
