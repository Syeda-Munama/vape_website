
// "use client"

// import { useEffect, useState } from "react"
// import { createClient } from "@/utils/supabase/client"
// import { useAdminAuth } from "@/context/AdminAuthContext"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// interface Product {
//   id: string // Changed to string for UUID
//   name: string
//   price: number
//   discounted_price?: number
//   img_url: string
//   slug: string
//   category_id: number
//   series_id: number
//   flavours_id: number
//   description?: string
//   stock?: number
//   is_active: boolean
//   created_at: string
//   categories?: { name: string }
//   series?: { name: string; brands?: { name: string } }
//   flavours?: { name: string }
// }

// export default function AdminProductsPage() {
//   const { loading } = useAdminAuth()
//   const [products, setProducts] = useState<Product[]>([])
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
//   const [productsLoading, setProductsLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const supabase = createClient()

//   useEffect(() => {
//     if (!loading) {
//       fetchProducts()
//     }
//   }, [loading])

//   useEffect(() => {
//     filterProducts()
//   }, [products, searchTerm])

//   const fetchProducts = async () => {
//     try {
//       setProductsLoading(true)
//       const { data, error } = await supabase
//         .from("products")
//         .select(`
//           *,
//           categories (name),
//           series (
//             name,
//             brands (name)
//           ),
//           flavours (name)
//         `)
//         .order("created_at", { ascending: false })

//       if (error) throw error
//       setProducts(data || [])
//     } catch (error) {
//       console.error("Error fetching products:", error)
//     } finally {
//       setProductsLoading(false)
//     }
//   }

//   const filterProducts = () => {
//     if (!searchTerm) {
//       setFilteredProducts(products)
//       return
//     }

//     const filtered = products.filter(
//       (product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.slug.toLowerCase().includes(searchTerm.toLowerCase()),
//     )
//     setFilteredProducts(filtered)
//   }

//   const deleteProduct = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this product?")) return

//     try {
//       const { error } = await supabase.from("products").delete().eq("id", id)

//       if (error) throw error

//       setProducts(products.filter((p) => p.id !== id))
//     } catch (error) {
//       console.error("Error deleting product:", error)
//       alert("Error deleting product")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//           <p className="text-gray-600">Manage your product catalog</p>
//         </div>
//         <Button asChild>
//           <Link href="/admin/products/new">
//             <Plus className="h-4 w-4 mr-2" />
//             Add Product
//           </Link>
//         </Button>
//       </div>

//       {/* Search */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Products List */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Products ({filteredProducts.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {productsLoading ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-500">Loading products...</p>
//             </div>
//           ) : filteredProducts.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500 mb-4">No products found</p>
//               <Button asChild>
//                 <Link href="/admin/products/new">Add Your First Product</Link>
//               </Button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
//                 >
//                   <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
//                     <Image
//                       src={product.img_url || "/placeholder.svg"}
//                       alt={product.name}
//                       fill
//                       className="object-contain p-2"
//                       sizes="64px"
//                     />
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
//                     <p className="text-sm text-gray-500">
//                       {product.series?.brands?.name} • {product.series?.name} • {product.flavours?.name}
//                     </p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="font-medium">£{product.price.toFixed(2)}</span>
//                       {product.discounted_price && (
//                         <span className="text-sm text-gray-500 line-through">
//                           £{product.discounted_price.toFixed(2)}
//                         </span>
//                       )}
//                       <Badge variant={product.is_active ? "default" : "secondary"}>
//                         {product.is_active ? "Active" : "Inactive"}
//                       </Badge>
//                       {product.stock !== undefined && product.stock <= 5 && (
//                         <Badge variant="destructive">Low Stock: {product.stock}</Badge>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" asChild>
//                       <Link href={`/product/${product.slug}`} target="_blank">
//                         <Eye className="h-4 w-4" />
//                       </Link>
//                     </Button>
//                     <Button variant="outline" size="sm" asChild>
//                       <Link href={`/admin/products/${product.id}/edit`}>
//                         <Edit className="h-4 w-4" />
//                       </Link>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => deleteProduct(product.id)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  discounted_price?: number;
  img_url: string;
  slug: string;
  category_id: number;
  series_id: number;
  flavours_id: number;
  description?: string;
  stock?: number;
  is_active: boolean;
  created_at: string;
  categories?: { name: string };
  series?: { name: string; brands?: { name: string } };
  flavours?: { name: string };
}

export default function AdminProductsPage() {
  const { loading } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10; // Number of products per page
  const supabase = createClient();

  useEffect(() => {
    if (!loading) {
      fetchProducts();
    }
  }, [loading, currentPage, searchTerm]);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);

      let query = supabase
        .from("products")
        .select(
          `
          *,
          categories (name),
          series (
            name,
            brands (name)
          ),
          flavours (name)
        `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false });

      // Apply search filter if searchTerm exists
      if (searchTerm) {
        query = query.or(
          `name.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%`
        );
      }

      // Fetch total count for pagination
      const { count } = await query;

      // Fetch products for the current page
      const { data, error } = await query.range(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage - 1
      );

      if (error) throw error;
      setProducts(data || []);
      setFilteredProducts(data || []);
      setTotalProducts(count || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      // Refresh products after deletion
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Generate page numbers (e.g., show up to 5 pages around the current page)
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({totalProducts})</CardTitle>
        </CardHeader>
        <CardContent>
          {productsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No products found</p>
              <Button asChild>
                <Link href="/admin/products/new">Add Your First Product</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                      <Image
                        src={product.img_url || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.series?.brands?.name} • {product.series?.name} • {product.flavours?.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-medium">£{product.price.toFixed(2)}</span>
                        {product.discounted_price && (
                          <span className="text-sm text-gray-500 line-through">
                            £{product.discounted_price.toFixed(2)}
                          </span>
                        )}
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Active" : "Inactive"}
                        </Badge>
                        {product.stock !== undefined && product.stock <= 5 && (
                          <Badge variant="destructive">Low Stock: {product.stock}</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/product/${product.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
                    {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    {getPageNumbers().map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}