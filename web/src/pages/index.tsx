import { FormEvent, useState } from "react";
import { GetStaticProps } from "next";
import { GoogleLogo } from "phosphor-react";
import Image from "next/image";

import { api } from "../lib/axios";

import appPreviewImg from "../assets/app-nlw-preview.png";
import logoImg from "../assets/logo.svg";
import userAvatarExempleImg from "../assets/avatares.png";
import iconCheckImage from "../assets/icon-check.png";
interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(e: FormEvent) {
    e.preventDefault();

    try {
      const { data } = await api.post("/pools", {
        title: poolTitle,
      });

      const code = data.code;

      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso! O codigo foi copiado para area de transferencia!"
      );

      setPoolTitle("");
    } catch (error) {
      console.log(error);
      alert("Falha ao criar o bolão, tente novamente!");
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImg} alt='Logo NLW Copa' />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={userAvatarExempleImg} alt='' />

          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{userCount}</span>
            pessoas já estão usando
          </strong>
        </div>

        <button className=' w-full mt-2 bg-red-600 flex items-center justify-center text-white gap-2 px-6 py-4 rounded font-bold text-sm uppercase transition-colors hover:bg-red-700'>
          <GoogleLogo size={12} color='white' />
          <span>Entrar com Google</span>
        </button>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Não utilizamos nenhuma informação além do seu e-mail para criação de
          sua conta. 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImage} alt='' />

            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{poolCount}</span>
              <span>Bolões criados </span>
            </div>
          </div>

          <div className='w-px h-10 bg-gray-600'></div>

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImage} alt='' />

            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt='Dois celulares exibindo uma previa da aplicação movel da NLW Copa'
      />
    </div>
  );
}

/* export const getServerSideProps = async () => {
  const [pollCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      poolCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
}; */

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [pollCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      poolCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
    // Indicando que o conteudo da pagina vai ser revalidado ou atualizado a cada 10 segundos!!
    revalidate: 10,
  };
};
