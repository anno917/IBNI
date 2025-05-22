"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tag, Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import StoreLayout from "@/components/store/store-layout"
import type { Product } from "@/components/store/product-card"
import ProductGrid from "@/components/store/product-grid"

interface IntegratedSpecialOffersPageProps {
  navigateTo?: (page: string) => void
}

export default function IntegratedSpecialOffersPage({ navigateTo }: IntegratedSpecialOffersPageProps) {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Mock special offers data
  const specialOffers: Product[] = [
    {
      id: "offer1",
      title: "Back to School Bundle - 20% OFF",
      category: "Bundles",
      price_dzd: 4800,
      original_price_dzd: 6000,
      description: "Complete set of school supplies including notebooks, pens, and more",
      thumbnail: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      isOnSale: true,
      stock: 15,
    },
    {
      id: "offer2",
      title: "Art Supplies Kit - 15% OFF",
      category: "Creative Supplies",
      price_dzd: 3400,
      original_price_dzd: 4000,
      description: "Premium art supplies for students and hobbyists",
      thumbnail: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      isOnSale: true,
      stock: 22,
    },
    {
      id: "offer3",
      title: "Science Textbooks Bundle - 25% OFF",
      category: "Books",
      price_dzd: 5250,
      original_price_dzd: 7000,
      description: "Complete set of science textbooks for middle school",
      thumbnail: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      isOnSale: true,
      stock: 8,
    },
    {
      id: "offer4",
      title: "Premium Backpack + Lunch Box - 30% OFF",
      category: "School Supplies",
      price_dzd: 4200,
      original_price_dzd: 6000,
      description: "Durable backpack with matching lunch box",
      thumbnail: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      isOnSale: true,
      stock: 12,
    },
    {
      id: "offer5",
      title: "Math & Language Courses Bundle - 40% OFF",
      category: "Courses",
      price_dzd: 7200,
      original_price_dzd: 12000,
      description: "Complete set of math and language courses for elementary students",
      thumbnail: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      isOnSale: true,
      stock: 999,
      creator_type: "School",
      creator: {
        name: "IBNI Academy",
        profile_image: "/placeholder.svg?height=50&width=50",
        logo_image: "/placeholder.svg?height=50&width=50"
      },
      grade_level: "Elementary",
      subject: "Math & Language",
      language: "English",
      school_affiliation: "IBNI Education"
    },
    {
      id: "offer6",
      title: "Office Desk + Chair Combo - 20% OFF",
      category: "Office Furniture",
      price_dzd: 16000,
      original_price_dzd: 20000,
      description: "Ergonomic desk and chair set for home or office",
      thumbnail: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      isOnSale: true,
      stock: 5,
    },
  ]

  const handleAddToCart = (productId: string, quantity: number) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === productId)

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity = quantity
      setCartItems(updatedItems)
    } else {
      setCartItems([...cartItems, { id: productId, quantity }])
    }
  }

  const handleAddToWishlist = (productId: string) => {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter((id) => id !== productId))
    } else {
      setWishlistItems([...wishlistItems, productId])
    }
  }

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      // If we're in the main app context, use the navigateTo function
      navigateTo(path)
    } else {
      // Otherwise use the router
      router.push(path)
    }
  }

  return (
    <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={wishlistItems.length} navigateTo={navigateTo}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">Special Offers</h1>
            <p className="text-gray-600">Exclusive deals and discounts on educational products</p>
          </div>
        </div>

        {/* Featured Offer Banner */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <Badge className="mb-2 bg-green-600">Limited Time</Badge>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Back to School Sale</h2>
                <p className="text-gray-700 mb-4">
                  Get up to 40% off on school supplies, textbooks, and more. Prepare for the new school year with our
                  exclusive deals!
                </p>
                <Button className="bg-green-600 hover:bg-green-700">Shop Now</Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Back to School Sale"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeFilters.length === 0 ? "secondary" : "outline"}
            size="sm"
            onClick={() => setActiveFilters([])}
            className="rounded-full"
          >
            All Offers
          </Button>
          {["Books", "School Supplies", "Office Supplies", "Courses", "Furniture"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilters.includes(filter) ? "secondary" : "outline"}
              size="sm"
              onClick={() => {
                if (activeFilters.includes(filter)) {
                  setActiveFilters(activeFilters.filter((f) => f !== filter))
                } else {
                  setActiveFilters([...activeFilters, filter])
                }
              }}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={specialOffers}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          viewMode={viewMode}
        />
      </div>
    </StoreLayout>
  )
}
