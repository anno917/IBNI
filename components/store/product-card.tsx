"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Plus, Minus, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export interface Product {
  id: string
  title: string
  category: string
  subcategory?: string
  price_dzd: number
  original_price_dzd?: number
  description: string
  thumbnail: string
  rating?: number
  isNew?: boolean
  isOnSale?: boolean
  stock?: number
}

export interface CourseProduct extends Product {
  creator_type?: "Teacher" | "School"
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

interface ProductCardProps {
  product: Product | CourseProduct
  onAddToCart: (productId: string, quantity: number) => void
  onAddToWishlist?: (productId: string) => void
  wishlistItems?: string[]
  className?: string
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, onAddToCart, onAddToWishlist, wishlistItems = [], className, viewMode = "grid" }: ProductCardProps) {
  const [count, setCount] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)

  const handleAddToCart = () => {
    setCount(1)
    onAddToCart(product.id, 1)
  }

  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    onAddToCart(product.id, newCount)
  }

  const handleDecrement = () => {
    const newCount = Math.max(count - 1, 0)
    setCount(newCount)
    if (newCount === 0) {
      // Remove from cart logic could be added here
    } else {
      onAddToCart(product.id, newCount)
    }
  }

  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    if (onAddToWishlist) {
      onAddToWishlist(product.id)
    }
  }

  const isCourse = product.category === "Courses"
  const courseProduct = isCourse ? (product as CourseProduct) : null

  // Format price in DZD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Handle different view modes
  if (viewMode === "list") {
    return (
      <div className={cn(
        "bg-white rounded-lg border overflow-hidden transition-all hover:shadow-md",
        "flex"
      )}>
        <Link href={`/store/product/${product.id}`} className={cn(
          "relative block",
          "w-1/3"
        )}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
              New
            </span>
          )}
          {product.isOnSale && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              Sale
            </span>
          )}
        </Link>

        <div className={cn(
          "p-4",
          "flex-1"
        )}>
          <Link href={`/store/product/${product.id}`} className="block">
            <h3 className="font-semibold text-gray-900 mb-1 hover:text-green-700 transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{product.category}</p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mt-2 mb-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn("h-4 w-4", i < Math.floor(product.rating || 0) ? "text-amber-500 fill-amber-500" : "text-gray-300")}
                    strokeWidth={1}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          )}

          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{product.description}</p>

          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-green-600">{formatPrice(product.price_dzd)}</span>
                {product.isOnSale && product.original_price_dzd && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.original_price_dzd)}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {(product.stock || 0) > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
            </div>

            <Button
              size="sm"
              onClick={() => onAddToCart(product.id, 1)}
              disabled={product.stock === 0}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Original grid view
  return (
    <div className={cn(
      "bg-white rounded-lg border overflow-hidden transition-all hover:shadow-md",
      viewMode === "list" ? "flex" : "flex flex-col"
    )}>
      <Link href={`/store/product/${product.id}`} className={cn(
        "relative block",
        viewMode === "list" ? "w-1/3" : "w-full aspect-square"
      )}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
            New
          </span>
        )}
        {product.isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            Sale
          </span>
        )}
      </Link>

      <div className={cn(
        "p-4",
        viewMode === "list" ? "flex-1" : ""
      )}>
        <Link href={`/store/product/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-900 mb-1 hover:text-green-700 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{product.category}</p>

        {/* Course Creator Info - Only for courses with creator info */}
        {isCourse && courseProduct?.creator && (
          <div className="flex items-center mt-2 mb-3 border-t border-b border-gray-100 py-2">
              <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-100">
                  <Image
                    src={courseProduct.creator.profile_image || "/placeholder.svg?height=50&width=50"}
                    alt={courseProduct.creator.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                <p className="text-xs text-gray-500">{courseProduct.creator_type || "Course"}</p>
                  <p className="text-sm font-medium">{courseProduct.creator.name}</p>
                </div>
              </div>
          </div>
        )}

        {/* Course Additional Info - Only for courses with additional info */}
        {isCourse && courseProduct && (courseProduct.grade_level || courseProduct.subject || courseProduct.language) && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {courseProduct.grade_level && (
            <div className="text-center p-1.5 bg-green-50 rounded-md">
              <p className="text-xs text-gray-500">Grade</p>
              <p className="text-xs font-medium text-green-700">{courseProduct.grade_level}</p>
            </div>
            )}
            {courseProduct.subject && (
            <div className="text-center p-1.5 bg-green-50 rounded-md">
              <p className="text-xs text-gray-500">Subject</p>
              <p className="text-xs font-medium text-green-700">{courseProduct.subject}</p>
            </div>
            )}
            {courseProduct.language && (
            <div className="text-center p-1.5 bg-green-50 rounded-md">
              <p className="text-xs text-gray-500">Language</p>
              <p className="text-xs font-medium text-green-700">{courseProduct.language}</p>
            </div>
            )}
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className={cn(
          "flex items-center justify-between mt-auto border-t border-border",
          viewMode === "list" ? "pt-1.5" : "pt-3"
        )}>
          <div>
            {product.original_price_dzd ? (
              <div>
                <p className={cn(
                  "font-bold text-green-600",
                  viewMode === "list" ? "text-sm" : "text-lg"
                )}>{formatPrice(product.price_dzd)}</p>
                <p className={cn(
                  "text-gray-500 line-through",
                  viewMode === "list" ? "text-[10px]" : "text-sm"
                )}>{formatPrice(product.original_price_dzd)}</p>
              </div>
            ) : (
              <p className={cn(
                "font-bold text-green-600",
                viewMode === "list" ? "text-sm" : "text-lg"
              )}>{formatPrice(product.price_dzd)}</p>
            )}
          </div>

          <div>
            {count === 0 ? (
              <Button
                size={viewMode === "list" ? "xs" : "sm"}
                onClick={handleAddToCart}
                className={cn(
                  "bg-green-600 hover:bg-green-700 text-white",
                  viewMode === "list" ? "h-6 text-[10px] px-1.5" : ""
                )}
              >
                <ShoppingCart className={cn(viewMode === "list" ? "w-3 h-3 mr-0.5" : "w-4 h-4 mr-2")} />
                Add
              </Button>
            ) : (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  className={cn(
                    viewMode === "list" ? "w-5 h-5" : "w-8 h-8",
                    "border-green-600 text-green-600 hover:bg-green-50"
                  )}
                >
                  <Minus className={viewMode === "list" ? "w-2 h-2" : "w-4 h-4"} />
                </Button>
                <span className={cn(
                  "font-medium text-center text-green-700",
                  viewMode === "list" ? "text-xs w-3" : "text-sm w-5"
                )}>{count}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                  className={cn(
                    viewMode === "list" ? "w-5 h-5" : "w-8 h-8",
                    "border-green-600 text-green-600 hover:bg-green-50"
                  )}
                >
                  <Plus className={viewMode === "list" ? "w-2 h-2" : "w-4 h-4"} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

