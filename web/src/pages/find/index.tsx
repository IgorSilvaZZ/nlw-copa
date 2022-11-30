import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { MainContent } from "../../components/MainContent";
import { SectionContent } from "../../components/SectionContent";

export default function Find() {
  return (
    <MainContent>
      <Header title='Buscar por código' showBackButton />

      <SectionContent>
        <span className='text-white text-3xl text-center my-8'>
          Encontre um bolão através de <br /> seu código único
        </span>

        <Input placeholder='Qual o codigo do bolão' />

        <Button text='Buscar Bolão' />
      </SectionContent>

      <Footer />
    </MainContent>
  );
}
