import CategoryCards from "@/components/homepage/Category";
import FeaturedProducts from "@/components/homepage/Featured";
import FeaturedBrands from "@/components/homepage/FeaturedBrands";
import FlavorExplorer from "@/components/homepage/Flaour";
import HeroBanner from "@/components/homepage/HeroBanner";

export default function HomePage(){
    return (
        <>
        <HeroBanner/>
        <FeaturedBrands/>
        <CategoryCards/>
        <FeaturedProducts/>
        <FlavorExplorer/>
        </>
    );
}