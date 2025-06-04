
import { createClient } from "@/utils/supabase/server";
import ClientProduct from "@/components/product/ClientProduct"; // you’ll move your client code here
import Link from "next/link";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: product, error } = await (await supabase)
    .from("products")
    .select(`
    *,
    brand:brands (
      name
    )
  `)
    .eq("slug", params.id)
    .single();

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-4">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Link
          href="/"
          className="text-blue-500 mt-6 inline-block hover:underline"
        >
          ← Go back home
        </Link>
      </div>
    );
  }

  return <ClientProduct product={product} />;
}
