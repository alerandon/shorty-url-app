import type { FC } from 'react';
import Hero from '../Hero';

const MainSection: FC = () => {
  return (
    <main className="flex justify-center items-center p-4 md:p-8">
      <Hero />
    </main>
  );
};

export default MainSection;
