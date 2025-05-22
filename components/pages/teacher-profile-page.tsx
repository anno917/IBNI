"use client"

import { useState } from "react"
import {
  MessageSquare,
  Star,
  Users,
  Award,
  MapPin,
  Mail,
  Phone,
  Clock,
  GraduationCap,
  ExternalLink,
  CalendarIcon,
  BookOpen,
  Share2,
  Download,
  Library,
  Globe,
  ShieldCheck,
  Check,
  ThumbsUp,
  BadgeCheck,
  ContrastIcon as Compare,
  Ruler,
  BriefcaseIcon,
  Heart,
  PlusCircle,
  Trash2,
  Info,
  FileText,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface TeacherProfilePageProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

// Review Component
const Review = ({ review }: { review: any }) => (
  <div className="border-b pb-4 last:border-b-0 last:pb-0">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <img
          src={review.avatar || "https://placehold.co/40x40/e0f2fe/0891b2?text=U"}
          alt={review.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">{review.name}</span>
      </div>
      <div className="flex items-center text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} strokeWidth={1} />
        ))}
      </div>
    </div>
    <p className="text-gray-600 text-sm">{review.comment}</p>
    <p className="text-gray-400 text-xs mt-1">{review.date}</p>
  </div>
)

// Course Card Component
const CourseCard = ({ course }: { course: any }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <div className="h-32 overflow-hidden">
      <img
        src={course.imageUrl || "/placeholder.svg"}
        alt={course.title}
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
        {course.subject}
      </Badge>
      <h3 className="font-medium mb-1 line-clamp-2">{course.title}</h3>
      <div className="flex items-center text-amber-500 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < course.rating ? "fill-current" : "text-gray-300"}`} strokeWidth={1} />
        ))}
        <span className="text-xs text-gray-500 ml-1">({course.reviewCount})</span>
      </div>
      <p className="text-xs text-gray-500 flex items-center">
        <Users className="w-3 h-3 mr-1" /> {course.students} students
      </p>
      <p className="text-sm font-medium text-green-600 mt-2">{course.price}</p>
    </CardContent>
    <CardFooter className="px-4 py-3 bg-gray-50 border-t">
      <Button variant="outline" size="sm" className="w-full">
        View Course
      </Button>
    </CardFooter>
  </Card>
)

// Class Schedule Component
const ClassSchedule = ({ schedule }: { schedule: any[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Day
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Time
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Course
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Location
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {schedule.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.day}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.course}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Add a ImageGallery component
const ImageGallery = ({ images }: { images: string[] }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">View More Photos</Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Teacher Gallery</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Teacher image ${index + 1}`}
            className="w-full h-64 object-cover rounded-md hover:opacity-90 transition-opacity cursor-pointer"
          />
        ))}
      </div>
    </DialogContent>
  </Dialog>
)

// Add a CompareButton component
const CompareButton = ({
  teacher,
  isCompared,
  onToggleCompare,
}: { teacher: any; isCompared: boolean; onToggleCompare: () => void }) => {
  return (
    <Button
      variant={isCompared ? "destructive" : "outline"}
      className="flex items-center gap-2"
      onClick={onToggleCompare}
    >
      {isCompared ? (
        <>
          <Trash2 className="w-4 h-4" />
          Remove from Compare
        </>
      ) : (
        <>
          <Compare className="w-4 h-4" />
          Add to Compare
        </>
      )}
    </Button>
  )
}

// Add a CourseGallery component
const CourseGallery = ({ courses }: { courses: any[] }) => (
  <Carousel className="w-full">
    <CarouselContent>
      {courses.map((course, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
          <Card className="m-1 h-full flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <img
                src={course.imageUrl || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/80">
                  {course.subject}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-medium line-clamp-1">{course.title}</h3>
              <div className="flex items-center text-amber-500 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"}`}
                    strokeWidth={1}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">({course.reviewCount})</span>
              </div>
              <p className="text-xs text-gray-600 mb-1 line-clamp-2">{course.description}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {course.students} students
                </span>
              </div>
              <p className="text-green-600 font-medium mt-2">{course.price}</p>
            </CardContent>
            <CardFooter className="p-3 bg-gray-50 border-t mt-auto">
              <Button variant="outline" size="sm" className="w-full">
                View Course
              </Button>
            </CardFooter>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="left-1" />
    <CarouselNext className="right-1" />
  </Carousel>
)

// Add a VerificationBadges component
const VerificationBadges = ({ verification }: { verification: any }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {verification.identityVerified && (
      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
        <ShieldCheck className="w-3 h-3" /> Identity Verified
      </Badge>
    )}
    {verification.backgroundChecked && (
      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
        <Check className="w-3 h-3" /> Background Checked
      </Badge>
    )}
    {verification.qualificationsVerified && (
      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
        <BadgeCheck className="w-3 h-3" /> Qualifications Verified
      </Badge>
    )}
  </div>
)

// Add a CourseDetailsModal component
const CourseDetailsModal = ({ course }: { course: any }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm">
        Course Details
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{course.title}</DialogTitle>
        <DialogDescription>
          {course.subject} • {course.level}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <img
            src={course.imageUrl || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"}`}
                  strokeWidth={1}
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">({course.reviewCount} reviews)</span>
            </div>
            <div className="text-green-600 font-semibold">{course.price}</div>
          </div>

          <p className="text-gray-700 mb-4">{course.description}</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Course Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <span>Level: {course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{course.students} students</span>
                </div>
              </div>
            </div>

            <Button className="w-full">Enroll Now</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Learning Objectives</h4>
            <ul className="space-y-1">
              {course.objectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Syllabus</h4>
            <ul className="space-y-2">
              {course.syllabus.map((topic: string, index: number) => (
                <li key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{topic}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default function TeacherProfilePage({ navigateTo, userType = "parent", showBackButton = false }: TeacherProfilePageProps) {
  const [activeTab, setActiveTab] = useState("about")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)

  // Get teacher name
  const getTeacherName = () => {
    return "Mourad Haddad"
  }

  // Mock teacher data
  const teacher = {
  id: "teacher6",
  name: getTeacherName(),
  subject: "Physics",
  rating: 4.8,
  reviewCount: 124,
  location: "Tlemcen, Algeria",
  bio: "Passionate physics educator with over 10 years of experience teaching at both high school and university levels in Algeria. My teaching philosophy centers on making complex concepts accessible through practical demonstrations and real-world applications. I believe every student can excel in physics with the right guidance and encouragement.",
  img: "https://example.com/images/mourad-haddad.png",
  profilePictures: [
    "/images/teacher-profile.png",
    "https://placehold.co/400x400/f0fdfa/0d9488?text=Teaching+in+Lab",
    "https://placehold.co/400x400/eff6ff/3b82f6?text=Classroom+Demo",
  ],
  contact: {
    email: "mourad.haddad@uape.dz",
    phone: "+213 550 123 456",
    office: "Faculty of Science, Room 305",
    officeHours: "Mon & Wed 15:00 – 17:00",
    socialMedia: {
      linkedin: "https://linkedin.com/in/mourad-haddad",
      twitter: "https://twitter.com/Mourad_Haddad_phys",
    },
  },
  education: [
    {
      degree: "Ph.D. in Physics",
      institution: "Université Abou Bekr Belkaïd, Tlemcen",
      year: "2015",
      details: "Thesis: 'Applications of Quantum Field Theory in Physics Education'",
      gpa: "3.95/4.00",
    },
    {
      degree: "M.S. in Physics",
      institution: "Université de Béjaïa",
      year: "2011",
      details: "Mémoire: 'Méthodes Pédagogiques pour l’Enseignement de la Physique Avancée'",
      gpa: "3.90/4.00",
    },
    {
      degree: "B.S. in Physics",
      institution: "Université d'Alger 1",
      year: "2009",
      details: "Option: Physique Fondamentale",
      gpa: "3.85/4.00",
    },
  ],
  experience: [
    {
      position: "Senior Physics Teacher",
      institution: "Lycée Ibn Khaldoun, Tlemcen",
      period: "2018 - Present",
      achievements: [
        "Augmented success rate au Bac de Physique from 70% to 92%",
        "Développé un programme de travaux pratiques adopté dans tout le lycée",
        "Encadré 4 équipes d’élèves aux Olympiades Nationales de Physique",
      ],
    },
    {
      position: "Chargé de Cours",
      institution: "Université Abou Bekr Belkaïd, Tlemcen",
      period: "2015 - 2018",
      achievements: [
        "Enseigné la physique générale à plus de 600 étudiants",
        "Mis en place des ressources en ligne pour améliorer l’engagement de 30%",
        "Organisé des séminaires pratiques sur la physique moderne",
      ],
    },
    {
      position: "Assistant de Recherche",
      institution: "Centre de Recherche en Physique Fondamentale, Alger",
      period: "2012 - 2015",
      achievements: [
        "Contribué à 2 publications dans la Revue Algérienne de Physique",
        "Créé des supports visuels pour la compréhension des concepts quantiques",
        "Coordonné un colloque national attirant 150 participants",
      ],
    },
  ],
  certifications: [
    {
      name: "Certificat d’Aptitude Pédagogique (CAP)",
      issuer: "Ministère de l’Éducation Nationale",
      year: "2016",
      expirationDate: "2026",
      licenseNumber: "CAP-ALG-67890",
    },
    {
      name: "Licence d’Enseignement de Physique",
      issuer: "Ministère de l’Enseignement Supérieur",
      year: "2015",
      expirationDate: "2025",
      licenseNumber: "LES-ALG-12345",
    },
  ],
  publications: [
    {
      title: "Approches Innovantes pour l’Enseignement de la Mécanique Quantique",
      journal: "Revue Algérienne de Physique",
      year: "2021",
      doi: "10.5432/rap.2021.0032",
    },
    {
      title: "Intégration de la Réalité Virtuelle en Cours de Physique",
      journal: "Technologie & Éducation",
      year: "2019",
      doi: "10.5432/te.2019.0110",
    },
  ],
  skills: [
    "Développement de programmes de physique",
    "Conception de TP de laboratoire",
    "Mathématiques avancées",
    "Intégration de la technologie éducative",
    "Évaluation des apprentissages",
    "Coaching pour concours scientifiques",
    "Design de démonstrations interactives",
    "Analyse et visualisation de données",
    "Méthodes de recherche en éducation",
    "Coordination d’actions STEM",
  ],
  teachingPhilosophy:
    "Je crois que la physique doit être enseignée par la compréhension conceptuelle, la rigueur mathématique et l’expérimentation pratique. Mon approche met l’accent sur les applications réelles et encourage les étudiants à devenir des penseurs analytiques capables de résoudre des problèmes complexes.",
  courses: [
    {
      title: "Physique pour le Baccalauréat",
      subject: "Physique",
      rating: 4.9,
      reviewCount: 56,
      students: 342,
      price: "20 000 DZD",
      imageUrl: "https://placehold.co/600x400/e0f2fe/0891b2?text=Physique",
      description:
        "Préparation complète au baccalauréat en physique avec cours, TP et examens blancs.",
      level: "Avancé",
      duration: "16 semaines",
      objectives: [
        "Maîtriser les concepts fondamentaux du programme du Bac",
        "Développer des compétences de résolution d’exercices complexes",
        "S’exercer avec des sujets d’examen précédents",
      ],
      syllabus: [
        "Cinématique et Dynamique",
        "Travail, Énergie et Puissance",
        "Thermodynamique",
        "Électrostatique et Magnétisme",
        "Optique Géométrique",
      ],
    },
    {
      title: "Introduction à la Mécanique Quantique",
      subject: "Physique Avancée",
      rating: 4.7,
      reviewCount: 38,
      students: 215,
      price: "25 000 DZD",
      imageUrl: "https://placehold.co/600x400/f0fdfa/0d9488?text=Quantique",
      description:
        "Initiation aux principes de la mécanique quantique avec exemples et visualisations.",
      level: "Intermédiaire",
      duration: "12 semaines",
      objectives: [
        "Comprendre l’équation de Schrödinger",
        "Explorer la dualité onde-particule",
        "Analyser des phénomènes quantiques simples",
      ],
      syllabus: [
        "Origines historiques de la théorie quantique",
        "Fonction d’onde et interprétation",
        "Principe d’incertitude",
        "Tunneling quantique",
      ],
    },
    {
      title: "Physique pour Concours d’Entrée",
      subject: "Préparation Concours",
      rating: 4.8,
      reviewCount: 42,
      students: 520,
      price: "15 000 DZD",
      imageUrl: "https://placehold.co/600x400/eff6ff/3b82f6?text=Concours",
      description:
        "Stratégies et exercices pour réussir les concours d’entrée aux écoles d’ingénieurs.",
      level: "Moyen à Avancé",
      duration: "8 semaines",
      objectives: [
        "Sélectionner les exercices types des concours",
        "Appliquer des méthodes de résolution rapide",
        "Gérer le temps pendant l’épreuve",
      ],
      syllabus: [
        "Mécanique et Électricité",
        "Optique et Ondes",
        "Thermodynamique",
        "Électromagnétisme",
      ],
    },
    {
      title: "La Physique au Quotidien",
      subject: "Physique Générale",
      rating: 4.9,
      reviewCount: 67,
      students: 430,
      price: "10 000 DZD",
      imageUrl: "https://placehold.co/600x400/fef2f2/ef4444?text=Quotidien",
      description:
        "Découvrez la physique à travers des exemples de la vie de tous les jours.",
      level: "Débutant",
      duration: "10 semaines",
      objectives: [
        "Identifier les principes physiques dans la vie courante",
        "Appliquer des concepts simples pour expliquer des phénomènes",
      ],
      syllabus: [
        "Physique du mouvement",
        "Thermodynamique domestique",
        "Optique et illusions",
      ],
    },
  ],
  reviews: [
    {
      name: "Karim B.",
      avatar: "https://placehold.co/40x40/f0fdfa/0d9488?text=KB",
      rating: 5,
      comment:
        "M. Haddad explique toujours clairement et rend les sujets complexes très compréhensibles.",
      date: "15 March 2025",
      course: "Physique pour le Baccalauréat",
    },
    {
      name: "Amina S.",
      avatar: "https://placehold.co/40x40/eff6ff/3b82f6?text=AS",
      rating: 5,
      comment:
        "Grâce à ses méthodes, j'ai obtenu 18/20 au Bac de Physique cette année !",
      date: "28 February 2025",
      course: "Physique pour le Baccalauréat",
    },
    {
      name: "Youssef L.",
      avatar: "https://placehold.co/40x40/fef2f2/ef4444?text=YL",
      rating: 4,
      comment:
        "Très bon enseignant, mais la charge de travail est parfois lourde.",
      date: "10 January 2025",
      course: "Introduction à la Mécanique Quantique",
    },
  ],
  schedule: [
    {
      day: "Monday",
      time: "09:00 – 10:30",
      course: "Physique pour le Baccalauréat",
      location: "Salle 305",
      availableSeats: 2,
      mode: "In-person",
    },
    {
      day: "Monday",
      time: "13:00 – 14:30",
      course: "Introduction à la Mécanique Quantique",
      location: "Salle 305",
      availableSeats: 5,
      mode: "In-person",
    },
    {
      day: "Tuesday",
      time: "10:00 – 11:30",
      course: "Physique pour Concours d’Entrée",
      location: "Salle 308",
      availableSeats: 0,
      mode: "In-person",
    },
    {
      day: "Wednesday",
      time: "09:00 – 10:30",
      course: "Physique pour le Baccalauréat",
      location: "Salle 305",
      availableSeats: 2,
      mode: "In-person",
    },
    {
      day: "Thursday",
      time: "10:00 – 11:30",
      course: "Physique pour Concours d’Entrée",
      location: "Salle 308",
      availableSeats: 0,
      mode: "In-person",
    },
    {
      day: "Friday",
      time: "13:00 – 14:30",
      course: "Introduction à la Mécanique Quantique",
      location: "Salle 305",
      availableSeats: 5,
      mode: "In-person",
    },
    {
      day: "Saturday",
      time: "11:00 – 12:30",
      course: "La Physique au Quotidien",
      location: "Online",
      availableSeats: 15,
      mode: "Virtual",
    },
  ],
  achievements: [
    {
      title: "Enseignant de l’Année",
      organization: "Lycée Ibn Khaldoun",
      year: "2023",
      description: "Reconnu pour ses méthodes pédagogiques innovantes",
    },
    {
      title: "Prix d’Excellence STEM",
      organization: "Ministère de l’Éducation",
      year: "2022",
      description: "Pour le développement d’un nouveau module de physique",
    },
    {
      title: "Coach Olympiade de Physique",
      organization: "Commission Nationale des Olympiades",
      year: "2021–Present",
      description: "Qualification des élèves à la finale nationale trois années de suite",
    },
  ],
  teachingMaterials: [
    {
      title: "Simulations Physiques Interactives",
      type: "Digital Resource",
      description: "Collection de simulations pour visualiser des concepts complexes",
      downloadable: true,
    },
    {
      title: "Cahier d’Exercices",
      type: "PDF",
      description: "Exercices corrigés étape par étape pour le programme du Bac",
      downloadable: true,
    },
    {
      title: "Vidéos Pédagogiques",
      type: "Video",
      description: "Courtes vidéos explicatives de notions clés",
      downloadable: false,
    },
  ],
  languages: [
    { language: "Arabic", proficiency: "Native" },
    { language: "French", proficiency: "Fluent" },
    { language: "English", proficiency: "Conversational" },
  ],
  availability: {
    nextAvailable: "2025-04-20",
    bookingWindow: "6 weeks in advance",
    privateSessionRate: "10 000 DZD/hour",
    groupSessionRate: "6 000 DZD/person (min. 3)",
  },
  verificationStatus: {
    identityVerified: true,
    backgroundChecked: true,
    qualificationsVerified: true,
    lastVerified: "2025-01-15",
  },
  visits: 12450,
  dataCompleteness: 92.5,
  digitalPresence: 78,
  license: {
    number: "EDU-TCH-ALG-7891",
    issuedBy: "Ministère de l’Éducation Nationale",
    issuedDate: "2018-05-15",
    expiryDate: "2028-05-14",
    status: "Active",
  },
};

  // Determine if the user can access management features
  const canManage = userType === "teacher" || userType === "institution"

  // Add this function to handle adding teacher to compare
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
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/COVER-qPMdllCHadT3gAlyFPFd0LTNnv4yCp.png"
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMAGE-XqiY0VovMERFdD7vuaEzMXwJspb8fh.png"
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
                {teacher.verificationStatus.qualificationsVerified && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                    <Check className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-1 text-gray-500">
                <GraduationCap className="h-4 w-4 mr-1" />
                <span className="text-sm mr-3">{teacher.subject} Specialist</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(teacher.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">
                    {teacher.rating}/5 ({teacher.reviewCount} reviews)
                  </span>
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
                <p className="text-sm text-gray-500">Profile Visits</p>
                <p className="text-2xl font-bold">{teacher.visits.toLocaleString()}</p>
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
                <p className="text-sm text-gray-500">Profile Completeness</p>
                <p className="text-2xl font-bold">{teacher.dataCompleteness}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <Progress value={teacher.dataCompleteness} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Digital Presence</p>
                <p className="text-2xl font-bold">{teacher.digitalPresence}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <Progress value={teacher.digitalPresence} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Booking Card */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-bold">Session Rates</h3>
                <p className="text-gray-500 mt-1">
                  Private: {teacher.availability.privateSessionRate} | Group: {teacher.availability.groupSessionRate}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Next Available: {teacher.availability.nextAvailable}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Book up to {teacher.availability.bookingWindow}
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

              {/* License Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    License & Certification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="border rounded-lg overflow-hidden shadow-md">
                        <div className="bg-green-50 p-3 border-b">
                          <h3 className="text-center font-medium text-green-800">Teacher License</h3>
                        </div>
                        <div className="p-4">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/card.jpg-sDPhRQJ0JJwcG7WRsCkaL5cFbr7pDg.jpeg"
                            alt="Teacher License Card"
                            className="w-full h-auto rounded-md mb-3"
                          />
                          <div className="text-center mt-2">
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                              Verified & Active
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-500">License Number</h4>
                          <p>{teacher.license.number}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Issued By</h4>
                          <p>{teacher.license.issuedBy}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Issue Date</h4>
                          <p>{new Date(teacher.license.issuedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Expiry Date</h4>
                          <p>{new Date(teacher.license.expiryDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Status</h4>
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            {teacher.license.status}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Verification</h4>
                          <p className="text-sm text-gray-600">
                            Last verified on {new Date(teacher.verificationStatus.lastVerified).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-green-600" />
                    Key Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Mail className="h-4 w-4 mr-2 text-green-600" />
                        Contact Information
                      </h4>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Email:</span>
                          <span>{teacher.contact.email}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Phone:</span>
                          <span>{teacher.contact.phone}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Office:</span>
                          <span>{teacher.contact.office}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Office Hours:</span>
                          <span>{teacher.contact.officeHours}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <GraduationCap className="h-4 w-4 mr-2 text-green-600" />
                        Education
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {teacher.education.map((edu, index) => (
                          <li key={index} className="text-sm">
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-gray-600">
                              {edu.institution}, {edu.year}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <BriefcaseIcon className="h-4 w-4 mr-2 text-green-600" />
                        Experience
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {teacher.experience.map((exp, index) => (
                          <li key={index} className="text-sm">
                            <p className="font-medium">{exp.position}</p>
                            <p className="text-gray-600">
                              {exp.institution}, {exp.period}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Award className="h-4 w-4 mr-2 text-green-600" />
                        Skills
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {teacher.skills.slice(0, 8).map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {skill}
                          </Badge>
                        ))}
                        {teacher.skills.length > 8 && (
                          <Badge variant="outline" className="bg-gray-50">
                            +{teacher.skills.length - 8} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Teaching Philosophy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{teacher.teachingPhilosophy}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Courses Offered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CourseGallery courses={teacher.courses} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-green-600" />
                    Student Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-4xl font-bold text-green-600 mr-4">{teacher.rating}</div>
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
                          <p className="text-sm text-gray-500">{teacher.reviewCount} reviews</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Write a Review
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {teacher.reviews.map((review, index) => (
                        <Review key={index} review={review} />
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      View All Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-green-600" />
                    Class Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ClassSchedule schedule={teacher.schedule} />
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <Button className="w-full">Book a Session</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="credentials" className="space-y-8">
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
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-1">
                        <div className="flex items-start gap-2">
                          <Award className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-gray-600">
                              {cert.issuer}, {cert.year}
                            </p>
                            <p className="text-xs text-gray-500">
                              Expires: {cert.expirationDate}, License: {cert.licenseNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

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
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-1">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{pub.title}</p>
                            <p className="text-sm text-gray-600">
                              {pub.journal}, {pub.year}
                            </p>
                            <a
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-500 hover:underline flex items-center gap-1"
                            >
                              View Publication <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="h-5 w-5 mr-2 text-green-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.achievements.map((achievement, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-1">
                        <div className="flex items-start gap-2">
                          <ThumbsUp className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-gray-600">
                              {achievement.organization}, {achievement.year}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Library className="h-5 w-5 mr-2 text-green-600" />
                    Teaching Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.teachingMaterials.map((material, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-1">
                        <div className="flex items-start gap-2">
                          <Library className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-gray-600">{material.type}</p>
                            <p className="text-xs text-gray-500 mt-1">{material.description}</p>
                            {material.downloadable && (
                              <Button variant="link" size="sm" className="pl-0">
                                Download <Download className="w-4 h-4 ml-1" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-green-600" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacher.languages.map((lang, index) => (
                      <div key={index} className="flex items-center gap-2 border rounded-lg p-3">
                        <Globe className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium">{lang.language}</p>
                          <p className="text-sm text-gray-500">{lang.proficiency}</p>
                        </div>
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
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Identity Verified</span>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Background Check</span>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Qualifications</span>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Verified</span>
                <span className="text-sm">
                  {new Date(teacher.verificationStatus.lastVerified).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Next Available</span>
                <span className="font-medium">{teacher.availability.nextAvailable}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Booking Window</span>
                <span>{teacher.availability.bookingWindow}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Private Session</span>
                <span className="font-medium">{teacher.availability.privateSessionRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Group Session</span>
                <span>{teacher.availability.groupSessionRate}</span>
              </div>
              <Button className="w-full">Book a Session</Button>
            </CardContent>
          </Card>

          {/* Compare Teachers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compare Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Add teachers to your comparison list to evaluate and find the best fit for your needs.
              </p>
              <Button
                variant={isInCompareList ? "destructive" : "default"}
                className="w-full"
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
              {compareList.length > 0 && (
                <div className="mt-3">
                  <Button variant="outline" className="w-full">
                    Compare {compareList.length} Teachers
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
