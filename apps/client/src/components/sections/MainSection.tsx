import type { FC } from 'react';
import Hero from '../Hero';
import LinkInput from '../LinkInput';

const MainSection: FC = () => {
  return (
    <main className="flex flex-col justify-center items-center p-4 md:p-8">
      <Hero />
      <LinkInput />
    </main>
  );
};

export default MainSection;
