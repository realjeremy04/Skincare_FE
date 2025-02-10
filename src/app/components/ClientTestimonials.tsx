import React from 'react';
import SponsorLogo from './SponsorLogo';
import TestimonialCard from './TestimonialCard';
import AppointmentForm from './AppointmentForm';
import Certification from './Certification';

interface Testimonial {
  rating: number;
  text: string;
  author: string;
  imageSrc: string;
}

interface Sponsor {
  name: string;
  logoSrc: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    text: "I'm so grateful I found Glisten! My skin has never looked this good. The anti-aging treatments are gentle but powerful. I finally feel comfortable in my skin again!",
    author: "Emma T.",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/88aebdff73e69be5852a0207f2fd5734c3332d188e579761dacf2d6e81ed2a4b?apiKey=41aab81e665b459d8a900c6a1ab04494&"
  }
];

const sponsors: Sponsor[] = [
  { name: "Grapho", logoSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/40de3fe2c0910041c2cab7b697cda86dbfbb25b846d9fcee85b5f0eacbaaae40?apiKey=41aab81e665b459d8a900c6a1ab04494&" },
  { name: "Iconic", logoSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/65558f68563663556b228a70ad88bff22852a6d0a4b5a40818c7d3a255bcc4ce?apiKey=41aab81e665b459d8a900c6a1ab04494&" },
  { name: "Logique", logoSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/4a13e02b2f8848890bb0937506d9cc60fff40f7f176eb3a9d6eff7c8059ef7cc?apiKey=41aab81e665b459d8a900c6a1ab04494&" },
  { name: "Visualy", logoSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/71c58982bdbec9a661774f837e1bbef92f2ce8122812103adf96d36ad56ce014?apiKey=41aab81e665b459d8a900c6a1ab04494&" },
  { name: "WAYLINE", logoSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/7e065baf13792aaec18de0b26d07fbd0d969ae71932bd6d9ecb6d500d9f273d3?apiKey=41aab81e665b459d8a900c6a1ab04494&" },
  { name: "Optimal", logoSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/b214062be6d47101c44f3de38626025ab626a192dccf6a3a681b93c29096fa8e?apiKey=41aab81e665b459d8a900c6a1ab04494&" }
];

const ClientTestimonials = () => {
  return (
    <div className="mt-36 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex z-10 flex-col items-center mr-0 w-full max-md:max-w-full">
            <div className="flex flex-col items-center self-stretch py-24 pl-4 w-full bg-red-50 max-md:max-w-full">
              <h2 className="ml-10 text-4xl font-bold leading-tight text-red-400 max-md:max-w-full">
                Our clients love their results
              </h2>
              <div className="flex flex-wrap gap-8 items-center self-start mt-12 mr-0 max-md:mt-10 max-md:max-w-full">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
              </div>
              <div className="flex gap-5 mt-8 max-w-full column max-md:mt-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/d34ec8f1c3841be6fb3775fd6fd43070bd4bab1fa22c63d4fcf02d5cd32d871a?apiKey=41aab81e665b459d8a900c6a1ab04494&"
                  alt=""
                  className="object-contain shrink-0 aspect-square w-[50px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/167d67ee69ee6d7e0ab827ca51a1a34af05f78f982e816f56f5a8ad4c816c35f?apiKey=41aab81e665b459d8a900c6a1ab04494&"
                  alt=""
                  className="object-contain shrink-0 aspect-square w-[50px]"
                />
              </div>
            </div>
            <h2 className="mt-36 text-4xl font-bold leading-tight text-center text-red-400 max-md:mt-10">
              Our sponsors
            </h2>
            <div className="flex flex-wrap gap-12 items-center mt-12 ml-20 max-w-full text-xl font-bold w-[590px] max-md:mt-10">
              {sponsors.map((sponsor, index) => (
                <SponsorLogo key={index} {...sponsor} />
              ))}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/a0d8e23461d2ed0ad87517dc9f60d78237c57f28c10d2db32d711dde0f6902fc?apiKey=41aab81e665b459d8a900c6a1ab04494&"
              alt=""
              className="object-contain mt-20 max-w-full rounded-none aspect-[1.39] w-[380px] max-md:mt-10"
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col rounded-none max-w-[770px]" />
          <div className="flex flex-col px-10 w-full bg-red-400 max-md:pl-5 max-md:max-w-full">
       
            <Certification />
          </div>
          <div className="flex mt-32 w-full bg-red-100 rounded-ee-sm min-h-[610px] max-md:max-w-full">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;