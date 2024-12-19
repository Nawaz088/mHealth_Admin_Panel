"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell, CircleHelp, HelpCircle } from "lucide-react"

import { AppSidebar } from "@/components/sidebar"
import { QuestionsList } from "@/components/questions-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import initialQuestions from "@/constants/questions_list"
import axios from 'axios'



export default function Dashboard() {
  const [questions, setQuestions] = useState(initialQuestions)

  useEffect(() => {
    // Fetch questions data from an API 
    // and update the state with the fetched data
    const fetchQuestions = async () => {
      try {
        const config = {
          url: "https://n5c8g2p2-8000.inc1.devtunnels.ms/questions/",
          mathod: "get",
          headers: {
            "Content-type": "application/json",    
          }
        }
        await axios.request(config).then((response) => {
          setQuestions(response.data)
          console.log("??????????", response.data)

        }).catch((error) => {
          console.log("here is the axios catch",error)

        })
      } catch (error) {
        console.log("this is the try catch error", error)
      }
    }
    fetchQuestions();
  }, [])
  const handleReorder = (reorderedQuestions: typeof questions) => {
    setQuestions(reorderedQuestions)
  }

  const handleDelete = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log("Edit question:", id)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <header className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-8">
              <h1 className="text-[28px] font-semibold">Dashboard</h1>
              <Input
                placeholder="Search"
                className="w-[200px] lg:w-[300px] border-[1px] border-gray-950"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className=" bg-bg_gray rounded-full before:*:text-slate-600"
              >
                <CircleHelp className="h-full w-full text-white " />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <Bell className="h-7 w-7" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
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
          <main className="flex-1 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold font-sans">Questions</h2>
              <Button className="bg-sweet_corn font-sans font-semibold text-[14px]">
                <Link href="/questions">+ Add Questions</Link>
              </Button>
            </div>
            <QuestionsList
              questions={questions}
              onReorder={handleReorder}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

