import { OrdersPageSkeleton } from "@/components/skeletons/orders-page";
import { Wrapper } from "@/components/wrapper";

const Loading = () => {
  return (
    <Wrapper className="pt-32 xl:pt-36">
      <OrdersPageSkeleton />
    </Wrapper>
  );
};

export default Loading;
