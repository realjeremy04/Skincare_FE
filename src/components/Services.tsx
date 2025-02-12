import React from 'react';

export const Services = () => {
  return (
    <section className="flex flex-col pt-36 pl-20 mt-36 w-full bg-red-400 max-md:pt-24 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <div className="self-center ml-4 max-w-full w-[1232px]">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[26%] max-md:ml-0 max-md:w-full">
            <h2 className="text-5xl font-bold text-rose-50 leading-[55px] max-md:mt-10">
              Our skincare services
            </h2>
          </div>

          <div className="ml-5 w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-wrap gap-10 self-stretch my-auto w-full text-base max-md:mt-10 max-md:max-w-full">
              <p className="flex-auto font-medium text-rose-50 w-[386px] max-md:max-w-full">
                Whether you're new to skincare or a seasoned pro, our services are here to help you achieve your healthiest skin. Explore our tailored offerings below.
              </p>

              <button className="flex gap-2.5 justify-center items-center px-10 py-3 my-auto font-bold text-red-400 bg-red-50 rounded-none max-md:px-5">
                <span>View all services</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/9ed57e5df452b6387c89cab78399000abad7a12f014f3c54ab6f10ab96e83315?placeholderIfAbsent=true"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="self-end mt-12 w-full max-w-[1560px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <ServiceCard
            image="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/c6aa841e743e6fb969f3c7c65fac4aeb328e8db8370216aa4a858d770f213135?placeholderIfAbsent=true"
            icon="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/729afd0cb9a6edcd9b1e819f61508ef7c1385a67eef5097844348b3bede79c13?placeholderIfAbsent=true"
            title="Face treatments"
            description="Hydrating Facials: Deeply nourishing facials designed to hydrate and refresh the skin."
            bgColor="bg-orange-100"
          />

          <ServiceCard
            image="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/5c29b9f1b4671cafa9889ce2536513ae595a84c89ac0212e769296841a0fd6e3?placeholderIfAbsent=true"
            icon="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/729afd0cb9a6edcd9b1e819f61508ef7c1385a67eef5097844348b3bede79c13?placeholderIfAbsent=true"
            title="Body treatments"
            description="Body Contouring: Non-surgical treatments to tighten and tone the skin, reducing cellulite."
            bgColor="bg-white"
          />
          <ServiceCard
            image="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/5094d80fd58c9293ba8d399c5deab8b1ed8990cac170eb38186f4b1696a5cf13?apiKey=41aab81e665b459d8a900c6a1ab04494&"
            icon="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/729afd0cb9a6edcd9b1e819f61508ef7c1385a67eef5097844348b3bede79c13?placeholderIfAbsent=true"
            title="Hydration Therapy"
            description="Breast Lift: Enhances and lifts breast contours for a firmer appearance."
            bgColor="bg-red-50"
          />

        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ image, icon, title, description, bgColor }) => {
  return (
    <div className="w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex relative flex-col grow pt-80 text-red-400 min-h-[679px] rounded-[100px_0px_0px_0px] max-md:pt-24 max-md:max-w-full">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="object-cover absolute inset-0 size-full"
        />
        {icon && (
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain aspect-square w-[60px]"
          />
        )}
        <div className={`flex relative flex-col justify-center px-8 py-9 mt-40 ${bgColor} rounded-none max-md:px-5 max-md:mt-10 max-md:max-w-full`}>
          <div>
            <h3 className="text-xl font-bold leading-tight">{title}</h3>
            <p className="mt-2.5 text-base font-medium">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};