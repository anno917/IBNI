"use client"

import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface BooksStepProps {
  childInfo: ChildInfo
  books: BackpackItem[]
  updateBooks: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

export default function BooksStep({ 
  childInfo, 
  books, 
  updateBooks, 
  onNext, 
  onBack 
}: BooksStepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Add Books by Grade</h2>
      
      <p className="text-gray-600 mb-8">
        This step will allow you to add books to {childInfo.name}'s backpack.
        We'll show recommended books based on {childInfo.name}'s grade level ({childInfo.grade}).
      </p>
      
      {/* Placeholder for books selection interface */}
      <div className="p-8 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">Books selection interface will be implemented here</p>
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700 flex items-center">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
