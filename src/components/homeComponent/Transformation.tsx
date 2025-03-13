import React, { useState, useEffect, useRef } from "react";
import { Call } from "@mui/icons-material";
import { CountUp } from "countup.js";

interface FilterButtonProps {
  icon: string;
  text: string;
}

interface TransformationSetProps {
  beforeImage: string;
  afterImage: string;
}

interface StatItemProps {
  number: string;
  description: string;
}

export const Transformation: React.FC = () => {
  const [currentSet, setCurrentSet] = useState(0);

  const transformationSets = [
    {
      beforeImage:
        "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/52722c46953ba05306b3c0996117221157d6393b00fe6f3efcd7ef6bb8505101?placeholderIfAbsent=true",
      afterImage:
        "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/5057e9281628f7d35daf73fd57c79110bff7d2e876045f721d42d03044fdc706?placeholderIfAbsent=true",
    },
    {
      beforeImage:
        "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/9e31f37a0f2acacc0774b34b1c9405db3ef9e2e9b0971db40b49c8528722e296?placeholderIfAbsent=true",
      afterImage:
        "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/705f6914567f88607336329e45b0d29505d3de360cd5e3bd2daf7475a603b9be?placeholderIfAbsent=true",
    },
  ];

  const handleNext = () => {
    setCurrentSet((prev) => (prev + 1) % transformationSets.length);
  };

  const handlePrev = () => {
    setCurrentSet(
      (prev) =>
        (prev - 1 + transformationSets.length) % transformationSets.length
    );
  };

  return (
    <>
      <h2 className="self-center mt-52 text-5xl font-bold leading-tight text-red-400 max-md:mt-10 max-md:max-w-full">
        Witness the difference
      </h2>

      <div className="flex flex-wrap gap-10 self-center mt-12 max-w-full text-base font-medium text-red-400 w-[683px] max-md:mt-10">
        <FilterButton
          icon="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/03a6b8ca1ac5677223a65dde62a0c7d72c7ddbd406170a8234579c0e59a5aacd?placeholderIfAbsent=true"
          text="Face treatments"
        />
        <FilterButton
          icon="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/03a6b8ca1ac5677223a65dde62a0c7d72c7ddbd406170a8234579c0e59a5aacd?placeholderIfAbsent=true"
          text="Face treatments"
        />
      </div>

      <div className="flex flex-wrap gap-5 justify-between self-center mt-3 max-w-full text-xl font-bold leading-tight text-red-400 whitespace-nowrap w-[990px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/a5d230d6a9b510f85c76afb63856170086a10c5af3e7a7123235fb8754bd24e3?placeholderIfAbsent=true"
          className="object-contain shrink-0 my-auto aspect-square w-[60px]"
          alt="Left arrow"
          onClick={handlePrev}
        />

        <TransformationSet
          beforeImage={transformationSets[currentSet].beforeImage}
          afterImage={transformationSets[currentSet].afterImage}
        />

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/b0f756e1b58e9fe506b422e0a53f8e77cf07c1202ea9b908f45f171df009a334?placeholderIfAbsent=true"
          className="object-contain shrink-0 my-auto aspect-square w-[60px]"
          alt="Right arrow"
          onClick={handleNext}
        />
      </div>

      <CallToAction />

      <Stats />
    </>
  );
};

const FilterButton: React.FC<FilterButtonProps> = ({ icon, text }) => {
  return (
    <button className="flex flex-1 gap-1.5 justify-center items-center p-2.5 bg-rose-50 rounded-3xl">
      <img
        loading="lazy"
        src={icon}
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        alt="Filter icon"
      />
      <span className="self-stretch my-auto">{text}</span>
    </button>
  );
};

const TransformationSet: React.FC<TransformationSetProps> = ({
  beforeImage,
  afterImage,
}) => {
  return (
    <div className="flex flex-wrap gap-1.5 justify-between items-center">
      <div className="flex flex-col self-stretch my-auto rounded-none w-[239px]">
        <img
          loading="lazy"
          src={beforeImage}
          className="object-contain w-full aspect-[0.77] rounded-[100px_100px_100px_0px]"
          alt="Before transformation"
        />
        <div className="self-center mt-4">Before</div>
      </div>
      <div className="flex flex-col self-stretch my-auto rounded-none w-[239px]">
        <img
          loading="lazy"
          src={afterImage}
          className="object-contain w-full aspect-[0.77] rounded-[100px_0px_0px_0px]"
          alt="After transformation"
        />
        <div className="self-center mt-4">After</div>
      </div>
    </div>
  );
};

const CallToAction: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between self-center px-20 py-14 mt-40 max-w-full text-red-400 bg-red-100 rounded-[200px] w-[1200px] max-md:px-5 max-md:mt-10">
      <div className="max-md:max-w-full">
        <h2 className="text-5xl font-bold leading-tight max-md:max-w-full">
          Dreaming of a fresh and radiant skin?
        </h2>
        <p className="mt-2.5 text-base font-medium max-md:max-w-full">
          Book your personalized skincare consultation today and rediscover your
          natural radiance.
        </p>
      </div>
      <button className="flex gap-1.5 justify-center items-center px-10 py-3 my-auto text-base font-bold bg-rose-50 hover:bg-rose-200 duration-200 rounded-none max-md:px-5">
        <Call />
        <span className="self-stretch my-auto w-[250px]">
          Make an appointment now
        </span>
      </button>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-10 items-center self-center mt-36 text-center text-red-400 max-md:mt-10 max-md:max-w-full">
      <StatItem number="5,000+" description="Satisfied Customers" />
      <StatItem number="10+" description="Years of experience" />
      <StatItem number="20,000+" description="Effective Treatment" />
    </div>
  );
};

const StatItem: React.FC<StatItemProps> = ({ number, description }) => {
  const countUpRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 } //Kích hoạt khi 50% component nằm trong viewport
    );

    if (countUpRef.current) {
      observer.observe(countUpRef.current);
    }

    return () => {
      if (countUpRef.current) {
        observer.unobserve(countUpRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted && countUpRef.current) {
      const countUp = new CountUp(
        countUpRef.current,
        parseInt(number.replace(/\D/g, "")),
        {
          suffix: "+",
        }
      );
      if (!countUp.error) {
        countUp.start();
      }
    }
  }, [hasStarted, number]);

  return (
    <div className="flex flex-col items-center self-stretch my-auto w-[227px]">
      <div ref={countUpRef} className="text-4xl font-bold leading-tight">
        {!hasStarted ? "0" : ""}+
      </div>
      <p className="mt-2.5 text-base font-medium">{description}</p>
    </div>
  );
};
