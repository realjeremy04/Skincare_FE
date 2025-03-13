import React from "react";
import { ChevronRight } from "@mui/icons-material";

export const Features = () => {
  const features = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/9cd43cff58fa6ee0a708fbe7b3be62edc984447b1c1cc3cb456834a9e4342978?placeholderIfAbsent=true",
      title: "Specialized Care",
      description:
        "We believe that healthy skin begins with specialized and dedicated care.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/fd5f67a02f4c2be44cf3c113ee0ba72e51c60111e309b0194f06456f117df1cc?placeholderIfAbsent=true",
      title: "Radiant Beauty",
      description:
        "Crystal Care brings radiant beauty and optimal health to your skin.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/ae85332a82fe41ff3de5a5adf536957fc835abcce505d5ca5549da9f4a846205?placeholderIfAbsent=true",
      title: "Optimal Skin Health",
      description:
        "Our Crystal Care journey begins with a mission to deliver optimal skin health.",
    },
  ];

  return (
    <section className="flex flex-col items-center mt-36 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col max-w-full text-center text-red-400 w-[665px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/010a16e3416c294e076a4206481b9dc70346150cea4a4d3fe626a3e7f3785ca5?placeholderIfAbsent=true"
          alt="Feature icon"
          className="object-contain self-center w-20 aspect-square"
        />
        <div className="flex flex-col mt-8 w-full max-md:max-w-full">
          <h2 className="text-4xl font-bold leading-tight max-md:max-w-full">
            The Ultimate Guide to Radiant Beauty
          </h2>
          <p className="self-center mt-2.5 text-lg font-medium leading-6 w-[513px] max-md:max-w-full">
            At Crystal Care, we believe that healthy skin begins with
            specialized and dedicated care, bringing radiant beauty and optimal
            health to your skin.
          </p>
        </div>
      </div>

      <button className="mt-4 flex items-center bg-red-400 text-white font-bold text-base px-4 py-2 rounded-md rounded-se-3xl hover:bg-red-500 transition-all duration-300 group">
        <span className="mr-2">Learn more</span>
        <span className="transform transition-transform duration-300 group-hover:translate-x-2">
          <ChevronRight />
        </span>
      </button>

      <div className="self-stretch mt-20 max-md:mt-10 max-md:max-w-full mx-[10%]">
        <div className="flex gap-5 max-md:flex-col">
          {features.map((feature, index) => (
            <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
              <div
                className={`flex flex-col duration-200 grow justify-center px-14 py-44 w-full text-center text-red-400 ${
                  index === 0
                    ? "bg-orange-100 hover:bg-orange-200"
                    : index === 1
                    ? "bg-red-100 hover:bg-red-200"
                    : "bg-red-50 hover:bg-red-100"
                } rounded-[200px] max-md:px-5 max-md:py-24 max-md:mt-8`}
              >
                <img
                  loading="lazy"
                  src={feature.icon}
                  alt={feature.title}
                  className="object-contain self-center aspect-square w-[70px]"
                />
                <div>
                  <h3 className="text-xl font-bold leading-tight">
                    {feature.title}
                  </h3>
                  <p className="pt-2.5 mt-6 w-full text-base font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
