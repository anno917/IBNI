"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Share2 } from "lucide-react"
import StoreLayout from "@/components/store/store-layout"
import type { Product, CourseProduct } from "@/components/store/product-card"

// Mock product data - in a real app, this would come from an API
const mockProducts: (Product | CourseProduct)[] = [
  {
    id: "1",
    title: "Premium Office Chair",
    category: "office-furniture",
    subcategory: "chairs",
    price_dzd: 25000,
    description: "Ergonomic office chair with adjustable height and lumbar support. Perfect for long working hours.",
    thumbnail: "/placeholder.svg",
    rating: 4.5,
    stock: 10,
    isNew: true,
    isOnSale: false
  },
  {
    id: "2",
    title: "Mathematics Course - Advanced Level",
    category: "courses",
    subcategory: "online",
    price_dzd: 15000,
    description: "Comprehensive mathematics course covering advanced topics for high school students.",
    thumbnail: "/placeholder.svg",
    rating: 4.8,
    stock: 50,
    creator_type: "teacher",
    creator: {
      name: "Dr. Ahmed Benali",
      profile_image: "/placeholder.svg",
      rating: 4.9
    },
    grade_level: "High School",
    subject: "Mathematics",
    language: "Arabic"
  }
]

export default function ProductPage() {
  const params = useParams()
  const productId = params.productId as string
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([])

  // Find the product
  const product = mockProducts.find(p => p.id === productId)

  const handleAddToCart = () => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId)
      if (existingItem) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { id: productId, quantity }]
    })
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity)
    }
  }

  if (!product) {
    return (
      <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={isWishlisted ? 1 : 0}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p>The requested product does not exist.</p>
        </div>
      </StoreLayout>
    )
  }

  const isCourse = 'creator_type' in product

  return (
    <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={isWishlisted ? 1 : 0}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm">
                New
              </span>
            )}
            {product.isOnSale && (
              <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                Sale
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.rating})</span>
              </div>
            </div>

            <div className="text-2xl font-bold text-green-700">
              {product.price_dzd.toLocaleString()} DZD
            </div>

            <p className="text-gray-600">{product.description}</p>

            {isCourse && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Course Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Creator:</span> {product.creator.name}</p>
                  <p><span className="font-medium">Grade Level:</span> {product.grade_level}</p>
                  <p><span className="font-medium">Subject:</span> {product.subject}</p>
                  <p><span className="font-medium">Language:</span> {product.language}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 py-2">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-lg ${
                  isWishlisted
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
              <button className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2">Product Information</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Category:</span> {product.category}</p>
                {product.subcategory && (
                  <p><span className="font-medium">Subcategory:</span> {product.subcategory}</p>
                )}
                <p><span className="font-medium">Stock:</span> {product.stock} available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  )
} 