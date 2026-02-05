import React from "react";

type Props = {
  title?: string;
  subTitle?: string;
};

function HeaderTitle({ title, subTitle }: Props) {
  return (
    <header className="mb-8 mt-8 md:mt-0">
      <h2 className="text-2xl md:-3xl font-bold text-white">{title}</h2>
      <p className="text-gray-text mt-1">{subTitle}</p>
    </header>
  );
}

export default HeaderTitle;
