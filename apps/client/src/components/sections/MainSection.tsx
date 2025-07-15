import type { FC } from 'react';
import Hero from '../Hero';
import LinkInput from '../LinkInput';
import ShortUrlList from '../ShortUrlList';

const MainSection: FC = () => {
  return (
    <main className="flex flex-col justify-center items-center p-4 md:p-8">
      <Hero />
      <LinkInput />
      <ShortUrlList />
    </main>
  );
};

export default MainSection;
