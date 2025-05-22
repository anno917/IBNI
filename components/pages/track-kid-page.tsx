"use client"

import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Info,
  BookOpen,
  UserCheck,
  Calendar,
  HeartPulse,
  CreditCard,
  Bell,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageTitle } from "@/components/ui/page-title"

// Dashboard Tab Component
const DashboardTab = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  label: string
  icon: React.ElementType
  isActive: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}
    aria-current={isActive ? "page" : undefined}
  >
    <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
    {label}
  </button>
)

// Dashboard Sections
const OverviewSection = ({ studentData }: { studentData: any }) => {
  const grades = studentData.grades || {}
  const subjects = Object.keys(grades)
  const totalPoints = subjects.reduce((sum, subj) => sum + (grades[subj]?.overall || 0), 0)
  const gpa = subjects.length > 0 ? (totalPoints / subjects.length).toFixed(1) : "N/A"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 !pt-4">
          <p>
            <strong>Overall GPA:</strong> {gpa} / 10.0
          </p>
          <p>
            <strong>Current Grade Level:</strong> {studentData.gradeLevel}
          </p>
          <p>
            <strong>School:</strong> {studentData.school}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 !pt-4">
          <Button variant="link" className="p-0 h-auto justify-start">
            View Full Gradebook
          </Button>
          <br />
          <Button variant="link" className="p-0 h-auto justify-start">
            Check Upcoming Events
          </Button>
          <br />
          <Button variant="link" className="p-0 h-auto justify-start">
            View Attendance Record
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

const GradebookSection = ({ grades }: { grades: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>Grade Book (Overall)</CardTitle>
    </CardHeader>
    <CardContent className="!pt-4">
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Subject
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Overall Grade (/10)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(grades).map(([subject, data]: [string, any]) => (
              <tr key={subject} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{subject}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {data?.overall?.toFixed(1) ?? "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">*Click subject for detailed breakdown (feature not implemented).</p>
    </CardContent>
  </Card>
)

const AttendanceSection = ({ attendance }: { attendance: any }) => {
  const { present = 0, absent = 0, excused = 0, total = 0 } = attendance || {}
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Summary</CardTitle>
      </CardHeader>
      <CardContent className="!pt-4">
        <div className="flex flex-wrap justify-around text-center mb-6 gap-4">
          <div>
            <p className="text-2xl font-bold text-green-600">{present}</p>
            <p className="text-sm text-gray-500">Present</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{absent}</p>
            <p className="text-sm text-gray-500">Absent</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">{excused}</p>
            <p className="text-sm text-gray-500">Excused</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{total}</p>
            <p className="text-sm text-gray-500">Total Days</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-500 h-4 rounded-full text-center text-white text-xs font-medium leading-4 transition-width duration-500"
            style={{ width: `${percentage}%` }}
            aria-valuenow={Number(percentage)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {Number(percentage) > 5 && `${percentage}%`}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">Overall Attendance: {percentage}%</p>
      </CardContent>
    </Card>
  )
}

const ScheduleSection = ({ schedule }: { schedule: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Today's Class Schedule</CardTitle>
    </CardHeader>
    <CardContent className="!pt-4">
      {schedule && schedule.length > 0 ? (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Teacher
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.time}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.subject}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No schedule available for today.</p>
      )}
    </CardContent>
  </Card>
)

const EventsSection = ({ events }: { events: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Events</CardTitle>
    </CardHeader>
    <CardContent className="!pt-4">
      {events && events.length > 0 ? (
        <ul className="space-y-3">
          {events.map((event, index) => (
            <li key={index} className="border-b pb-3 last:border-b-0">
              <p className="font-medium flex justify-between items-center">
                {event.name}
                <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded ml-2">{event.type}</span>
              </p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No upcoming events.</p>
      )}
    </CardContent>
  </Card>
)

// Mock Data
const generateMockGrades = (subjects: string[]) => {
  const grades: Record<string, any> = {}
  subjects.forEach((subject) => {
    grades[subject] = {
      overall: Number.parseFloat((Math.random() * 3 + 7).toFixed(1)),
      assignments: [
        { name: "Assignment 1", score: Math.floor(Math.random() * 4 + 7) },
        { name: "Assignment 2", score: Math.floor(Math.random() * 4 + 7) },
        { name: "Midterm Test", score: Number.parseFloat((Math.random() * 3 + 7).toFixed(1)) },
      ],
    }
  })
  return grades
}

const commonSubjects = ["Mathematics", "Science", "English", "History", "Art"]

const mockKidsData = [
  {
    id: "kid1",
    name: "Alex Johnson",
    gradeLevel: "5th Grade",
    school: "Oakwood Elementary",
    personalDetails: {
      dob: "2015-03-10",
      gender: "Male",
      photoUrl: "https://placehold.co/100x100/e0f2fe/0891b2?text=AJ",
    },
    attendance: {
      present: 65,
      absent: 3,
      excused: 1,
      total: 69,
    },
    grades: generateMockGrades(commonSubjects),
    schedule: [
      { time: "9:00 AM", subject: "Mathematics", teacher: "Mr. Smith" },
      { time: "10:00 AM", subject: "Science Lab", teacher: "Ms. Davis" },
      { time: "11:00 AM", subject: "English", teacher: "Mx. Doe" },
      { time: "1:00 PM", subject: "History", teacher: "Ms. Jones" },
      { time: "2:00 PM", subject: "Art", teacher: "Mr. Lee" },
    ],
    events: [
      { date: "2025-04-15", name: "School Science Fair", type: "School Event" },
      { date: "2025-04-22", name: "Parent-Teacher Conferences", type: "Meeting" },
      { date: "2025-05-01", name: "Field Trip to Museum", type: "Class Event" },
    ],
  },
  {
    id: "kid2",
    name: "Mia Williams",
    gradeLevel: "7th Grade",
    school: "Maple Middle School",
    personalDetails: {
      dob: "2013-07-22",
      gender: "Female",
      photoUrl: "https://placehold.co/100x100/fce7f3/db2777?text=MW",
    },
    attendance: {
      present: 68,
      absent: 1,
      excused: 0,
      total: 69,
    },
    grades: generateMockGrades(["Algebra", "Biology", "Literature", "World History", "Music"]),
    schedule: [
      { time: "8:30 AM", subject: "Algebra", teacher: "Ms. Green" },
      { time: "9:30 AM", subject: "Literature", teacher: "Mr. Brown" },
      { time: "10:30 AM", subject: "Biology", teacher: "Dr. White" },
      { time: "11:30 AM", subject: "Music", teacher: "Ms. Black" },
      { time: "1:30 PM", subject: "World History", teacher: "Mr. Grey" },
    ],
    events: [
      { date: "2025-04-20", name: "Middle School Band Concert", type: "School Event" },
      { date: "2025-04-22", name: "Parent-Teacher Conferences", type: "Meeting" },
    ],
  },
]

export default function TrackKidPage() {
  const [selectedKidId, setSelectedKidId] = useState(mockKidsData[0]?.id || null)
  const [activeTab, setActiveTab] = useState("overview")

  const selectedKidData = mockKidsData.find((kid) => kid.id === selectedKidId)

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "gradebook", label: "Grade Book", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: UserCheck },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "health", label: "Health", icon: HeartPulse },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "events", label: "Events", icon: Bell },
    { id: "enrollment", label: "Enrollment", icon: FileText },
    { id: "reports", label: "Report Cards", icon: GraduationCap },
  ]

  const handleKidChange = (value: string) => {
    setSelectedKidId(value)
    setActiveTab("overview")
  }

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <PageTitle title="Parent Dashboard" icon={Users} />
        {mockKidsData.length > 1 && (
          <div className="w-full sm:w-64">
            <label htmlFor="kid-select" className="block text-sm font-medium text-gray-700 mb-1 sr-only">
              Select Child:
            </label>
            <Select value={selectedKidId || ""} onValueChange={handleKidChange}>
              <SelectTrigger id="kid-select" aria-label="Select Child" placeholder="Select a child...">
                <SelectValue placeholder="Select a child..." />
              </SelectTrigger>
              <SelectContent>
                {mockKidsData.map((kid) => (
                  <SelectItem key={kid.id} value={kid.id}>
                    {kid.name} ({kid.gradeLevel})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {!selectedKidData ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-gray-500">Please select a child to view their dashboard.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardContent className="p-4 flex items-center gap-4">
              <img
                src={selectedKidData.personalDetails.photoUrl || "/placeholder.svg"}
                alt={`${selectedKidData.name}'s profile picture`}
                className="w-16 h-16 rounded-full border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src = "https://placehold.co/100x100/cccccc/ffffff?text=IMG"
                }}
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{selectedKidData.name}</h2>
                <p className="text-sm text-gray-600">
                  {selectedKidData.gradeLevel} - {selectedKidData.school}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-1 overflow-x-auto pb-px">
              {tabs.map((tab) => (
                <DashboardTab
                  key={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && <OverviewSection studentData={selectedKidData} />}
              {activeTab === "gradebook" && <GradebookSection grades={selectedKidData.grades} />}
              {activeTab === "attendance" && <AttendanceSection attendance={selectedKidData.attendance} />}
              {activeTab === "schedule" && <ScheduleSection schedule={selectedKidData.schedule} />}
              {activeTab === "events" && <EventsSection events={selectedKidData.events} />}
              {activeTab === "health" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Health Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Health information is not available in this demo.</p>
                  </CardContent>
                </Card>
              )}
              {activeTab === "billing" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Billing information is not available in this demo.</p>
                  </CardContent>
                </Card>
              )}
              {activeTab === "enrollment" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Enrollment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Enrollment information is not available in this demo.</p>
                  </CardContent>
                </Card>
              )}
              {activeTab === "reports" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Report Cards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Report cards are not available in this demo.</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </section>
  )
}
