"use client"

import type React from "react"
import { AnimatePresence, motion } from "framer-motion"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Heart, Menu, X, Package, Backpack, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import CategoriesDropdown from "@/components/store/categories-dropdown"

interface NavbarProps {
  cartItemsCount?: number
  wishlistItemsCount?: number
  navigateTo?: (page: string) => void
}

export default function Navbar({ cartItemsCount = 0, wishlistItemsCount = 0, navigateTo }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useIsMobile()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      // If we're in the main app context, use the navigateTo function
      if (path === '/store') {
        navigateTo('store')
      } else if (path === '/store/special-offers') {
        navigateTo('store-special-offers')
      } else if (path === '/store/bulk-purchase') {
        navigateTo('store-bulk-purchase')
      } else if (path === '/backpack-builder') {
        navigateTo('backpack-builder')
      } else {
        navigateTo(path)
      }
    } else {
      // Otherwise use the router
      window.location.href = path
    }

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  // Add animation for consistent mobile menu experience
  return (
    <header className="sticky top-0 z-[60] bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavigate("/store")} 
            className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent hover:from-green-700 hover:to-green-800 transition-all duration-300"
          >
            IBNI STORE
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-green-50 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-green-700" /> : <Menu className="w-6 h-6 text-green-700" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <CategoriesDropdown handleNavigate={handleNavigate} />

            <button 
              onClick={() => handleNavigate("/store/special-offers")} 
              className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors flex items-center gap-1 group"
            >
              Special Offers
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full group-hover:bg-green-200 transition-colors">
                New
              </span>
            </button>
          </nav>

          {/* Search, Cart, Wishlist */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            {/* Wishlist */}
            <button 
              onClick={() => handleNavigate("/store/wishlist")} 
              className="relative p-2 rounded-full hover:bg-green-50 transition-colors group"
            >
              <Heart className="h-5 w-5 text-gray-600 group-hover:text-green-700 transition-colors" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {wishlistItemsCount}
                </span>
              )}
            </button>

            {/* Bulk Purchase */}
            <button 
              onClick={() => handleNavigate("store-bulk-purchase")} 
              className="hidden sm:block p-2 rounded-full hover:bg-green-50 transition-colors group"
            >
              <Package className="h-5 w-5 text-gray-600 group-hover:text-green-700 transition-colors" />
            </button>

            {/* Build Backpack */}
            <button 
              onClick={() => handleNavigate("backpack-builder")} 
              className="hidden sm:block p-2 rounded-full hover:bg-green-50 transition-colors group"
            >
              <Backpack className="h-5 w-5 text-gray-600 group-hover:text-green-700 transition-colors" />
            </button>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="relative p-2 rounded-full hover:bg-green-50 transition-colors group"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-green-700 transition-colors" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-xl font-bold text-gray-900">Your Cart</SheetTitle>
                    <SheetDescription className="text-gray-600">
                    {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"} in your cart
                  </SheetDescription>
                </SheetHeader>

                  <div className="flex-1 overflow-y-auto p-6">
                  {cartItemsCount === 0 ? (
                      <div className="text-center py-8">
                      <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-1 text-gray-900">Your cart is empty</h3>
                        <p className="text-gray-500 mb-6">Add items to your cart to checkout</p>
                      <SheetClose asChild>
                          <Button 
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-sm hover:shadow-md transition-all duration-300"
                            onClick={() => handleNavigate("/store")}
                          >
                            Start Shopping
                          </Button>
                      </SheetClose>
                    </div>
                  ) : (
                      <div className="space-y-4">
                      {/* Cart items would be mapped here */}
                        <div className="space-y-4">
                          {/* Example cart item */}
                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                            <div className="flex-grow">
                              <h4 className="font-medium text-gray-900">Product Name</h4>
                              <p className="text-sm text-gray-500">Quantity: 1</p>
                              <p className="text-green-600 font-medium">2,999 DZD</p>
                            </div>
                            <button className="text-gray-400 hover:text-red-500">
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {cartItemsCount > 0 && (
                    <div className="border-t p-6 bg-white">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">2,999 DZD</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">Free</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t">
                          <span className="text-gray-900 font-medium">Total</span>
                          <span className="text-green-600 font-bold">2,999 DZD</span>
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="p-2 rounded-full hover:bg-green-50 transition-colors group"
                >
                  <User className="h-5 w-5 text-gray-600 group-hover:text-green-700 transition-colors" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer hover:bg-green-50">
                  <button onClick={() => handleNavigate("/login")} className="w-full text-left text-gray-700">Login</button>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-green-50">
                  <button onClick={() => handleNavigate("/register")} className="w-full text-left text-gray-700">Register</button>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-green-50">
                  <button onClick={() => handleNavigate("/account")} className="w-full text-left text-gray-700">My Account</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t"
            >
              <div className="py-4 space-y-4">
                <form onSubmit={handleSearch} className="relative px-4">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10"
                    />
                  <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>

                <nav className="px-4 space-y-2">
                  <button
                    onClick={() => handleNavigate("/store")}
                    className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    All Products
                  </button>
                  <button
                    onClick={() => handleNavigate("/store/special-offers")}
                    className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    Special Offers
                  </button>
                  <button
                    onClick={() => handleNavigate("store-bulk-purchase")}
                    className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    Bulk Purchase
                  </button>
                  <button
                    onClick={() => handleNavigate("backpack-builder")}
                    className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    Build a Backpack
                  </button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}



