import { Wrapper } from "@/components/wrapper";
import { auth } from "@/auth";
import { Cart } from "./_components/cart";

const CartPage = async () => {
  const session = await auth();

  let id = null;

  if (session) {
    id = session.user.id;
  }

  return (
    <Wrapper>
      <Cart id={id} />
    </Wrapper>
  );
};

export default CartPage;
