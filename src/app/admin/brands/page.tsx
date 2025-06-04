"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { useAdminAuth } from "@/context/AdminAuthContext"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface Brand {
  id: string
  name: string
  series_count?: number
}

export default function BrandsPage() {
  const { loading } = useAdminAuth()
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [newBrandName, setNewBrandName] = useState("")
  const [editBrand, setEditBrand] = useState<Brand | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (!loading) {
      fetchBrands()
    }
  }, [loading])

  const fetchBrands = async () => {
    setIsLoading(true)
    try {
      // Fetch brands
      const { data: brandsData, error: brandsError } = await supabase.from("brands").select("*").order("name")

      if (brandsError) throw brandsError

      // Fetch series counts for each brand
      const brandsWithCounts = await Promise.all(
        brandsData.map(async (brand) => {
          const { count, error } = await supabase
            .from("series")
            .select("*", { count: "exact", head: true })
            .eq("brand_id", brand.id)

          return {
            ...brand,
            series_count: error ? 0 : count || 0,
          }
        }),
      )

      setBrands(brandsWithCounts)
    } catch (error) {
      console.error("Error fetching brands:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBrand = async () => {
    if (!newBrandName.trim()) return

    setIsSubmitting(true)
    try {
      const { data, error } = await supabase.from("brands").insert({ name: newBrandName.trim() }).select().single()

      if (error) throw error

      setBrands([...brands, { ...data, series_count: 0 }])
      setNewBrandName("")
      setIsDialogOpen(false)
      toast({
        title: "Brand created",
        description: `${newBrandName} has been added successfully.`,
      })
    } catch (error: any) {
      console.error("Error creating brand:", error)
      toast({
        title: "Error creating brand",
        description: error.message || "An error occurred while creating the brand.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateBrand = async () => {
    if (!editBrand || !editBrand.name.trim()) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from("brands").update({ name: editBrand.name.trim() }).eq("id", editBrand.id)

      if (error) throw error

      setBrands(brands.map((brand) => (brand.id === editBrand.id ? { ...brand, name: editBrand.name.trim() } : brand)))
      setEditBrand(null)
      setIsDialogOpen(false)
      toast({
        title: "Brand updated",
        description: `Brand has been updated successfully.`,
      })
    } catch (error: any) {
      console.error("Error updating brand:", error)
      toast({
        title: "Error updating brand",
        description: error.message || "An error occurred while updating the brand.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteBrand = async (id: string) => {
    try {
      const { error } = await supabase.from("brands").delete().eq("id", id)

      if (error) throw error

      setBrands(brands.filter((brand) => brand.id !== id))
      toast({
        title: "Brand deleted",
        description: "Brand has been deleted successfully.",
      })
    } catch (error: any) {
      console.error("Error deleting brand:", error)
      toast({
        title: "Error deleting brand",
        description:
          error.message === "Foreign key violation"
            ? "This brand cannot be deleted because it has associated series or products."
            : error.message || "An error occurred while deleting the brand.",
        variant: "destructive",
      })
    }
  }

  const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-600">Manage your product brands</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editBrand ? "Edit Brand" : "Add New Brand"}</DialogTitle>
              <DialogDescription>
                {editBrand ? "Update the brand details below." : "Enter the details for the new brand."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Brand Name</Label>
                <Input
                  id="name"
                  value={editBrand ? editBrand.name : newBrandName}
                  onChange={(e) =>
                    editBrand ? setEditBrand({ ...editBrand, name: e.target.value }) : setNewBrandName(e.target.value)
                  }
                  placeholder="Enter brand name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditBrand(null)
                  setNewBrandName("")
                }}
              >
                Cancel
              </Button>
              <Button onClick={editBrand ? handleUpdateBrand : handleCreateBrand} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editBrand ? "Update Brand" : "Add Brand"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand Name</TableHead>
                <TableHead>Series</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrands.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                    {searchQuery ? "No brands found matching your search." : "No brands found. Add your first brand!"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredBrands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-medium">{brand.name}</TableCell>
                    <TableCell>{brand.series_count}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditBrand(brand)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Brand</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{brand.name}"? This action cannot be undone.
                                {(brand.series_count ?? 0) > 0 && (
                                  <p className="mt-2 text-red-500">
                                    Warning: This brand has {brand.series_count ?? 0} series associated with it. Deleting it
                                    may affect products using this brand.
                                  </p>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDeleteBrand(brand.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
