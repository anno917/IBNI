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

interface TeacherProfileBenaliProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

export default function TeacherProfileBenali({ navigateTo, userType = "parent", showBackButton = false }: TeacherProfileBenaliProps) {
  const [activeTab, setActiveTab] = useState("about")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)

  // Mock teacher data
  const teacher = {
    id: "teacher2",
    name: "Karim Benali",
    subject: "French Literature",
    rating: 4.7,
    reviewCount: 64,
    location: "Algiers, Algeria",
    bio: "Passionate French literature educator with 8 years of experience teaching at prestigious institutions in Algeria. I specialize in French classical and modern literature, with a focus on helping students develop strong analytical and writing skills. My teaching approach combines traditional literary analysis with contemporary cultural context.",
    img: "/placeholder.svg?height=144&width=144&text=KB",
    profilePictures: [
      "/placeholder.svg?height=400&width=400&text=Karim+Benali",
      "/placeholder.svg?height=400&width=400&text=Teaching+Literature",
      "/placeholder.svg?height=400&width=400&text=Writing+Workshop",
    ],
    contact: {
      phone: "+213 (0)5XX XX XX XX",
      email: "karim.benali@ecoledz.dz",
      office: "French Department, École Internationale d'Alger, Algiers",
      officeHours: "Monday-Wednesday: 13:00-15:00, Thursday: 10:00-12:00",
      socialMedia: {
        linkedin: "linkedin.com/in/karimbenali",
        twitter: "twitter.com/karimbenali_lit",
      },
    },
    education: [
      {
        degree: "M.A. in French Literature",
        institution: "University of Algiers",
        location: "Algiers, Algeria",
        year: "2015",
      },
      {
        degree: "B.A. in Modern Languages",
        institution: "University of Algiers",
        location: "Algiers, Algeria",
        year: "2013",
      },
      {
        degree: "Certificate in French Language Teaching",
        institution: "Alliance Française",
        location: "Paris, France",
        year: "2016",
      },
    ],
    certifications: [
      {
        name: "Advanced French Literature Teaching Certification",
        issuer: "Algerian Ministry of Education",
        year: "2018",
        id: "AFLT-2018-0567",
      },
      {
        name: "DALF C2 (Diplôme Approfondi de Langue Française)",
        issuer: "French Ministry of Education",
        year: "2014",
        id: "DALF-C2-2014-8901",
      },
    ],
    experience: [
      {
        position: "French Literature Teacher",
        institution: "École Internationale d'Alger",
        location: "Algiers, Algeria",
        period: "2018-Present",
        description:
          "Teaching French literature to secondary school students. Developing curriculum for the International Baccalaureate program. Organizing literary events and writing workshops.",
      },
      {
        position: "French Language Instructor",
        institution: "Alliance Française d'Alger",
        location: "Algiers, Algeria",
        period: "2015-2018",
        description:
          "Taught French language courses at various levels. Designed and implemented cultural programs to enhance language learning.",
      },
    ],
    publications: [
      {
        title: "Contemporary Algerian Literature in French: Identity and Cultural Hybridity",
        journal: "Revue des Études Francophones",
        year: "2021",
        doi: "10.xxxx/ref.2021.234567",
      },
      {
        title: "Teaching Francophone Literature in the Digital Age",
        journal: "Journal of Language Education",
        year: "2019",
        doi: "10.xxxx/jle.2019.345678",
      },
    ],
    awards: [
      {
        name: "Outstanding French Teacher Award",
        issuer: "Association of French Teachers in Algeria",
        year: "2020",
      },
      {
        name: "Cultural Exchange Ambassador",
        issuer: "Franco-Algerian Cultural Institute",
        year: "2019",
      },
    ],
    teachingPhilosophy:
      "Je crois que l'enseignement de la littérature française doit aller au-delà de la simple analyse textuelle pour explorer les contextes historiques, culturels et sociaux qui ont façonné les œuvres. J'encourage mes élèves à développer une pensée critique et à établir des liens entre la littérature classique et le monde contemporain, tout en perfectionnant leurs compétences linguistiques et leur expression écrite.",
    courses: [
      {
        title: "French Literature for Baccalaureate",
        subject: "French Literature",
        rating: 4.8,
        reviewCount: 42,
        students: 285,
        price: "22,000 DZD",
        imageUrl: "/placeholder.svg?height=300&width=400&text=French+Literature",
        description:
          "Comprehensive preparation for the Baccalaureate French literature examination, covering major literary movements, authors, and analytical techniques.",
        level: "Advanced",
        duration: "Academic Year",
        objectives: [
          "Master analysis of classical and modern French literature",
          "Develop advanced writing skills for literary commentary",
          "Understand historical and cultural contexts of major works",
          "Prepare effectively for Baccalaureate examinations",
        ],
        schedule: [
          { day: "Monday", time: "15:00-17:00", topic: "Literary Analysis" },
          { day: "Wednesday", time: "15:00-17:00", topic: "Writing Workshop" },
        ],
      },
      {
        title: "Creative Writing in French",
        subject: "French Writing",
        rating: 4.6,
        reviewCount: 28,
        students: 45,
        price: "18,000 DZD",
        imageUrl: "/placeholder.svg?height=300&width=400&text=Creative+Writing",
        description:
          "A workshop-based course focused on developing creative writing skills in French, exploring various genres and styles.",
        level: "Intermediate to Advanced",
        duration: "3 months",
        objectives: [
          "Explore different literary genres and writing techniques",
          "Develop a personal writing style",
          "Learn to give and receive constructive feedback",
          "Create a portfolio of original written works",
        ],
        schedule: [
          { day: "Thursday", time: "16:00-18:00", topic: "Workshop" },
        ],
      },
    ],
    resources: [
      {
        title: "French Literature Study Guide",
        type: "PDF",
        description: "Comprehensive guide to major French literary movements and authors",
        access: "Course Enrollees",
        size: "3.8 MB",
        icon: Book,
      },
      {
        title: "Writing Techniques Workshop",
        type: "Video Series",
        description: "Step-by-step tutorials on advanced writing techniques in French",
        access: "Public",
        size: "8 videos",
        icon: Video,
      },
      {
        title: "French Poetry Collection",
        type: "Audio Files",
        description: "Recordings of classic French poetry with analysis",
        access: "Course Enrollees",
        size: "450 MB",
        icon: Laptop,
      },
    ],
    reviews: [
      {
        id: 1,
        student: "Leila Hadj",
        rating: 5,
        date: "2023-06-10",
        comment:
          "Professor Benali's French Literature course transformed my understanding and appreciation of classic works. His passion for the subject is contagious, and his teaching methods make even the most complex texts accessible.",
        avatar: "/placeholder.svg?height=40&width=40&text=LH",
      },
      {
        id: 2,
        student: "Youcef Mansouri",
        rating: 4,
        date: "2023-05-18",
        comment:
          "The Creative Writing workshop was excellent. Professor Benali provides thoughtful feedback and creates a supportive environment for developing your writing skills. I've seen significant improvement in my work.",
        avatar: "/placeholder.svg?height=40&width=40&text=YM",
      },
    ],
    schedule: {
      availability: [
        { day: "Monday", slots: ["15:00-17:00"] },
        { day: "Tuesday", slots: ["13:00-15:00"] },
        { day: "Wednesday", slots: ["15:00-17:00"] },
        { day: "Thursday", slots: ["10:00-12:00", "16:00-18:00"] },
      ],
      bookingNotice: "Please book at least 48 hours in advance. Cancellations should be made 24 hours before the scheduled session.",
    },
    stats: {
      studentsCount: 330,
      coursesCount: 2,
      averageRating: 4.7,
      completionRate: 92,
      responseRate: 95,
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
          src="/placeholder.svg?height=400&width=1200&text=French+Literature"
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
                    Access educational materials developed by Professor Benali to enhance your learning experience.
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
                  {teacher.contact.socialMedia.twitter && (
                    <a
                      href={`https://${teacher.contact.socialMedia.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-700"
                    >
                      Twitter
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
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">French Literature</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Creative Writing</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Literary Analysis</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Francophone Studies</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Poetry</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Cultural Studies</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Language Teaching</Badge>
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
                  <span className="text-xs text-gray-500">Native-like</span>
                </div>
                <Progress value={98} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">English</span>
                  <span className="text-xs text-gray-500">Advanced</span>
                </div>
                <Progress value={80} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
