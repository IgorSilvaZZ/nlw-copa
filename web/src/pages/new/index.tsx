import Image from "next/image";

import { Header } from "../../components/Header";
import { MainContent } from "../../components/MainContent";
import { SectionContent } from "../../components/SectionContent";
import { Input } from "../../components/Input";
import { Footer } from "../../components/Footer";

import logoImg from "../../assets/logo.svg";
import { Button } from "../../components/Button";

export default function New() {
  return (
    <MainContent>
      <Header title='Criar novo Bolão' />

      <SectionContent>
        <Image src={logoImg} alt='Logo NLW Copa' />

        <span className='text-white text-3xl text-center my-5'>
          Crie seu próprio bolão da copa <br /> e compartilhe entre amigos!
        </span>

        <Input placeholder='Qual nome do bolão?' />

        <Button text='Criar meu bolão' />

        <p className='text-gray-200 text-base text-center px-10 mt-4'>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </p>
      </SectionContent>

      <Footer />
    </MainContent>
  );
}
