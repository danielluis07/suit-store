import { ProductsGrid } from "../_components/products-grid";
import { auth } from "@/auth";

const ProductsPage = async () => {
  const session = await auth();
  return (
    <div className="mt-20 pb-10 max-w-[1400px] min-h-full mx-auto px-4 bg-milky">
      <ProductsGrid session={session} />
    </div>
  );
};

export default ProductsPage;
