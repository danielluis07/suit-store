import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="w-full h-72 xl:h-56 bg-black border-t border-milky text-milky">
      <div className="flex flex-col mt-6 xl:mt-16 xl:flex-row xl:justify-between w-5/6 mx-auto">
        <div className="xl:basis-28">
          <h1 className="text-xl text-center xl:text-start py-6 xl:py-0">
            Corpo Plaza
          </h1>
        </div>
        <div className="space-y-3 xl:space-y-0 xl:pr-4">
          <p className="text-center xl:text-start">
            Entre em contato: (47) 98894-4114
          </p>
          <p className="text-center xl:text-start">
            Email: bombdaniel@hotmail.com
          </p>
        </div>
        <div className="space-y-2 mt-5 xl">
          <p className="text-center xl:text-start">Siga a gente</p>
          <div className="flex gap-x-5 xl:gap-x-0 justify-center xl:justify-between">
            <FaXTwitter />
            <FaInstagram />
            <FaFacebook />
          </div>
        </div>
      </div>
      <p className="mt-4 xl:mt-10 text-sm text-center text-slate-300">
        © 2024 Corpo Plaza. Todos os direitos reservados.
      </p>
    </div>
  );
};
