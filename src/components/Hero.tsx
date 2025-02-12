import React from "react";
import { PhoneInTalk } from "@mui/icons-material";

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
        <h1 className="text-4xl leading-[36px] max-md:text-4xl max-md:leading-[58px]">
          Tỏa sáng tự nhiên với dịch vụ chăm sóc của chúng tôi
        </h1>
        <p className="mt-2.5 text-sm">
          Đội ngũ chuyên gia giàu kinh nghiệm của chúng tôi sẽ tư vấn và thiết
          kế liệu trình chăm sóc da phù hợp với từng nhu cầu riêng biệt của bạn.
        </p>
        <button className="flex items-center justify-center gap-1.5 px-10 py-3.5 mt-10 text-base font-bold bg-red-100 max-md:px-5 rounded-lg hover:bg-red-200 duration-200">
          <PhoneInTalk />
          <span className="text-center">Đặt lịch chăm sóc</span>
        </button>
      </div>

      {/* Second Image */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/3d839779a11bb120c52244abc08a37144cd3f85582657ced2ec33a341a14f0bc?placeholderIfAbsent=true"
        alt="Skincare hero"
        className="object-fill w-[800px] max-md:w-full"
      />
    </div>
  );
};

export default Hero;
