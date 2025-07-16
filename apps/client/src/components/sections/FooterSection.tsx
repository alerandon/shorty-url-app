import type { FC } from 'react';

const FooterSection: FC = () => {
  return (
    <footer className="w-full mt-25 mb-16 mx-auto text-center">
      <p className="text-xs md:text-sm font-medium">
        &copy; Shorty URL | All Rights Reserved
      </p>
    </footer>
  );
};

export default FooterSection;
