"use client"

import type React from "react"
import { Heart, MapPin, Star, Users, Plus, Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface SchoolType {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  locationDisplayText: string
  studentCount: number
  specialties: string[]
  isCompared?: boolean
  isFavorite?: boolean
}

interface SchoolCardProps {
  school: SchoolType
  onViewProfile: (id: string) => void
  onToggleCompare: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school, onViewProfile, onToggleCompare, onToggleFavorite }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img src={school.image || "/placeholder.svg"} alt={school.name} className="w-full h-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => onToggleFavorite(school.id)}
        >
          <Heart className={`h-5 w-5 ${school.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{school.name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{school.locationDisplayText}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{school.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({school.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-green-500" />
            <span>{school.studentCount} students</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {school.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={() => onViewProfile(school.id)}>
          View Profile
        </Button>
        <Button
          variant={school.isCompared ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onToggleCompare(school.id)}
          className={school.isCompared ? "bg-green-100" : ""}
        >
          {school.isCompared ? (
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
