import { ClipLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className='flex flex-1 items-center justify-center bg-gray-90'>
      <ClipLoader color='#eab308' />
    </div>
  );
};
