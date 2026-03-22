'use client';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrase = "Zuvora is about sustainability not seasonality. We love fashion, but we love our planet even more. Our designs are made to last and make you feel good on various occasions";

export default function TextOpacity() {

  let refs = useRef([]);
  const body = useRef(null);
  const container = useRef(null);

  useEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, [])

  const createAnimation = () => {
     gsap.fromTo(refs.current,
  { opacity: 0.2 },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: container.current,
      scrub: 1,
      start: "top 75%",
      end: `+=${window.innerHeight / 1.5}`,
    },
    ease: "none",
    stagger: 0.030,
  }
);
  }

  const splitWords = (phrase) => {
    refs.current = [];
    let body = [];
    phrase.split(" ").forEach( (word, i) => {
      const letters = splitLetters(word);
      body.push(<p className='lg:text-[4vw] text-[2rem] uppercase leading-[1.2] font-[200] mr-[1.5vw]' key={word + "_" + i}>{letters}</p>)
    })
    return body
  }

  const splitLetters = (word) => {
    let letters = []
    word.split("").forEach( (letter, i) => {
      letters.push(<span className='opacity-[.2]' key={letter + "_" + i} ref={el => {refs.current.push(el)}}>{letter}</span>)
    })
    return letters;
  }

  return (
    <main ref={container} className='flex items-center justify-center'>
      <div ref={body} className="text-white flex flex-wrap mt-[4rem] w-full lg:items-center lg:justify-center">
        {
          splitWords(phrase)
        }
      </div>
    </main>
  )
}
