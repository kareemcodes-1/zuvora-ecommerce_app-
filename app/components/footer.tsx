"use client";
import Link from 'next/link'
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

    useEffect(() => {
        gsap.set(".footer", { yPercent: -50 });

        const uncover = gsap.timeline({ paused: true });

        uncover.to(".footer", { yPercent: 0, ease: "none" });

        ScrollTrigger.create({
            trigger: ".scroll-trigger",
            start: "bottom bottom",
            end: "+=50%",
            animation: uncover,
            scrub: true
        });

    }, []);

    function handleTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    return (
        <>
            <div className="section scroll-trigger"></div>
            <div className="overflow-hidden relative bg-[#f8f8f8] w-full">
                <footer className="px-[1.5rem] lg:px-[3rem] mt-[3rem] lg:mt-[5rem] footer">

                    {/* Nav Links Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[1rem] gap-y-[2rem] lg:gap-[1rem]">
                        <div className="flex items-start flex-col gap-[.5rem] text-[#333] text-[.75rem] lg:text-[.9rem]">
                            <Link href={""}>PRIVACY POLICY</Link>
                            <Link href={""}>TERMS OF USE</Link>
                            <Link href={""}>CONTACT</Link>
                        </div>

                        <div className="flex items-start flex-col gap-[.5rem] text-[#333] text-[.75rem] lg:text-[.9rem]">
                            <Link href={""}>PAYMENT METHODS</Link>
                            <Link href={""}>RETURNS AND COMPLAINTS</Link>
                            <Link href={""}>CONTACT</Link>
                        </div>

                        <div className="flex items-start flex-col gap-[.5rem] text-[#333] text-[.75rem] lg:text-[.9rem]">
                            <Link href={"/"}>HOME</Link>
                            <Link href={"/about"}>ABOUT</Link>
                            <Link href={"/collections/mens"}>MENS</Link>
                            <Link href={"/collections/womens"}>WOMENS</Link>
                        </div>

                        <div className="flex items-start flex-col gap-[.5rem] text-[#333] text-[.75rem] lg:text-[.9rem]">
                            <Link href={""}>X</Link>
                            <Link href={""}>FACEBOOK</Link>
                            <Link href={""}>INSTAGRAM</Link>
                        </div>
                    </div>

                    {/* Brand Name + Scroll Top */}
                    <div className="mt-[2rem] lg:mt-[4rem] flex items-center gap-[1rem] w-full overflow-hidden">
                        <h1 className="text-[18vw] lg:text-[19rem] text-center font-[200] tracking-[.2rem] lg:leading-[15rem] uppercase text-black leading-[1]">
                            Zuvora
                        </h1>

                        <div className="hidden lg:block">
                            <button
                                onClick={handleTop}
                                className="btn btn--dark btn--icon-left cursor-pointer rotate-[90deg]"
                            />
                        </div>
                    </div>

                </footer>
            </div>
        </>
    );
}

export default Footer