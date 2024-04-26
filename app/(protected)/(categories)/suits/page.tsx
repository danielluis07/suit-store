import { Wrapper } from "@/components/wrapper";
import { auth } from "@/auth";
import { SuitsGrid } from "./_components/suits-grid";

const SuitsPage = async () => {
  const session = await auth();
  return (
    <Wrapper>
      <SuitsGrid session={session} />
    </Wrapper>
  );
};

export default SuitsPage;
