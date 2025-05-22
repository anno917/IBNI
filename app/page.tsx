"use client"

import React from "react"
import { motion } from "framer-motion"
import { Clock, Tag, Percent, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/store/product-card"

interface CourseProduct {
  id: string
  title: string
  description: string
  category: string
  price_dzd: number
  original_price_dzd?: number
  thumbnail: string
  rating?: number
  stock?: number
  isNew?: boolean
  isOnSale?: boolean
  creator_type?: string
  creator?: {
    name: string
    profile_image?: string
    logo_image?: string
  }
  grade_level?: string
  subject?: string
  language?: string
  school_affiliation?: string
}

const specialOffers: CourseProduct[] = [
  {
    id: "1",
    title: "Back to School Bundle",
    description: "Complete set of school supplies with 30% off",
    category: "School Supplies",
    price_dzd: 20999,
    original_price_dzd: 29999,
    thumbnail: "/images/offers/school-bundle.jpg",
    rating: 4.8,
    stock: 50,
    isOnSale: true
  },
  {
    id: "2",
    title: "Teacher's Essential Kit",
    description: "Everything a teacher needs for the classroom",
    category: "Teacher's Supplies",
    price_dzd: 14999,
    original_price_dzd: 19999,
    thumbnail: "/images/offers/teacher-kit.jpg",
    rating: 4.9,
    stock: 30,
    isOnSale: true
  },
  {
    id: "3",
    title: "Office Furniture Set",
    description: "Complete office setup with premium furniture",
    category: "Office Furniture",
    price_dzd: 47999,
    original_price_dzd: 59999,
    thumbnail: "/images/offers/office-set.jpg",
    rating: 4.7,
    stock: 10,
    isOnSale: true
  },
  {
    id: "4",
    title: "Math & Language Courses Bundle",
    description: "Comprehensive courses for primary and secondary students",
    category: "Courses",
    price_dzd: 39999,
    original_price_dzd: 49999,
    thumbnail: "/images/offers/course-bundle.jpg",
    rating: 4.9,
    stock: 100,
    isOnSale: true,
    creator_type: "School",
    creator: {
      name: "Elite Academy",
      profile_image: "/images/schools/elite-academy.jpg",
      logo_image: "/images/schools/elite-academy-logo.png"
    },
    grade_level: "Primary & Secondary",
    subject: "Mathematics & Languages",
    language: "English & French",
    school_affiliation: "Elite Academy"
  }
]

export default function SpecialOffersPage() {
  const handleAddToCart = (productId: string, quantity: number) => {
    // Implement cart functionality
    console.log(`Adding ${quantity} of product ${productId} to cart`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl font-bold mb-4">Special Offers</h1>
          <p className="text-lg mb-6">
            Discover amazing deals and exclusive discounts on our best-selling products.
            Limited time offers that you don't want to miss!
          </p>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              <Clock className="w-4 h-4 mr-2" />
              Limited Time
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              <Tag className="w-4 h-4 mr-2" />
              Best Deals
            </Badge>
          </div>
        </motion.div>
      </div>

      {/* Featured Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialOffers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard
              product={offer}
              onAddToCart={handleAddToCart}
              viewMode="grid"
            />
          </motion.div>
        ))}
      </div>

      {/* Additional Sections */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flash Sale Section */}
        <Card className="p-6 bg-orange-50">
          <h2 className="text-2xl font-bold mb-4">Flash Sale</h2>
          <p className="text-gray-600 mb-4">
            Don't miss our daily flash sales with up to 50% off on selected items.
            New deals every day!
          </p>
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
            View Flash Sales
          </Button>
        </Card>

        {/* Newsletter Section */}
        <Card className="p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter to receive exclusive offers and be the first to know about new deals.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 
