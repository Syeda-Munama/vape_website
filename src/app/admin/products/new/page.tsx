// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { createClient } from "@/utils/supabase/client"
// import { useAdminAuth } from "@/context/AdminAuthContext"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { ArrowLeft, Loader2, Plus, X } from "lucide-react"
// import Link from "next/link"

// interface Brand {
//   id: string
//   name: string
// }

// interface Series {
//   id: string
//   name: string
//   brand_id: string
//   brands: Brand
// }

// interface Flavour {
//   id: string
//   name: string
// }

// interface Category {
//   id: string
//   name: string
//   slug: string
// }

// export default function NewProductPage() {
//   const { loading: authLoading } = useAdminAuth()
//   const router = useRouter()
//   const supabase = createClient()

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     brand_id: "",
//     series_id: "",
//     flavour_id: "",
//     category_id: "",
//     price: "",
//     discounted_price: "",
//     capacity: "",
//     nicotine_strength: "",
//     description: "",
//     specification: "",
//     features: [] as string[],
//     stock: "0",
//     is_active: true,
//     img_url: "",
//     slug: "",
//   })

//   // Feature input state
//   const [newFeature, setNewFeature] = useState("")

//   // Loading states
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   // Options for dropdowns
//   const [brands, setBrands] = useState<Brand[]>([])
//   const [series, setSeries] = useState<Series[]>([])
//   const [flavours, setFlavours] = useState<Flavour[]>([])
//   const [categories, setCategories] = useState<Category[]>([])

//   // Error state
//   const [error, setError] = useState("")

//   useEffect(() => {
//     if (!authLoading) {
//       fetchOptions()
//     }
//   }, [authLoading])

//   // Auto-generate slug when name changes
//   useEffect(() => {
//     if (formData.name) {
//       setFormData((prev) => ({
//         ...prev,
//         slug: formData.name
//           .toLowerCase()
//           .replace(/[^\w\s-]/g, "")
//           .replace(/\s+/g, "-"),
//       }))
//     }
//   }, [formData.name])

//   const fetchOptions = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch brands
//       const { data: brandsData, error: brandsError } = await supabase.from("brands").select("*").order("name")

//       if (brandsError) throw brandsError
//       setBrands(brandsData || [])

//       // Fetch series with brands
//       const { data: seriesData, error: seriesError } = await supabase
//         .from("series")
//         .select(`
//           id,
//           name,
//           brand_id,
//           brands (
//             id,
//             name
//           )
//         `)
//         .order("name")

//       if (seriesError) throw seriesError
//       setSeries(seriesData || [])

//       // Fetch flavours
//       const { data: flavoursData, error: flavoursError } = await supabase.from("flavours").select("*").order("name")

//       if (flavoursError) throw flavoursError
//       setFlavours(flavoursData || [])

//       // Fetch categories
//       const { data: categoriesData, error: categoriesError } = await supabase
//         .from("categories")
//         .select("*")
//         .order("name")

//       if (categoriesError) throw categoriesError
//       setCategories(categoriesData || [])
//     } catch (error) {
//       console.error("Error fetching options:", error)
//       setError("Failed to load form options")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSwitchChange = (checked: boolean) => {
//     setFormData((prev) => ({ ...prev, is_active: checked }))
//   }

//   const addFeature = () => {
//     if (newFeature.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         features: [...prev.features, newFeature.trim()],
//       }))
//       setNewFeature("")
//     }
//   }

//   const removeFeature = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index),
//     }))
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   const fileExt = file.name.split('.').pop();
//   const fileName = `${Date.now()}.${fileExt}`;
//   const filePath = `products/${fileName}`;

//   const { data, error } = await supabase.storage
//     .from("product-images") // your bucket name
//     .upload(filePath, file);

//   if (error) {
//     console.error("Image upload error:", error.message);
//     toast.error("Failed to upload image.");
//     return;
//   }

//   // Get public URL
//   const { data: publicUrlData } = supabase
//     .storage
//     .from("products")
//     .getPublicUrl(filePath);

//   if (publicUrlData.publicUrl) {
//     setFormData((prev) => ({
//       ...prev,
//       img_url: publicUrlData.publicUrl,
//     }));
//     toast.success("Image uploaded!");
//   }
// };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError("")

//     try {
//       // Parse specification as JSON if provided
//       let specificationJson = null
//       if (formData.specification.trim()) {
//         try {
//           specificationJson = JSON.parse(formData.specification)
//         } catch {
//           // If not valid JSON, store as simple object
//           specificationJson = { description: formData.specification }
//         }
//       }

//       const productData = {
//         name: formData.name,
//         brand_id: formData.brand_id || null,
//         series_id: formData.series_id || null,
//         flavour_id: formData.flavour_id || null,
//         category_id: formData.category_id || null,
//         price: Number.parseFloat(formData.price),
//         discounted_price: formData.discounted_price ? Number.parseFloat(formData.discounted_price) : null,
//         capacity: formData.capacity || null,
//         nicotine_strength: formData.nicotine_strength || null,
//         description: formData.description || null,
//         specification: specificationJson,
//         features: formData.features.length > 0 ? formData.features : null,
//         stock: Number.parseFloat(formData.stock),
//         is_active: formData.is_active,
//         img_url: formData.img_url || null,
//         slug: formData.slug,
//       }

//       const { data, error } = await supabase.from("products").insert([productData]).select()

//       if (error) throw error

//       // Redirect to products page on success
//       router.push("/admin/products")
//     } catch (error: any) {
//       console.error("Error creating product:", error)
//       setError(error.message || "Failed to create product")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (authLoading || isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="sm" asChild>
//             <Link href="/admin/products">
//               <ArrowLeft className="h-4 w-4 mr-1" />
//               Back
//             </Link>
//           </Button>
//           <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
//         </div>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Product Information</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Basic Information */}
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Product Name *</Label>
//                   <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
//                 </div>

//                 <div>
//                   <Label htmlFor="slug">Slug *</Label>
//                   <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
//                   <p className="text-xs text-gray-500 mt-1">URL-friendly version of the name (auto-generated)</p>
//                 </div>

//                 <div>
//                   <Label htmlFor="brand_id">Brand</Label>
//                   <Select value={formData.brand_id} onValueChange={(value) => handleSelectChange("brand_id", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a brand" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {brands.map((brand) => (
//                         <SelectItem key={brand.id} value={brand.id}>
//                           {brand.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="series_id">Series</Label>
//                   <Select value={formData.series_id} onValueChange={(value) => handleSelectChange("series_id", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a series" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {Object.entries(
//                         series.reduce(
//                           (groups, item) => {
//                             const brandName = item.brands?.name || "Unknown Brand"
//                             if (!groups[brandName]) {
//                               groups[brandName] = []
//                             }
//                             groups[brandName].push(item)
//                             return groups
//                           },
//                           {} as Record<string, Series[]>,
//                         ),
//                       ).map(([brandName, items]) => (
//                         <SelectGroup key={brandName}>
//                           <SelectLabel>{brandName}</SelectLabel>
//                           {items.map((series) => (
//                             <SelectItem key={series.id} value={series.id}>
//                               {series.name}
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="flavour_id">Flavour</Label>
//                   <Select
//                     value={formData.flavour_id}
//                     onValueChange={(value) => handleSelectChange("flavour_id", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a flavour" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {flavours.map((flavour) => (
//                         <SelectItem key={flavour.id} value={flavour.id}>
//                           {flavour.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="category_id">Category</Label>
//                   <Select
//                     value={formData.category_id}
//                     onValueChange={(value) => handleSelectChange("category_id", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem key={category.id} value={category.id}>
//                           {category.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Pricing and Stock */}
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="price">Price (£) *</Label>
//                   <Input
//                     id="price"
//                     name="price"
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="discounted_price">Discounted Price (£)</Label>
//                   <Input
//                     id="discounted_price"
//                     name="discounted_price"
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     value={formData.discounted_price}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="capacity">Capacity (ml)</Label>
//                   <Input id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} />
//                 </div>

//                 <div>
//                   <Label htmlFor="nicotine_strength">Nicotine Strength (mg)</Label>
//                   <Input
//                     id="nicotine_strength"
//                     name="nicotine_strength"
//                     value={formData.nicotine_strength}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="stock">Stock Quantity *</Label>
//                   <Input
//                     id="stock"
//                     name="stock"
//                     type="number"
//                     min="0"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-1">
//   <Label>Product Image</Label>
//   <Input
//     type="file"
//     accept="image/*"
//     onChange={handleFileChange}
//   />
//   {formData.img_url && (
//     <img src={formData.img_url} alt="Preview" className="h-24 mt-2 rounded" />
//   )}
// </div>


//                 <div className="flex items-center gap-2">
//                   <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} />
//                   <Label htmlFor="is_active">Active Product</Label>
//                 </div>
//               </div>
//             </div>

//             {/* Description and Details */}
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={4}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="specification">Specifications (JSON)</Label>
//                 <Textarea
//                   id="specification"
//                   name="specification"
//                   value={formData.specification}
//                   onChange={handleChange}
//                   rows={3}
//                   placeholder='{"battery": "1500mAh", "coil": "0.8Ω", "wattage": "15-25W"}'
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Enter as JSON object or plain text</p>
//               </div>

//               <div>
//                 <Label>Features</Label>
//                 <div className="space-y-2">
//                   <div className="flex gap-2">
//                     <Input
//                       value={newFeature}
//                       onChange={(e) => setNewFeature(e.target.value)}
//                       placeholder="Add a feature"
//                       onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
//                     />
//                     <Button type="button" onClick={addFeature} size="sm">
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   {formData.features.length > 0 && (
//                     <div className="space-y-1">
//                       {formData.features.map((feature, index) => (
//                         <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
//                           <span className="flex-1">{feature}</span>
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeFeature(index)}
//                             className="text-red-600 hover:text-red-700"
//                           >
//                             <X className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3">
//               <Button variant="outline" type="button" asChild>
//                 <Link href="/admin/products">Cancel</Link>
//               </Button>
//               <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 Create Product
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { createClient } from "@/utils/supabase/client"
// import { useAdminAuth } from "@/context/AdminAuthContext"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { ArrowLeft, Loader2, Plus, X, Upload, Trash2 } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// interface Brand {
//   id: string
//   name: string
// }

// interface Series {
//   id: string
//   name: string
//   brand_id: string
//   brands: Brand
// }

// interface Flavour {
//   id: string
//   name: string
// }

// interface Category {
//   id: string
//   name: string
//   slug: string
// }

// export default function NewProductPage() {
//   const { loading: authLoading } = useAdminAuth()
//   const router = useRouter()
//   const supabase = createClient()

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     brand_id: "",
//     series_id: "",
//     flavour_id: "",
//     category_id: "",
//     price: "",
//     discounted_price: "",
//     capacity: "",
//     nicotine_strength: "",
//     description: "",
//     specification: "",
//     features: [] as string[],
//     stock: "0",
//     is_active: true,
//     img_url: "",
//     slug: "",
//   })

//   // Image upload state
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState<string>("")
//   const [isUploading, setIsUploading] = useState(false)

//   // Feature input state
//   const [newFeature, setNewFeature] = useState("")

//   // Loading states
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   // Options for dropdowns
//   const [brands, setBrands] = useState<Brand[]>([])
//   const [series, setSeries] = useState<Series[]>([])
//   const [flavours, setFlavours] = useState<Flavour[]>([])
//   const [categories, setCategories] = useState<Category[]>([])

//   // Error state
//   const [error, setError] = useState("")

//   useEffect(() => {
//     if (!authLoading) {
//       fetchOptions()
//     }
//   }, [authLoading])

//   // Auto-generate slug when name changes
//   useEffect(() => {
//     if (formData.name) {
//       setFormData((prev) => ({
//         ...prev,
//         slug: formData.name
//           .toLowerCase()
//           .replace(/[^\w\s-]/g, "")
//           .replace(/\s+/g, "-"),
//       }))
//     }
//   }, [formData.name])

//   const fetchOptions = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch brands
//       const { data: brandsData, error: brandsError } = await supabase.from("brands").select("*").order("name")

//       if (brandsError) throw brandsError
//       setBrands(brandsData || [])

//       // Fetch series with brands
//       const { data: seriesData, error: seriesError } = await supabase
//         .from("series")
//         .select(`
//           id,
//           name,
//           brand_id,
//           brands (
//             id,
//             name
//           )
//         `)
//         .order("name")

//       if (seriesError) throw seriesError
//       setSeries(seriesData || [])

//       // Fetch flavours
//       const { data: flavoursData, error: flavoursError } = await supabase.from("flavours").select("*").order("name")

//       if (flavoursError) throw flavoursError
//       setFlavours(flavoursData || [])

//       // Fetch categories
//       const { data: categoriesData, error: categoriesError } = await supabase
//         .from("categories")
//         .select("*")
//         .order("name")

//       if (categoriesError) throw categoriesError
//       setCategories(categoriesData || [])
//     } catch (error) {
//       console.error("Error fetching options:", error)
//       setError("Failed to load form options")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSwitchChange = (checked: boolean) => {
//     setFormData((prev) => ({ ...prev, is_active: checked }))
//   }

//   const addFeature = () => {
//     if (newFeature.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         features: [...prev.features, newFeature.trim()],
//       }))
//       setNewFeature("")
//     }
//   }

//   const removeFeature = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index),
//     }))
//   }

//   // Handle file selection
//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         setError("Please select an image file")
//         return
//       }

//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setError("Image size must be less than 5MB")
//         return
//       }

//       setSelectedFile(file)
//       setError("")

//       // Create preview
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setImagePreview(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   // Upload image to Supabase storage
//   const uploadImage = async (): Promise<string | null> => {
//     if (!selectedFile) return null

//     setIsUploading(true)
//     try {
//       // Generate unique filename
//       const fileExt = selectedFile.name.split(".").pop()
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
//       const filePath = `products/${fileName}`

//       // Upload to Supabase storage
//       const { data, error } = await supabase.storage.from("products").upload(filePath, selectedFile, {
//         cacheControl: "3600",
//         upsert: false,
//       })

//       if (error) throw error

//       // Get public URL
//       const {
//         data: { publicUrl },
//       } = supabase.storage.from("products").getPublicUrl(filePath)

//       return publicUrl
//     } catch (error: any) {
//       console.error("Error uploading image:", error)
//       setError(error.message || "Failed to upload image")
//       return null
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   // Remove selected image
//   const removeImage = () => {
//     setSelectedFile(null)
//     setImagePreview("")
//     setFormData((prev) => ({ ...prev, img_url: "" }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError("")

//     try {
//       // Upload image first if selected
//       let imageUrl = formData.img_url
//       if (selectedFile) {
//         const uploadedUrl = await uploadImage()
//         if (uploadedUrl) {
//           imageUrl = uploadedUrl
//         } else {
//           throw new Error("Failed to upload image")
//         }
//       }

//       // Parse specification as JSON if provided
//       let specificationJson = null
//       if (formData.specification.trim()) {
//         try {
//           specificationJson = JSON.parse(formData.specification)
//         } catch {
//           // If not valid JSON, store as simple object
//           specificationJson = { description: formData.specification }
//         }
//       }

//       const productData = {
//         name: formData.name,
//         brand_id: formData.brand_id || null,
//         series_id: formData.series_id || null,
//         flavour_id: formData.flavour_id || null,
//         category_id: formData.category_id || null,
//         price: Number.parseFloat(formData.price),
//         discounted_price: formData.discounted_price ? Number.parseFloat(formData.discounted_price) : null,
//         capacity: formData.capacity || null,
//         nicotine_strength: formData.nicotine_strength || null,
//         description: formData.description || null,
//         specification: specificationJson,
//         features: formData.features.length > 0 ? formData.features : null,
//         stock: Number.parseFloat(formData.stock),
//         is_active: formData.is_active,
//         img_url: imageUrl || null,
//         slug: formData.slug,
//       }

//       const { data, error } = await supabase.from("products").insert([productData]).select()

//       if (error) throw error

//       // Redirect to products page on success
//       router.push("/admin/products")
//     } catch (error: any) {
//       console.error("Error creating product:", error)
//       setError(error.message || "Failed to create product")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (authLoading || isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="sm" asChild>
//             <Link href="/admin/products">
//               <ArrowLeft className="h-4 w-4 mr-1" />
//               Back
//             </Link>
//           </Button>
//           <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
//         </div>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Product Information</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Basic Information */}
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Product Name *</Label>
//                   <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
//                 </div>

//                 <div>
//                   <Label htmlFor="slug">Slug *</Label>
//                   <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
//                   <p className="text-xs text-gray-500 mt-1">URL-friendly version of the name (auto-generated)</p>
//                 </div>

//                 <div>
//                   <Label htmlFor="brand_id">Brand</Label>
//                   <Select value={formData.brand_id} onValueChange={(value) => handleSelectChange("brand_id", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a brand" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {brands.map((brand) => (
//                         <SelectItem key={brand.id} value={brand.id}>
//                           {brand.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="series_id">Series</Label>
//                   <Select value={formData.series_id} onValueChange={(value) => handleSelectChange("series_id", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a series" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {Object.entries(
//                         series.reduce(
//                           (groups, item) => {
//                             const brandName = item.brands?.name || "Unknown Brand"
//                             if (!groups[brandName]) {
//                               groups[brandName] = []
//                             }
//                             groups[brandName].push(item)
//                             return groups
//                           },
//                           {} as Record<string, Series[]>,
//                         ),
//                       ).map(([brandName, items]) => (
//                         <SelectGroup key={brandName}>
//                           <SelectLabel>{brandName}</SelectLabel>
//                           {items.map((series) => (
//                             <SelectItem key={series.id} value={series.id}>
//                               {series.name}
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="flavour_id">Flavour</Label>
//                   <Select
//                     value={formData.flavour_id}
//                     onValueChange={(value) => handleSelectChange("flavour_id", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a flavour" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {flavours.map((flavour) => (
//                         <SelectItem key={flavour.id} value={flavour.id}>
//                           {flavour.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="category_id">Category</Label>
//                   <Select
//                     value={formData.category_id}
//                     onValueChange={(value) => handleSelectChange("category_id", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem key={category.id} value={category.id}>
//                           {category.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Pricing and Stock */}
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="price">Price (£) *</Label>
//                   <Input
//                     id="price"
//                     name="price"
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="discounted_price">Discounted Price (£)</Label>
//                   <Input
//                     id="discounted_price"
//                     name="discounted_price"
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     value={formData.discounted_price}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="capacity">Capacity (ml)</Label>
//                   <Input id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} />
//                 </div>

//                 <div>
//                   <Label htmlFor="nicotine_strength">Nicotine Strength (mg)</Label>
//                   <Input
//                     id="nicotine_strength"
//                     name="nicotine_strength"
//                     value={formData.nicotine_strength}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="stock">Stock Quantity *</Label>
//                   <Input
//                     id="stock"
//                     name="stock"
//                     type="number"
//                     min="0"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} />
//                   <Label htmlFor="is_active">Active Product</Label>
//                 </div>
//               </div>
//             </div>

//             {/* Image Upload Section */}
//             <div className="space-y-4">
//               <Label>Product Image</Label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
//                 {!imagePreview && !formData.img_url ? (
//                   <div className="text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <div className="mt-4">
//                       <Label htmlFor="image-upload" className="cursor-pointer">
//                         <span className="mt-2 block text-sm font-medium text-gray-900">
//                           Upload product image or enter URL below
//                         </span>
//                       </Label>
//                       <Input
//                         id="image-upload"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileSelect}
//                         className="hidden"
//                       />
//                       <Button type="button" variant="outline" className="mt-2" asChild>
//                         <Label htmlFor="image-upload" className="cursor-pointer">
//                           <Upload className="h-4 w-4 mr-2" />
//                           Choose File
//                         </Label>
//                       </Button>
//                     </div>
//                     <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
//                   </div>
//                 ) : (
//                   <div className="relative">
//                     <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
//                       <Image
//                         src={imagePreview || formData.img_url}
//                         alt="Product preview"
//                         fill
//                         className="object-contain"
//                         sizes="(max-width: 768px) 100vw, 400px"
//                       />
//                     </div>
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       className="absolute top-2 right-2"
//                       onClick={removeImage}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                     {isUploading && (
//                       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
//                         <div className="text-white text-center">
//                           <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
//                           <p>Uploading...</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Manual URL input */}
//               <div>
//                 <Label htmlFor="img_url">Or enter image URL manually</Label>
//                 <Input
//                   id="img_url"
//                   name="img_url"
//                   value={formData.img_url}
//                   onChange={handleChange}
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>
//             </div>

//             {/* Description and Details */}
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={4}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="specification">Specifications (JSON)</Label>
//                 <Textarea
//                   id="specification"
//                   name="specification"
//                   value={formData.specification}
//                   onChange={handleChange}
//                   rows={3}
//                   placeholder='{"battery": "1500mAh", "coil": "0.8Ω", "wattage": "15-25W"}'
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Enter as JSON object or plain text</p>
//               </div>

//               <div>
//                 <Label>Features</Label>
//                 <div className="space-y-2">
//                   <div className="flex gap-2">
//                     <Input
//                       value={newFeature}
//                       onChange={(e) => setNewFeature(e.target.value)}
//                       placeholder="Add a feature"
//                       onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
//                     />
//                     <Button type="button" onClick={addFeature} size="sm">
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   {formData.features.length > 0 && (
//                     <div className="space-y-1">
//                       {formData.features.map((feature, index) => (
//                         <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
//                           <span className="flex-1">{feature}</span>
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeFeature(index)}
//                             className="text-red-600 hover:text-red-700"
//                           >
//                             <X className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3">
//               <Button variant="outline" type="button" asChild>
//                 <Link href="/admin/products">Cancel</Link>
//               </Button>
//               <Button type="submit" disabled={isSubmitting || isUploading}>
//                 {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 {isUploading ? "Uploading..." : "Create Product"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Loader2, Plus, X, Upload, Trash2, Check, ChevronsUpDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

export default function NewProductPage() {
  const { loading: authLoading } = useAdminAuth()
  const router = useRouter()
  const supabase = createClient()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    brand_id: "",
    series_id: "",
    flavour_id: "",
    category_id: "",
    price: "",
    discounted_price: "",
    capacity: "",
    nicotine_strength: "",
    description: "",
    specification: "",
    features: [] as string[],
    stock: "0",
    is_active: true,
    img_url: "",
    slug: "",
  })

  // Image upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  // Feature input state
  const [newFeature, setNewFeature] = useState("")

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Options for dropdowns
  const [brands, setBrands] = useState<Brand[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [flavours, setFlavours] = useState<Flavour[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  // Popover states for searchable selects
  const [brandOpen, setBrandOpen] = useState(false)
  const [seriesOpen, setSeriesOpen] = useState(false)
  const [flavourOpen, setFlavourOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

  // Error state
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading) {
      fetchOptions()
    }
  }, [authLoading])

  // Auto-generate slug when name changes
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: formData.name
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
      }))
    }
  }, [formData.name])

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
      setSeries(
        (seriesData || []).map((item: any) => ({
          ...item,
          brands: Array.isArray(item.brands) ? item.brands[0] || null : item.brands,
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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_active: checked }))
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB")
        return
      }

      setSelectedFile(file)
      setError("")

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload image to Supabase storage
  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return null

    setIsUploading(true)
    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `products/${fileName}`

      // Upload to Supabase storage
      const { data, error } = await supabase.storage.from("products").upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) throw error

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(filePath)

      return publicUrl
    } catch (error: any) {
      console.error("Error uploading image:", error)
      setError(error.message || "Failed to upload image")
      return null
    } finally {
      setIsUploading(false)
    }
  }

  // Remove selected image
  const removeImage = () => {
    setSelectedFile(null)
    setImagePreview("")
    setFormData((prev) => ({ ...prev, img_url: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Upload image first if selected
      let imageUrl = formData.img_url
      if (selectedFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          throw new Error("Failed to upload image")
        }
      }

      // Parse specification as JSON if provided
      let specificationJson = null
      if (formData.specification.trim()) {
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
        price: Number.parseFloat(formData.price),
        discounted_price: formData.discounted_price ? Number.parseFloat(formData.discounted_price) : null,
        capacity: formData.capacity || null,
        nicotine_strength: formData.nicotine_strength || null,
        description: formData.description || null,
        specification: specificationJson,
        features: formData.features.length > 0 ? formData.features : null,
        stock: Number.parseFloat(formData.stock),
        is_active: formData.is_active,
        img_url: imageUrl || null,
        slug: formData.slug,
      }

      const { data, error } = await supabase.from("products").insert([productData]).select()

      if (error) throw error

      // Redirect to products page on success
      router.push("/admin/products")
    } catch (error: any) {
      console.error("Error creating product:", error)
      setError(error.message || "Failed to create product")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper functions to get selected item names
  const getSelectedBrandName = () => {
    const brand = brands.find((b) => b.id === formData.brand_id)
    return brand ? brand.name : "Select a brand..."
  }

  const getSelectedSeriesName = () => {
    const seriesItem = series.find((s) => s.id === formData.series_id)
    return seriesItem ? `${seriesItem.name} (${seriesItem.brands?.name})` : "Select a series..."
  }

  const getSelectedFlavourName = () => {
    const flavour = flavours.find((f) => f.id === formData.flavour_id)
    return flavour ? flavour.name : "Select a flavour..."
  }

  const getSelectedCategoryName = () => {
    const category = categories.find((c) => c.id === formData.category_id)
    return category ? category.name : "Select a category..."
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
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>
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
                  <p className="text-xs text-gray-500 mt-1">URL-friendly version of the name (auto-generated)</p>
                </div>

                {/* Searchable Brand Select */}
                <div>
                  <Label>Brand</Label>
                  <Popover open={brandOpen} onOpenChange={setBrandOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={brandOpen}
                        className="w-full justify-between"
                      >
                        {getSelectedBrandName()}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search brands..." />
                        <CommandList>
                          <CommandEmpty>No brand found.</CommandEmpty>
                          <CommandGroup>
                            {brands.map((brand) => (
                              <CommandItem
                                key={brand.id}
                                value={brand.name}
                                onSelect={() => {
                                  handleSelectChange("brand_id", brand.id)
                                  setBrandOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.brand_id === brand.id ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {brand.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Searchable Series Select */}
                <div>
                  <Label>Series</Label>
                  <Popover open={seriesOpen} onOpenChange={setSeriesOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={seriesOpen}
                        className="w-full justify-between"
                      >
                        {getSelectedSeriesName()}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search series..." />
                        <CommandList>
                          <CommandEmpty>No series found.</CommandEmpty>
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
                            <CommandGroup key={brandName} heading={brandName}>
                              {items.map((seriesItem) => (
                                <CommandItem
                                  key={seriesItem.id}
                                  value={`${seriesItem.name} ${brandName}`}
                                  onSelect={() => {
                                    handleSelectChange("series_id", seriesItem.id)
                                    setSeriesOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.series_id === seriesItem.id ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {seriesItem.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Searchable Flavour Select */}
                <div>
                  <Label>Flavour</Label>
                  <Popover open={flavourOpen} onOpenChange={setFlavourOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={flavourOpen}
                        className="w-full justify-between"
                      >
                        {getSelectedFlavourName()}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search flavours..." />
                        <CommandList>
                          <CommandEmpty>No flavour found.</CommandEmpty>
                          <CommandGroup>
                            {flavours.map((flavour) => (
                              <CommandItem
                                key={flavour.id}
                                value={flavour.name}
                                onSelect={() => {
                                  handleSelectChange("flavour_id", flavour.id)
                                  setFlavourOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.flavour_id === flavour.id ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {flavour.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Searchable Category Select */}
                <div>
                  <Label>Category</Label>
                  <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={categoryOpen}
                        className="w-full justify-between"
                      >
                        {getSelectedCategoryName()}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={() => {
                                  handleSelectChange("category_id", category.id)
                                  setCategoryOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.category_id === category.id ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {category.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                    value={formData.discounted_price}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">Capacity (ml)</Label>
                  <Input id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="nicotine_strength">Nicotine Strength (mg)</Label>
                  <Input
                    id="nicotine_strength"
                    name="nicotine_strength"
                    value={formData.nicotine_strength}
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

                <div className="flex items-center gap-2">
                  <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="is_active">Active Product</Label>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label>Product Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {!imagePreview && !formData.img_url ? (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Upload product image or enter URL below
                        </span>
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" className="mt-2" asChild>
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </Label>
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={imagePreview || formData.img_url}
                        alt="Product preview"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="text-white text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                          <p>Uploading...</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Manual URL input */}
              <div>
                <Label htmlFor="img_url">Or enter image URL manually</Label>
                <Input
                  id="img_url"
                  name="img_url"
                  value={formData.img_url}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Description and Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="specification">Specifications (JSON)</Label>
                <Textarea
                  id="specification"
                  name="specification"
                  value={formData.specification}
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
                  {formData.features.length > 0 && (
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
              <Button type="submit" disabled={isSubmitting || isUploading}>
                {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isUploading ? "Uploading..." : "Create Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
