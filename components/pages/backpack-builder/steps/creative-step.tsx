"use client"

import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface CreativeStepProps {
  childInfo: ChildInfo
  creative: BackpackItem[]
  updateCreative: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

export default function CreativeStep({ 
  childInfo, 
  creative, 
  updateCreative, 
  onNext, 
  onBack 
}: CreativeStepProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Choose Creative Supplies</h2>
        <Badge variant="outline" className="text-green-600">Optional</Badge>
      </div>
      
      <p className="text-gray-600 mb-8">
        This step will allow you to add creative supplies to {childInfo.name}'s backpack.
        These items are optional but can enhance your child's creative development.
      </p>
      
      {/* Placeholder for creative supplies selection interface */}
      <div className="p-8 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">Creative supplies selection interface will be implemented here</p>
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700 flex items-center">
          {creative.length === 0 ? "Skip this step" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
