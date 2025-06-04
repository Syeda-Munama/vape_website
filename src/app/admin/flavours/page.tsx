// "use client"

// import { useState, useEffect } from "react"
// import { createClient } from "@/utils/supabase/client"
// import { useAdminAuth } from "@/context/AdminAuthContext"
// import { Plus, Pencil, Trash2, Search } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"

// interface Flavour {
//   id: string
//   name: string
//   product_count?: number
// }

// export default function FlavoursPage() {
//   const { loading } = useAdminAuth()
//   const [flavours, setFlavours] = useState<Flavour[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [newFlavourName, setNewFlavourName] = useState("")
//   const [editFlavour, setEditFlavour] = useState<Flavour | null>(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const supabase = createClient()

//   useEffect(() => {
//     if (!loading) {
//       fetchFlavours()
//     }
//   }, [loading])

//   const fetchFlavours = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch flavours
//       const { data: flavoursData, error: flavoursError } = await supabase.from("flavours").select("*").order("name")

//       if (flavoursError) throw flavoursError

//       // Fetch product counts for each flavour
//       const flavoursWithCounts = await Promise.all(
//         flavoursData.map(async (flavour) => {
//           const { count, error } = await supabase
//             .from("products")
//             .select("*", { count: "exact", head: true })
//             .eq("flavour_id", flavour.id)

//           return {
//             ...flavour,
//             product_count: error ? 0 : count || 0,
//           }
//         }),
//       )

//       setFlavours(flavoursWithCounts)
//     } catch (error) {
//       console.error("Error fetching flavours:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCreateFlavour = async () => {
//     if (!newFlavourName.trim()) return

//     setIsSubmitting(true)
//     try {
//       const { data, error } = await supabase.from("flavours").insert({ name: newFlavourName.trim() }).select().single()

//       if (error) throw error

//       setFlavours([...flavours, { ...data, product_count: 0 }])
//       setNewFlavourName("")
//       setIsDialogOpen(false)
//       toast({
//         title: "Flavour created",
//         description: `${newFlavourName} has been added successfully.`,
//       })
//     } catch (error: any) {
//       console.error("Error creating flavour:", error)
//       toast({
//         title: "Error creating flavour",
//         description: error.message || "An error occurred while creating the flavour.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleUpdateFlavour = async () => {
//     if (!editFlavour || !editFlavour.name.trim()) return

//     setIsSubmitting(true)
//     try {
//       const { error } = await supabase
//         .from("flavours")
//         .update({ name: editFlavour.name.trim() })
//         .eq("id", editFlavour.id)

//       if (error) throw error

//       setFlavours(
//         flavours.map((flavour) =>
//           flavour.id === editFlavour.id ? { ...flavour, name: editFlavour.name.trim() } : flavour,
//         ),
//       )
//       setEditFlavour(null)
//       setIsDialogOpen(false)
//       toast({
//         title: "Flavour updated",
//         description: `Flavour has been updated successfully.`,
//       })
//     } catch (error: any) {
//       console.error("Error updating flavour:", error)
//       toast({
//         title: "Error updating flavour",
//         description: error.message || "An error occurred while updating the flavour.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleDeleteFlavour = async (id: string) => {
//     try {
//       const { error } = await supabase.from("flavours").delete().eq("id", id)

//       if (error) throw error

//       setFlavours(flavours.filter((flavour) => flavour.id !== id))
//       toast({
//         title: "Flavour deleted",
//         description: "Flavour has been deleted successfully.",
//       })
//     } catch (error: any) {
//       console.error("Error deleting flavour:", error)
//       toast({
//         title: "Error deleting flavour",
//         description:
//           error.message === "Foreign key violation"
//             ? "This flavour cannot be deleted because it has associated products."
//             : error.message || "An error occurred while deleting the flavour.",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredFlavours = flavours.filter((flavour) => flavour.name.toLowerCase().includes(searchQuery.toLowerCase()))

//   if (loading || isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Flavours</h1>
//           <p className="text-gray-600">Manage your product flavours</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="h-4 w-4 mr-2" />
//               Add Flavour
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>{editFlavour ? "Edit Flavour" : "Add New Flavour"}</DialogTitle>
//               <DialogDescription>
//                 {editFlavour ? "Update the flavour details below." : "Enter the details for the new flavour."}
//               </DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Flavour Name</Label>
//                 <Input
//                   id="name"
//                   value={editFlavour ? editFlavour.name : newFlavourName}
//                   onChange={(e) =>
//                     editFlavour
//                       ? setEditFlavour({ ...editFlavour, name: e.target.value })
//                       : setNewFlavourName(e.target.value)
//                   }
//                   placeholder="Enter flavour name"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setIsDialogOpen(false)
//                   setEditFlavour(null)
//                   setNewFlavourName("")
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={editFlavour ? handleUpdateFlavour : handleCreateFlavour} disabled={isSubmitting}>
//                 {isSubmitting ? "Saving..." : editFlavour ? "Update Flavour" : "Add Flavour"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <div className="p-4 border-b">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <Input
//               placeholder="Search flavours..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Flavour Name</TableHead>
//                 <TableHead>Products</TableHead>
//                 <TableHead className="w-[100px]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredFlavours.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center py-8 text-gray-500">
//                     {searchQuery
//                       ? "No flavours found matching your search."
//                       : "No flavours found. Add your first flavour!"}
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredFlavours.map((flavour) => (
//                   <TableRow key={flavour.id}>
//                     <TableCell className="font-medium">{flavour.name}</TableCell>
//                     <TableCell>{flavour.product_count}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => {
//                             setEditFlavour(flavour)
//                             setIsDialogOpen(true)
//                           }}
//                         >
//                           <Pencil className="h-4 w-4" />
//                           <span className="sr-only">Edit</span>
//                         </Button>
//                         <AlertDialog>
//                           <AlertDialogTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <Trash2 className="h-4 w-4 text-red-500" />
//                               <span className="sr-only">Delete</span>
//                             </Button>
//                           </AlertDialogTrigger>
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <AlertDialogTitle>Delete Flavour</AlertDialogTitle>
//                               <AlertDialogDescription>
//                                 Are you sure you want to delete "{flavour.name}"? This action cannot be undone.
//                                 {flavour.product_count > 0 && (
//                                   <p className="mt-2 text-red-500">
//                                     Warning: This flavour has {flavour.product_count} products associated with it.
//                                     Deleting it may affect products using this flavour.
//                                   </p>
//                                 )}
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel>Cancel</AlertDialogCancel>
//                               <AlertDialogAction
//                                 className="bg-red-500 hover:bg-red-600"
//                                 onClick={() => handleDeleteFlavour(flavour.id)}
//                               >
//                                 Delete
//                               </AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface Flavour {
  id: string;
  name: string;
  product_count?: number;
}

const ITEMS_PER_PAGE = 10;

export default function FlavoursPage() {
  const { loading: authLoading } = useAdminAuth();
  const [flavours, setFlavours] = useState<Flavour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [newFlavourName, setNewFlavourName] = useState("");
  const [editFlavour, setEditFlavour] = useState<Flavour | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Fixed syntax error
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFlavours, setTotalFlavours] = useState(0);
  const supabase = createClient();

  const initialLoading = authLoading || isLoading;

  const fetchFlavours = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("flavours")
        .select("*", { count: "exact" })
        .order("name");

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      } else {
        query = query.range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);
      }

      const { data: flavoursData, error: flavoursError, count } = await query;

      if (flavoursError) throw flavoursError;

      const flavoursWithCounts = await Promise.all(
        flavoursData.map(async (flavour) => {
          const { count: productCount, error } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("flavour_id", flavour.id);

          return {
            ...flavour,
            product_count: error ? 0 : productCount || 0,
          };
        }),
      );

      setFlavours(flavoursWithCounts);
      setTotalFlavours(count || 0);
    } catch (error) {
      console.error("Error fetching flavours:", error);
      toast({
        title: "Error fetching flavours",
        description: "Failed to load flavours. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (!authLoading) {
      fetchFlavours();
    }
  }, [authLoading, fetchFlavours]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);
      fetchFlavours();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, fetchFlavours]);

  const handleCreateFlavour = async () => {
    if (!newFlavourName.trim()) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("flavours")
        .insert({ name: newFlavourName.trim() })
        .select()
        .single();

      if (error) throw error;

      if (!searchQuery) {
        setFlavours([{ ...data, product_count: 0 }, ...flavours]);
        setTotalFlavours((prev) => prev + 1);
      } else {
        fetchFlavours();
      }

      setNewFlavourName("");
      setIsDialogOpen(false);
      toast({
        title: "Flavour created",
        description: `${newFlavourName} has been added successfully.`,
      });
    } catch (error: any) {
      console.error("Error creating flavour:", error);
      toast({
        title: "Error creating flavour",
        description: error.message || "An error occurred while creating the flavour.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateFlavour = async () => {
    if (!editFlavour || !editFlavour.name.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("flavours")
        .update({ name: editFlavour.name.trim() })
        .eq("id", editFlavour.id);

      if (error) throw error;

      setFlavours(
        flavours.map((flavour) =>
          flavour.id === editFlavour.id ? { ...flavour, name: editFlavour.name.trim() } : flavour
        )
      );
      setEditFlavour(null);
      setIsDialogOpen(false);
      toast({
        title: "Flavour updated",
        description: `Flavour has been updated successfully.`,
      });
    } catch (error: any) {
      console.error("Error updating flavour:", error);
      toast({
        title: "Error updating flavour",
        description: error.message || "An error occurred while updating the flavour.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFlavour = async (id: string) => {
    try {
      const { error } = await supabase.from("flavours").delete().eq("id", id);

      if (error) throw error;

      fetchFlavours();
      setTotalFlavours((prev) => prev - 1);
      toast({
        title: "Flavour deleted",
        description: "Flavour has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting flavour:", error);
      toast({
        title: "Error deleting flavour",
        description:
          error.message === "Foreign key violation"
            ? "This flavour cannot be deleted because it has associated products."
            : error.message || "An error occurred while deleting the flavour.",
        variant: "destructive",
      });
    }
  };

  const totalPages = Math.ceil(totalFlavours / ITEMS_PER_PAGE);

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

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flavours</h1>
            <p className="text-gray-600">Manage your product flavours</p>
          </div>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Flavour
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search flavours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flavour Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" disabled>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Flavours</h1>
          <p className="text-gray-600">Manage your product flavours</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Flavour
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editFlavour ? "Edit Flavour" : "Add New Flavour"}</DialogTitle>
              <DialogDescription>
                {editFlavour ? "Update the flavour details below." : "Enter the details for the new flavour."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Flavour Name</Label>
                <Input
                  id="name"
                  value={editFlavour ? editFlavour.name : newFlavourName}
                  onChange={(e) =>
                    editFlavour
                      ? setEditFlavour({ ...editFlavour, name: e.target.value })
                      : setNewFlavourName(e.target.value)
                  }
                  placeholder="Enter flavour name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditFlavour(null);
                  setNewFlavourName("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => editFlavour ? handleUpdateFlavour() : handleCreateFlavour()}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : editFlavour ? "Update Flavour" : "Add Flavour"}
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
              placeholder="Search flavours..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flavour Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flavours.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                    {searchQuery
                      ? "No flavours found matching your search."
                      : "No flavours found. Add your first flavour!"}
                  </TableCell>
                </TableRow>
              ) : (
                flavours.map((flavour) => (
                  <TableRow key={flavour.id}>
                    <TableCell className="font-medium">{flavour.name}</TableCell>
                    <TableCell>{flavour.product_count}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditFlavour(flavour);
                            setIsDialogOpen(true);
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
                              <AlertDialogTitle>Delete Flavour</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{flavour.name}"? This action cannot be undone.
                                {flavour.product_count && flavour.product_count > 0 && (
                                  <p className="mt-2 text-red-500">
                                    Warning: This flavour has {flavour.product_count} products associated with it.
                                    Deleting it may affect products using this flavour.
                                  </p>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDeleteFlavour(flavour.id)}
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
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, totalFlavours)} of {totalFlavours} flavours
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
      </div>
    </div>
  );
}