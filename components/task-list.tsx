"use client"

import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Task = {
  id: string
  title: string
  time?: string
  category: "work" | "personal" | "health"
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<any[]>>
}

export function TaskList({ tasks, setTasks }: TaskListProps) {
  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    setTasks(updatedTasks)
    localStorage.setItem("echopilot-tasks", JSON.stringify(updatedTasks))
  }

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    localStorage.setItem("echopilot-tasks", JSON.stringify(updatedTasks))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "personal":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "health":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-gray-500 mb-2">No tasks yet</p>
        <p className="text-sm text-gray-400">Record your voice to add tasks</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex items-start gap-3">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} className="mt-1" />
            <div>
              <p className={cn("font-medium", task.completed && "line-through text-gray-400")}>{task.title}</p>
              {task.time && <p className="text-sm text-gray-500">{task.time}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="h-8 w-8 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
