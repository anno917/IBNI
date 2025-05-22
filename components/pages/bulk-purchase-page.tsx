"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Package,
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  Search,
  ChevronDown,
  Briefcase,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define types
interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  subcategory?: string
  rating: number
  reviewCount: number
  description: string
  stock: number
  isOnSale?: boolean
  isNew?: boolean
  discountPercentage?: number
  tags?: string[]
  deliveryTime?: string
  audience?: string[]
  gradeLevel?: string
}

interface BulkItem {
  product: Product
  quantity: number
}

export default function BulkPurchasePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [bulkItems, setBulkItems] = useState<BulkItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock products data
  const products: Product[] = [
    {
      id: "prod1",
      name: "Standard Notebook - Pack of 10",
      price: 1200,
      image: "/placeholder.svg?height=300&width=300",
      category: "stationery",
      subcategory: "notebooks",
      rating: 4.5,
      reviewCount: 128,
      description: "Pack of 10 standard ruled notebooks, 80 pages each, perfect for classroom use.",
      stock: 150,
      isOnSale: false,
      isNew: false,
      tags: ["Notebooks", "Classroom", "Bulk"],
      deliveryTime: "2-3 business days",
      audience: ["schools", "teachers"],
      gradeLevel: "All Grades",
    },
    {
      id: "prod2",
      name: "Colored Pencils - Class Set of 30",
      price: 3500,
      image: "/placeholder.svg?height=300&width=300",
      category: "art-supplies",
      subcategory: "drawing",
      rating: 4.7,
      reviewCount: 85,
      description: "Set of 30 packs of colored pencils, 12 colors each. Perfect for classroom art projects.",
      stock: 42,
      isOnSale: true,
      discountPercentage: 15,
      tags: ["Art", "Classroom", "Bulk"],
      deliveryTime: "2-3 business days",
      audience: ["schools", "teachers"],
      gradeLevel: "All Grades",
    },
    {
      id: "prod3",
      name: "Whiteboard Markers - Box of 50",
      price: 4200,
      image: "/placeholder.svg?height=300&width=300",
      category: "stationery",
      subcategory: "markers",
      rating: 4.3,
      reviewCount: 62,
      description: "Box of 50 whiteboard markers in assorted colors. Long-lasting and easy to erase.",
      stock: 35,
      isOnSale: false,
      isNew: true,
      tags: ["Markers", "Classroom", "Bulk"],
      deliveryTime: "2-3 business days",
      audience: ["schools", "teachers"],
      gradeLevel: "All Grades",
    },
    {
      id: "prod4",
      name: "Student Scissors - Class Pack of 30",
      price: 2800,
      image: "/placeholder.svg?height=300&width=300",
      category: "stationery",
      subcategory: "scissors",
      rating: 4.6,
      reviewCount: 47,
      description: "Pack of 30 safety scissors for students. Blunt tip design for classroom safety.",
      stock: 28,
      isOnSale: false,
      isNew: false,
      tags: ["Scissors", "Classroom", "Bulk"],
      deliveryTime: "2-3 business days",
      audience: ["schools", "teachers"],
      gradeLevel: "Elementary",
    },
  ]

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Sort products based on sortBy
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      default:
        return 0
    }
  })

  // Add product to bulk items
  const addToBulk = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existingItem = bulkItems.find((item) => item.product.id === productId)
    if (existingItem) {
      setBulkItems(
        bulkItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setBulkItems([...bulkItems, { product, quantity: 1 }])
    }
  }

  // Update bulk item quantity
  const updateBulkItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setBulkItems(bulkItems.filter((item) => item.product.id !== productId))
    } else {
      setBulkItems(
        bulkItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  // Calculate bulk order total
  const bulkTotal = bulkItems.reduce((total, item) => {
    const price = item.product.isOnSale
      ? item.product.price * (1 - (item.product.discountPercentage || 0) / 100)
      : item.product.price
    return total + price * item.quantity
  }, 0)

  // Calculate bulk discount
  const calculateBulkDiscount = (total: number) => {
    const totalQuantity = bulkItems.reduce((sum, item) => sum + item.quantity, 0)

    if (totalQuantity >= 100) return 0.15 // 15% discount for 100+ items
    if (totalQuantity >= 50) return 0.10 // 10% discount for 50+ items
    if (totalQuantity >= 20) return 0.05 // 5% discount for 20+ items
    return 0
  }

  const bulkDiscount = calculateBulkDiscount(bulkTotal)
  const discountedTotal = bulkTotal * (1 - bulkDiscount)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with search and cart */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-green-600">IBNI Store</h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <Button
            variant="outline"
            className="relative hidden sm:flex items-center gap-2 hover:bg-green-50 focus:ring-2 focus:ring-green-200"
            onClick={() => {
              try {
                router.push('/bulk-purchase');
              } catch (error) {
                console.error("Navigation failed:", error);
                // Fallback behavior
                window.location.href = '/bulk-purchase';
              }
            }}
            aria-pressed={true}
          >
            <Package className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Bulk Purchase</span>
          </Button>

          <Button
            variant="outline"
            className="relative hidden sm:flex items-center gap-2 hover:bg-green-50 focus:ring-2 focus:ring-green-200"
            onClick={() => {
              try {
                router.push('/backpack-builder');
              } catch (error) {
                console.error("Navigation failed:", error);
                // Fallback behavior
                window.location.href = '/backpack-builder';
              }
            }}
          >
            <Briefcase className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Build a Backpack</span>
          </Button>
        </div>
      </div>

      {/* Page title */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/store')}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Bulk Purchase</h2>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products list */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Bulk Products</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  Sort by: {sortBy === "price-low" ? "Price: Low to High" : sortBy === "price-high" ? "Price: High to Low" : sortBy === "rating" ? "Highest Rated" : "Featured"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("rating")}>Highest Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={product.image || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {product.isOnSale && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      {product.discountPercentage}% OFF
                    </Badge>
                  )}
                  {product.isNew && !product.isOnSale && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">NEW</Badge>
                  )}
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base font-medium line-clamp-2">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <div className="flex items-center text-amber-500 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                        strokeWidth={1}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>
                  {product.tags && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                  <div>
                    {product.isOnSale ? (
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-green-600">
                          {(product.price * (1 - product.discountPercentage! / 100) / 100).toFixed(2)} DZD
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {(product.price / 100).toFixed(2)} DZD
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-green-600">
                        {(product.price / 100).toFixed(2)} DZD
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={product.stock === 0}
                    onClick={() => addToBulk(product.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Bulk order summary */}
        <div className="md:col-span-1">
          <div className="bg-green-50 rounded-lg border p-6 sticky top-24">
            <h3 className="font-semibold mb-4">Bulk Order Summary</h3>

            {bulkItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your bulk order is empty</p>
                <p className="text-sm text-gray-400 mt-2">Add items to get started</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                  {bulkItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white rounded overflow-hidden mr-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-500">
                            {(item.product.isOnSale
                              ? (item.product.price * (1 - item.product.discountPercentage! / 100))
                              : item.product.price) / 100}
                            DZD × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateBulkItemQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateBulkItemQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{(bulkTotal / 100).toFixed(2)} DZD</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Bulk Discount ({(bulkDiscount * 100).toFixed(0)}%):</span>
                    <span>-{((bulkTotal * bulkDiscount) / 100).toFixed(2)} DZD</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total:</span>
                  <span>{(discountedTotal / 100).toFixed(2)} DZD</span>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 mb-2">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>

                <Button variant="outline" className="w-full" onClick={() => setBulkItems([])}>
                  Clear All
                </Button>

                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Bulk Order Benefits</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 5% discount on orders of 20+ items</li>
                    <li>• 10% discount on orders of 50+ items</li>
                    <li>• 15% discount on orders of 100+ items</li>
                    <li>• Free delivery for orders over 10,000 DZD</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
