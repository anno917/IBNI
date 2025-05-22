"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LayoutGrid, MapIcon, Search, Filter, ChevronRight, MapPin, School, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SchoolCard, type SchoolType } from "@/components/ui/school-card"
import { TeacherCard, type TeacherType } from "@/components/ui/teacher-card"
import { FilterPanel } from "@/components/ui/filter-panel"
import { MapView } from "@/components/ui/map-view"
import { ComparePanel } from "@/components/ui/compare-panel"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FindResourcePageProps {
  initialTab?: string
  navigateTo?: (page: string) => void
}

export default function FindResourcePage({ initialTab, navigateTo }: FindResourcePageProps) {
  const router = useRouter()
  const [resourceType, setResourceType] = useState<"schools" | "teachers">(initialTab === "teachers" ? "teachers" : "schools")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [comparedItems, setComparedItems] = useState<(SchoolType | TeacherType)[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  // Update resource type when initialTab changes
  useEffect(() => {
    if (initialTab === "teachers" || initialTab === "schools") {
      setResourceType(initialTab)
    }
  }, [initialTab])

  // Mock data for schools
  const schools: SchoolType[] = [
    {
      id: "school1",
      name: "Little Code Academy",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviewCount: 142,
      locationDisplayText: "Tlemcen",
      studentCount: 120,
      specialties: ["Coding & Programming", "Web Development", "Robotics & IoT"],
      isCompared: false,
      isFavorite: false,
    },
    {
      id: "school2",
      name: "École Internationale d'Alger",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviewCount: 215,
      locationDisplayText: "Algiers",
      studentCount: 620,
      specialties: ["International Baccalaureate", "Trilingual Education", "STEM Focus"],
      isCompared: false,
      isFavorite: true,
    },
    {
      id: "school3",
      name: "Collège El Feth",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      reviewCount: 98,
      locationDisplayText: "Oran",
      studentCount: 720,
      specialties: ["Arts & Culture", "Sports Excellence", "Scientific Research"],
      isCompared: false,
      isFavorite: false,
    },
    {
      id: "school4",
      name: "Lycée Descartes",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviewCount: 156,
      locationDisplayText: "Constantine",
      studentCount: 540,
      specialties: ["French-Algerian Curriculum", "Advanced Sciences", "Cultural Exchange"],
      isCompared: false,
      isFavorite: false,
    },
    {
      id: "school5",
      name: "École Polytechnique Préparatoire",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.3,
      reviewCount: 87,
      locationDisplayText: "Tlemcen",
      studentCount: 380,
      specialties: ["Engineering Preparation", "Advanced Mathematics", "Physics & Chemistry"],
      isCompared: false,
      isFavorite: false,
    },
    {
      id: "school6",
      name: "Académie Numérique d'Annaba",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviewCount: 142,
      locationDisplayText: "Annaba",
      studentCount: 490,
      specialties: ["Computer Science", "Digital Arts", "Entrepreneurship"],
      isCompared: false,
      isFavorite: false,
    },
  ]

  // Mock data for teachers
  const teachers: TeacherType[] = [
    {
      id: "teacher1",
      name: "Dr. Amina Kazi",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviewCount: 87,
      locationDisplayText: "Algiers",
      school: "Lycée Ibn Khaldoun",
      subjects: ["Physics", "Mathematics"],
      experience: 12,
      isCompared: false,
      isFavorite: true,
    },
    {
      id: "teacher2",
      name: "Karim Benali",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviewCount: 64,
      locationDisplayText: "Algiers",
      school: "École Internationale d'Alger",
      subjects: ["French Literature", "Philosophy"],
      experience: 8,
      isCompared: false,
      isFavorite: false,
    },
    {
      id: "teacher3",
      name: "Dr. Leila Hadj",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviewCount: 72,
      locationDisplayText: "Oran",
      school: "Collège El Feth",
      subjects: ["Biology", "Environmental Science"],
      experience: 15,
      isCompared: false,
      isFavorite: false,
    },
    {
      id: "teacher4",
      name: "Youcef Mansouri",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviewCount: 53,
      locationDisplayText: "Constantine",
      school: "Independent Educator",
      subjects: ["History", "Islamic Studies"],
      experience: 10,
      isCompared: false,
      isFavorite: false,
      isIndependent: true,
    },
    {
      id: "teacher5",
      name: "Nadia Bouaziz",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviewCount: 91,
      locationDisplayText: "Tlemcen",
      school: "Freelance Instructor",
      subjects: ["Computer Science", "Digital Arts"],
      experience: 7,
      isCompared: false,
      isFavorite: false,
      isIndependent: true,
    },
    {
      id: "teacher6",
      name: "Mourad Haddad",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviewCount: 68,
      locationDisplayText: "Annaba",
      school: "Académie Numérique d'Annaba",
      subjects: ["Physics", "Engineering"],
      experience: 14,
      isCompared: false,
      isFavorite: false,
    },
  ]

  // Cities for dropdown
  const cities = ["All Cities", "Algiers", "Oran", "Constantine", "Tlemcen", "Annaba", "Sétif", "Batna", "Blida"]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search functionality
  }

  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters)
    // Implement filter functionality
  }

  const handleClearFilters = () => {
    setActiveFilters([])
  }

  const handleViewProfile = (id: string) => {
    if (navigateTo) {
      // Use client-side navigation if navigateTo is provided
      if (resourceType === "schools") {
        // Navigate to school profile page based on ID
        if (id === "school2") {
          // For École Internationale d'Alger
          navigateTo("school-profile-eia")
        } else if (id === "school1") {
          // For Little Code Academy (using the existing profile page)
          navigateTo("school-profile-1")
        } else if (id === "school3") {
          // For Collège El Feth
          navigateTo("school-profile-elfeth")
        } else if (id === "school4") {
          // For Lycée Descartes
          navigateTo("school-profile-descartes")
        } else if (id === "school5") {
          // For École Polytechnique Préparatoire
          navigateTo("school-profile-polytechnique")
        } else if (id === "school6") {
          // For Académie Numérique d'Annaba
          navigateTo("school-profile-annaba")
        } else {
          // For any other schools, use the Little Code Academy profile for now
          navigateTo("school-profile-1")
        }
      } else {
        // Navigate to teacher profile page based on ID
        if (id === "teacher1") {
          // For Dr. Amina Kazi
          router.push(`/teacher-profile-kazi?fromFindResources=true`)
        } else if (id === "teacher2") {
          // For Karim Benali
          router.push(`/teacher-profile-benali?fromFindResources=true`)
        } else if (id === "teacher3") {
          // For Dr. Leila Hadj
          router.push(`/teacher-profile-hadj?fromFindResources=true`)
        } else if (id === "teacher4") {
          // For Youcef Mansouri
          router.push(`/teacher-profile-mansouri?fromFindResources=true`)
        } else if (id === "teacher5") {
          // For Nadia Bouaziz
          router.push(`/teacher-profile-bouaziz?fromFindResources=true`)
        } else if (id === "teacher6") {
          // For Mourad Haddad
          navigateTo("teachers-profile")
        } else {
          // For any other teachers, use Dr. Amina Kazi profile for now
          navigateTo("teacher-profile-kazi")
        }
      }
    } else {
      // Fallback to direct URL navigation if navigateTo is not provided
      if (resourceType === "schools") {
        // Navigate to school profile page based on ID
        if (id === "school2") {
          // For École Internationale d'Alger
          router.push(`/school-profile-eia`)
        } else if (id === "school1") {
          // For Little Code Academy (using the existing profile page)
          router.push(`/school-profile-1`)
        } else if (id === "school3") {
          // For Collège El Feth
          router.push(`/school-profile-elfeth`)
        } else if (id === "school4") {
          // For Lycée Descartes
          router.push(`/school-profile-descartes`)
        } else if (id === "school5") {
          // For École Polytechnique Préparatoire
          router.push(`/school-profile-polytechnique`)
        } else if (id === "school6") {
          // For Académie Numérique d'Annaba
          router.push(`/school-profile-annaba`)
        } else {
          // For other schools, use the Little Code Academy profile for now
          router.push(`/school-profile-1`)
        }
      } else {
        // Navigate to teacher profile page based on ID
        if (id === "teacher1") {
          // For Dr. Amina Kazi
          router.push(`/teacher-profile-kazi?fromFindResources=true`)
        } else if (id === "teacher2") {
          // For Karim Benali
          router.push(`/teacher-profile-benali?fromFindResources=true`)
        } else if (id === "teacher3") {
          // For Dr. Leila Hadj
          router.push(`/teacher-profile-hadj?fromFindResources=true`)
        } else if (id === "teacher4") {
          // For Youcef Mansouri
          router.push(`/teacher-profile-mansouri?fromFindResources=true`)
        } else if (id === "teacher5") {
          // For Nadia Bouaziz
          router.push(`/teacher-profile-bouaziz?fromFindResources=true`)
        } else if (id === "teacher6") {
          // For Mourad Haddad
          router.push(`/teachers-profile`)
        } else {
          // For other teachers, use Dr. Amina Kazi profile for now
          router.push(`/teacher-profile-kazi`)
        }
      }
    }
  }

  const handleToggleCompare = (id: string) => {
    if (resourceType === "schools") {
      const school = schools.find((s) => s.id === id)
      if (school) {
        const isAlreadyCompared = comparedItems.some((item) => item.id === id)

        if (isAlreadyCompared) {
          setComparedItems(comparedItems.filter((item) => item.id !== id))
        } else {
          if (comparedItems.length < 4) {
            setComparedItems([...comparedItems, school])
          }
        }
      }
    } else {
      const teacher = teachers.find((t) => t.id === id)
      if (teacher) {
        const isAlreadyCompared = comparedItems.some((item) => item.id === id)

        if (isAlreadyCompared) {
          setComparedItems(comparedItems.filter((item) => item.id !== id))
        } else {
          if (comparedItems.length < 4) {
            setComparedItems([...comparedItems, teacher])
          }
        }
      }
    }
  }

  const handleToggleFavorite = (id: string) => {
    console.log("Toggle favorite for:", id)
    // Implement favorite functionality
  }

  const handleRemoveCompare = (id: string) => {
    setComparedItems(comparedItems.filter((item) => item.id !== id))
  }

  const handleClearCompare = () => {
    setComparedItems([])
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <div className="flex items-center mb-2">
              {/* Replaced YaSchools with IBNI here */}
              <h1 className="text-2xl md:text-3xl font-bold text-green-600 mr-2">IBNI</h1>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              The largest and most comprehensive {resourceType} platform
            </h2>
            <p className="text-gray-600 mb-6">
              You can search and compare more than 1,800 {resourceType} and educational complexes
            </p>

            <div className="flex space-x-4 mb-6">
              <Button
                variant={resourceType === "schools" ? "default" : "outline"}
                className={`rounded-full px-6 ${resourceType === "schools" ? "bg-green-600" : ""}`}
                onClick={() => setResourceType("schools")}
              >
                <School className="h-4 w-4 mr-2" />
                Schools
              </Button>
              <Button
                variant={resourceType === "teachers" ? "default" : "outline"}
                className={`rounded-full px-6 ${resourceType === "teachers" ? "bg-green-600" : ""}`}
                onClick={() => setResourceType("teachers")}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Teachers
              </Button>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-2 p-2 bg-white rounded-lg shadow-sm border border-green-200">
              <div className="flex-grow relative">
                <Input
                  type="text"
                  placeholder={`Search for ${resourceType === "schools" ? "school" : "teacher"} name...`}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full md:w-[180px] border-0 focus:ring-0">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex items-center mt-4 text-green-600">
              <MapPin className="h-4 w-4 mr-2" />
              <a href="#" className="text-green-600 hover:underline mr-6" onClick={() => setViewMode("map")}>
                Explore {resourceType} on the map
              </a>

              <a href="#" className="text-green-600 hover:underline flex items-center">
                All {resourceType}
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>

          <div className="md:w-1/3">{/* Image section removed as requested */}</div>
        </div>
      </div>

      {/* Filter Controls */}
      {filtersExpanded && (
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
          <FilterPanel
            type={resourceType}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeFilters={activeFilters}
            isExpanded={filtersExpanded}
            onToggleExpand={() => setFiltersExpanded(!filtersExpanded)}
          />
        </div>
      )}

      {/* View Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-green-800">
          {resourceType === "schools" ? "Schools" : "Teachers"} (
          {resourceType === "schools" ? schools.length : teachers.length})
        </h2>

        <div className="flex items-center gap-2">
          <Button
            variant={!filtersExpanded ? "outline" : "secondary"}
            size="sm"
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            {filtersExpanded ? "Hide Filters" : "Show Filters"}
          </Button>

          <Button
            variant={viewMode === "grid" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="flex items-center gap-1"
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </Button>

          <Button
            variant={viewMode === "map" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="flex items-center gap-1"
          >
            <MapIcon className="h-4 w-4" />
            Map
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceType === "schools"
              ? schools.map((school) => (
                  <SchoolCard
                    key={school.id}
                    school={{
                      ...school,
                      isCompared: comparedItems.some((item) => item.id === school.id),
                    }}
                    onViewProfile={handleViewProfile}
                    onToggleCompare={handleToggleCompare}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))
              : teachers.map((teacher) => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={{
                      ...teacher,
                      isCompared: comparedItems.some((item) => item.id === teacher.id),
                    }}
                    onViewProfile={handleViewProfile}
                    onToggleCompare={handleToggleCompare}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
          </div>
        ) : (
          <MapView
            data={resourceType === "schools" ? schools : teachers}
            type={resourceType}
            onSelectItem={handleViewProfile}
          />
        )}
      </div>

      {comparedItems.length > 0 && (
        <ComparePanel
          type={resourceType}
          items={comparedItems}
          onRemove={handleRemoveCompare}
          onClear={handleClearCompare}
          onViewProfile={handleViewProfile}
        />
      )}
    </div>
  )
}
