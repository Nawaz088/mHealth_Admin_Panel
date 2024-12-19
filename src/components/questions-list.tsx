"use client"

import * as React from "react"
import { DragHandleDots2Icon } from "@radix-ui/react-icons"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd"

import { Button } from "@/components/ui/button"

interface Question {
  id: string
  text: string
}

export function QuestionsList({
  questions,
  onReorder,
  onDelete,
  onEdit,
}: {
  questions: Question[]
  onReorder: (questions: Question[]) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(questions)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onReorder(items)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center justify-between rounded-lg border bg-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-move opacity-50 hover:opacity-100"
                      >
                        <DragHandleDots2Icon className="h-5 w-5" />
                      </div>
                      <span>{question.text}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(question.id)}
                        className="bg-delete_gray w-[80px] h-[40px] rounded-3xl text-edit_gray"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(question.id)}
                        className="bg-edit_gray w-[80px] h-[40px] rounded-3xl text-delete_gray"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

