import { useState } from 'react';
import type { FC } from 'react';
import Hero from '../Hero';
import LinkInput from '../LinkInput';
import ShortUrlTable from '../ShortUrlTable';
import Pagination from '../Pagination';
import { useUrls } from '../../hooks/api/urls/useUrls';

const MainSection: FC = () => {
  const [page, setPage] = useState(1);
  const { urls, loading, error, totalPages, refetch } = useUrls(page, 10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleUrlCreated = () => {
    if (page !== 1) setPage(1);
    refetch();
  };

  return (
    <main className="flex flex-col justify-center items-center p-4 md:p-8">
      <Hero />
      <LinkInput onUrlCreated={handleUrlCreated} />
      <ShortUrlTable urls={urls} loading={loading} error={error} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-8"
      />
    </main>
  );
};

export default MainSection;
