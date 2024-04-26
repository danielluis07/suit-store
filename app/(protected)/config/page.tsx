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
    username: user?.username as string | undefined,
    imageUrl: user?.imageUrl as string | undefined,
    imageName: user?.imageName as string | undefined,
  };
  return (
    <Wrapper>
      <div className="pt-10 xl:pt-0">
        <div className="mb-10 text-xl font-bold">Atualize suas informações</div>
      </div>
      <div>
        <EditUserForm initialData={initialData} />
      </div>
    </Wrapper>
  );
};

export default ConfigPage;
