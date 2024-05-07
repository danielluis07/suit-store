import { Wrapper } from "@/components/wrapper";
import { Message } from "./_components/message";

const StatusPage = ({ params }: { params: { status: string } }) => {
  const param = decodeURIComponent(params.status);

  return (
    <Wrapper>
      <Message param={param} />
    </Wrapper>
  );
};

export default StatusPage;
