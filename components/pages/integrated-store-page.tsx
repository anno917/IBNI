"use client"

import { useState } from "react"
import type { Product, CourseProduct } from "@/components/store/product-card"
import ProductGrid from "@/components/store/product-grid"
import CategorySection from "@/components/store/category-section"
import CategoryBrowseSection from "@/components/store/category-browse-section"
import BannerCarousel from "@/components/store/banner-carousel"
import StoreLayout from "@/components/store/store-layout"

import { useRouter } from "next/navigation"

// Categories based on the new structure with subcategories
const categories = [
  {
    id: "office-furniture",
    name: "Office Furniture",
    image: "/images/store/cate/office-furniture.png",
    description: "Desks, chairs & cabinets",
    subcategories: [
      { id: "desks", name: "Desks" },
      { id: "chairs", name: "Chairs" },
      { id: "storage", name: "Storage" },
      { id: "tables", name: "Tables" }
    ]
  },
  {
    id: "books",
    name: "Books",
    image: "/images/store/cate/books.png",
    description: "Educational & reading materials",
    subcategories: [
      { id: "textbooks", name: "Textbooks" },
      { id: "workbooks", name: "Workbooks" },
      { id: "reference", name: "Reference Books" },
      { id: "storybooks", name: "Storybooks" }
    ]
  },
  {
    id: "teachers-supplies",
    name: "Teacher's Supplies",
    image: "/images/store/cate/teachers-supplies.png",
    description: "Tools for educators",
    subcategories: [
      { id: "stationery", name: "Stationery" },
      { id: "teaching-aids", name: "Teaching Aids" },
      { id: "classroom-decor", name: "Classroom Decor" },
      { id: "lesson-planners", name: "Lesson Planners" }
    ]
  },
  {
    id: "gifts-decoration",
    name: "Gifts & Decoration",
    image: "/images/store/cate/gifts-decoration.png",
    description: "Gifts & home decor",
    subcategories: [
      { id: "gift-sets", name: "Gift Sets" },
      { id: "wall-art", name: "Wall Art" },
      { id: "decorative-items", name: "Decorative Items" },
      { id: "personalized-gifts", name: "Personalized Gifts" }
    ]
  },
  {
    id: "school-supplies",
    name: "School Supplies",
    image: "/images/store/cate/school-supplies.png",
    description: "Essential school items",
    subcategories: [
      { id: "pens-pencils", name: "Pens & Pencils" },
      { id: "notebooks", name: "Notebooks" },
      { id: "art-supplies", name: "Art Supplies" },
      { id: "backpacks", name: "Backpacks" }
    ]
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    image: "/images/store/cate/office-supplies.png",
    description: "Professional office tools",
    subcategories: [
      { id: "paper-products", name: "Paper Products" },
      { id: "filing-supplies", name: "Filing Supplies" },
      { id: "desk-accessories", name: "Desk Accessories" },
      { id: "tech-accessories", name: "Tech Accessories" }
    ]
  },
  {
    id: "kids",
    name: "Kids",
    image: "/images/store/cate/kids.png",
    description: "Educational toys & games",
    subcategories: [
      { id: "toys", name: "Toys" },
      { id: "games", name: "Games" },
      { id: "crafts", name: "Crafts" },
      { id: "educational-toys", name: "Educational Toys" }
    ]
  },
  {
    id: "courses",
    name: "Courses",
    image: "/images/store/cate/courses.png",
    description: "Online learning programs",
    subcategories: [
      { id: "online-courses", name: "Online Courses" },
      { id: "workshops", name: "Workshops" },
      { id: "tutoring", name: "Tutoring" },
      { id: "study-materials", name: "Study Materials" }
    ]
  },
  {
    id: "uniforms",
    name: "Uniforms",
    image: "/images/store/cate/uniforms.png",
    description: "School uniforms & attire",
    subcategories: [
      { id: "school-uniforms", name: "School Uniforms" },
      { id: "sports-uniforms", name: "Sports Uniforms" },
      { id: "accessories", name: "Accessories" },
      { id: "custom-uniforms", name: "Custom Uniforms" }
    ]
  },
  {
    id: "kits",
    name: "Kits",
    image: "/images/store/cate/kits.png",
    description: "Educational kits & bundles",
    subcategories: [
      { id: "science-kits", name: "Science Kits" },
      { id: "art-kits", name: "Art Kits" },
      { id: "craft-kits", name: "Craft Kits" },
      { id: "educational-kits", name: "Educational Kits" }
    ]
  }
]

// Mock data for banners
const banners = [
  {
    id: "banner1",
    title: "Back to School Sale",
    subtitle: "Up to 40% off on school supplies",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "Shop Now",
    buttonLink: "/store/category/notebooks",
    backgroundColor: "bg-green-100",
  },
  {
    id: "banner2",
    title: "New Courses Available",
    subtitle: "Explore our latest educational courses",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "Browse Courses",
    buttonLink: "/store/category/courses",
    backgroundColor: "bg-blue-100",
  },
  {
    id: "banner3",
    title: "Uniform Collection",
    subtitle: "Quality uniforms for all schools",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "View Collection",
    buttonLink: "/store/category/uniforms",
    backgroundColor: "bg-amber-100",
  },
]

// Generate 2 example products for each subcategory in every category
const products: (Product | CourseProduct)[] = categories.flatMap(category =>
  (category.subcategories || []).flatMap(subcategory => {
    const baseProduct = {
      id: `${category.id}-${subcategory.id}-1`,
      title: `${subcategory.name} Example 1`,
      category: category.id,
      subcategory: subcategory.id,
      price_dzd: 1000 + Math.floor(Math.random() * 9000),
      original_price_dzd: 1200 + Math.floor(Math.random() * 9000),
      description: `Sample product for ${subcategory.name} in ${category.name}`,
      thumbnail: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      isNew: true,
      isOnSale: false,
      stock: 10,
    }

    // Add course-specific information for course products
    if (category.id === "courses") {
      return [
        {
          ...baseProduct,
          creator_type: "School",
          creator: {
            name: "Elite Academy",
            profile_image: "/placeholder.svg?height=50&width=50",
            logo_image: "/placeholder.svg?height=50&width=50"
          },
          grade_level: "Primary & Secondary",
          subject: "Mathematics & Languages",
          language: "English & French",
          school_affiliation: "Elite Academy"
        },
        {
          ...baseProduct,
          id: `${category.id}-${subcategory.id}-2`,
          title: `${subcategory.name} Example 2`,
          rating: 4.0,
          isNew: false,
          isOnSale: true,
          stock: 5,
          creator_type: "Teacher",
          creator: {
            name: "Dr. Sarah Johnson",
            profile_image: "/placeholder.svg?height=50&width=50"
          },
          grade_level: "Secondary",
          subject: "Science",
          language: "English",
          school_affiliation: "Elite Academy"
        }
      ]
    }

    // Return regular products for non-course categories
    return [
      baseProduct,
      {
        ...baseProduct,
        id: `${category.id}-${subcategory.id}-2`,
        title: `${subcategory.name} Example 2`,
        rating: 4.0,
        isNew: false,
        isOnSale: true,
        stock: 5,
      }
    ]
  })
)

interface IntegratedStorePageProps {
  navigateTo?: (page: string) => void
}

export default function IntegratedStorePage({ navigateTo }: IntegratedStorePageProps) {
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const router = useRouter()

  // Filter products based on search query and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSubcategory = selectedSubcategory === "all" || product.subcategory === selectedSubcategory
    const matchesPrice = product.price_dzd >= priceRange[0] && product.price_dzd <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice
  })

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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={wishlistItems.length} navigateTo={navigateTo}>
      <div className="container mx-auto px-4 py-8">
        {/* Banner Carousel */}
        <BannerCarousel
          banners={banners}
          className="mb-6"
        />

        {/* Shop by Category - Horizontal Scrollable */}
        <CategorySection categories={categories} className="mb-8" />

        {/* Main Content with Categories Sidebar and Products */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Categories - Left Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <CategoryBrowseSection
                categories={categories.map(category => ({
                  id: category.id,
                  name: category.name,
                  subcategories: category.subcategories
                }))}
                handleNavigate={handleNavigate}
              />

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Price Range</h3>
                <div className="px-3">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{priceRange[0]} DZD</span>
                    <span>{priceRange[1]} DZD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Products Grid */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCategory === "all" ? "All Products" : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>

            {/* Loading Placeholders */}
            {filteredProducts.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white animate-pulse">
                    {/* Image Placeholder */}
                    <div className="aspect-square bg-gray-200" />
                    
                    {/* Content Placeholder */}
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="flex justify-between items-center">
                        <div className="h-6 bg-gray-200 rounded w-1/3" />
                        <div className="h-8 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid 
                products={filteredProducts} 
                onAddToCart={handleAddToCart} 
                onAddToWishlist={handleAddToWishlist} 
              />
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  )
}
