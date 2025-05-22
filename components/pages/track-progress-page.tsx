"use client"

import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  GraduationCap,
  BookOpen,
  BarChart,
  Calendar,
  Clock,
  Award,
  Star,
  TrendingUp,
  FileText,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { PageTitle } from "@/components/ui/page-title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Progress Card Component
const ProgressCard = ({
  title,
  value,
  maxValue,
  percentage,
  icon: Icon,
  color,
}: {
  title: string
  value: number
  maxValue: number
  percentage: number
  icon: React.ElementType
  color: string
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-gray-500">/ {maxValue}</span>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
    </CardContent>
  </Card>
)

// Achievement Card Component
const AchievementCard = ({
  title,
  date,
  description,
  icon: Icon,
  color,
}: {
  title: string
  date: string
  description: string
  icon: React.ElementType
  color: string
}) => (
  <Card className="overflow-hidden">
    <div className={`h-2 ${color}`}></div>
    <CardContent className="pt-6">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${color.replace("text-", "bg-").replace("600", "100")}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-sm mt-1">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Course Progress Card Component
const CourseProgressCard = ({
  title,
  subject,
  progress,
  lastActivity,
  imageUrl,
}: {
  title: string
  subject: string
  progress: number
  lastActivity: string
  imageUrl: string
}) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <div className="h-32 overflow-hidden">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Course+Image"
        }}
      />
    </div>
    <CardContent className="p-4">
      <Badge variant="outline" className="mb-2">
        {subject}
      </Badge>
      <h3 className="font-medium mb-2 line-clamp-2">{title}</h3>
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <p className="text-xs text-gray-500 mt-2 flex items-center">
        <Clock className="w-3 h-3 mr-1" /> Last activity: {lastActivity}
      </p>
    </CardContent>
    <CardFooter className="px-4 py-3 bg-gray-50 border-t">
      <Button variant="ghost" size="sm" className="w-full">
        Continue Learning
      </Button>
    </CardFooter>
  </Card>
)

// Mock Data
const mockStudentData = {
  name: "Jamie Smith",
  grade: "10th Grade",
  school: "Westview High School",
  overallGPA: 8.7,
  totalCredits: 45,
  requiredCredits: 120,
  attendanceRate: 95,
  completedCourses: 15,
  enrolledCourses: 5,
  totalCourses: 40,
  studyHours: 120,
  targetHours: 200,
  upcomingAssignments: [
    {
      title: "Physics Lab Report",
      dueDate: "2025-04-18",
      subject: "Physics",
      status: "In Progress",
    },
    {
      title: "Literature Essay",
      dueDate: "2025-04-20",
      subject: "English",
      status: "Not Started",
    },
    {
      title: "Calculus Problem Set",
      dueDate: "2025-04-22",
      subject: "Mathematics",
      status: "In Progress",
    },
  ],
  recentGrades: [
    {
      assignment: "Biology Quiz",
      grade: "9.5/10",
      date: "2025-04-10",
      subject: "Biology",
    },
    {
      assignment: "History Presentation",
      grade: "18/20",
      date: "2025-04-08",
      subject: "History",
    },
    {
      assignment: "Algebra Test",
      grade: "85/100",
      date: "2025-04-05",
      subject: "Mathematics",
    },
  ],
  achievements: [
    {
      title: "Perfect Attendance",
      date: "April 2025",
      description: "Maintained 100% attendance for the month of April",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Honor Roll",
      date: "Q1 2025",
      description: "Achieved honor roll status for the first quarter",
      icon: Award,
      color: "text-amber-600",
    },
    {
      title: "Science Fair Winner",
      date: "March 2025",
      description: "First place in the regional science fair competition",
      icon: Star,
      color: "text-blue-600",
    },
  ],
  activeCourses: [
    {
      title: "Advanced Physics: Mechanics and Thermodynamics",
      subject: "Physics",
      progress: 65,
      lastActivity: "Yesterday",
      imageUrl: "https://placehold.co/600x400/e0f2fe/0891b2?text=Physics",
    },
    {
      title: "World Literature: Modern Classics",
      subject: "English",
      progress: 42,
      lastActivity: "3 days ago",
      imageUrl: "https://placehold.co/600x400/fef2f2/ef4444?text=Literature",
    },
    {
      title: "Calculus II: Integration Techniques",
      subject: "Mathematics",
      progress: 78,
      lastActivity: "Today",
      imageUrl: "https://placehold.co/600x400/ecfdf5/10b981?text=Calculus",
    },
    {
      title: "U.S. History: Post-Civil War Era",
      subject: "History",
      progress: 30,
      lastActivity: "1 week ago",
      imageUrl: "https://placehold.co/600x400/fff7ed/f97316?text=History",
    },
  ],
}

export default function TrackProgressPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="My Progress Dashboard" icon={GraduationCap} />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{mockStudentData.name}</h2>
              <p className="text-gray-600">
                {mockStudentData.grade} • {mockStudentData.school}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <BarChart className="w-4 h-4 mr-1" /> GPA: {mockStudentData.overallGPA}/10
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> Attendance: {mockStudentData.attendanceRate}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ProgressCard
                  title="Credits Earned"
                  value={mockStudentData.totalCredits}
                  maxValue={mockStudentData.requiredCredits}
                  percentage={Math.round((mockStudentData.totalCredits / mockStudentData.requiredCredits) * 100)}
                  icon={GraduationCap}
                  color="text-blue-600"
                />
                <ProgressCard
                  title="Courses Completed"
                  value={mockStudentData.completedCourses}
                  maxValue={mockStudentData.totalCourses}
                  percentage={Math.round((mockStudentData.completedCourses / mockStudentData.totalCourses) * 100)}
                  icon={BookOpen}
                  color="text-purple-600"
                />
                <ProgressCard
                  title="Study Hours"
                  value={mockStudentData.studyHours}
                  maxValue={mockStudentData.targetHours}
                  percentage={Math.round((mockStudentData.studyHours / mockStudentData.targetHours) * 100)}
                  icon={Clock}
                  color="text-green-600"
                />
                <ProgressCard
                  title="Attendance Rate"
                  value={mockStudentData.attendanceRate}
                  maxValue={100}
                  percentage={mockStudentData.attendanceRate}
                  icon={Calendar}
                  color="text-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mockStudentData.upcomingAssignments.map((assignment, index) => (
                        <li key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{assignment.title}</h4>
                            <Badge
                              variant={
                                assignment.status === "In Progress"
                                  ? "secondary"
                                  : assignment.status === "Not Started"
                                    ? "outline"
                                    : "default"
                              }
                            >
                              {assignment.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>{assignment.subject}</span>
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Assignments
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Grades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mockStudentData.recentGrades.map((grade, index) => (
                        <li key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{grade.assignment}</h4>
                            <span className="font-semibold text-blue-600">{grade.grade}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>{grade.subject}</span>
                            <span>{grade.date}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Grades
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockStudentData.activeCourses.map((course, index) => (
                  <CourseProgressCard
                    key={index}
                    title={course.title}
                    subject={course.subject}
                    progress={course.progress}
                    lastActivity={course.lastActivity}
                    imageUrl={course.imageUrl}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Book</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Subject
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Assignment
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Grade
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[...mockStudentData.recentGrades, ...mockStudentData.recentGrades].map((grade, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.assignment}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                              {grade.grade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockStudentData.achievements.map((achievement, index) => (
                  <AchievementCard
                    key={index}
                    title={achievement.title}
                    date={achievement.date}
                    description={achievement.description}
                    icon={achievement.icon}
                    color={achievement.color}
                  />
                ))}
                {/* Additional placeholder achievements */}
                <AchievementCard
                  title="Reading Challenge"
                  date="February 2025"
                  description="Completed 10 books in the monthly reading challenge"
                  icon={BookOpen}
                  color="text-purple-600"
                />
                <AchievementCard
                  title="Math Olympiad Finalist"
                  date="January 2025"
                  description="Qualified as a finalist in the regional Math Olympiad"
                  icon={TrendingUp}
                  color="text-indigo-600"
                />
                <AchievementCard
                  title="Essay Competition Winner"
                  date="December 2024"
                  description="First place in the national essay writing competition"
                  icon={FileText}
                  color="text-rose-600"
                />
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  )
}
