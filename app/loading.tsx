import { MainPageSkeleton } from "@/components/skeletons/main-page";
import { Wrapper } from "@/components/wrapper";

const Loading = () => {
  return (
    <Wrapper className="mt-16">
      <MainPageSkeleton />
    </Wrapper>
  );
};

export default Loading;
