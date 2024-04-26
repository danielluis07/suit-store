import { Wrapper } from "@/components/wrapper";
import { SearchedProductsGrid } from "./_components/products-grid";
import { auth } from "@/auth";

const SearchPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const session = await auth();

  return (
    <Wrapper className="flex justify-center items-center mt-20">
      <SearchedProductsGrid session={session} query={searchParams?.query} />
    </Wrapper>
  );
};

export default SearchPage;
