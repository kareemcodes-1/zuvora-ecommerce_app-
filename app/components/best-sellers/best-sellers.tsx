// best-sellers.tsx (server component)
import Image from 'next/image';
import React from 'react';
import CenteredSwiper from '../swiper/centered-swiper';
import Link from 'next/link';
import BestSellersHeading from './best-sellers-heading';

const BestSellers = () => {
  return (
    <section className="best-sellers w-full lg:h-screen">
  <div className="best-sellers-container lg:grid lg:grid-cols-2 flex flex-col lg:h-full">
    
    {/* Left — Heading + Swiper */}
    <div className="pb-[4rem] lg:pb-[7rem] pt-[2rem] px-[1rem] lg:px-0 lg:overflow-hidden">
      <BestSellersHeading />
      <CenteredSwiper />
    </div>

    {/* Right — Image */}
    <div className="relative w-full h-[75vw] md:h-[70vw] lg:h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/20 pointer-events-none overlay z-10" />
      <Image
        src="https://framerusercontent.com/images/FYxwNA4XPipU8CDKG3DduAvTEY.jpeg"
        fill
        quality={75}
        alt=""
        className="object-cover"
        id="seller-img-2"
      />
      <div className="absolute bottom-[1.5rem] lg:bottom-[2rem] w-full z-20">
        <div className="flex items-start justify-between px-[1rem]">
          <span className="text-[1.2rem] md:text-[2rem] lg:text-[3rem] uppercase text-white bg-white category-btn border">
            DRESSES
          </span>
          <Link href="/" className="btn btn--light btn--icon-right cursor-pointer uppercase">
            See All
          </Link>
        </div>
      </div>
    </div>

  </div>
</section>
  );
};

export default BestSellers;