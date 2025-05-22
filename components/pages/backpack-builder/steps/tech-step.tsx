"use client"

import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface TechStepProps {
  childInfo: ChildInfo
  tech: BackpackItem[]
  updateTech: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

export default function TechStep({ 
  childInfo, 
  tech, 
  updateTech, 
  onNext, 
  onBack 
}: TechStepProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add Tech Gear</h2>
        <Badge variant="outline" className="text-green-600">Optional</Badge>
      </div>
      
      <p className="text-gray-600 mb-8">
        This step will allow you to add educational technology to {childInfo.name}'s backpack.
        These items are optional but can enhance your child's learning experience.
      </p>
      
      {/* Placeholder for tech gear selection interface */}
      <div className="p-8 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">Tech gear selection interface will be implemented here</p>
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700 flex items-center">
          {tech.length === 0 ? "Skip this step" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
