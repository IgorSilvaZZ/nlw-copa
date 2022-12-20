import { IconProps } from "phosphor-react";

interface IPropsButtonIcon extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.FC<IconProps>;
}

export const ButtonIcon = ({ icon: Icon, ...rest }: IPropsButtonIcon) => {
  return (
    <button {...rest}>
      <Icon className='text-gray-300 text-2xl' />
    </button>
  );
};
