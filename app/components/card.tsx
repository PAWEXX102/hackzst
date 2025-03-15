"use client";

import { useState } from "react";
import Image from "next/image";

interface CardProps {
  role: string;
  content: string;
}

export const Card = (card: CardProps) => {
  const [favorites, setFavorites] = useState(false);
  return (
    <div
      className={`${
        card.role === "user"
          ? "hidden"
          : card.role === "model"
          ? "bg-zinc-100 shadow-lg  dark:text-zinc-600 dark:bg-zinc-600"
          : "bg-zinc-100 shadow-lg  dark:text-zinc-600 dark:bg-zinc-600"
      } p-2 rounded-xl w-[25rem]`}
    >
      <div className="flex flex-col my-2  dark:text-zinc-100 dark:bg-zinc-600">
        {card.content}
        <Image
          src={favorites ? "/serce.png" : "/heart.png"}
          alt="heart"
          width={26}
          height={26}
          className={`flex flex-row items-end justify-end dark:text-zinc-100 dark:bg-zinc-600`}
          onClick={() => setFavorites(!favorites)}
        />
      </div>
    </div>
  );
};
