import { ProductPageSkeleton } from "@/components/skeletons/product-page";
import { Wrapper } from "@/components/wrapper";

const Loading = () => {
  return (
    <Wrapper>
      <ProductPageSkeleton />
    </Wrapper>
  );
};

export default Loading;
