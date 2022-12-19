import classnames from "classnames";

interface IOptionsProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export const Option = ({ title, isSelected, onClick }: IOptionsProps) => {
  return (
    <div className='flex flex-1 h-8 w-full' onClick={onClick}>
      <div
        className={classnames(
          "flex items-center justify-center w-full h-full rounded-sm cursor-pointer",
          {
            "bg-gray-600": isSelected,
            "bg-transparent": !isSelected,
          }
        )}
      >
        <span className='text-gray-100 text-xs'>{title}</span>
      </div>
    </div>
  );
};
