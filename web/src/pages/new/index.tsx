import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { Header } from "../../components/Header";
import { MainContent } from "../../components/MainContent";
import { SectionContent } from "../../components/SectionContent";
import { Input } from "../../components/Input";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";

import logoImg from "../../assets/logo.svg";

import { api } from "../../lib/axios";

export default function New() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function createPool() {
    if (!title.trim()) {
      return toast.error("Informe um nome para seu bolão!");
    }

    setLoading(true);

    try {
      await api.post("/pools", { title: title.toUpperCase() });

      toast.success("Bolão criado com sucesso!");

      setTitle("");
    } catch (error) {
      console.error(error);

      toast.error("Não foi possivel criar o bolão!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainContent>
      <Header title='Criar novo Bolão' />

      <SectionContent>
        {loading ? (
          <div className='w-full h-full flex items-center justify-center'>
            <Loading />
          </div>
        ) : (
          <>
            <Image src={logoImg} alt='Logo NLW Copa' />

            <span className='text-white text-3xl text-center my-5'>
              Crie seu próprio bolão da copa <br /> e compartilhe entre amigos!
            </span>

            <Input
              placeholder='Qual nome do bolão?'
              onChange={(e) => setTitle(e.target.value)}
            />

            <Button
              text='Criar meu bolão'
              haveIcon={false}
              onClick={createPool}
            />

            <p className='text-gray-200 text-base text-center px-10 mt-4'>
              Após criar seu bolão, você receberá um código único que poderá
              usar para convidar outras pessoas.
            </p>
          </>
        )}
      </SectionContent>

      <Footer />
    </MainContent>
  );
}
