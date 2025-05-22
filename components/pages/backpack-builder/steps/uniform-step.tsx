"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Plus, Minus, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface UniformStepProps {
  childInfo: ChildInfo
  uniform: BackpackItem[]
  updateUniform: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

// Mock uniform data
const mockUniforms = [
  // Shirts
  {
    id: "uniform-1",
    name: "School Polo Shirt",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "shirts",
    description: "Classic polo shirt with school logo, 100% cotton",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["white", "light-blue", "navy"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6"],
    gender: ["boy", "girl", "unspecified"],
  },
  {
    id: "uniform-2",
    name: "Oxford Button-Up Shirt",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "shirts",
    description: "Formal button-up shirt, wrinkle-resistant fabric",
    sizes: ["8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["white", "light-blue"],
    gradeLevel: ["grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
    gender: ["boy", "girl", "unspecified"],
  },
  {
    id: "uniform-3",
    name: "Girls' Peter Pan Collar Blouse",
    price: 1400,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "shirts",
    description: "Girls' blouse with Peter Pan collar, easy-care fabric",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["white"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6"],
    gender: ["girl"],
  },
  
  // Pants/Skirts
  {
    id: "uniform-4",
    name: "Boys' Flat Front Pants",
    price: 1800,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "pants",
    description: "Durable flat front pants with adjustable waist",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["navy", "gray", "black"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
    gender: ["boy", "unspecified"],
  },
  {
    id: "uniform-5",
    name: "Girls' Pleated Skirt",
    price: 1600,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "skirts",
    description: "Pleated skirt with inner shorts, wrinkle-resistant",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["navy", "plaid", "gray"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
    gender: ["girl"],
  },
  
  // Sportswear
  {
    id: "uniform-6",
    name: "PE T-Shirt",
    price: 900,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "sportswear",
    description: "Breathable PE t-shirt with school logo",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["white", "red"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
    gender: ["boy", "girl", "unspecified"],
  },
  {
    id: "uniform-7",
    name: "PE Shorts",
    price: 1100,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "sportswear",
    description: "Comfortable PE shorts with elastic waist",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["navy", "black"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
    gender: ["boy", "girl", "unspecified"],
  },
  
  // Jackets
  {
    id: "uniform-8",
    name: "School Cardigan",
    price: 2200,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "jackets",
    description: "Warm knitted cardigan with school logo",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["navy", "burgundy"],
    gradeLevel: ["preschool", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6"],
    gender: ["boy", "girl", "unspecified"],
  },
  {
    id: "uniform-9",
    name: "School Blazer",
    price: 3500,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "jackets",
    description: "Formal school blazer with embroidered logo",
    sizes: ["8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["navy", "black"],
    gradeLevel: ["grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
    gender: ["boy", "girl", "unspecified"],
  },
]

export default function UniformStep({ childInfo, uniform, updateUniform, onNext, onBack }: UniformStepProps) {
  const [activeTab, setActiveTab] = useState("shirts")
  const [showSizeChart, setShowSizeChart] = useState(false)
  
  // Filter uniforms based on child's grade and gender
  const filteredUniforms = mockUniforms.filter(item => {
    const matchesGrade = item.gradeLevel.includes(childInfo.grade)
    const matchesGender = !childInfo.gender || item.gender.includes(childInfo.gender) || item.gender.includes("unspecified")
    return matchesGrade && matchesGender
  })
  
  // Group uniforms by subcategory
  const shirts = filteredUniforms.filter(item => item.subcategory === "shirts")
  const pantsSkirts = filteredUniforms.filter(item => ["pants", "skirts"].includes(item.subcategory || ""))
  const sportswear = filteredUniforms.filter(item => item.subcategory === "sportswear")
  const jackets = filteredUniforms.filter(item => item.subcategory === "jackets")
  
  // Add item to uniform
  const addItem = (item: any, size: string, color: string) => {
    const existingItemIndex = uniform.findIndex(
      i => i.id === item.id && i.size === size && i.color === color
    )
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedUniform = [...uniform]
      updatedUniform[existingItemIndex].quantity += 1
      updateUniform(updatedUniform)
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
        size,
        color,
      }
      updateUniform([...uniform, newItem])
    }
  }
  
  // Update item quantity
  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const updatedUniform = uniform.filter((_, i) => i !== index)
      updateUniform(updatedUniform)
    } else {
      // Update quantity
      const updatedUniform = [...uniform]
      updatedUniform[index].quantity = quantity
      updateUniform(updatedUniform)
    }
  }
  
  // Calculate total items and cost
  const totalItems = uniform.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = uniform.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Render uniform item card
  const UniformItemCard = ({ item }: { item: any }) => {
    const [selectedSize, setSelectedSize] = useState(item.sizes[0])
    const [selectedColor, setSelectedColor] = useState(item.colors[0])
    
    return (
      <Card className="overflow-hidden">
        <div className="aspect-square relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
          
          <div className="space-y-3">
            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Size:</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-xs"
                        onClick={() => setShowSizeChart(true)}
                      >
                        <Info className="h-3 w-3 mr-1" />
                        Size Chart
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View size measurements</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {item.sizes.map((size: string) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Color selector */}
            <div>
              <label className="text-sm font-medium block mb-1">Color:</label>
              <div className="flex flex-wrap gap-2">
                {item.colors.map((color: string) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-green-600 scale-110' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ 
                      backgroundColor: 
                        color === "white" ? "#ffffff" :
                        color === "light-blue" ? "#add8e6" :
                        color === "navy" ? "#000080" :
                        color === "gray" ? "#808080" :
                        color === "black" ? "#000000" :
                        color === "red" ? "#ff0000" :
                        color === "plaid" ? "repeating-linear-gradient(45deg, #000080, #000080 10px, #add8e6 10px, #add8e6 20px)" :
                        color === "burgundy" ? "#800020" : "#ffffff"
                    }}
                    onClick={() => setSelectedColor(color)}
                    title={color.replace('-', ' ')}
                  >
                    {selectedColor === color && (
                      <Check className={`h-4 w-4 mx-auto ${['white', 'light-blue', 'plaid'].includes(color) ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price and add button */}
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-green-600">
                {(item.price / 100).toFixed(2)} DZD
              </span>
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => addItem(item, selectedSize, selectedColor)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Select Uniform Items (Optional)</h2>
        <Badge variant="outline" className="text-green-600">Optional</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Uniform categories and items */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="shirts" className="flex-1">Shirts</TabsTrigger>
              <TabsTrigger value="pants-skirts" className="flex-1">Pants & Skirts</TabsTrigger>
              <TabsTrigger value="sportswear" className="flex-1">Sportswear</TabsTrigger>
              <TabsTrigger value="jackets" className="flex-1">Jackets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="shirts">
              {shirts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {shirts.map(item => (
                    <UniformItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No shirts available for this grade/gender combination</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pants-skirts">
              {pantsSkirts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pantsSkirts.map(item => (
                    <UniformItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No pants or skirts available for this grade/gender combination</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sportswear">
              {sportswear.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sportswear.map(item => (
                    <UniformItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No sportswear available for this grade/gender combination</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="jackets">
              {jackets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {jackets.map(item => (
                    <UniformItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No jackets available for this grade/gender combination</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Selected items summary */}
        <div className="md:col-span-1">
          <div className="bg-green-50 rounded-lg border p-4 sticky top-24">
            <h3 className="font-semibold mb-3">Selected Uniform Items</h3>
            
            {uniform.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-2">No items selected</p>
                <p className="text-sm text-gray-400">Uniform items are optional</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[300px] overflow-y-auto mb-3">
                  {uniform.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex items-center justify-between bg-white p-2 rounded border">
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
                          <div className="flex text-xs text-gray-500 space-x-2">
                            <span>{item.size}</span>
                            <span>•</span>
                            <span>{item.color?.replace('-', ' ')}</span>
                          </div>
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
                
                <div className="flex justify-between font-medium mb-1">
                  <span>Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{(totalCost / 100).toFixed(2)} DZD</span>
                </div>
              </>
            )}
            
            <div className="mt-4 text-sm text-gray-600">
              <p>Uniform items are optional. You can skip this step if you don't need uniforms.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700 flex items-center">
          {uniform.length === 0 ? "Skip this step" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {/* Size Chart Dialog */}
      <Dialog open={showSizeChart} onOpenChange={setShowSizeChart}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Uniform Size Chart</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Size</th>
                  <th className="border p-2 text-left">Age</th>
                  <th className="border p-2 text-left">Height (cm)</th>
                  <th className="border p-2 text-left">Chest (cm)</th>
                  <th className="border p-2 text-left">Waist (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">4-5y</td>
                  <td className="border p-2">4-5 years</td>
                  <td className="border p-2">104-110</td>
                  <td className="border p-2">56-58</td>
                  <td className="border p-2">53-54</td>
                </tr>
                <tr>
                  <td className="border p-2">6-7y</td>
                  <td className="border p-2">6-7 years</td>
                  <td className="border p-2">116-122</td>
                  <td className="border p-2">60-62</td>
                  <td className="border p-2">56-57</td>
                </tr>
                <tr>
                  <td className="border p-2">8-9y</td>
                  <td className="border p-2">8-9 years</td>
                  <td className="border p-2">128-134</td>
                  <td className="border p-2">64-68</td>
                  <td className="border p-2">59-61</td>
                </tr>
                <tr>
                  <td className="border p-2">10-11y</td>
                  <td className="border p-2">10-11 years</td>
                  <td className="border p-2">140-146</td>
                  <td className="border p-2">70-72</td>
                  <td className="border p-2">62-63</td>
                </tr>
                <tr>
                  <td className="border p-2">12-13y</td>
                  <td className="border p-2">12-13 years</td>
                  <td className="border p-2">152-158</td>
                  <td className="border p-2">76-80</td>
                  <td className="border p-2">64-66</td>
                </tr>
                <tr>
                  <td className="border p-2">14-15y</td>
                  <td className="border p-2">14-15 years</td>
                  <td className="border p-2">164-170</td>
                  <td className="border p-2">84-88</td>
                  <td className="border p-2">68-72</td>
                </tr>
                <tr>
                  <td className="border p-2">16+</td>
                  <td className="border p-2">16+ years</td>
                  <td className="border p-2">176+</td>
                  <td className="border p-2">92+</td>
                  <td className="border p-2">76+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Note: These measurements are approximate. For the best fit, we recommend measuring your child and comparing with the chart.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
