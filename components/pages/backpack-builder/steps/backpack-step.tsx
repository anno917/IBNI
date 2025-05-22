"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, Plus, Minus, Check, Star, Info, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface BackpackStepProps {
  childInfo: ChildInfo
  backpack: BackpackItem[]
  updateBackpack: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

// Mock backpack data
const mockBackpacks = [
  {
    id: "backpack-1",
    name: "Elementary School Backpack",
    price: 2500,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Lightweight backpack with multiple compartments, perfect for younger students.",
    features: ["Padded shoulder straps", "Water bottle pocket", "Front pocket for small items", "Main compartment with divider"],
    dimensions: "30cm x 25cm x 12cm",
    volume: "9L",
    weight: "0.4kg",
    colors: ["blue", "pink", "green", "purple"],
    sizes: ["small"],
    rating: 4.5,
    reviewCount: 128,
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3"],
  },
  {
    id: "backpack-2",
    name: "Middle School Backpack",
    price: 3200,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Durable backpack with laptop sleeve and organized storage for upper elementary and middle school students.",
    features: ["Padded laptop sleeve (up to 13\")", "Ergonomic back panel", "Multiple compartments", "Reinforced bottom"],
    dimensions: "40cm x 30cm x 15cm",
    volume: "18L",
    weight: "0.6kg",
    colors: ["navy", "black", "teal", "red"],
    sizes: ["medium"],
    rating: 4.7,
    reviewCount: 95,
    gradeLevel: ["grade-4", "grade-5", "grade-6", "grade-7", "grade-8"],
  },
  {
    id: "backpack-3",
    name: "High School Backpack",
    price: 4500,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Premium backpack with advanced organization and comfort features for high school students.",
    features: ["Padded laptop sleeve (up to 15\")", "USB charging port", "Anti-theft pocket", "Airflow back system"],
    dimensions: "45cm x 32cm x 18cm",
    volume: "26L",
    weight: "0.8kg",
    colors: ["black", "gray", "navy", "burgundy"],
    sizes: ["large"],
    rating: 4.8,
    reviewCount: 76,
    gradeLevel: ["grade-9", "grade-10", "grade-11", "grade-12"],
  },
]

// Mock accessories data
const mockAccessories = [
  {
    id: "accessory-1",
    name: "Matching Lunch Bag",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "accessories",
    description: "Insulated lunch bag that matches your backpack style.",
    features: ["Insulated interior", "Easy-clean lining", "Carrying handle", "Zippered closure"],
    dimensions: "25cm x 20cm x 10cm",
    colors: ["blue", "pink", "green", "purple", "navy", "black", "teal", "red", "gray", "burgundy"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
  },
  {
    id: "accessory-2",
    name: "Water Bottle",
    price: 800,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "accessories",
    description: "Durable water bottle with leak-proof lid.",
    features: ["BPA-free", "500ml capacity", "Leak-proof lid", "Easy-carry loop"],
    dimensions: "22cm x 7cm diameter",
    colors: ["blue", "pink", "green", "purple", "navy", "black", "teal", "red"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
  },
  {
    id: "accessory-3",
    name: "Pencil Case",
    price: 600,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "accessories",
    description: "Spacious pencil case with multiple compartments.",
    features: ["Multiple compartments", "Durable zipper", "Mesh pockets", "Carrying handle"],
    dimensions: "20cm x 10cm x 5cm",
    colors: ["blue", "pink", "green", "purple", "navy", "black", "teal", "red"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
  },
]

export default function BackpackStep({ childInfo, backpack, updateBackpack, onNext, onBack }: BackpackStepProps) {
  const [sortBy, setSortBy] = useState("recommended")
  const [selectedBackpack, setSelectedBackpack] = useState<string | null>(
    backpack.find(item => item.subcategory === "backpacks")?.id || null
  )

  // Filter backpacks based on child's grade
  const filteredBackpacks = mockBackpacks.filter(item =>
    item.gradeLevel.includes(childInfo.grade)
  )

  // Sort backpacks
  const sortedBackpacks = [...filteredBackpacks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0 // recommended - keep original order
    }
  })

  // Filter accessories based on child's grade
  const filteredAccessories = mockAccessories.filter(item =>
    item.gradeLevel.includes(childInfo.grade)
  )

  // Add backpack to selection
  const addBackpack = (item: any, color: string, size: string) => {
    // Remove any existing backpack
    const updatedBackpack = backpack.filter(i => i.subcategory !== "backpacks")

    // Add the new backpack
    const newItem: BackpackItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      subcategory: item.subcategory,
      quantity: 1,
      color,
      size,
    }

    updateBackpack([...updatedBackpack, newItem])
    setSelectedBackpack(item.id)
  }

  // Add accessory to selection
  const addAccessory = (item: any, color: string) => {
    const existingItemIndex = backpack.findIndex(
      i => i.id === item.id && i.color === color
    )

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedBackpack = [...backpack]
      updatedBackpack[existingItemIndex].quantity += 1
      updateBackpack(updatedBackpack)
    } else {
      // Add new item
      const newItem: BackpackItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        subcategory: item.subcategory,
        quantity: 1,
        color,
      }
      updateBackpack([...backpack, newItem])
    }
  }

  // Update item quantity
  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const updatedBackpack = backpack.filter((_, i) => i !== index)

      // If removing the main backpack, clear the selection
      if (backpack[index].subcategory === "backpacks") {
        setSelectedBackpack(null)
      }

      updateBackpack(updatedBackpack)
    } else {
      // Update quantity
      const updatedBackpack = [...backpack]
      updatedBackpack[index].quantity = quantity
      updateBackpack(updatedBackpack)
    }
  }

  // Calculate total items and cost
  const totalItems = backpack.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = backpack.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Check if bundle discount applies
  const hasBackpack = backpack.some(item => item.subcategory === "backpacks")
  const hasLunchBag = backpack.some(item => item.id === "accessory-1")
  const hasWaterBottle = backpack.some(item => item.id === "accessory-2")
  const hasPencilCase = backpack.some(item => item.id === "accessory-3")

  const bundleDiscount = hasBackpack &&
    (hasLunchBag || hasWaterBottle || hasPencilCase) ?
    0.1 : 0 // 10% discount if backpack + at least one accessory

  const discountAmount = totalCost * bundleDiscount
  const discountedTotal = totalCost - discountAmount

  // State for color selection
  const [selectedColor, setSelectedColor] = useState("")

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Choose a Backpack</h2>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Backpacks and accessories */}
        <div className="md:col-span-2">
          <Tabs defaultValue="backpacks" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="backpacks" className="flex-1">Backpacks</TabsTrigger>
              <TabsTrigger value="accessories" className="flex-1">Accessories</TabsTrigger>
            </TabsList>

            <TabsContent value="backpacks">
              {sortedBackpacks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sortedBackpacks.map(item => (
                    <Card
                      key={item.id}
                      className={`overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full ${
                        selectedBackpack === item.id ? 'ring-2 ring-green-600 shadow-md' : ''
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={item.image || "/placeholder.svg?height=300&width=300"}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {selectedBackpack === item.id && (
                          <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-medium line-clamp-2">{item.name}</CardTitle>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(item.rating)
                                    ? "text-amber-500 fill-amber-500"
                                    : i < item.rating
                                      ? "text-amber-500 fill-amber-500 opacity-50"
                                      : "text-gray-300"
                                }`}
                                strokeWidth={1}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({item.reviewCount})</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                        <div className="space-y-3">
                          {/* Key features */}
                          <div>
                            <h4 className="text-sm font-medium mb-1">Key Features:</h4>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {item.features.slice(0, 3).map((feature: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-green-600 mr-1">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Color selector */}
                          <div>
                            <label className="text-sm font-medium block mb-1">Color:</label>
                            <div className="flex flex-wrap gap-2">
                              {item.colors.map((color: string) => (
                                <button
                                  key={color}
                                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                                    selectedColor === color
                                      ? 'border-green-600 scale-110'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                  style={{
                                    backgroundColor:
                                      color === "blue" ? "#1e88e5" :
                                      color === "pink" ? "#ec407a" :
                                      color === "green" ? "#43a047" :
                                      color === "purple" ? "#8e24aa" :
                                      color === "navy" ? "#0d47a1" :
                                      color === "black" ? "#212121" :
                                      color === "teal" ? "#00897b" :
                                      color === "red" ? "#e53935" :
                                      color === "gray" ? "#757575" :
                                      color === "burgundy" ? "#800020" : "#ffffff"
                                  }}
                                  onClick={() => setSelectedColor(color)}
                                  title={color}
                                >
                                  {selectedColor === color && (
                                    <Check className={`h-3 w-3 mx-auto ${['blue', 'pink', 'green', 'teal'].includes(color) ? 'text-white' : 'text-white'}`} />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                        <span className="font-bold text-green-600">
                          {(item.price / 100).toFixed(2)} DZD
                        </span>
                        <Button
                          className={`${
                            selectedBackpack === item.id
                              ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                          onClick={() => addBackpack(item, selectedColor, item.sizes[0])}
                        >
                          {selectedBackpack === item.id ? "Selected" : "Select"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No backpacks available for this grade level</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="accessories">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Matching Accessories</h3>
                <p className="text-sm text-gray-600">
                  Add these accessories to complete your backpack set. Get a 10% discount when you buy a backpack with any accessory!
                </p>
              </div>

              {filteredAccessories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAccessories.map(item => (
                    <Card
                      key={item.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={item.image || "/placeholder.svg?height=300&width=300"}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {backpack.some(i => i.id === item.id) && (
                          <Badge className="absolute top-2 right-2 bg-green-600">
                            Added
                          </Badge>
                        )}
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base font-medium line-clamp-2">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>

                        {/* Color selector */}
                        <div className="mb-3">
                          <label className="text-sm font-medium block mb-1">Color:</label>
                          <div className="flex flex-wrap gap-2">
                            {item.colors.map((color: string) => (
                              <button
                                key={color}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${
                                  selectedColor === color
                                    ? 'border-green-600 scale-110'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                style={{
                                  backgroundColor:
                                    color === "blue" ? "#1e88e5" :
                                    color === "pink" ? "#ec407a" :
                                    color === "green" ? "#43a047" :
                                    color === "purple" ? "#8e24aa" :
                                    color === "navy" ? "#0d47a1" :
                                    color === "black" ? "#212121" :
                                    color === "teal" ? "#00897b" :
                                    color === "red" ? "#e53935" :
                                    color === "gray" ? "#757575" :
                                    color === "burgundy" ? "#800020" : "#ffffff"
                                }}
                                onClick={() => setSelectedColor(color)}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                        <span className="font-bold text-green-600">
                          {(item.price / 100).toFixed(2)} DZD
                        </span>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => addAccessory(item, selectedColor)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No accessories available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Selected items summary */}
        <div className="md:col-span-1">
          <div className="bg-green-50 rounded-lg border p-4 sticky top-24">
            <h3 className="font-semibold mb-3">Selected Items</h3>

            {backpack.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-2">No items selected</p>
                <p className="text-sm text-gray-400">Select a backpack to continue</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[300px] overflow-y-auto mb-3">
                  {backpack.map((item, index) => (
                    <div key={`${item.id}-${item.color}-${index}`} className="flex items-center justify-between bg-white p-2 rounded border">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden mr-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          {item.color && (
                            <p className="text-xs text-gray-500">Color: {item.color}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateItemQuantity(index, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateItemQuantity(index, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal:</span>
                    <span>{(totalCost / 100).toFixed(2)} DZD</span>
                  </div>

                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Bundle Discount (10%):</span>
                      <span>-{(discountAmount / 100).toFixed(2)} DZD</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{(discountedTotal / 100).toFixed(2)} DZD</span>
                  </div>
                </div>

                {bundleDiscount > 0 && (
                  <div className="mt-3 p-2 bg-green-100 rounded text-sm text-green-700">
                    <p className="flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      You're saving 10% with the backpack bundle!
                    </p>
                  </div>
                )}
              </>
            )}

            {!hasBackpack && (
              <div className="mt-4 text-sm text-gray-600">
                <p>A backpack is required to proceed to the next step.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-green-600 hover:bg-green-700 flex items-center"
          disabled={!hasBackpack}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
