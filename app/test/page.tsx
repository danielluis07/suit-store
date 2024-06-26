import { MainPageSkeleton } from "@/components/skeletons/main-page";
import { ProductPageSkeleton } from "@/components/skeletons/product-page";
import { FormSkeleton } from "@/components/skeletons/forms";
import { Wrapper } from "@/components/wrapper";
import { SearchedProductsSkeleton } from "@/components/skeletons/searched-products";
import { CartPageSkeleton } from "@/components/skeletons/cart-page";
import { ConfigPageSkeleton } from "@/components/skeletons/config-page";
import { OrdersPageSkeleton } from "@/components/skeletons/orders-page";

const TestPage = () => {
  return (
    <Wrapper className="pt-32 xl:pt-36">
      <OrdersPageSkeleton />
    </Wrapper>
  );
};

export default TestPage;
