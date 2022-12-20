import { ReactNode } from "react";

interface IPropsMainContent {
  children: ReactNode;
}

export const MainContent = ({ children }: IPropsMainContent) => {
  return (
    <main className='w-screen h-screen flex flex-col items-center  mx-auto bg-gray-900 overflow-y-hidden'>
      {children}
    </main>
  );
};
