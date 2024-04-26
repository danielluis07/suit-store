import { Banner } from "@/components/banner";
import { Deal } from "@/components/deal-image";
import { Wrapper } from "@/components/wrapper";
import { FeaturedProducts } from "./(protected)/_components/featured-products";
import { CategoriesBanner } from "./(protected)/_components/categories-banner";
import { ProductsCarousel } from "./(protected)/_components/products-carousel";
import { getBillboards } from "@/actions/get-data/get-billboards";
import { getProducts } from "@/actions/get-data/get-products";
import { auth } from "@/auth";

export default async function Home() {
  const billboards = await getBillboards();
  const featuredProducts = await getProducts({ isFeatured: true });
  const newProducts = await getProducts({ isNew: true });
  const session = await auth();

  return (
    <div>
      <Banner billboards={billboards} />
      <Wrapper>
        <div className="pt-10">
          <Deal className="w-full h-32 sm:h-40 md:hidden" />
          <FeaturedProducts products={featuredProducts} session={session} />
        </div>
        <div className="mt-10">
          <CategoriesBanner />
        </div>
        {newProducts.length ? (
          <div className="mt-14">
            <ProductsCarousel
              title="Novidades"
              products={newProducts}
              session={session}
            />
          </div>
        ) : null}
        <div className="mt-16">
          <Deal className="w-full hidden md:flex md:w-4/6 md:mx-auto md:h-[290px]" />
        </div>
      </Wrapper>
    </div>
  );
}
