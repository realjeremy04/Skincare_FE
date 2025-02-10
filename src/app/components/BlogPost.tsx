import React from 'react';

interface BlogPostProps {
  imageSrc: string;
  title: string;
  date: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ imageSrc, title, date }) => {
  return (
    <>
      <div className="flex flex-col mt-72 max-w-full text-xl font-bold leading-tight text-red-400 w-[380px] max-md:mt-10">
        <img
          loading="lazy"
          src={imageSrc}
          alt=""
          className="object-contain w-full aspect-[0.87] rounded-[100px_0px_0px_0px]"
        />
        <div className="mt-2.5 w-full">{title}</div>
      </div>
      <div className="flex gap-1.5 items-start mt-2.5 max-w-full text-base font-medium text-red-400 w-[381px]">
        <div className="flex gap-1.5 items-start min-w-[240px]">
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
    </>
  );
};

export default BlogPost;