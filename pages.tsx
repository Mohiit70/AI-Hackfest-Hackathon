import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Calendar, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 border-b">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-purple-600" />
            <h1 className="text-xl font-bold">EchoPilot.AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Your voice-powered personal assistant
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Speak your tasks, get reminders, and chat with your day. No typing. No clutter. Just speak, and let
                  your AI handle the rest.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button className="px-8">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline" className="px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex justify-center">
                <div className="relative w-full max-w-[400px] aspect-square">
                  <div className="absolute inset-0 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
                  <div className="relative bg-white border rounded-xl shadow-lg p-6 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mic className="h-5 w-5 text-purple-600" />
                        <h3 className="font-medium">Morning Voice Log</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        "Meeting with product team at 11 AM. Finish React module by 4 PM. Gym at 7."
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <h3 className="font-medium">Smart Reminders</h3>
                      </div>
                      <p className="text-sm text-gray-500">"It's 10:45 AM – get ready for your product meeting."</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                        <h3 className="font-medium">Evening Chat</h3>
                      </div>
                      <p className="text-sm text-gray-500">"What did I do today?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  EchoPilot.AI makes managing your day effortless with three simple steps
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-12 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Mic className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Morning Flow</h3>
                <p className="text-gray-500">
                  Speak your day plan. Our AI converts your speech to text and extracts tasks, timings, and categories.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">During the Day</h3>
                <p className="text-gray-500">
                  Receive smart reminders for your tasks, keeping you on track and productive throughout the day.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Night Flow</h3>
                <p className="text-gray-500">
                  Chat with your data to get a summary of your day, completed tasks, and suggestions for tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-8 md:text-left">
          <p className="text-sm text-gray-500">© 2025 EchoPilot.AI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
