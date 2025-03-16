import React from "react";

type TestimonialCardProps = {
  rating: number;
  text: string;
  author: string;
  imageSrc: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  text,
  author,
  imageSrc,
}) => {
  return (
    <div className="flex flex-col self-stretch my-auto rounded-none min-w-[240px] w-[657px] max-md:max-w-full">
      <div className="p-10 bg-orange-100 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[71%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start text-base font-medium text-red-400 max-md:mt-10">
              <div className="text-center text-black">
                {"⭐".repeat(rating)}
              </div>
              <div className="self-stretch mt-2">{text}</div>
              <div className="mt-20 font-semibold text-center max-md:mt-10">
                {author}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={imageSrc}
              alt={`${author}'s testimonial`}
              className="object-contain grow shrink-0 max-w-full rounded-none aspect-[0.73] w-[157px] max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
