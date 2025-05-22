import type React from "react"
import Navbar from "@/components/store/navbar"
import StoreFooter from "@/components/store/footer"

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">{children}</main>
      <StoreFooter />
    </div>
  )
}





