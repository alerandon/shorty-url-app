import type { FC } from 'react';

const Hero: FC = () => {
  return (
    <div className="py-10 flex flex-col items-center justify-center">
      <h3 className="w-5/6 lg:w-5/8 text-3xl md:text-4xl font-semibold text-center leading-snug">
        Make your bigger long links as shorty tiny links
      </h3>
      <p className="text-center opacity-50 font-medium pt-7">
        From Clunky to Clickable: Your Link, Optimized.
      </p>
    </div>
  );
};

export default Hero;
