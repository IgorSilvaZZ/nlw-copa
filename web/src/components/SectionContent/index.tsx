import { ReactNode } from "react";

interface IPropsSectionContent {
  children: ReactNode;
}

export const SectionContent = ({ children }: IPropsSectionContent) => {
  return (
    <section className='w-[750px] h-[500px] 2xl:h-[820px] flex flex-col items-center gap-4 overflow-y-auto overflow-x-hidden'>
      {children}
    </section>
  );
};
