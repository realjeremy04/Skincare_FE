import React from 'react';

export const Features = () => {
  const features = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/9cd43cff58fa6ee0a708fbe7b3be62edc984447b1c1cc3cb456834a9e4342978?placeholderIfAbsent=true",
      title: "Clean ingredients",
      description: "We prioritize high-quality, natural ingredients that are safe and effective for your skin."
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/fd5f67a02f4c2be44cf3c113ee0ba72e51c60111e309b0194f06456f117df1cc?placeholderIfAbsent=true",
      title: "Sustainable beauty",
      description: "Our eco-conscious approach ensures that our products are kind to the environment and your skin."
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/ae85332a82fe41ff3de5a5adf536957fc835abcce505d5ca5549da9f4a846205?placeholderIfAbsent=true",
      title: "Dermatologist-approved",
      description: "Each formula is rigorously tested for purity and efficacy, so you can trust what goes on your skin."
    }
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
            The ultimate guide to radiant beauty
          </h2>
          <p className="self-center mt-2.5 text-lg font-medium leading-6 w-[513px] max-md:max-w-full">
            At Skinn Care, we believe that healthy skin starts with pure, effective ingredients. Our journey began with a simple mission
          </p>
        </div>
      </div>

      <div className="flex gap-2.5 self-center py-3 mt-8 bg-red-400 rounded-none min-h-[47px]" />

      <button className="flex z-10 items-center mt-0 max-w-full text-base font-bold text-rose-50 w-[117px]">
        <div className="flex gap-1.5 items-center self-stretch my-auto w-[117px]">
          <span className="self-stretch my-auto w-[93px]">Learn more</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/b70e7bb2bf51c557680b3aabe1633e352e15591673170ed0b58bec6f5811361c?placeholderIfAbsent=true"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
        </div>
      </button>

      <div className="self-stretch mt-20 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {features.map((feature, index) => (
            <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
              <div className={`flex flex-col grow justify-center px-14 py-44 w-full text-center text-red-400 ${
                index === 0 ? 'bg-orange-100' : index === 1 ? 'bg-red-100' : 'bg-red-50'
              } rounded-[200px] max-md:px-5 max-md:py-24 max-md:mt-8`}>
                <img
                  loading="lazy"
                  src={feature.icon}
                  alt={feature.title}
                  className="object-contain self-center aspect-square w-[70px]"
                />
                <div>
                  <h3 className="text-xl font-bold leading-tight">{feature.title}</h3>
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