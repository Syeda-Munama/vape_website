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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface Brand {
  id: string
  name: string
}

interface Series {
  id: string
  name: string
  brand_id: string
  brand?: {
    name: string
  }
  product_count?: number
}

export default function SeriesPage() {
  const { loading } = useAdminAuth()
  const [series, setSeries] = useState<Series[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [newSeries, setNewSeries] = useState<{ name: string; brand_id: string }>({
    name: "",
    brand_id: "",
  })
  const [editSeries, setEditSeries] = useState<Series | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (!loading) {
      fetchData()
    }
  }, [loading])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch brands
      const { data: brandsData, error: brandsError } = await supabase.from("brands").select("*").order("name")

      if (brandsError) throw brandsError
      setBrands(brandsData)

      // Fetch series with brand names
      const { data: seriesData, error: seriesError } = await supabase
        .from("series")
        .select("*, brand:brands(name)")
        .order("name")

      if (seriesError) throw seriesError

      // Fetch product counts for each series
      const seriesWithCounts = await Promise.all(
        seriesData.map(async (series) => {
          const { count, error } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("series_id", series.id)

          return {
            ...series,
            product_count: error ? 0 : count || 0,
          }
        }),
      )

      setSeries(seriesWithCounts)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateSeries = async () => {
    if (!newSeries.name.trim() || !newSeries.brand_id) return

    setIsSubmitting(true)
    try {
      const { data, error } = await supabase
        .from("series")
        .insert({
          name: newSeries.name.trim(),
          brand_id: newSeries.brand_id,
        })
        .select()
        .single()

      if (error) throw error

      // Find the brand name
      const brand = brands.find((b) => b.id === newSeries.brand_id)

      setSeries([
        ...series,
        {
          ...data,
          brand: { name: brand?.name || "" },
          product_count: 0,
        },
      ])
      setNewSeries({ name: "", brand_id: "" })
      setIsDialogOpen(false)
      toast({
        title: "Series created",
        description: `${newSeries.name} has been added successfully.`,
      })
    } catch (error: any) {
      console.error("Error creating series:", error)
      toast({
        title: "Error creating series",
        description: error.message || "An error occurred while creating the series.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateSeries = async () => {
    if (!editSeries || !editSeries.name.trim() || !editSeries.brand_id) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from("series")
        .update({
          name: editSeries.name.trim(),
          brand_id: editSeries.brand_id,
        })
        .eq("id", editSeries.id)

      if (error) throw error

      // Find the brand name
      const brand = brands.find((b) => b.id === editSeries.brand_id)

      setSeries(
        series.map((s) =>
          s.id === editSeries.id
            ? {
                ...s,
                name: editSeries.name.trim(),
                brand_id: editSeries.brand_id,
                brand: { name: brand?.name || "" },
              }
            : s,
        ),
      )
      setEditSeries(null)
      setIsDialogOpen(false)
      toast({
        title: "Series updated",
        description: `Series has been updated successfully.`,
      })
    } catch (error: any) {
      console.error("Error updating series:", error)
      toast({
        title: "Error updating series",
        description: error.message || "An error occurred while updating the series.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteSeries = async (id: string) => {
    try {
      const { error } = await supabase.from("series").delete().eq("id", id)

      if (error) throw error

      setSeries(series.filter((s) => s.id !== id))
      toast({
        title: "Series deleted",
        description: "Series has been deleted successfully.",
      })
    } catch (error: any) {
      console.error("Error deleting series:", error)
      toast({
        title: "Error deleting series",
        description:
          error.message === "Foreign key violation"
            ? "This series cannot be deleted because it has associated products."
            : error.message || "An error occurred while deleting the series.",
        variant: "destructive",
      })
    }
  }

  const filteredSeries = series.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.brand?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
          <h1 className="text-2xl font-bold text-gray-900">Series</h1>
          <p className="text-gray-600">Manage your product series</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Series
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editSeries ? "Edit Series" : "Add New Series"}</DialogTitle>
              <DialogDescription>
                {editSeries ? "Update the series details below." : "Enter the details for the new series."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Series Name</Label>
                <Input
                  id="name"
                  value={editSeries ? editSeries.name : newSeries.name}
                  onChange={(e) =>
                    editSeries
                      ? setEditSeries({ ...editSeries, name: e.target.value })
                      : setNewSeries({ ...newSeries, name: e.target.value })
                  }
                  placeholder="Enter series name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select
                  value={editSeries ? editSeries.brand_id : newSeries.brand_id}
                  onValueChange={(value) =>
                    editSeries
                      ? setEditSeries({ ...editSeries, brand_id: value })
                      : setNewSeries({ ...newSeries, brand_id: value })
                  }
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditSeries(null)
                  setNewSeries({ name: "", brand_id: "" })
                }}
              >
                Cancel
              </Button>
              <Button onClick={editSeries ? handleUpdateSeries : handleCreateSeries} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editSeries ? "Update Series" : "Add Series"}
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
              placeholder="Search series or brands..."
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
                <TableHead>Series Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSeries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    {searchQuery ? "No series found matching your search." : "No series found. Add your first series!"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSeries.map((series) => (
                  <TableRow key={series.id}>
                    <TableCell className="font-medium">{series.name}</TableCell>
                    <TableCell>{series.brand?.name}</TableCell>
                    <TableCell>{series.product_count}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditSeries(series)
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
                              <AlertDialogTitle>Delete Series</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{series.name}"? This action cannot be undone.
                                {series.product_count !== undefined && series.product_count > 0 && (
                                  <p className="mt-2 text-red-500">
                                    Warning: This series has {series.product_count} products associated with it.
                                    Deleting it may affect products using this series.
                                  </p>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDeleteSeries(series.id)}
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
