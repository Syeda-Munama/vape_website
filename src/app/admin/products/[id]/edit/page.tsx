"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useAdminAuth } from "@/context/AdminAuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Loader2, Trash2, Plus, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Brand {
  id: string
  name: string
}

interface Series {
  id: string
  name: string
  brand_id: string
  brands: Brand
}

interface Flavour {
  id: string
  name: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  name: string
  brand_id: string | null
  series_id: string | null
  flavour_id: string | null
  category_id: string | null
  price: number
  discounted_price: number | null
  capacity: string | null
  nicotine_strength: string | null
  description: string | null
  specification: any | null
  features: string[] | null
  stock: number
  is_active: boolean
  img_url: string | null
  slug: string
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { loading: authLoading } = useAdminAuth()
  const router = useRouter()
  const supabase = createClient()
  const productId = params.id

  // Form state
  const [formData, setFormData] = useState<Product>({
    id: productId,
    name: "",
    brand_id: null,
    series_id: null,
    flavour_id: null,
    category_id: null,
    price: 0,
    discounted_price: null,
    capacity: null,
    nicotine_strength: null,
    description: null,
    specification: null,
    features: null,
    stock: 0,
    is_active: true,
    img_url: null,
    slug: "",
  })

  // Feature input state
  const [newFeature, setNewFeature] = useState("")

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  // Options for dropdowns
  const [brands, setBrands] = useState<Brand[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [flavours, setFlavours] = useState<Flavour[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  // Error state
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading) {
      fetchProduct()
      fetchOptions()
    }
  }, [authLoading, productId])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

      if (error) throw error
      if (!data) throw new Error("Product not found")

      setFormData(data)
    } catch (error) {
      console.error("Error fetching product:", error)
      setError("Failed to load product")
    }
  }

  const fetchOptions = async () => {
    setIsLoading(true)
    try {
      // Fetch brands
      const { data: brandsData, error: brandsError } = await supabase.from("brands").select("*").order("name")

      if (brandsError) throw brandsError
      setBrands(brandsData || [])

      // Fetch series with brands
      const { data: seriesData, error: seriesError } = await supabase
        .from("series")
        .select(`
          id,
          name,
          brand_id,
          brands (
            id,
            name
          )
        `)
        .order("name")

      if (seriesError) throw seriesError
      // Map brands from array to single object (or null)
      setSeries(
        (seriesData || []).map((item: any) => ({
          ...item,
          brands: Array.isArray(item.brands) ? item.brands[0] || null : item.brands || null,
        }))
      )

      // Fetch flavours
      const { data: flavoursData, error: flavoursError } = await supabase.from("flavours").select("*").order("name")

      if (flavoursError) throw flavoursError
      setFlavours(flavoursData || [])

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      if (categoriesError) throw categoriesError
      setCategories(categoriesData || [])
    } catch (error) {
      console.error("Error fetching options:", error)
      setError("Failed to load form options")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value || null }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_active: checked }))
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Parse specification as JSON if provided
      let specificationJson = formData.specification
      if (typeof formData.specification === "string" && formData.specification.trim()) {
        try {
          specificationJson = JSON.parse(formData.specification)
        } catch {
          // If not valid JSON, store as simple object
          specificationJson = { description: formData.specification }
        }
      }

      const productData = {
        name: formData.name,
        brand_id: formData.brand_id || null,
        series_id: formData.series_id || null,
        flavour_id: formData.flavour_id || null,
        category_id: formData.category_id || null,
        price: typeof formData.price === "string" ? Number.parseFloat(formData.price) : formData.price,
        discounted_price: formData.discounted_price
          ? typeof formData.discounted_price === "string"
            ? Number.parseFloat(formData.discounted_price)
            : formData.discounted_price
          : null,
        capacity: formData.capacity,
        nicotine_strength: formData.nicotine_strength,
        description: formData.description,
        specification: specificationJson,
        features: formData.features && formData.features.length > 0 ? formData.features : null,
        stock: typeof formData.stock === "string" ? Number.parseFloat(formData.stock) : formData.stock,
        is_active: formData.is_active,
        img_url: formData.img_url,
        slug: formData.slug,
      }

      const { error } = await supabase.from("products").update(productData).eq("id", productId)

      if (error) throw error

      // Redirect to products page on success
      router.push("/admin/products")
    } catch (error: any) {
      console.error("Error updating product:", error)
      setError(error.message || "Failed to update product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      const { error } = await supabase.from("products").delete().eq("id", productId)

      if (error) throw error

      // Redirect to products page on success
      router.push("/admin/products")
    } catch (error: any) {
      console.error("Error deleting product:", error)
      setError(error.message || "Failed to delete product")
      setIsDeleting(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
          Delete Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="brand_id">Brand</Label>
                  <Select
                    value={formData.brand_id || ""}
                    onValueChange={(value) => handleSelectChange("brand_id", value)}
                  >
                    <SelectTrigger>
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

                <div>
                  <Label htmlFor="series_id">Series</Label>
                  <Select
                    value={formData.series_id || ""}
                    onValueChange={(value) => handleSelectChange("series_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a series" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(
                        series.reduce(
                          (groups, item) => {
                            const brandName = item.brands?.name || "Unknown Brand"
                            if (!groups[brandName]) {
                              groups[brandName] = []
                            }
                            groups[brandName].push(item)
                            return groups
                          },
                          {} as Record<string, Series[]>,
                        ),
                      ).map(([brandName, items]) => (
                        <SelectGroup key={brandName}>
                          <SelectLabel>{brandName}</SelectLabel>
                          {items.map((series) => (
                            <SelectItem key={series.id} value={series.id}>
                              {series.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="flavour_id">Flavour</Label>
                  <Select
                    value={formData.flavour_id || ""}
                    onValueChange={(value) => handleSelectChange("flavour_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a flavour" />
                    </SelectTrigger>
                    <SelectContent>
                      {flavours.map((flavour) => (
                        <SelectItem key={flavour.id} value={flavour.id}>
                          {flavour.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category_id">Category</Label>
                  <Select
                    value={formData.category_id || ""}
                    onValueChange={(value) => handleSelectChange("category_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pricing and Stock */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Price (£) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="discounted_price">Discounted Price (£)</Label>
                  <Input
                    id="discounted_price"
                    name="discounted_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.discounted_price || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">Capacity (ml)</Label>
                  <Input id="capacity" name="capacity" value={formData.capacity || ""} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="nicotine_strength">Nicotine Strength (mg)</Label>
                  <Input
                    id="nicotine_strength"
                    name="nicotine_strength"
                    value={formData.nicotine_strength || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="img_url">Image URL</Label>
                  <Input
                    id="img_url"
                    name="img_url"
                    value={formData.img_url || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {formData.img_url && (
                  <div className="border rounded-md p-2">
                    <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                    <div className="relative h-32 bg-gray-100 rounded">
                      <Image
                        src={formData.img_url || "/placeholder.svg"}
                        alt={formData.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="is_active">Active Product</Label>
                </div>
              </div>
            </div>

            {/* Description and Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="specification">Specifications (JSON)</Label>
                <Textarea
                  id="specification"
                  name="specification"
                  value={
                    typeof formData.specification === "string"
                      ? formData.specification
                      : JSON.stringify(formData.specification, null, 2)
                  }
                  onChange={handleChange}
                  rows={3}
                  placeholder='{"battery": "1500mAh", "coil": "0.8Ω", "wattage": "15-25W"}'
                />
                <p className="text-xs text-gray-500 mt-1">Enter as JSON object or plain text</p>
              </div>

              <div>
                <Label>Features</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.features && formData.features.length > 0 && (
                    <div className="space-y-1">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <span className="flex-1">{feature}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" asChild>
                <Link href="/admin/products">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

