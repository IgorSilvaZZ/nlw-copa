interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...rest }: IInputProps) => {
  return (
    <input
      className='
                w-full
                bg-gray-800
                h-14
                px-4
                font-medium
                rounded
                border-gray-600
                text-white
                placeholder-gray-300
                focus:bg-gray-800
                focus:border-gray-600
                outline-none
            '
      {...rest}
    />
  );
};
