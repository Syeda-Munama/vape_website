import type React from "react"
import AdminSidebar from "@/components/admin/AdminSideBar"
import AdminHeader from "@/components/admin/AdminHeader"
import { AdminAuthProvider } from "@/context/AdminAuthContext"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminAuthProvider>
  )
}
