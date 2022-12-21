import { useRouter } from 'next/router';

export const EmptyPoolList = () => {

    const navigate = useRouter();

    function goToPage(page: string) {
        navigate.push(page);
    }

    return (
        <span className='w-full text-center text-2xl text-white'>
              Você ainda não está participando de <br /> nenhum bolão, que tal{" "}
              <span
                className='text-yellow-500 cursor-pointer transitions-colors'
                onClick={() => goToPage("/find")}
              >
                buscar um por código
              </span>
              <br />
              ou{" "}
              <span
                className='text-yellow-500 cursor-pointer transitions-colors'
                onClick={() => goToPage("/new")}
              >
                criar um novo?
              </span>
            </span>
    );
}