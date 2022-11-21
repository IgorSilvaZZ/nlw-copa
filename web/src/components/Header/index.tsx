interface IHeaderProps {
  title: string;
}

export const Header = ({ title }: IHeaderProps) => {
  return (
    <div className='w-full flex items-center justify-center bg-gray-800 p-5 mb-2'>
      <span className='text-white'>{title}</span>
    </div>
  );
};
