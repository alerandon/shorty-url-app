import React from 'react';
import Hero from './Hero';
import LinkInput from '../urls/LinkInput';
import ShortUrlTable from '../urls/ShortUrlTable';
import Pagination from '../navigation/Pagination';
import { useUrls } from '../../hooks/api/urls/useUrls';

const MainLayout: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const { urls, loading, error, totalPages, refetch } = useUrls(page, 6);

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

export default MainLayout;
