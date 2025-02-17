import React from 'react';

interface ArticleCardProps {
  imageSrc: string;
  title: string;
  date: string;
  imageClassName?: string;
}

const ArticleCard = ({ imageSrc, title, date, imageClassName = '' }: ArticleCardProps) => (
  <div className="flex flex-col w-full text-red-400 max-md:mt-8 items-center">
    <div className="flex flex-col text-xl font-bold leading-tight items-center"> 
      <img
        loading="lazy"
        src={imageSrc}
        alt={title}  // Added alt text for accessibility
        className={`object-contain max-w-full aspect-[0.87] w-[380px] ${imageClassName}`}
      />
      <h2 className="mt-2.5 w-[380px] text-start"> 
        {title}
      </h2>
    </div>
    <div className="flex flex-col gap-1.5 mt-2.5 w-full text-base font-medium items-center">
      <div className="flex gap-1.5 items-start">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/1db7d68bfcdc7f6c79cdb3dbd9b9052e67f5ba85321c1b3d152942b2cbd4e8d6?apiKey=41aab81e665b459d8a900c6a1ab04494&"
          alt=""
          className="object-contain shrink-0 w-6 aspect-square"
        />
        <div className="flex-1 shrink gap-2.5 self-stretch min-w-[240px] w-[380px]">
          {date}
        </div>
      </div>
    </div>
  </div>
);

const articles: ArticleCardProps[] = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/bec278afebcd0d527e6f0f07bf99dd10fe66dcbbd5ea979643173e90a59851f4?apiKey=41aab81e665b459d8a900c6a1ab04494&",
    title: "The ultimate guide to winter skincare",
    date: "November 3, 2024",
    imageClassName: "rounded-[100px_0px_0px_0px]"
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/59cab9845aec16a471f8cd024681613af2507d0b582cc877e83c4a6068dff12c?apiKey=41aab81e665b459d8a900c6a1ab04494&",
    title: "Top 5 anti-aging ingredients you need to know",
    date: "November 3, 2024"
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/41aab81e665b459d8a900c6a1ab04494/56ac21d483ba3ae4e26c33a3c3484e00ba9284f74a293d459b5a511ff5d5ba84?apiKey=41aab81e665b459d8a900c6a1ab04494&",
    title: "Common skincare myths – debunked!",
    date: "November 3, 2024"
  }
];

export const SkincareInsights = () => {
  return (
    <div className="flex flex-col">
      <h1 className="self-center text-5xl font-bold leading-tight text-center text-red-400 max-md:max-w-full mt-9">
        Skincare tips & insights
      </h1>
      <div className="mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex max-md:flex-col gap-4 justify-center"> 
          {articles.map((article, index) => (
            <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full items-center"> 
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
