import type { FC } from 'react';
import Hero from '../Hero';
import LinkInput from '../LinkInput';
import ShortUrlTable from '../ShortUrlTable';
import Pagination from '../Pagination';

const MainSection: FC = () => {
  return (
    <main className="flex flex-col justify-center items-center p-4 md:p-8">
      <Hero />
      <LinkInput />
      <ShortUrlTable />
      <Pagination
        page={1}
        totalPages={2}
        onPageChange={(page) => console.log(`Page changed to: ${page}`)}
        className="mt-8"
      />
    </main>
  );
};

export default MainSection;
