"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SignUpPageProps {
  navigateTo: (page: string) => void
}

export default function SignUpPage({ navigateTo }: SignUpPageProps) {
  const [userType, setUserType] = useState<"parent" | "student" | "teacher" | "institution" | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })

  const handleUserTypeSelect = (type: "parent" | "student" | "teacher" | "institution") => {
    setUserType(type)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle form submission
    console.log("Form submitted:", { userType, ...formData })
    navigateTo("home") // Navigate to home after successful signup
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {step === 1 ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">Join IBNI</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className="cursor-pointer hover:border-green-500 transition-colors"
                onClick={() => handleUserTypeSelect("parent")}
              >
                <CardHeader>
                  <CardTitle>I'm a Parent</CardTitle>
                  <CardDescription>Find schools and track your child's progress</CardDescription>
                </CardHeader>
              </Card>
              <Card
                className="cursor-pointer hover:border-green-500 transition-colors"
                onClick={() => handleUserTypeSelect("student")}
              >
                <CardHeader>
                  <CardTitle>I'm a Student</CardTitle>
                  <CardDescription>Find schools and track your own progress</CardDescription>
                </CardHeader>
              </Card>
              <Card
                className="cursor-pointer hover:border-green-500 transition-colors"
                onClick={() => handleUserTypeSelect("teacher")}
              >
                <CardHeader>
                  <CardTitle>I'm a Teacher</CardTitle>
                  <CardDescription>Create your profile and manage classes</CardDescription>
                </CardHeader>
              </Card>
              <Card
                className="cursor-pointer hover:border-green-500 transition-colors"
                onClick={() => handleUserTypeSelect("institution")}
              >
                <CardHeader>
                  <CardTitle>I'm an Institution</CardTitle>
                  <CardDescription>Manage your school and connect with students</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>Sign up as a {userType} to get started with IBNI</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Create Account</Button>
            </CardFooter>
          </Card>
        )}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <button onClick={() => navigateTo("login")} className="text-green-600 hover:underline">
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  )
}
