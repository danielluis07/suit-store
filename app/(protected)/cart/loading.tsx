import { CartPageSkeleton } from "@/components/skeletons/cart-page";
import { Wrapper } from "@/components/wrapper";
import React from "react";

const Loading = () => {
  return (
    <Wrapper className="pt-32 xl:pt-36">
      <CartPageSkeleton />
    </Wrapper>
  );
};

export default Loading;
