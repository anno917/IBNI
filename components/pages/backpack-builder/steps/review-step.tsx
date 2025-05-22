"use client"

import React from "react"
import { ArrowLeft, ArrowRight, Edit2, Trash2, Share2, Printer, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackpackState, BackpackItem } from "../backpack-builder-page"

interface ReviewStepProps {
  backpackState: BackpackState
  updateItems: (category: keyof BackpackState, items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
  goToStep: (step: number) => void
}

export default function ReviewStep({ 
  backpackState, 
  updateItems, 
  onNext, 
  onBack,
  goToStep
}: ReviewStepProps) {
  // Calculate totals
  const calculateCategoryTotal = (items: BackpackItem[]) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }
  
  const uniformTotal = calculateCategoryTotal(backpackState.uniform)
  const backpackTotal = calculateCategoryTotal(backpackState.backpack)
  const stationeryTotal = calculateCategoryTotal(backpackState.stationery)
  const booksTotal = calculateCategoryTotal(backpackState.books)
  const creativeTotal = calculateCategoryTotal(backpackState.creative)
  const techTotal = calculateCategoryTotal(backpackState.tech)
  
  const totalCost = uniformTotal + backpackTotal + stationeryTotal + booksTotal + creativeTotal + techTotal
  
  const totalItems = [
    ...backpackState.uniform,
    ...backpackState.backpack,
    ...backpackState.stationery,
    ...backpackState.books,
    ...backpackState.creative,
    ...backpackState.tech,
  ].reduce((sum, item) => sum + item.quantity, 0)
  
  // Remove item
  const removeItem = (category: keyof BackpackState, itemId: string) => {
    if (
      category === "uniform" ||
      category === "backpack" ||
      category === "stationery" ||
      category === "books" ||
      category === "creative" ||
      category === "tech"
    ) {
      const updatedItems = backpackState[category].filter(item => item.id !== itemId)
      updateItems(category, updatedItems)
    }
  }
  
  // Render category items
  const renderCategoryItems = (category: keyof BackpackState, items: BackpackItem[], stepNumber: number) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500">No items in this category</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => goToStep(stepNumber)}
          >
            Add Items
          </Button>
        </div>
      )
    }
    
    return (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden mr-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex text-sm text-gray-500 space-x-2">
                  <span>{(item.price / 100).toFixed(2)} DZD × {item.quantity}</span>
                  {item.size && <span>• Size: {item.size}</span>}
                  {item.color && <span>• Color: {item.color}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-4">
                {((item.price * item.quantity) / 100).toFixed(2)} DZD
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-red-500"
                onClick={() => removeItem(category, item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between text-sm font-medium pt-2 px-2">
          <span>Category Total:</span>
          <span>{(calculateCategoryTotal(items) / 100).toFixed(2)} DZD</span>
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => goToStep(stepNumber)}
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review Your Backpack</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Backpack items by category */}
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="all" className="flex-1">All Items</TabsTrigger>
              <TabsTrigger value="uniform" className="flex-1">Uniform</TabsTrigger>
              <TabsTrigger value="backpack" className="flex-1">Backpack</TabsTrigger>
              <TabsTrigger value="stationery" className="flex-1">Stationery</TabsTrigger>
              <TabsTrigger value="books" className="flex-1">Books</TabsTrigger>
              <TabsTrigger value="creative" className="flex-1">Creative</TabsTrigger>
              <TabsTrigger value="tech" className="flex-1">Tech</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-6">
                {backpackState.uniform.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Uniform Items</h3>
                      {renderCategoryItems("uniform", backpackState.uniform, 2)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.backpack.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Backpack & Accessories</h3>
                      {renderCategoryItems("backpack", backpackState.backpack, 3)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.stationery.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Stationery Supplies</h3>
                      {renderCategoryItems("stationery", backpackState.stationery, 4)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.books.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Books</h3>
                      {renderCategoryItems("books", backpackState.books, 5)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.creative.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Creative Supplies</h3>
                      {renderCategoryItems("creative", backpackState.creative, 6)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.tech.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Tech Gear</h3>
                      {renderCategoryItems("tech", backpackState.tech, 7)}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="uniform">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Uniform Items</h3>
                  {renderCategoryItems("uniform", backpackState.uniform, 2)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="backpack">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Backpack & Accessories</h3>
                  {renderCategoryItems("backpack", backpackState.backpack, 3)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stationery">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Stationery Supplies</h3>
                  {renderCategoryItems("stationery", backpackState.stationery, 4)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="books">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Books</h3>
                  {renderCategoryItems("books", backpackState.books, 5)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="creative">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Creative Supplies</h3>
                  {renderCategoryItems("creative", backpackState.creative, 6)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tech">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Tech Gear</h3>
                  {renderCategoryItems("tech", backpackState.tech, 7)}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Summary */}
        <div className="md:col-span-1">
          <div className="bg-green-50 rounded-lg border p-4 sticky top-24">
            <h3 className="font-semibold mb-3">Backpack Summary</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Child:</p>
              <p className="font-medium">{backpackState.childInfo.name}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Grade:</p>
              <p className="font-medium">{backpackState.childInfo.grade.replace('-', ' ')}</p>
            </div>
            
            <Separator className="my-3" />
            
            <div className="space-y-2 text-sm">
              {backpackState.uniform.length > 0 && (
                <div className="flex justify-between">
                  <span>Uniform:</span>
                  <span>{(uniformTotal / 100).toFixed(2)} DZD</span>
                </div>
              )}
              
              {backpackState.backpack.length > 0 && (
                <div className="flex justify-between">
                  <span>Backpack:</span>
                  <span>{(backpackTotal / 100).toFixed(2)} DZD</span>
                </div>
              )}
              
              {backpackState.stationery.length > 0 && (
                <div className="flex justify-between">
                  <span>Stationery:</span>
                  <span>{(stationeryTotal / 100).toFixed(2)} DZD</span>
                </div>
              )}
              
              {backpackState.books.length > 0 && (
                <div className="flex justify-between">
                  <span>Books:</span>
                  <span>{(booksTotal / 100).toFixed(2)} DZD</span>
                </div>
              )}
              
              {backpackState.creative.length > 0 && (
                <div className="flex justify-between">
                  <span>Creative:</span>
                  <span>{(creativeTotal / 100).toFixed(2)} DZD</span>
                </div>
              )}
              
              {backpackState.tech.length > 0 && (
                <div className="flex justify-between">
                  <span>Tech:</span>
                  <span>{(techTotal / 100).toFixed(2)} DZD</span>
                </div>
              )}
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex justify-between font-medium mb-1">
              <span>Items:</span>
              <span>{totalItems}</span>
            </div>
            
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>{(totalCost / 100).toFixed(2)} DZD</span>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share Backpack
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Printer className="h-4 w-4 mr-2" />
                Print List
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Save className="h-4 w-4 mr-2" />
                Save to Wishlist
              </Button>
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
        <Button 
          onClick={onNext} 
          className="bg-green-600 hover:bg-green-700 flex items-center"
          disabled={totalItems === 0}
        >
          Proceed to Checkout
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
