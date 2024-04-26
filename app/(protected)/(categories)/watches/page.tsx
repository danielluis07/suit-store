import { Wrapper } from "@/components/wrapper";
import { auth } from "@/auth";
import { WatchesGrid } from "./_components/watches-grid";

const WatchesPage = async () => {
  const session = await auth();
  return (
    <Wrapper>
      <WatchesGrid session={session} />
    </Wrapper>
  );
};

export default WatchesPage;
