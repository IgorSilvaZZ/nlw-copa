import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { MainContent } from "../../components/MainContent";
import { SectionContent } from "../../components/SectionContent";

import { api } from "../../lib/axios";

export default function Find() {
  const navigate = useRouter();

  const [code, setCode] = useState("");

  async function handlePoolJoin() {
    try {
      if (!code.trim()) {
        return toast.error("Informe o codigo do Bolão!");
      }

      await api.post("/pools/join", { code });

      toast.success("Você entrou no bolão com sucesso!");

      navigate.push("pools");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);

        if (error.response?.data?.message === "Pool not Found") {
          return toast.error("Bolão não encontrado!");
        }

        if (error.response?.data?.message === "You already joined this pool") {
          return toast.error("Você já esta nesse bolão!");
        }
      } else {
        console.error("Unexpected error", error);
      }
    }
  }

  return (
    <MainContent>
      <Header title='Buscar por código' showBackButton />

      <SectionContent>
        <span className='text-white text-3xl text-center my-8'>
          Encontre um bolão através de <br /> seu código único
        </span>

        <Input
          placeholder='Qual o codigo do bolão'
          onChange={(e) => setCode(e.currentTarget.value)}
        />

        <Button text='Buscar Bolão' onClick={handlePoolJoin} />
      </SectionContent>
      <Footer />
    </MainContent>
  );
}
