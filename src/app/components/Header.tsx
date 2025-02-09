import React from 'react';

export const Header = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between self-center w-full text-base text-red-400 max-w-[1718px] max-md:max-w-full">
      <div className="flex gap-1 items-start font-medium">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/fb6c4be147308d08418b001e34d31814d0897ac7f03fd5b2fb117e949e62712c?placeholderIfAbsent=true"
          className="object-contain shrink-0 self-start aspect-square w-[49px]"
          alt="Glisten logo"
        />
        <div className="self-end mt-7">| skin care</div>
      </div>
      <div className="flex flex-wrap gap-10 my-auto max-md:max-w-full">
        <nav className="flex gap-10 items-center my-auto font-medium">
          <a href="#" className="self-stretch my-auto">Shop</a>
          <a href="#" className="self-stretch my-auto">Home</a>
          <a href="#" className="self-stretch my-auto">Our story</a>
          <div className="flex gap-0.5 items-center self-stretch my-auto whitespace-nowrap">
            <a href="#" className="self-stretch my-auto">Pages</a>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/90172b72ce7c578957eea2f7f961f4b8bd5eef5b2b8145a223cf6b53f36d9588?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              alt="Pages dropdown"
            />
          </div>
        </nav>
        <div className="flex gap-1.5 justify-center items-center p-2.5 font-bold">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/1618da33454842dd8e16ad0fa6b0fc679a205c165cee772886da42301b68c412?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt="Phone icon"
          />
          <div className="self-stretch my-auto">
            +<span className="font-normal">(123) 456-7890</span>
          </div>
        </div>
      </div>
    </div>
  );
};