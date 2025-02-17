import React from 'react';

const CertificationCard = ({ imageSrc, alt }) => {
  return (
    <img
      loading="lazy"
      src={imageSrc}
      alt={alt}
      className="object-contain mt-2.5 max-w-full aspect-[1.67] w-[250px]"
    />
  );
};

interface Certification {
  id: number;
  imageSrc: string;
  alt: string;
}

const certifications: Certification[] = [
  { id: 1, imageSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/1a5fb5216dbc90466211ba98bf9bb63a74bb296e87045fc7c7282e922b87c04d?apiKey=41aab81e665b459d8a900c6a1ab04494&", alt: "Certification 1" },
  { id: 2, imageSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/1a5fb5216dbc90466211ba98bf9bb63a74bb296e87045fc7c7282e922b87c04d?apiKey=41aab81e665b459d8a900c6a1ab04494&", alt: "Certification 2" },
];

const Certification = () => {
  const handleViewAll = () => {
    console.log('View all certifications clicked');
  };

  return (
    <section className="flex flex-col items-start px-12 py-24 mx-auto w-full text-rose-50 bg-red-400 max-md:px-5 max-md:pb-24 max-md:max-w-full" aria-labelledby="certifications-title">
      <header className="flex gap-2.5 text-4xl font-bold leading-tight whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/264745d9504c6fbdc9025f29d3199361298d7ade1f614af46029458f360bbab7?apiKey=41aab81e665b459d8a900c6a1ab04494&"
          alt=""
          className="object-contain shrink-0 aspect-square w-[50px]"
          aria-hidden="true"
        />
        <h2 id="certifications-title" className="basis-auto">Certifications</h2>
      </header>
      <div role="list" aria-label="List of certifications">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} imageSrc={cert.imageSrc} alt={cert.alt} />
        ))}
      </div>
      <div className="flex justify-center mt-8 text-base font-medium text-center border-b border-solid border-b-rose-50 w-full">
        <button 
          onClick={handleViewAll}
          className="grow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-rose-200 transition-colors duration-200 py-2 px-4 rounded"
          aria-label="View all certifications"
        >
          <span>View all certification</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/c12a2db4227d40d7afd534402530e108ff72cf01434ca9e9492abd8576cb8eb0?apiKey=41aab81e665b459d8a900c6a1ab04494&"
            alt=""
            className="object-left shrink-0 w-6 aspect-square ml-2"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
};

export default Certification;