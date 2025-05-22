"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BuildBackpackRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new backpack builder page
    router.replace('/backpack-builder')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Taking you to the new Build a Backpack page</p>
      </div>
    </div>
  )
}

