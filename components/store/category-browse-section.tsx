"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronRight,
  Building,
  BookOpen,
  GraduationCap,
  Gift,
  School,
  Briefcase,
  Baby,
  Package,
  Shirt,
  Pencil
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryItem {
  id: string
  name: string
  icon?: string
  subcategories?: { id: string; name: string }[]
}

interface CategoryBrowseSectionProps {
  categories: CategoryItem[]
  className?: string
  handleNavigate?: (path: string) => void
}

// Map of icon names to Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  "Building": <Building className="h-5 w-5" />,
  "BookOpen": <BookOpen className="h-5 w-5" />,
  "GraduationCap": <GraduationCap className="h-5 w-5" />,
  "Gift": <Gift className="h-5 w-5" />,
  "School": <School className="h-5 w-5" />,
  "Briefcase": <Briefcase className="h-5 w-5" />,
  "Baby": <Baby className="h-5 w-5" />,
  "Package": <Package className="h-5 w-5" />,
  "Shirt": <Shirt className="h-5 w-5" />,
  "Pencil": <Pencil className="h-5 w-5" />
}

export default function CategoryBrowseSection({
  categories,
  className,
  handleNavigate
}: CategoryBrowseSectionProps) {
  // Initialize with all categories collapsed
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const navigate = (path: string) => {
    if (handleNavigate) {
      handleNavigate(path)
    } else {
      window.location.href = path
    }
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className={cn("", className)}>
      <h3 className="font-medium mb-3">Categories</h3>

      <div className="bg-white rounded-lg border p-4">
        <div className="space-y-1">
          <button
            className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-gray-100 transition-colors"
            onClick={() => navigate("/store")}
          >
            All Products
          </button>

          {categories.map((category) => (
            <div key={category.id}>
              <button
                className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center justify-between transition-colors ${
                  expandedCategories.includes(category.id) ? "bg-green-50 text-green-700 font-medium" : "hover:bg-gray-50"
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <span className="flex items-center">
                  {category.icon && iconMap[category.icon] && (
                    <span className="mr-2 text-green-700">{iconMap[category.icon]}</span>
                  )}
                  <span>{category.name}</span>
                </span>
                {category.subcategories && category.subcategories.length > 0 && (
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      expandedCategories.includes(category.id) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>

              <AnimatePresence>
              {expandedCategories.includes(category.id) && category.subcategories && category.subcategories.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                <div className="ml-4 mt-1 space-y-1">
                  <button
                        className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => navigate(`/store/category/${category.id}`)}
                  >
                    All {category.name}
                  </button>

                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                          className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors"
                      onClick={() => navigate(`/store/category/${category.id}/${subcategory.id}`)}
                    >
                      {subcategory.name}
                    </button>
                  ))}
                </div>
                  </motion.div>
              )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
