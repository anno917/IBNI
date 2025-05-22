"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import StoreLayout from "@/components/store/store-layout"
import ProductGrid from "@/components/store/product-grid"
import CategoryBrowseSection from "@/components/store/category-browse-section"
import type { Product, CourseProduct } from "@/components/store/product-card"

// Categories data
const categories = [
  {
    id: "office-furniture",
    name: "Office Furniture",
    icon: "Building",
    subcategories: [
      { id: "desks", name: "Desks" },
      { id: "chairs", name: "Chairs" },
      { id: "cabinets", name: "Cabinets" }
    ]
  },
  {
    id: "books",
    name: "Books",
    icon: "BookOpen",
    subcategories: [
      { id: "textbooks", name: "Textbooks" },
      { id: "workbooks", name: "Workbooks" },
      { id: "novels", name: "Novels" }
    ]
  },
  {
    id: "school-supplies",
    name: "School Supplies",
    icon: "School",
    subcategories: [
      { id: "pens", name: "Pens" },
      { id: "notebooks", name: "Notebooks" },
      { id: "backpacks", name: "Backpacks" }
    ]
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    icon: "Briefcase",
    subcategories: [
      { id: "paper", name: "Paper" },
      { id: "stationery", name: "Stationery" },
      { id: "filing", name: "Filing" }
    ]
  },
  {
    id: "kids",
    name: "Kids",
    icon: "Baby",
    subcategories: [
      { id: "toys", name: "Toys" },
      { id: "games", name: "Games" },
      { id: "crafts", name: "Crafts" }
    ]
  },
  {
    id: "courses",
    name: "Courses",
    icon: "Package",
    subcategories: [
      { id: "online", name: "Online Courses" },
      { id: "workshops", name: "Workshops" },
      { id: "tutoring", name: "Tutoring" }
    ]
  }
]

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.categoryId as string
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<string[]>([])

  // Find the current category
  const currentCategory = categories.find(cat => cat.id === categoryId)

  // Mock products for the category
  const products: (Product | CourseProduct)[] = [
    {
      id: "1",
      title: "Sample Product 1",
      category: categoryId,
      price_dzd: 2500,
      description: "A sample product for this category",
      thumbnail: "/placeholder.svg",
      rating: 4.5,
      stock: 10
    },
    {
      id: "2",
      title: "Sample Product 2",
      category: categoryId,
      price_dzd: 3500,
      description: "Another sample product for this category",
      thumbnail: "/placeholder.svg",
      rating: 4.0,
      stock: 15
    }
  ]

  const handleAddToCart = (productId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId)
      if (existingItem) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { id: productId, quantity: 1 }]
    })
  }

  const handleWishlist = (productId: string) => {
    setWishlistItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  if (!currentCategory) {
    return (
      <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={wishlistItems.length}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p>The requested category does not exist.</p>
        </div>
      </StoreLayout>
    )
  }

  return (
    <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={wishlistItems.length}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="md:col-span-1">
            <CategoryBrowseSection categories={categories} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold mb-6">{currentCategory.name}</h1>
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
              wishlistItems={wishlistItems}
            />
          </div>
        </div>
      </div>
    </StoreLayout>
  )
} 