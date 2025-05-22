"use client"

import { useState } from "react"
import {
  MapPin,
  Star,
  School,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface TeacherProfileHadjProps {
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

export default function TeacherProfileHadj({ navigateTo, userType = "parent", showBackButton = true }: TeacherProfileHadjProps) {
  const [activeTab, setActiveTab] = useState("about")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)

  // Mock teacher data for Dr. Leila Hadj
  const teacher = {
    id: "teacher3",
    name: "Dr. Leila Hadj",
    subject: "Biology",
    rating: 4.8,
    reviewCount: 72,
    location: "Oran, Algeria",
    school: "Collège El Feth",
    position: "Head of Science Department",
    experience: 15,
    students: 450,
    courses: 8,
    hourlyRate: "2,500 DZD",
    availability: "Mon-Fri, 4PM-8PM",
    languages: ["Arabic", "French", "English"],
    education: [
      {
        degree: "Ph.D. in Biological Sciences",
        institution: "University of Oran",
        year: "2010",
      },
      {
        degree: "Master's in Molecular Biology",
        institution: "University of Algiers",
        year: "2005",
      },
      {
        degree: "Bachelor's in Biology",
        institution: "University of Oran",
        year: "2003",
      },
    ],
    certifications: [
      {
        name: "Advanced Biology Teaching Certification",
        issuer: "Ministry of Education",
        year: "2015",
      },
      {
        name: "Environmental Science Educator",
        issuer: "National Environmental Institute",
        year: "2018",
      },
    ],
    specialties: ["Molecular Biology", "Environmental Science", "Ecology", "Genetics"],
    about:
      "Dr. Leila Hadj is a passionate biology educator with 15 years of experience teaching at both secondary and university levels. As the Head of the Science Department at Collège El Feth, she has developed innovative teaching methods that make complex biological concepts accessible to students of all levels. Her research background in molecular biology and environmental science allows her to bring real-world applications into the classroom. Dr. Hadj is dedicated to fostering scientific curiosity and critical thinking skills in her students.",
    teachingApproach:
      "My teaching philosophy centers on inquiry-based learning and hands-on experimentation. I believe students learn science best by doing science. My lessons incorporate laboratory work, field studies, and research projects that allow students to discover biological principles firsthand. I emphasize the connections between biology and everyday life, helping students understand the relevance of what they're learning. I adapt my teaching methods to accommodate different learning styles and provide personalized support to ensure every student succeeds.",
  }

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: "Ahmed Benali",
      avatar: "/placeholder.svg?height=40&width=40&text=AB",
      rating: 5,
      date: "March 15, 2025",
      comment:
        "Dr. Hadj is an exceptional biology teacher. Her passion for the subject is contagious, and she explains complex concepts in a way that's easy to understand. The lab experiments she designed were fascinating and really helped solidify my understanding of cellular processes.",
      helpfulCount: 12,
    },
    {
      id: 2,
      name: "Fatima Zahra",
      avatar: "/placeholder.svg?height=40&width=40&text=FZ",
      rating: 5,
      date: "February 3, 2025",
      comment:
        "My daughter struggled with science until she started working with Dr. Hadj. Now biology is her favorite subject! Dr. Hadj has a gift for making difficult topics accessible and engaging. She's patient, thorough, and truly cares about her students' success.",
      helpfulCount: 8,
    },
    {
      id: 3,
      name: "Karim Mesbah",
      avatar: "/placeholder.svg?height=40&width=40&text=KM",
      rating: 4,
      date: "December 10, 2024",
      comment:
        "Dr. Hadj's environmental science course was eye-opening. She combines theoretical knowledge with practical applications and current research. The field trips she organized gave us hands-on experience with ecological concepts. Highly recommended for anyone interested in biology or environmental studies.",
      helpfulCount: 5,
    },
  ]

  // Mock courses
  const courses = [
    {
      id: 1,
      title: "Advanced Molecular Biology",
      image: "/placeholder.svg?height=160&width=320&text=Molecular+Biology",
      duration: "12 weeks",
      students: 24,
      rating: 4.9,
      reviewCount: 18,
      price: "35,000 DZD",
    },
    {
      id: 2,
      title: "Environmental Science Fundamentals",
      image: "/placeholder.svg?height=160&width=320&text=Environmental+Science",
      duration: "10 weeks",
      students: 32,
      rating: 4.7,
      reviewCount: 22,
      price: "30,000 DZD",
    },
    {
      id: 3,
      title: "Genetics and Heredity",
      image: "/placeholder.svg?height=160&width=320&text=Genetics",
      duration: "8 weeks",
      students: 18,
      rating: 4.8,
      reviewCount: 15,
      price: "28,000 DZD",
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
          src="/placeholder.svg?height=400&width=1200&text=Biology+Education"
          alt="Dr. Leila Hadj - Biology Educator"
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
              src="/placeholder.svg?height=144&width=144&text=LH"
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
              </div>
              <p className="text-gray-600 mt-1">{teacher.position} | {teacher.subject} Specialist</p>
              <div className="flex items-center mt-1 text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm mr-3">{teacher.location}</span>
                <School className="h-4 w-4 mr-1" />
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
                        <Progress value={index === 0 ? 100 : index === 1 ? 95 : 85} className="h-2 w-24" />
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
                  <span>leila.hadj@college-elfeth.dz</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-600 mr-3" />
                  <span>+213 XX XX XX XX</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-3" />
                  <span>www.college-elfeth.dz/faculty/hadj</span>
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
