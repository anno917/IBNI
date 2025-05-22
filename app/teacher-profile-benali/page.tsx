"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import TeacherProfileBenali from "@/components/pages/teacher-profile-benali"

function TeacherProfileBenaliContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showBackButton, setShowBackButton] = useState(false)

  useEffect(() => {
    // Check if the page was accessed from the find resources page
    const fromFindResources = searchParams.get('fromFindResources')
    setShowBackButton(fromFindResources === 'true')
  }, [searchParams])

  const navigateTo = (page: string, tab?: string | null) => {
    if (page === "find-resources") {
      // Navigate to the find resources page with a query parameter to indicate the resource type
      router.push(`/?page=find-resources&type=${tab || 'teachers'}`)
    } else {
      router.push(`/${page}`)
    }
  }

  return <TeacherProfileBenali navigateTo={navigateTo} showBackButton={showBackButton} />
}

export default function TeacherProfileBenaliPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeacherProfileBenaliContent />
    </Suspense>
  )
}
