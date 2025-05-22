"use client"

import { useState } from "react"
import {
  MapPin,
  Star,
  Heart,
  MessageSquare,
  Share2,
  ChevronRight,
  Check,
  Info,
  Phone,
  Mail,
  Calendar,
  Clock,
  Award,
  BookOpen,
  Briefcase,
  Users,
  FileText,
  Laptop,
  PlusCircle,
  Trash2,
  GraduationCap,
  School,
  Languages,
  Globe,
  User,
  Book,
  Bookmark,
  Download,
  Video,
  Paperclip,
  Layers,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Lightbulb,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

interface TeacherProfileKaziProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

export default function TeacherProfileKazi({ navigateTo, userType = "parent", showBackButton = false }: TeacherProfileKaziProps) {
  const [activeTab, setActiveTab] = useState("about")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)

  // Mock teacher data
  const teacher = {
    id: "teacher1",
    name: "Dr. Amina Kazi",
    subject: "Physics",
    rating: 4.9,
    reviewCount: 87,
    location: "Algiers, Algeria",
    bio: "Dedicated physics educator with 12 years of experience teaching at prestigious institutions across Algeria. I specialize in making complex physics concepts accessible through innovative teaching methods and practical demonstrations. My research background in quantum physics allows me to bring cutting-edge scientific understanding to my students.",
    img: "/placeholder.svg?height=144&width=144&text=AK",
    profilePictures: [
      "/placeholder.svg?height=400&width=400&text=Dr.+Amina+Kazi",
      "/placeholder.svg?height=400&width=400&text=Teaching+Physics",
      "/placeholder.svg?height=400&width=400&text=Research+Lab",
    ],
    contact: {
      phone: "+213 (0)5XX XX XX XX",
      email: "amina.kazi@lyceeibk.dz",
      office: "Physics Department, Lycée Ibn Khaldoun, Algiers",
      officeHours: "Monday-Thursday: 14:00-16:00",
      socialMedia: {
        linkedin: "linkedin.com/in/aminakazi",
        researchGate: "researchgate.net/profile/Amina_Kazi",
      },
    },
    education: [
      {
        degree: "Ph.D. in Theoretical Physics",
        institution: "University of Science and Technology Houari Boumediene",
        location: "Algiers, Algeria",
        year: "2011",
      },
      {
        degree: "M.Sc. in Physics",
        institution: "University of Science and Technology Houari Boumediene",
        location: "Algiers, Algeria",
        year: "2008",
      },
      {
        degree: "B.Sc. in Physics",
        institution: "University of Algiers",
        location: "Algiers, Algeria",
        year: "2006",
      },
    ],
    certifications: [
      {
        name: "Advanced Physics Teaching Certification",
        issuer: "Algerian Ministry of Education",
        year: "2015",
        id: "APT-2015-0342",
      },
      {
        name: "International Baccalaureate Physics Examiner",
        issuer: "International Baccalaureate Organization",
        year: "2018",
        id: "IBO-PHY-2018-1245",
      },
      {
        name: "Digital Education Technologies Certificate",
        issuer: "Algerian Institute for Educational Technology",
        year: "2020",
        id: "AIET-DET-2020-0789",
      },
    ],
    experience: [
      {
        position: "Senior Physics Teacher",
        institution: "Lycée Ibn Khaldoun",
        location: "Algiers, Algeria",
        period: "2016-Present",
        description:
          "Teaching advanced physics to secondary school students preparing for the Baccalaureate examination. Developing curriculum materials and laboratory experiments.",
      },
      {
        position: "Physics Lecturer",
        institution: "University of Science and Technology Houari Boumediene",
        location: "Algiers, Algeria",
        period: "2012-2016",
        description:
          "Taught undergraduate physics courses including Mechanics, Electromagnetism, and Quantum Physics. Supervised laboratory sessions and student research projects.",
      },
      {
        position: "Research Assistant",
        institution: "Center for Development of Advanced Technologies",
        location: "Algiers, Algeria",
        period: "2009-2012",
        description:
          "Conducted research in quantum physics applications. Assisted in laboratory experiments and data analysis.",
      },
    ],
    publications: [
      {
        title: "Quantum Mechanics Teaching Methods for Secondary Education",
        journal: "Algerian Journal of Science Education",
        year: "2022",
        doi: "10.xxxx/ajse.2022.123456",
      },
      {
        title: "Practical Laboratory Approaches for Physics Education in Resource-Limited Settings",
        journal: "International Journal of Physics Education",
        year: "2019",
        doi: "10.xxxx/ijpe.2019.789012",
      },
      {
        title: "Integrating Digital Technologies in Physics Classrooms: A Case Study from Algeria",
        journal: "African Journal of Educational Technology",
        year: "2020",
        doi: "10.xxxx/ajet.2020.345678",
      },
    ],
    awards: [
      {
        name: "Excellence in Teaching Award",
        issuer: "Algerian Ministry of Education",
        year: "2021",
      },
      {
        name: "Outstanding Educator Recognition",
        issuer: "Algiers Educational District",
        year: "2019",
      },
      {
        name: "Innovation in Science Education Grant",
        issuer: "North African Science Foundation",
        year: "2018",
      },
    ],
    teachingPhilosophy:
      "I believe in creating an engaging learning environment where students develop a deep understanding of physics principles through hands-on experimentation and real-world applications. My approach combines rigorous theoretical foundations with practical demonstrations to make abstract concepts tangible. I strive to inspire curiosity and critical thinking, encouraging students to ask questions and explore the fundamental laws that govern our universe.",
    courses: [
      {
        title: "Advanced Physics for Baccalaureate",
        subject: "Physics",
        rating: 4.9,
        reviewCount: 56,
        students: 342,
        price: "25,000 DZD",
        imageUrl: "/placeholder.svg?height=300&width=400&text=Physics+Course",
        description:
          "Comprehensive preparation for the Baccalaureate physics examination, covering mechanics, thermodynamics, electromagnetism, optics, and modern physics.",
        level: "Advanced",
        duration: "Academic Year",
        objectives: [
          "Master all physics concepts required for the Baccalaureate",
          "Develop problem-solving skills through extensive practice",
          "Gain hands-on experience through laboratory experiments",
          "Learn effective exam techniques and strategies",
        ],
        schedule: [
          { day: "Monday", time: "14:00-16:00", topic: "Lecture" },
          { day: "Wednesday", time: "14:00-16:00", topic: "Problem Solving" },
          { day: "Friday", time: "14:00-16:00", topic: "Laboratory" },
        ],
      },
      {
        title: "Physics Olympiad Preparation",
        subject: "Physics",
        rating: 4.8,
        reviewCount: 32,
        students: 45,
        price: "30,000 DZD",
        imageUrl: "/placeholder.svg?height=300&width=400&text=Olympiad+Course",
        description:
          "Specialized training for students participating in national and international physics competitions and olympiads.",
        level: "Advanced",
        duration: "6 months",
        objectives: [
          "Develop advanced problem-solving techniques",
          "Master complex physics concepts beyond the standard curriculum",
          "Practice with past olympiad problems",
          "Prepare for experimental challenges",
        ],
        schedule: [
          { day: "Tuesday", time: "16:00-18:00", topic: "Advanced Concepts" },
          { day: "Thursday", time: "16:00-18:00", topic: "Problem Solving" },
          { day: "Saturday", time: "10:00-13:00", topic: "Mock Competitions" },
        ],
      },
      {
        title: "Introduction to Quantum Physics",
        subject: "Physics",
        rating: 4.7,
        reviewCount: 28,
        students: 65,
        price: "28,000 DZD",
        imageUrl: "/placeholder.svg?height=300&width=400&text=Quantum+Physics",
        description:
          "An accessible introduction to the fascinating world of quantum mechanics for high school students and curious learners.",
        level: "Intermediate to Advanced",
        duration: "3 months",
        objectives: [
          "Understand the fundamental principles of quantum mechanics",
          "Explore the historical development of quantum theory",
          "Grasp the mathematical foundations at an appropriate level",
          "Discover modern applications of quantum physics",
        ],
        schedule: [
          { day: "Saturday", time: "14:00-16:00", topic: "Lecture and Discussion" },
        ],
      },
    ],
    resources: [
      {
        title: "Physics Laboratory Manual",
        type: "PDF",
        description: "Comprehensive guide to physics experiments for Baccalaureate preparation",
        access: "Course Enrollees",
        size: "4.2 MB",
        icon: Book,
      },
      {
        title: "Problem-Solving Techniques in Mechanics",
        type: "Video Series",
        description: "Step-by-step tutorials for solving complex mechanics problems",
        access: "Public",
        size: "12 videos",
        icon: Video,
      },
      {
        title: "Quantum Physics Simplified",
        type: "Interactive Presentation",
        description: "Visual explanations of quantum concepts with interactive simulations",
        access: "Course Enrollees",
        size: "25 MB",
        icon: Laptop,
      },
    ],
    reviews: [
      {
        id: 1,
        student: "Karim Benali",
        rating: 5,
        date: "2023-05-15",
        comment:
          "Dr. Kazi's physics classes transformed my understanding of the subject. Her clear explanations and practical demonstrations made complex concepts accessible. Thanks to her guidance, I achieved the highest score in physics on my Baccalaureate exam!",
        avatar: "/placeholder.svg?height=40&width=40&text=KB",
      },
      {
        id: 2,
        student: "Leila Hadj",
        rating: 5,
        date: "2023-04-22",
        comment:
          "The Olympiad preparation course was exceptional. Dr. Kazi's deep knowledge and problem-solving strategies helped me qualify for the national team. Her passion for physics is truly inspiring.",
        avatar: "/placeholder.svg?height=40&width=40&text=LH",
      },
      {
        id: 3,
        student: "Youcef Mansouri",
        rating: 4,
        date: "2023-03-10",
        comment:
          "Introduction to Quantum Physics was mind-blowing! Dr. Kazi has a gift for making the most abstract concepts understandable. The course sparked my interest in pursuing physics at university.",
        avatar: "/placeholder.svg?height=40&width=40&text=YM",
      },
    ],
    schedule: {
      availability: [
        { day: "Monday", slots: ["14:00-16:00", "16:30-18:30"] },
        { day: "Tuesday", slots: ["16:00-18:00"] },
        { day: "Wednesday", slots: ["14:00-16:00", "16:30-18:30"] },
        { day: "Thursday", slots: ["16:00-18:00"] },
        { day: "Friday", slots: ["14:00-16:00"] },
        { day: "Saturday", slots: ["10:00-13:00", "14:00-16:00"] },
      ],
      bookingNotice: "Please book at least 48 hours in advance. Cancellations should be made 24 hours before the scheduled session.",
    },
    stats: {
      studentsCount: 450,
      coursesCount: 3,
      averageRating: 4.9,
      completionRate: 94,
      responseRate: 98,
      responseTime: "Within 24 hours",
    },
  }

  const handleAddToCompare = () => {
    if (!compareList.includes(teacher.id)) {
      setCompareList([...compareList, teacher.id])
    }
  }

  const handleRemoveFromCompare = () => {
    setCompareList(compareList.filter((id) => id !== teacher.id))
  }

  const isInCompareList = compareList.includes(teacher.id)

  // Function to handle navigation back to find resources page
  const handleBackToFindResources = () => {
    if (navigateTo) {
      navigateTo("find-resources", "teachers")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button - only shown when accessed from find resources page */}
      {showBackButton && (
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToFindResources}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
        <Image
          src="/placeholder.svg?height=400&width=1200&text=Physics+Education"
          alt="Teacher background"
          className="object-cover"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
          <div className="p-6 text-white">
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{teacher.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0 -mt-24 ml-6 z-10 relative">
          <div className="w-36 h-36 rounded-xl overflow-hidden border-4 border-white bg-white shadow-lg">
            <Image
              src={teacher.img}
              alt={teacher.name}
              width={144}
              height={144}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{teacher.name}</h1>
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <p className="text-gray-600">{teacher.subject} Educator</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(teacher.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{teacher.rating.toFixed(1)}</span>
                  <span className="ml-1 text-sm text-gray-500">({teacher.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500" : ""}`} />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant={isInCompareList ? "destructive" : "outline"}
                size="sm"
                onClick={isInCompareList ? handleRemoveFromCompare : handleAddToCompare}
              >
                {isInCompareList ? (
                  <>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove from Compare
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add to Compare
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Students Taught</p>
                <p className="text-2xl font-bold">{teacher.stats.studentsCount}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Course Completion</p>
                <p className="text-2xl font-bold">{teacher.stats.completionRate}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <Progress value={teacher.stats.completionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Response Rate</p>
                <p className="text-2xl font-bold">{teacher.stats.responseRate}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <Progress value={teacher.stats.responseRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Booking Card */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-bold">Book a Session</h3>
                <p className="text-gray-500 mt-1">
                  One-on-one tutoring and consultation sessions available
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Responds within {teacher.stats.responseTime}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    <Calendar className="h-3 w-3 mr-1" />
                    Flexible scheduling
                  </Badge>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-green-600 hover:bg-green-700">Book a Session</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-green-600" />
                    About {teacher.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{teacher.bio}</p>
                </CardContent>
              </Card>

              {/* Teaching Philosophy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-green-600" />
                    Teaching Philosophy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{teacher.teachingPhilosophy}</p>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                    Professional Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {teacher.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-2">
                        <h4 className="font-semibold text-lg">{exp.position}</h4>
                        <p className="text-gray-600">{exp.institution}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{exp.location}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{exp.period}</span>
                        </div>
                        <p className="mt-2 text-gray-600 text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Publications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Publications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.publications.map((pub, index) => (
                      <div key={index} className="pb-3 border-b last:border-b-0">
                        <h4 className="font-medium text-gray-800">{pub.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {pub.journal}, {pub.year}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">DOI: {pub.doi}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Awards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-green-600" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.awards.map((award, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mt-1 mr-3 text-yellow-500">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{award.name}</h4>
                          <p className="text-sm text-gray-600">
                            {award.issuer}, {award.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              {teacher.courses.map((course, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <div className="flex items-center mt-1 mb-2">
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"}`}
                              strokeWidth={1}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">({course.reviewCount})</span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{course.students} students</span>
                      </div>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                          {course.duration}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          {course.subject}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{course.price}</span>
                        <Button className="bg-green-600 hover:bg-green-700">Enroll Now</Button>
                      </div>
                    </div>
                  </div>
                  <CardFooter className="bg-gray-50 p-4 border-t">
                    <div className="w-full">
                      <h4 className="font-medium text-gray-700 mb-2">Course Objectives:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                        {course.objectives.map((objective, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                      Student Reviews
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(teacher.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-bold">{teacher.rating.toFixed(1)}</span>
                      <span className="ml-1 text-gray-500">({teacher.reviewCount} reviews)</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {teacher.reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b last:border-b-0">
                        <div className="flex items-start">
                          <Image
                            src={review.avatar}
                            alt={review.student}
                            width={40}
                            height={40}
                            className="rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{review.student}</h4>
                                <div className="flex items-center mt-1">
                                  <div className="flex text-amber-500">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                                        strokeWidth={1}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <p className="mt-2 text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-green-600" />
                    Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Below are my regular teaching hours. Please book a session at least 48 hours in advance.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacher.schedule.availability.map((day, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <h4 className="font-medium text-gray-700">{day.day}</h4>
                        <div className="mt-2 space-y-1">
                          {day.slots.map((slot, i) => (
                            <div key={i} className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-600">{slot}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700">
                      <AlertCircle className="h-4 w-4 inline-block mr-1" />
                      {teacher.schedule.bookingNotice}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    Check Availability & Book
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="credentials" className="space-y-6">
              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {teacher.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-2">
                        <h4 className="font-semibold text-lg">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{edu.location}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-green-600" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start p-3 border rounded-md bg-gray-50">
                        <div className="mt-1 mr-3 text-green-500">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{cert.name}</h4>
                          <p className="text-sm text-gray-600">
                            {cert.issuer}, {cert.year}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">ID: {cert.id}</p>
                        </div>
                        <div className="ml-auto">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            <Check className="h-3 w-3 mr-1" /> Verified
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-green-600" />
                    Teaching Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Access educational materials developed by Dr. Kazi to enhance your learning experience.
                  </p>
                  <div className="space-y-4">
                    {teacher.resources.map((resource, index) => (
                      <div key={index} className="flex items-start p-4 border rounded-md hover:bg-gray-50 transition-colors">
                        <div className="mt-1 mr-4 text-blue-500">
                          <resource.icon className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="mr-2">
                              {resource.type}
                            </Badge>
                            <span className="text-xs text-gray-500">{resource.size}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-xs text-gray-500">Access: {resource.access}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          <Download className="h-4 w-4 mr-1" />
                          Access
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600">{teacher.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">{teacher.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Office</h4>
                  <p className="text-gray-600">{teacher.contact.office}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Office Hours</h4>
                  <p className="text-gray-600">{teacher.contact.officeHours}</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-500 mb-1">Connect with me:</p>
                <div className="flex space-x-3">
                  {teacher.contact.socialMedia.linkedin && (
                    <a
                      href={`https://${teacher.contact.socialMedia.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                  )}
                  {teacher.contact.socialMedia.researchGate && (
                    <a
                      href={`https://${teacher.contact.socialMedia.researchGate}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-700"
                    >
                      ResearchGate
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expertise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-green-600" />
                Areas of Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Physics Education</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Quantum Physics</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Mechanics</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Electromagnetism</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Thermodynamics</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Optics</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Laboratory Techniques</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Educational Technology</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Teaching Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Teaching Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Student Success Rate</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Baccalaureate Pass Rate</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Average Student Grade</span>
                  <span className="text-sm font-medium">17/20</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-500">
                  Statistics based on student performance over the past 3 academic years.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-green-600" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Arabic</span>
                  <span className="text-xs text-gray-500">Native</span>
                </div>
                <Progress value={100} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">French</span>
                  <span className="text-xs text-gray-500">Fluent</span>
                </div>
                <Progress value={95} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">English</span>
                  <span className="text-xs text-gray-500">Professional</span>
                </div>
                <Progress value={85} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
