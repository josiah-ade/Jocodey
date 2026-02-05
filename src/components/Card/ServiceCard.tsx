import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  title: string;
  description: string;
}

export default function ServiceCard({ image, title, description }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl border border-yellow-200 transition transform hover:-translate-y-2">
      <div className="relative w-full h-[250px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
