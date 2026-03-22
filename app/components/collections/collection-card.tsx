"use client";
import React from "react";
import Link from "next/link";
import { Collection } from "../../../../types";
import Image from "next/image";

const CollectionCard = ({ collections }: {collections: Collection[]}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
      {collections.length > 0 &&
        collections.map((collection) => (
          <div className="relative group h-[90vw] md:h-[80vw] lg:h-screen" key={collection._id.toString()}>
            <div className="absolute inset-0 bg-black/20 pointer-events-none overlay z-10" />
            <Image
              src={collection.images[0]}
              className="object-cover"
              alt={collection.name}
              fill
              quality={75}
            />

            {/* Overlay */}
            <div className="absolute bottom-[1.5rem] lg:bottom-[3rem] px-[1rem] w-full z-20">
              <div className="flex items-center justify-between w-full">
                <span className="text-[1.2rem] md:text-[2rem] lg:text-[3rem] uppercase text-white bg-white category-btn border">
                  {collection.name}
                </span>
                <Link
                  className="btn btn--light btn--icon-right"
                  href={`collections/${collection.name.toLowerCase()}`}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CollectionCard;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";