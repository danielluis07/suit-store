import { Wrapper } from "@/components/wrapper";
import { auth } from "@/auth";
import { VestsGrid } from "./_components/vests-grid";

const VestsPage = async () => {
  const session = await auth();
  return (
    <Wrapper>
      <VestsGrid session={session} />
    </Wrapper>
  );
};

export default VestsPage;
