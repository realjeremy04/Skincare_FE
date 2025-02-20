import React from "react";
import { WorkspacePremium } from "@mui/icons-material";

interface CertificationCardProps {
  imageSrc: string;
  alt: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  imageSrc,
  alt,
}) => {
  return (
    <img
      loading="lazy"
      src={imageSrc}
      alt={alt}
      className="object-contain mt-2.5 max-w-full aspect-[1.67] w-96"
    />
  );
};

const imageSrc =
  "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/1a5fb5216dbc90466211ba98bf9bb63a74bb296e87045fc7c7282e922b87c04d?apiKey=41aab81e665b459d8a900c6a1ab04494&";

const Certification: React.FC = () => {
  return (
    <section
      className="flex flex-col items-center px-12 pb-24 pt-12 mx-auto w-full text-rose-50 bg-red-400 max-md:px-5 max-md:pb-24 max-md:max-w-full"
      aria-labelledby="certifications-title"
    >
      <header className="flex items-center gap-2.5 text-4xl font-bold leading-tight">
        <WorkspacePremium fontSize="large" />
        <h2 id="certifications-title">Certifications</h2>
      </header>
      <div role="list" aria-label="List of certifications">
        <CertificationCard imageSrc={imageSrc} alt="Certification" />
      </div>
    </section>
  );
};

export default Certification;
