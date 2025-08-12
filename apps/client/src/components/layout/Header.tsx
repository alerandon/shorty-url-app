import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="flex items-center p-4 md:p-8">
      <h3 className=" text-lg lg:text-xl font-semibold tracking-wide">
        ShortyURL
      </h3>
    </header>
  );
};

export default Header;
