import { MainPageSkeleton } from "@/components/skeletons/main-page";
import { ProductPageSkeleton } from "@/components/skeletons/product-page";
import { FormSkeleton } from "@/components/skeletons/forms";
import { Wrapper } from "@/components/wrapper";
import { SearchedProductsSkeleton } from "@/components/skeletons/searched-products";

const TestPage = () => {
  return (
    <Wrapper>
      <SearchedProductsSkeleton />
    </Wrapper>
  );
};

export default TestPage;
