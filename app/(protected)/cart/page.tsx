import { Wrapper } from "@/components/wrapper";
import { auth } from "@/auth";
import { Cart } from "./_components/cart";
import { db } from "@/lib/db";

const CartPage = async () => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!session || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Houve um problema ao carregar as informações. Tente recarregar a página
      </div>
    );
  }

  return (
    <Wrapper className="pt-32 xl:pt-36">
      <Cart user={user} />
    </Wrapper>
  );
};

export default CartPage;
