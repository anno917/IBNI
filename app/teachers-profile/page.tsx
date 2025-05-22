"use client"

import { useRouter } from "next/navigation"
import TeacherProfilePage from "@/components/pages/teacher-profile-page"

export default function TeachersProfilePage() {
  const router = useRouter()

  const navigateTo = (page: string, tab?: string | null) => {
    if (page === "find-resources") {
      // Navigate to the find resources page with a query parameter to indicate the resource type
      router.push(`/?page=find-resources&type=${tab || 'teachers'}`)
    } else {
      router.push(`/${page}`)
    }
  }

  return <TeacherProfilePage navigateTo={navigateTo} showBackButton={true} />
}
