import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrapper } from "@/components/wrapper";

const ContactPage = () => {
  return (
    <Wrapper>
      <h1 className="font-bold text-2xl underline pt-28 xl:20">
        Entre em contato
      </h1>
      <form className="mt-10">
        <div className="space-y-3">
          <div>
            <Label>Nome</Label>
            <Input />
          </div>
          <div>
            <Label>Email</Label>
            <Input />
          </div>
          <div>
            <Label>Mensagem</Label>
            <Textarea />
          </div>
          <Button>Enviar</Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ContactPage;
