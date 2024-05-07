import { getOrders } from "@/actions/get-data/get-orders";
import { auth } from "@/auth";
import { Wrapper } from "@/components/wrapper";
import { Orders } from "./_components/orders";

const OrdersPage = async () => {
  const session = await auth();
  const orders = await getOrders({ userId: session?.user.id });
  return (
    <Wrapper>
      <Orders orders={orders} />
    </Wrapper>
  );
};

export default OrdersPage;
