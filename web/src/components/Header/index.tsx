import { CaretLeft, Export } from "phosphor-react";
import { useRouter } from "next/router";

import { ButtonIcon } from "../ButtonIcon";

interface IHeaderProps {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
}

const EmptyBox = () => <div className='w-6 h-6'></div>;

export const Header = ({
  title,
  showBackButton = false,
  showShareButton = false,
}: IHeaderProps) => {
  const router = useRouter();

  return (
    <div className='w-full flex items-center justify-between bg-gray-800 p-5 mb-2'>
      {showBackButton ? (
        <ButtonIcon icon={CaretLeft} onClick={() => router.back()} />
      ) : (
        <EmptyBox />
      )}
      <span className='text-white text-center'>{title}</span>
      {showShareButton ? <ButtonIcon icon={Export} /> : <EmptyBox />}
    </div>
  );
};
