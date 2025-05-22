"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageTitle } from "@/components/ui/page-title"
import { Button } from "@/components/ui/button"
import {
  Users,
  GraduationCap,
  Building,
  User,
  Search,
  BookOpen,
  Calendar,
  ShoppingBag,
  Heart,
  ArrowRight,
} from "lucide-react"

interface UserGuidePageProps {
  userType?: "parent" | "student" | "teacher" | "institution" | "general"
  navigateTo?: (page: string) => void
}

export default function UserGuidePage({ userType = "general", navigateTo }: UserGuidePageProps) {
  const [activeTab, setActiveTab] = useState<string>(userType !== "general" ? userType : "parent")

  const guideContent = {
    parent: {
      title: "Parent's Guide",
      icon: Users,
      description: "Learn how to use IBNI to support your child's education journey.",
      sections: [
        {
          title: "Finding Schools and Teachers",
          content:
            "Use our advanced search and filtering tools to find the perfect school or teacher for your child. Compare options side by side and read reviews from other parents.",
          image: "/placeholder.svg?height=200&width=400&text=Finding+Schools",
        },
        {
          title: "Tracking Your Child's Progress",
          content:
            "Monitor your child's academic performance, attendance, and upcoming assignments all in one place. Receive notifications about important events and deadlines.",
          image: "/placeholder.svg?height=200&width=400&text=Tracking+Progress",
        },
        {
          title: "Managing Courses",
          content:
            "View all courses your child is enrolled in, track their progress, and communicate directly with teachers through our messaging system.",
          image: "/placeholder.svg?height=200&width=400&text=Managing+Courses",
        },
        {
          title: "Using the IBNI Store",
          content:
            "Purchase educational resources, books, and supplies through our integrated store. Find materials specifically recommended for your child's courses.",
          image: "/placeholder.svg?height=200&width=400&text=IBNI+Store",
        },
      ],
      faqs: [
        {
          question: "How do I add another child to my account?",
          answer:
            "Go to your account settings and select 'Add Child'. You'll need to provide basic information about your child and link their student account if they already have one.",
        },
        {
          question: "Can I communicate with my child's teachers through IBNI?",
          answer:
            "Yes, you can message teachers directly from your child's course page or from the teacher's profile page. You can also schedule virtual meetings through our platform.",
        },
        {
          question: "How do I receive notifications about my child's performance?",
          answer:
            "Go to Settings > Notifications and customize which alerts you want to receive. You can get notifications for grades, attendance, upcoming assignments, and more.",
        },
        {
          question: "Can I see what assignments my child has due?",
          answer:
            "Yes, the Track Progress page shows all upcoming assignments, their due dates, and completion status for each of your children.",
        },
      ],
    },
    student: {
      title: "Student's Guide",
      icon: GraduationCap,
      description: "Maximize your learning potential with IBNI tools and resources.",
      sections: [
        {
          title: "Finding Learning Resources",
          content:
            "Discover schools, teachers, and courses that match your interests and learning goals. Use filters to narrow down options based on subject, location, and ratings.",
          image: "/placeholder.svg?height=200&width=400&text=Finding+Resources",
        },
        {
          title: "Tracking Your Progress",
          content:
            "Monitor your grades, attendance, and achievements. Set goals and track your improvement over time with visual progress charts.",
          image: "/placeholder.svg?height=200&width=400&text=Progress+Tracking",
        },
        {
          title: "Managing Your Courses",
          content:
            "Access all your course materials, assignments, and schedules in one place. Submit assignments and receive feedback directly through the platform.",
          image: "/placeholder.svg?height=200&width=400&text=Course+Management",
        },
        {
          title: "Connecting with Teachers",
          content:
            "Communicate with your teachers, ask questions, and request additional help when needed. Schedule one-on-one sessions for personalized guidance.",
          image: "/placeholder.svg?height=200&width=400&text=Teacher+Connection",
        },
        {
          title: "Using the IBNI Store",
          content:
            "Access educational materials, digital resources, and study tools through our integrated store. Find recommended materials for your courses and enjoy student discounts on select items.",
          image: "/placeholder.svg?height=200&width=400&text=IBNI+Store+for+Students",
        },
      ],
      faqs: [
        {
          question: "How do I submit an assignment?",
          answer:
            "Navigate to your course page, find the assignment, and click 'Submit'. You can upload files or type your response directly in the text editor provided.",
        },
        {
          question: "Can I access IBNI on my mobile device?",
          answer:
            "Yes, IBNI is fully responsive and works on smartphones and tablets. You can also download our mobile app for iOS and Android for an optimized experience.",
        },
        {
          question: "How do I join a virtual class session?",
          answer:
            "Go to your course page at the scheduled time and click the 'Join Class' button that appears. Make sure your camera and microphone are working properly.",
        },
        {
          question: "Can I see my improvement over time?",
          answer:
            "Yes, the Track Progress page includes historical data and trend analysis so you can see how your performance has changed over weeks, months, or the entire academic year.",
        },
      ],
    },
    teacher: {
      title: "Teacher's Guide",
      icon: User,
      description: "Tools and resources to enhance your teaching and student engagement.",
      sections: [
        {
          title: "Managing Your Classes",
          content:
            "Create and organize classes, add students, and set up course materials. Track attendance and manage your teaching schedule efficiently.",
          image: "/placeholder.svg?height=200&width=400&text=Class+Management",
        },
        {
          title: "Creating Assignments",
          content:
            "Design assignments, quizzes, and exams with our easy-to-use tools. Set due dates, grading criteria, and provide resources for students.",
          image: "/placeholder.svg?height=200&width=400&text=Creating+Assignments",
        },
        {
          title: "Tracking Student Performance",
          content:
            "Monitor individual and class-wide performance with detailed analytics. Identify students who may need additional support.",
          image: "/placeholder.svg?height=200&width=400&text=Performance+Tracking",
        },
        {
          title: "Communicating with Parents and Students",
          content:
            "Use our messaging system to keep parents informed and engage with students outside of class time. Schedule virtual meetings when needed.",
          image: "/placeholder.svg?height=200&width=400&text=Communication",
        },
        {
          title: "Using the IBNI Store",
          content:
            "Browse and purchase teaching resources, classroom materials, and professional development tools. Create wishlists for your classroom and share recommended resources with your students.",
          image: "/placeholder.svg?height=200&width=400&text=IBNI+Store+for+Teachers",
        },
      ],
      faqs: [
        {
          question: "How do I create a new class?",
          answer:
            "Go to the 'Manage Classes' section and click 'Create New Class'. Fill in the class details, add your syllabus, and then invite students using their email addresses or student IDs.",
        },
        {
          question: "Can I import my existing assignments and materials?",
          answer:
            "Yes, IBNI supports importing content from common formats like PDF, Word, Google Docs, and more. You can also integrate with Google Classroom and other LMS platforms.",
        },
        {
          question: "How do I grade assignments?",
          answer:
            "Navigate to the assignment in your class page, click 'View Submissions', and you'll see all student work. You can provide grades and feedback directly on the platform.",
        },
        {
          question: "Can I identify students who are struggling?",
          answer:
            "Yes, our analytics dashboard highlights students whose performance is declining or who have missed multiple assignments, helping you provide timely intervention.",
        },
      ],
    },
    institution: {
      title: "Institution's Guide",
      icon: Building,
      description: "Comprehensive tools for school management and educational excellence.",
      sections: [
        {
          title: "Managing Your School Profile",
          content:
            "Create and maintain your school's public profile with detailed information about programs, facilities, faculty, and achievements to attract prospective students and parents.",
          image: "/placeholder.svg?height=200&width=400&text=School+Profile",
        },
        {
          title: "Administering Classes and Teachers",
          content:
            "Organize your school's academic structure, assign teachers to classes, and monitor teaching quality and student satisfaction across all departments.",
          image: "/placeholder.svg?height=200&width=400&text=Administration",
        },
        {
          title: "Tracking School-Wide Performance",
          content:
            "Access comprehensive analytics on attendance, grades, and other key performance indicators. Compare results across classes, subjects, and academic years.",
          image: "/placeholder.svg?height=200&width=400&text=Performance+Analytics",
        },
        {
          title: "Managing Enrollment and Admissions",
          content:
            "Streamline your admissions process, manage applications, conduct interviews, and handle enrollment all through our integrated platform.",
          image: "/placeholder.svg?height=200&width=400&text=Enrollment",
        },
        {
          title: "Using the IBNI Store",
          content:
            "Order school supplies, educational materials, and technology in bulk with institutional discounts. Manage procurement, track orders, and distribute resources to departments and classrooms efficiently.",
          image: "/placeholder.svg?height=200&width=400&text=IBNI+Store+for+Institutions",
        },
      ],
      faqs: [
        {
          question: "How do I add teachers to our school account?",
          answer:
            "Go to 'Manage Staff' in your dashboard and select 'Add Teacher'. You can invite teachers via email or create accounts for them directly. Assign them to departments and classes as needed.",
        },
        {
          question: "Can we customize the platform to match our school branding?",
          answer:
            "Yes, premium institutional accounts can customize colors, logos, and certain interface elements to align with your school's branding guidelines.",
        },
        {
          question: "How do we handle parent-teacher conferences through IBNI?",
          answer:
            "Use the 'Events' module to schedule conference days, allow parents to book time slots with specific teachers, and send automated reminders to all participants.",
        },
        {
          question: "Can we generate reports for accreditation purposes?",
          answer:
            "Yes, IBNI offers comprehensive reporting tools that can generate documentation needed for various accreditation processes and regulatory compliance.",
        },
      ],
    },
  }

  const currentGuide = guideContent[activeTab as keyof typeof guideContent]
  const GuideIcon = currentGuide.icon

  return (
    <div className="container mx-auto py-12 px-4 relative" style={{ isolation: "isolate" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <PageTitle title="User Guide" icon={BookOpen} className="text-green-600" />
      </motion.div>

      {/* Fallback Tab Navigation Buttons */}
      <div className="mb-4 relative z-[300]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setActiveTab("parent")}
            className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "parent" ? "bg-green-600 text-white" : "bg-green-50 text-gray-700 hover:bg-green-100"}`}
          >
            <Users className="h-4 w-4" /> <span className="whitespace-nowrap">Parents</span>
          </button>
          <button
            onClick={() => setActiveTab("student")}
            className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "student" ? "bg-green-600 text-white" : "bg-green-50 text-gray-700 hover:bg-green-100"}`}
          >
            <GraduationCap className="h-4 w-4" /> <span className="whitespace-nowrap">Students</span>
          </button>
          <button
            onClick={() => setActiveTab("teacher")}
            className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "teacher" ? "bg-green-600 text-white" : "bg-green-50 text-gray-700 hover:bg-green-100"}`}
          >
            <User className="h-4 w-4" /> <span className="whitespace-nowrap">Teachers</span>
          </button>
          <button
            onClick={() => setActiveTab("institution")}
            className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "institution" ? "bg-green-600 text-white" : "bg-green-50 text-gray-700 hover:bg-green-100"}`}
          >
            <Building className="h-4 w-4" /> <span className="whitespace-nowrap">Institutions</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <GuideIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">{currentGuide.title}</CardTitle>
                <CardDescription>{currentGuide.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {currentGuide.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                  >
                    <div className={index % 2 === 1 ? "md:order-2" : ""}>
                      <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                      <p className="text-gray-600">{section.content}</p>
                    </div>
                    <div className={index % 2 === 1 ? "md:order-1" : ""}>
                      <img
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        className="rounded-lg shadow-md w-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {currentGuide.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="link" className="w-full justify-start p-0 h-auto">
                <Search className="h-4 w-4 mr-2" /> Search the knowledge base
              </Button>
              <Button variant="link" className="w-full justify-start p-0 h-auto">
                <Calendar className="h-4 w-4 mr-2" /> Schedule a training session
              </Button>
              <Button variant="link" className="w-full justify-start p-0 h-auto">
                <BookOpen className="h-4 w-4 mr-2" /> Video tutorials
              </Button>
              <Button variant="link" className="w-full justify-start p-0 h-auto">
                <ShoppingBag className="h-4 w-4 mr-2" /> IBNI store guide
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-green-50 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold">Need more help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is available to assist you with any questions or issues you may encounter.
              </p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={() => navigateTo?.("contact-us")}
              >
                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


