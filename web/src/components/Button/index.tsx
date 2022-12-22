import { MagnifyingGlass } from "phosphor-react";

interface IButtonProps {
  text: string;
  haveIcon?: boolean;
  onClick?: () => void;
}

export const Button = ({ text, haveIcon = true, onClick }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='w-full p-3 flex items-center justify-center gap-2 rounded uppercase font-semibold transition-colors bg-yellow-500 hover:bg-yellow-700'
    >
      {haveIcon && <MagnifyingGlass size={18} />}
      <span className='text-xs'>{text}</span>
    </button>
  );
};
