"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Phone, Mail, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PageTitle } from "@/components/ui/page-title"

interface BookDemoPageProps {
  navigateTo?: (page: string) => void
}

export default function BookDemoPage({ navigateTo }: BookDemoPageProps) {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    demoType: "online",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const handleNextStep = () => {
    setFormStep(2)
  }

  const handlePrevStep = () => {
    setFormStep(1)
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <PageTitle title="Book a Demo" icon={Calendar} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="w-full">
            {isSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Request Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in Cumpass. Our team will contact you shortly to confirm your demo
                  session.
                </p>
                <Button onClick={() => navigateTo && navigateTo("home")}>Return to Home</Button>
              </div>
            ) : (
              <>
                <CardHeader>
                  <CardTitle>Schedule Your Personalized Demo</CardTitle>
                  <CardDescription>
                    Learn how Cumpass can transform your educational experience with a personalized demonstration.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    {formStep === 1 ? (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              required
                              placeholder="Enter your full name"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              required
                              placeholder="Enter your email address"
                            />
                          </div>

                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                              required
                              placeholder="Enter your phone number"
                            />
                          </div>

                          <div>
                            <Label htmlFor="userType">I am a</Label>
                            <Select
                              value={formData.userType}
                              onValueChange={(value) => handleChange("userType", value)}
                              required
                            >
                              <SelectTrigger id="userType">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="parent">Parent</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="institution">School Administrator</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button type="button" onClick={handleNextStep} className="w-full">
                            Next Step
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-4">
                          <div>
                            <Label>Demo Type</Label>
                            <RadioGroup
                              value={formData.demoType}
                              onValueChange={(value) => handleChange("demoType", value)}
                              className="flex flex-col space-y-2 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="online" id="online" />
                                <Label htmlFor="online" className="cursor-pointer">
                                  Online Demo
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="in-person" id="in-person" />
                                <Label htmlFor="in-person" className="cursor-pointer">
                                  In-Person Demo
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label htmlFor="preferredDate">Preferred Date</Label>
                            <Input
                              id="preferredDate"
                              type="date"
                              value={formData.preferredDate}
                              onChange={(e) => handleChange("preferredDate", e.target.value)}
                              required
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>

                          <div>
                            <Label htmlFor="preferredTime">Preferred Time</Label>
                            <Select
                              value={formData.preferredTime}
                              onValueChange={(value) => handleChange("preferredTime", value)}
                              required
                            >
                              <SelectTrigger id="preferredTime">
                                <SelectValue placeholder="Select a time slot" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="message">Additional Information</Label>
                            <Textarea
                              id="message"
                              value={formData.message}
                              onChange={(e) => handleChange("message", e.target.value)}
                              placeholder="Tell us about your specific needs or questions"
                              rows={4}
                            />
                          </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <Button type="button" variant="outline" onClick={handlePrevStep}>
                            Back
                          </Button>
                          <Button type="submit" className="flex-1" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" /> Submit Request
                              </>
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Why Book a Demo?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Personalized Experience</h3>
                  <p className="text-sm text-gray-600">See how Cumpass can be tailored to your specific needs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Expert Guidance</h3>
                  <p className="text-sm text-gray-600">Get all your questions answered by our product specialists.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">See All Features</h3>
                  <p className="text-sm text-gray-600">Explore the full capabilities of our platform in action.</p>
                </div>
              </div>
            </CardContent>

            <CardHeader className="pt-0">
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <p>+213 555309404</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <p>ibni.2025dz@gmail.com</p>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <p>TLEMCEN</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-600" />
                <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
