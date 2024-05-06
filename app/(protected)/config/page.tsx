import { Wrapper } from "@/components/wrapper";
import { EditUserForm } from "./_components/edit-user-form";
import { auth } from "@/auth";
import { db } from "@/lib/db";

const ConfigPage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  const initialData = {
    username: user?.username ?? "",
    imageUrl: user?.imageUrl ?? "",
    imageName: user?.imageName ?? "",
    address1: user?.address1 ?? "",
    address2: user?.address2 ?? "",
    city: user?.city ?? "",
    phone: user?.phone ?? "",
    postalCode: user?.postalCode ?? "",
    isTwoFactorEnabled: user?.isTwoFactorEnabled,
    country: user?.country ?? "",
    state: user?.state ?? "",
  };
  return (
    <Wrapper>
      <h1 className="pt-36 pb-20 xl:pt-10 text-xl font-bold text-center underline">
        Atualize suas informações
      </h1>
      <EditUserForm initialData={initialData} />
    </Wrapper>
  );
};

export default ConfigPage;
