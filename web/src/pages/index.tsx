import { FormEvent, useState } from "react";
import Image from "next/image";

import appPreviewImg from "../assets/app-nlw-preview.png";
import logoImg from "../assets/logo.svg";
import userAvatarExempleImg from "../assets/avatares.png";
import iconCheckImage from "../assets/icon-check.png";
import { api } from "../lib/axios";

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

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input
            type='text'
            required
            placeholder='Qual nome do seu bolão'
            className='flex-1 px-6 py-4 text-gray-100 rounded bg-gray-800 border border-gray-600 text-sm'
            value={poolTitle}
            onChange={(e) => setPoolTitle(e.target.value)}
          />
          <button
            className='bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase transition-colors hover:bg-yellow-700'
            type='submit'
          >
            Criar meu Bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
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

export const getServerSideProps = async () => {
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
};
