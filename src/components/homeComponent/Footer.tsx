"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  PhoneOutlined,
  EmailOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

export const Footer = () => {
  return (
    <footer className="flex overflow-hidden flex-col pr-20 pb-8 w-full bg-red-400 max-md:pr-5 max-md:max-w-full mt-2">
      <div className="w-full max-w-[1570px] max-md:max-w-full ">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-1/5 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/962ecd7eef921c4fd96bfdda49cdbfe3a3f14f74002b04a16a6c91864b263191?placeholderIfAbsent=true"
              alt="Footer logo"
              className="object-contain grow shrink-0 max-w-full aspect-[0.44] w-[300px] max-md:mt-10"
            />
          </div>

          <div className="ml-5 w-4/5 max-md:ml-0 max-md:w-full">
            <div className="self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-wrap w-full gap-5 text-base max-md:max-w-full">
                <img
                  loading="lazy"
                  src="/Logo-Noname-Pink.png"
                  className="mt-9 object-contain shrink-0 self-start aspect-square fill-rose-50 w-20"
                  alt="Skincare logo"
                />

                <div className="flex flex-wrap flex-auto gap-10 max-md:max-w-full">
                  <p className="font-medium text-red-50 max-md:max-w-full">
                    At Crystal Care, we are dedicated to helping you achieve
                    radiant, healthy skin through personalized skincare
                    treatments and expert guidance.
                  </p>

                  <button className="flex gap-5 justify-center items-center px-8 py-3 my-auto font-bold text-red-400 bg-rose-50 hover:bg-rose-100 duration-200 rounded-none max-md:px-5">
                    <Phone sx={{ color: "#f87171" }} />
                    <span>Book an appointment now</span>
                  </button>
                </div>
              </div>

              <div className="mt-20 mb-16 w-full max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <FooterLinks />
                  <FooterServices />
                  <FooterSocial />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 justify-center self-center mt-2.5 max-w-full text-base font-medium w-[1200px]">
        <div className="flex gap-10 items-center text-white rounded-[50px]">
          <Link href="/terms" className="opacity-80 hover:opacity-100">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="opacity-80 hover:opacity-100">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

const FooterLinks = () => (
  <div className="w-[31%] max-md:ml-0 max-md:w-full">
    <div className="flex flex-col w-full text-red-100 max-md:mt-10">
      <h3 className="self-start text-xl font-bold leading-tight">Pages</h3>
      <div className="flex gap-5 justify-between mt-5 text-base font-medium">
        <div>
          {[
            "Home",
            "Home 2",
            "About",
            "Contact",
            "Feature",
            "pricing",
            "Blogs",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block mt-3 first:mt-0"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex flex-col self-start mt-1">
          {["Blog detail", "Locations", "Services", "FAQs"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="mt-3.5 first:mt-0"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FooterServices = () => (
  <div className="ml-5 w-[22%] max-md:ml-0 max-md:w-full">
    <div className="flex flex-col text-red-100 max-md:mt-10">
      <h3 className="self-start text-xl font-bold leading-tight">Services</h3>
      <div className="mt-5 text-base font-medium">
        {[
          "Custom facials",
          "Anti-aging treatments",
          "Acne solutions",
          "Hydration therapy",
          "Skin resurfacing",
          "Specialty treatments",
        ].map((service) => (
          <Link
            key={service}
            href={`/services/${service.toLowerCase().replace(" ", "-")}`}
            className="block mt-3 first:mt-0"
          >
            {service}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const FooterSocial = () => (
  <div className="ml-5 w-[47%] max-md:ml-0 max-md:w-full">
    <div className="max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <SocialLinks />
        <ContactInfo />
      </div>
    </div>
  </div>
);

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/11aaca6da63723e29ffa1d33ee6ec4eeea82027c20417a897c643be31498afc3?placeholderIfAbsent=true",
      name: "Instagram",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/4ff38d88cdfb8a8a30efd57ee1220370d94f894181aea2338b151c668cce83fe?placeholderIfAbsent=true",
      name: "Facebook",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/34ec12268d313f52e01d400fc214a73726df4a1685a005da6b8d57c97375fcc9?placeholderIfAbsent=true",
      name: "Twitter",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/4d7d37973c658062aa51f22134b9e92b84c755d1f45c06377ae021e5c7fc3f82?placeholderIfAbsent=true",
      name: "Pinterest",
    },
  ];

  return (
    <div className="w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow whitespace-nowrap max-md:mt-8">
        <h3 className="self-start text-xl font-bold leading-tight text-red-100">
          Social
        </h3>
        <div className="mt-5 w-full text-base font-medium text-red-50">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={`https://${social.name.toLowerCase()}.com`}
              className="flex gap-1.5 items-center mt-4 first:mt-0 w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                src={social.icon}
                alt={social.name}
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <span className="self-stretch my-auto opacity-90 w-[180px]">
                {social.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactInfo = () => (
  <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
    <div className="flex flex-col items-start w-full max-md:mt-8">
      <h3 className="text-xl font-bold leading-tight text-red-100">
        Contact us
      </h3>
      <div className="flex gap-1.5 mt-5 text-base font-medium text-red-50">
        <PhoneOutlined />
        <span className="opacity-90">(123) 456-7890</span>
      </div>
      <div className="flex gap-1.5 mt-4 text-base font-medium text-red-50 whitespace-nowrap">
        <EmailOutlined />
        <span className="opacity-90">info@example.com</span>
      </div>
      <div className="flex gap-1.5 self-stretch mt-4 w-full">
        <div className="flex overflow-hidden justify-between items-center text-red-50 self-start px-1 pt-2 pb-1">
          <LocationOnOutlined />
        </div>
        <address className="text-base font-medium text-red-50 opacity-90 not-italic">
          123 Skincare Street, Wellness City, NY 10001
        </address>
      </div>
    </div>
  </div>
);
