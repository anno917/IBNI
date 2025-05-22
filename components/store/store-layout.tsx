"use client"

import React from "react"
import Navbar from "@/components/store/navbar"
import StoreFooter from "@/components/store/footer"

interface StoreLayoutProps {
  children: React.ReactNode
  cartItemsCount?: number
  wishlistItemsCount?: number
  navigateTo?: (page: string) => void
}

export default function StoreLayout({
  children,
  cartItemsCount = 0,
  wishlistItemsCount = 0,
  navigateTo,
}: StoreLayoutProps) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar cartItemsCount={cartItemsCount} wishlistItemsCount={wishlistItemsCount} navigateTo={navigateTo} />
      <main className="bg-gray-50 flex-grow">{children}</main>
      <StoreFooter handleNavigate={navigateTo} />
    </div>
  )
}
