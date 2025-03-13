import React from 'react';

interface SponsorLogoProps {
  name: string;
  logoSrc: string;
}

const SponsorLogo: React.FC<SponsorLogoProps> = ({ name, logoSrc }) => {
  return (
    <div className="flex gap-2.5 items-start self-stretch my-auto text-red-400 whitespace-nowrap">
      <img
        loading="lazy"
        src={logoSrc}
        alt={`${name} logo`}
        className="object-contain shrink-0 aspect-square w-[30px]"
      />
      <div className="overflow-hidden py-1">{name}</div>
    </div>
  );
};

export default SponsorLogo;