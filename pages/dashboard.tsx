"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { TaskList } from "@/components/task-list"
import { transcribeAudio, extractTasks } from "@/lib/ai-service"

export default function DashboardPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcesing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [tasks, setTasks] = useState<any[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = localStorage.getItem("echopilot-tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        processAudio(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      toast({
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true)
    try {
      // Simulate transcription with Whisper API
      const transcriptText = await transcribeAudio(audioBlob)
      setTranscript(transcriptText)

      // Extract tasks using AI
      const extractedTasks = await extractTasks(transcriptText)

      // Add tasks to state and localStorage
      const newTasks = [...tasks, ...extractedTasks]
      setTasks(newTasks)
      localStorage.setItem("echopilot-tasks", JSON.stringify(newTasks))

      toast({
        title: "Tasks Added",
        description: `Successfully added ${extractedTasks.length} tasks to your day.`,
      })
    } catch (error) {
      console.error("Error processing audio:", error)
      toast({
        title: "Processing Error",
        description: "There was an error processing your recording. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Record Your Day</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Voice Recorder</CardTitle>
            <CardDescription>Speak your tasks and we'll organize them for you</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="relative mb-8">
              <div
                className={`absolute -inset-4 rounded-full ${isRecording ? "animate-pulse bg-red-100" : "bg-purple-100"}`}
              ></div>
              <Button
                size="lg"
                className={`relative h-24 w-24 rounded-full ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"}`}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcesing}
              >
                {isProcesing ? (
                  <Loader2 className="h-12 w-12 animate-spin text-white" />
                ) : isRecording ? (
                  <MicOff className="h-12 w-12 text-white" />
                ) : (
                  <Mic className="h-12 w-12 text-white" />
                )}
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500">
              {isRecording
                ? "Recording... Click to stop"
                : isProcesing
                  ? "Processing your recording..."
                  : "Click to start recording your tasks"}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col">
            {transcript && (
              <div className="w-full p-4 bg-gray-50 rounded-lg mb-4">
                <p className="text-sm font-medium mb-1">Transcript:</p>
                <p className="text-sm text-gray-600">{transcript}</p>
              </div>
            )}
            <p className="text-xs text-gray-500">
              Example: "Meeting with product team at 11 AM. Finish React module by 4 PM. Gym at 7."
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>Your tasks for today</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList tasks={tasks} setTasks={setTasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
