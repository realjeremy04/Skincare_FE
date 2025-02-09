import React from 'react';

export const Hero = () => {
  return (
    <section className="mt-8 w-full bg-red-50">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[31%] max-md:ml-0 max-md:w-full">
          <div className="flex shrink-0 max-w-full h-[713px] w-[583px] max-md:mt-9" />
        </div>
        <div className="ml-5 w-[69%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/3d839779a11bb120c52244abc08a37144cd3f85582657ced2ec33a341a14f0bc?placeholderIfAbsent=true"
            alt="Skincare hero"
            className="object-contain grow w-full rounded-none aspect-[1.63] max-md:mt-9 max-md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};