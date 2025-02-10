import React from 'react';

const Hero = () => {
  return (
    <div className="flex items-center text-red-400 bg-red-50 px-4 py-8 gap-4 max-md:flex-wrap">
      {/* First Image */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/a8a3c6c42765728430896f990661db016f80cfcd57172b7a4eeff79a1f45a3c0?apiKey=41aab81e665b459d8a900c6a1ab04494&"
        alt="Description of the image"
        className="object-contain w-[300px] min-w-[240px] max-md:w-full"
      />

      {/* Text Content */}
      <div className="flex flex-col w-[460px] min-w-[240px] max-md:w-full">
        <h1 className="text-6xl leading-[75px] max-md:text-4xl max-md:leading-[58px]">
          Glow naturally with skinn care
        </h1>
        <p className="mt-2.5 text-base">
          Our skincare line is crafted with pure, high-quality ingredients for visible results.
        </p>
        <button className="flex items-center gap-1.5 px-10 py-3.5 mt-10 text-base font-bold bg-red-100 max-md:px-5 rounded-lg">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/78f0eeeb50dc45d46a5b660c079b6a4e51f74f5017742ab9b4d5132ac2ba8b7b?apiKey=41aab81e665b459d8a900c6a1ab04494&"
            alt=""
            className="w-6"
          />
          <span>Book an appointment</span>
        </button>
      </div>

      {/* Second Image */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/3d839779a11bb120c52244abc08a37144cd3f85582657ced2ec33a341a14f0bc?placeholderIfAbsent=true"
        alt="Skincare hero"
        className="object-fill w-[1300px] max-md:w-full"
      />
    </div>
  );
};

export default Hero;
