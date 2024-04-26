import { Wrapper } from "@/components/wrapper";
import { auth } from "@/auth";
import { ShoesGrid } from "./_components/shoes-grid";

const ShoesPage = async () => {
  const session = await auth();
  return (
    <Wrapper>
      <ShoesGrid session={session} />
    </Wrapper>
  );
};

export default ShoesPage;
