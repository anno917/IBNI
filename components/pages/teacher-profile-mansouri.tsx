"use client"

import { useState } from "react"
import {
  MapPin,
  Star,
  BookOpen,
  Heart,
  MessageSquare,
  Share2,
  ChevronRight,
  Check,
  Calendar,
  Clock,
  Users,
  Award,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Globe,
  FileText,
  Download,
  ThumbsUp,
  User,
  Book,
  History,
  Mosque,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface TeacherProfileMansouriProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

// Review Component
const Review = ({ review }: { review: any }) => (
  <div className="border-b pb-4 last:border-b-0 last:pb-0">
    <div className="flex items-start mb-2">
      <div className="flex-shrink-0 mr-3">
        <Image
          src={review.avatar || "/placeholder.svg?height=40&width=40"}
          alt={review.name}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{review.name}</h4>
          <span className="text-sm text-gray-500">{review.date}</span>
        </div>
        <div className="flex items-center mt-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-600">{review.comment}</p>
    <div className="flex items-center mt-3">
      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
        <ThumbsUp className="h-4 w-4 mr-1" />
        Helpful ({review.helpfulCount})
      </Button>
    </div>
  </div>
)

// Course Card Component
const CourseCard = ({ course }: { course: any }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <div className="relative h-40">
      <Image
        src={course.image || "/placeholder.svg?height=160&width=320&text=Course+Image"}
        alt={course.title}
        fill
        className="object-cover"
      />
    </div>
    <CardContent className="p-4">
      <h3 className="font-medium text-lg mb-1">{course.title}</h3>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <Clock className="h-4 w-4 mr-1" />
        <span>{course.duration}</span>
        <Users className="h-4 w-4 ml-3 mr-1" />
        <span>{course.students} students</span>
      </div>
      <div className="flex items-center mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="text-sm text-gray-500 ml-1">({course.reviewCount})</span>
      </div>
      <div className="text-green-600 font-medium mb-3">{course.price}</div>
      <Button className="w-full bg-green-600 hover:bg-green-700">View Course</Button>
    </CardContent>
  </Card>
)

// Compare Dialog Component
const CompareDialog = ({ isOpen, onClose, compareList, onRemove }: any) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Compare Teachers</DialogTitle>
        <DialogDescription>Select up to 4 teachers to compare</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
        {compareList.map((teacher: any) => (
          <Card key={teacher.id} className="overflow-hidden">
            <div className="p-3">
              <div className="relative h-24 mb-2">
                <Image
                  src={teacher.image || "/placeholder.svg?height=100&width=100"}
                  alt={teacher.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h4 className="font-medium text-sm truncate">{teacher.name}</h4>
              <div className="flex items-center mt-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < teacher.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-xs ml-1">{teacher.rating}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => onRemove(teacher.id)}
              >
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">Compare Now</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default function TeacherProfileMansouri({ navigateTo, userType = "parent", showBackButton = true }: TeacherProfileMansouriProps) {
  const [activeTab, setActiveTab] = useState("about")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)

  // Mock teacher data for Youcef Mansouri
  const teacher = {
    id: "teacher4",
    name: "Youcef Mansouri",
    subject: "History & Islamic Studies",
    rating: 4.6,
    reviewCount: 53,
    location: "Constantine, Algeria",
    school: "Independent Educator",
    position: "Freelance History Teacher",
    experience: 10,
    students: 320,
    courses: 5,
    hourlyRate: "2,200 DZD",
    availability: "Flexible hours, including weekends",
    languages: ["Arabic", "French", "English (Basic)"],
    education: [
      {
        degree: "Master's in History",
        institution: "University of Constantine",
        year: "2013",
      },
      {
        degree: "Bachelor's in Islamic Studies",
        institution: "University of Constantine",
        year: "2010",
      },
    ],
    certifications: [
      {
        name: "Advanced Teaching Methodology",
        issuer: "National Teaching Institute",
        year: "2016",
      },
      {
        name: "Digital Education Specialist",
        issuer: "EdTech Algeria",
        year: "2020",
      },
    ],
    specialties: ["Islamic History", "Algerian History", "World History", "Religious Studies"],
    about:
      "Youcef Mansouri is a passionate independent educator specializing in History and Islamic Studies. With 10 years of teaching experience, he has chosen to work independently to develop his own teaching methodology that combines traditional historical analysis with modern educational techniques. Previously affiliated with Lycée Descartes, he now offers personalized tutoring, online courses, and specialized workshops for students of all ages. His approach emphasizes critical thinking and cultural understanding, helping students connect historical events to contemporary issues.",
    teachingApproach:
      "I believe in making history come alive through storytelling, primary source analysis, and interactive discussions. My teaching approach combines traditional lectures with digital resources, virtual field trips, and collaborative projects. I adapt my methods to each student's learning style, whether they're visual, auditory, or kinesthetic learners. For Islamic Studies, I emphasize both historical context and contemporary relevance, encouraging respectful dialogue and critical engagement with texts. As an independent educator, I can tailor my curriculum to meet specific student needs and interests.",
    isIndependent: true,
  }

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: "Samira Taleb",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      rating: 5,
      date: "April 2, 2025",
      comment:
        "Professor Mansouri's approach to teaching history is exceptional. He makes complex historical events accessible and engaging. My son's understanding of Algerian history has improved dramatically since working with him. Highly recommended!",
      helpfulCount: 9,
    },
    {
      id: 2,
      name: "Omar Benmalek",
      avatar: "/placeholder.svg?height=40&width=40&text=OB",
      rating: 4,
      date: "March 15, 2025",
      comment:
        "I took Professor Mansouri's Islamic History course online, and it was eye-opening. He presents multiple perspectives and encourages critical thinking. The course materials were excellent, though sometimes the sessions ran longer than scheduled.",
      helpfulCount: 7,
    },
    {
      id: 3,
      name: "Leila Hamdi",
      avatar: "/placeholder.svg?height=40&width=40&text=LH",
      rating: 5,
      date: "February 8, 2025",
      comment:
        "As a university student struggling with historical research methods, Professor Mansouri's tutoring was invaluable. He taught me how to analyze primary sources effectively and develop stronger arguments. His feedback was always constructive and thoughtful.",
      helpfulCount: 11,
    },
  ]

  // Mock courses
  const courses = [
    {
      id: 1,
      title: "Islamic Golden Age: Science & Culture",
      image: "/placeholder.svg?height=160&width=320&text=Islamic+Golden+Age",
      duration: "8 weeks",
      students: 42,
      rating: 4.7,
      reviewCount: 18,
      price: "25,000 DZD",
    },
    {
      id: 2,
      title: "Algerian History: Colonial to Independence",
      image: "/placeholder.svg?height=160&width=320&text=Algerian+History",
      duration: "10 weeks",
      students: 38,
      rating: 4.8,
      reviewCount: 15,
      price: "28,000 DZD",
    },
    {
      id: 3,
      title: "Introduction to Islamic Studies",
      image: "/placeholder.svg?height=160&width=320&text=Islamic+Studies",
      duration: "6 weeks",
      students: 56,
      rating: 4.5,
      reviewCount: 22,
      price: "22,000 DZD",
    },
  ]

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
          src="/placeholder.svg?height=400&width=1200&text=History+Education"
          alt="Youcef Mansouri - History Educator"
          className="object-cover object-center"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Teacher Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0 -mt-24 ml-6 z-10 relative">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
            <Image
              src="/placeholder.svg?height=144&width=144&text=YM"
              alt={`${teacher.name} Profile`}
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
                {teacher.isIndependent && (
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
                    Independent
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 mt-1">{teacher.position} | {teacher.subject} Specialist</p>
              <div className="flex items-center mt-1 text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm mr-3">{teacher.location}</span>
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="text-sm">{teacher.school}</span>
              </div>
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
                className={isFollowing ? "border-green-600 text-green-600" : "bg-green-600 hover:bg-green-700"}
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
                Contact
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center">
            <Briefcase className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="text-xl font-bold">{teacher.experience} Years</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Students</p>
              <p className="text-xl font-bold">{teacher.students}+</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <BookOpen className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Courses</p>
              <p className="text-xl font-bold">{teacher.courses}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <Award className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Hourly Rate</p>
              <p className="text-xl font-bold">{teacher.hourlyRate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About {teacher.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">{teacher.about}</p>
                  
                  <h3 className="text-lg font-medium mb-3">Teaching Approach</h3>
                  <p className="text-gray-700 mb-6">{teacher.teachingApproach}</p>
                  
                  <h3 className="text-lg font-medium mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {teacher.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-medium mb-3">Education</h3>
                  <div className="space-y-3 mb-6">
                    {teacher.education.map((edu, index) => (
                      <div key={index} className="flex items-start">
                        <GraduationCap className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-gray-600">
                            {edu.institution}, {edu.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-medium mb-3">Certifications</h3>
                  <div className="space-y-3">
                    {teacher.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start">
                        <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-600">
                            {cert.issuer}, {cert.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start mb-4">
                    <Calendar className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Schedule</p>
                      <p className="text-sm text-gray-600">{teacher.availability}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Book a Session</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teacher.languages.map((language, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{language}</span>
                        <Progress value={index === 0 ? 100 : index === 1 ? 90 : 60} className="h-2 w-24" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Courses by {teacher.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Student Reviews</CardTitle>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">{teacher.rating.toFixed(1)}</div>
                <div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(teacher.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">{teacher.reviewCount} reviews</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Review key={review.id} review={review} />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Load More Reviews</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-green-600 mr-3" />
                  <span>youcef.mansouri@educator.dz</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-600 mr-3" />
                  <span>+213 XX XX XX XX</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-3" />
                  <span>www.youcefmansouri-history.dz</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Send a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Message subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md h-32"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Send Message</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Compare Dialog */}
      <CompareDialog
        isOpen={showCompareDialog}
        onClose={() => setShowCompareDialog(false)}
        compareList={compareList}
        onRemove={(id: string) => setCompareList(compareList.filter((item) => item !== id))}
      />
    </div>
  )
}
