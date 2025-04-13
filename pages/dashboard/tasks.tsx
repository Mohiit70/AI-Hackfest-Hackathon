"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = localStorage.getItem("echopilot-tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return task.completed
    if (activeTab === "pending") return !task.completed
    return task.category === activeTab
  })

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      <Card>
        <CardHeader>
          <CardTitle>Task Manager</CardTitle>
          <CardDescription>View and manage all your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <TaskList tasks={filteredTasks} setTasks={setTasks} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
