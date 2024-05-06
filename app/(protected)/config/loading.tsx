import { ConfigPageSkeleton } from "@/components/skeletons/config-page";
import { Wrapper } from "@/components/wrapper";

const Loading = () => {
  return (
    <Wrapper className="pt-32 xl:pt-36">
      <ConfigPageSkeleton />
    </Wrapper>
  );
};

export default Loading;
