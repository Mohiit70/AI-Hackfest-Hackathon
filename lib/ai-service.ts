export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  // In a real app, you would send the audio to Whisper API
  // For demo purposes, we'll return a mock response after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Meeting with product team at 11 AM. Finish React module by 4 PM. Gym at 7 PM.")
    }, 2000)
  })
}

// Simulate extracting tasks with AI
export async function extractTasks(transcript: string): Promise<any[]> {
  // In a real app, you would send the transcript to an LLM like GPT-4
  // For demo purposes, we'll parse the text manually

  // Simple parsing logic for demo
  const taskRegex = /(.*?)(at|by)\s+(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))/g
  const matches = [...transcript.matchAll(taskRegex)]

  const tasks = matches.map((match, index) => {
    const title = match[1].trim()
    const time = match[3].trim()

    // Determine category based on keywords
    let category = "personal"
    if (title.toLowerCase().includes("meeting") || title.toLowerCase().includes("react")) {
      category = "work"
    } else if (title.toLowerCase().includes("gym") || title.toLowerCase().includes("workout")) {
      category = "health"
    }

    return {
      id: Date.now() + index,
      title,
      time,
      category,
      completed: false,
    }
  })

  // If no tasks were extracted, create a default one
  if (tasks.length === 0 && transcript.length > 0) {
    tasks.push({
      id: Date.now(),
      title: transcript,
      category: "personal",
      completed: false,
    })
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks)
    }, 1000)
  })
}

// Simulate chatting with AI about your day
export async function chatWithDay(message: string, tasks: any[]): Promise<string> {
  // In a real app, you would send the message and tasks to an LLM
  // For demo purposes, we'll handle a few predefined questions

  const lowerMessage = message.toLowerCase()

  // Count completed and pending tasks
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = tasks.filter((task) => !task.completed).length

  // Get tasks by category
  const workTasks = tasks.filter((task) => task.category === "work")
  const personalTasks = tasks.filter((task) => task.category === "personal")
  const healthTasks = tasks.filter((task) => task.category === "health")

  if (lowerMessage.includes("what did i do today") || lowerMessage.includes("summary")) {
    return `Today you have ${tasks.length} tasks in total. You've completed ${completedTasks} tasks and have ${pendingTasks} tasks remaining. ${completedTasks > 0 ? "Great progress!" : "Let's get started on those tasks!"}`
  }

  if (lowerMessage.includes("completed") || lowerMessage.includes("finished")) {
    if (completedTasks === 0) {
      return "You haven't completed any tasks yet today. Let's change that!"
    }
    return `You've completed ${completedTasks} tasks today. ${completedTasks > 2 ? "Excellent work!" : "Keep going!"}`
  }

  if (lowerMessage.includes("pending") || lowerMessage.includes("remaining")) {
    if (pendingTasks === 0) {
      return "You've completed all your tasks for today. Great job!"
    }
    return `You have ${pendingTasks} tasks remaining for today. ${pendingTasks > 3 ? "Let's focus on getting those done!" : "You're almost there!"}`
  }

  if (lowerMessage.includes("work")) {
    return `You have ${workTasks.length} work-related tasks today. ${workTasks.filter((t) => t.completed).length} completed and ${workTasks.filter((t) => !t.completed).length} pending.`
  }

  if (lowerMessage.includes("personal")) {
    return `You have ${personalTasks.length} personal tasks today. ${personalTasks.filter((t) => t.completed).length} completed and ${personalTasks.filter((t) => !t.completed).length} pending.`
  }

  if (lowerMessage.includes("health") || lowerMessage.includes("gym")) {
    return `You have ${healthTasks.length} health-related tasks today. ${healthTasks.filter((t) => t.completed).length} completed and ${healthTasks.filter((t) => !t.completed).length} pending.`
  }

  if (lowerMessage.includes("next") || lowerMessage.includes("upcoming")) {
    const nextTask = tasks.find((task) => !task.completed)
    if (nextTask) {
      return `Your next task is "${nextTask.title}"${nextTask.time ? ` at ${nextTask.time}` : ""}.`
    } else {
      return "You've completed all your tasks for today. Time to relax!"
    }
  }

  // Default response
  return "I'm your EchoPilot assistant. You can ask me about your tasks, what you've completed, or what's coming up next. Try asking 'What did I do today?' or 'What's my next task?'"
}
