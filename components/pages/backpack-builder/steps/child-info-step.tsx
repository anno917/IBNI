"use client"

import React, { useState, useEffect } from "react"
import { ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChildInfo } from "../backpack-builder-page"

interface ChildInfoStepProps {
  childInfo: ChildInfo
  updateChildInfo: (childInfo: ChildInfo) => void
  onNext: () => void
}

export default function ChildInfoStep({ childInfo, updateChildInfo, onNext }: ChildInfoStepProps) {
  const [name, setName] = useState(childInfo.name || "")
  const [grade, setGrade] = useState(childInfo.grade || "")
  const [gender, setGender] = useState<"boy" | "girl" | "unspecified">(childInfo.gender || "unspecified")
  const [nameError, setNameError] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Grade level options
  const gradeOptions = [
    { value: "preschool", label: "Preschool" },
    { value: "grade-1", label: "Grade 1" },
    { value: "grade-2", label: "Grade 2" },
    { value: "grade-3", label: "Grade 3" },
    { value: "grade-4", label: "Grade 4" },
    { value: "grade-5", label: "Grade 5" },
    { value: "grade-6", label: "Grade 6" },
    { value: "grade-7", label: "Grade 7" },
    { value: "grade-8", label: "Grade 8" },
    { value: "grade-9", label: "Grade 9" },
    { value: "grade-10", label: "Grade 10" },
    { value: "grade-11", label: "Grade 11" },
    { value: "grade-12", label: "Grade 12" },
  ]

  // Validate name on change
  useEffect(() => {
    if (formSubmitted) {
      validateName(name)
    }
  }, [name, formSubmitted])

  // Validate name
  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Child's name is required")
      return false
    }
    
    if (value.length > 50) {
      setNameError("Name must be 50 characters or less")
      return false
    }
    
    // Check for special characters (allow letters, spaces, hyphens, and apostrophes)
    const nameRegex = /^[A-Za-z\s'-]+$/
    if (!nameRegex.test(value)) {
      setNameError("Name contains invalid characters")
      return false
    }
    
    setNameError("")
    return true
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    
    const isNameValid = validateName(name)
    
    if (isNameValid && grade) {
      updateChildInfo({
        name,
        grade,
        gender,
      })
      onNext()
    }
  }

  // Check if form is valid
  const isFormValid = name.trim() !== "" && grade !== "" && !nameError

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's Build a Backpack!</h2>
        <p className="text-gray-600">
          Tell us about your child so we can personalize their backpack with age-appropriate supplies.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Child's Name */}
          <div className="space-y-2">
            <Label htmlFor="child-name" className="text-base">
              Child's Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="child-name"
              placeholder="Enter your child's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={nameError ? "border-red-500" : ""}
              maxLength={50}
            />
            {nameError && (
              <p className="text-sm text-red-500 mt-1">{nameError}</p>
            )}
            <p className="text-xs text-gray-500">
              This will be used to personalize their backpack experience.
            </p>
          </div>

          {/* Grade Level */}
          <div className="space-y-2">
            <Label htmlFor="grade-level" className="text-base">
              Grade Level <span className="text-red-500">*</span>
            </Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger id="grade-level" className="w-full">
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                {gradeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formSubmitted && !grade && (
              <p className="text-sm text-red-500 mt-1">Please select a grade level</p>
            )}
            <p className="text-xs text-gray-500">
              We'll recommend age-appropriate supplies based on grade level.
            </p>
          </div>

          {/* Gender (Optional) */}
          <div className="space-y-2">
            <Label className="text-base">Gender (Optional)</Label>
            <RadioGroup value={gender} onValueChange={(value: "boy" | "girl" | "unspecified") => setGender(value)}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="boy" id="gender-boy" />
                  <Label htmlFor="gender-boy" className="font-normal">Boy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="girl" id="gender-girl" />
                  <Label htmlFor="gender-girl" className="font-normal">Girl</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unspecified" id="gender-unspecified" />
                  <Label htmlFor="gender-unspecified" className="font-normal">Prefer not to specify</Label>
                </div>
              </div>
            </RadioGroup>
            <p className="text-xs text-gray-500">
              This helps us suggest appropriate uniform options if needed.
            </p>
          </div>

          {/* Privacy Note */}
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertTitle>Privacy Note</AlertTitle>
            <AlertDescription>
              This information is only used to personalize your shopping experience and is not shared with third parties.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              disabled={formSubmitted && !isFormValid}
            >
              Next Step
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
