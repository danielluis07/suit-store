import { SearchedProductsSkeleton } from "@/components/skeletons/searched-products";
import { Wrapper } from "@/components/wrapper";

const Loading = () => {
  return (
    <Wrapper>
      <SearchedProductsSkeleton />
    </Wrapper>
  );
};

export default Loading;
