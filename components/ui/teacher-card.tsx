"use client"

import type React from "react"
import { Heart, MapPin, Star, GraduationCap, BookOpen, Plus, Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface TeacherType {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  locationDisplayText: string
  school: string
  subjects: string[]
  experience: number
  isCompared?: boolean
  isFavorite?: boolean
}

interface TeacherCardProps {
  teacher: TeacherType
  onViewProfile: (id: string) => void
  onToggleCompare: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  onViewProfile,
  onToggleCompare,
  onToggleFavorite,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img src={teacher.image || "/placeholder.svg"} alt={teacher.name} className="w-full h-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => onToggleFavorite(teacher.id)}
        >
          <Heart className={`h-5 w-5 ${teacher.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{teacher.name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{teacher.locationDisplayText}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{teacher.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({teacher.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4 text-green-500" />
            <span>{teacher.experience} yrs exp</span>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-1 text-sm text-gray-700 mb-2">
            <BookOpen className="h-4 w-4 text-green-600" />
            <span>{teacher.school}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {teacher.subjects.map((subject, index) => (
            <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
              {subject}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={() => onViewProfile(teacher.id)}>
          View Profile
        </Button>
        <Button
          variant={teacher.isCompared ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onToggleCompare(teacher.id)}
          className={teacher.isCompared ? "bg-green-100" : ""}
        >
          {teacher.isCompared ? (
            <>
              <Check className="h-4 w-4 mr-1" /> Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" /> Compare
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
