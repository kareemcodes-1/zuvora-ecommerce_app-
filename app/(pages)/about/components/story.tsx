import React from "react";

function Story() {
  return (
    <section className="w-full bg-[#f8f8f8] py-[4rem] lg:py-[8rem] px-[1.5rem]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[3rem] lg:gap-[6rem] items-start">

        {/* Left — Statement */}
        <div className="lg:sticky lg:top-[8rem]">
          <h2 className="text-[1.8rem] md:text-[2.2rem] lg:text-[3rem] font-[300] leading-[1.2] tracking-[-0.02em] text-[#000]">
            Zuvora is a clothing brand committed to craftsmanship and quality fabrics. These are unique, well-tailored pieces that will last for years.
          </h2>
        </div>

        {/* Right — Body Copy */}
        <div className="flex flex-col gap-[1.5rem] lg:gap-[1.8rem] text-[0.9rem] lg:text-[1rem] font-[300] leading-[1.85] text-[#3d3730]">
          <p>
            Zuvora's story began with a simple but powerful belief — that what you wear should feel as intentional as every other decision you make. Born from a passion that refused to stay quiet, we staked everything on turning that belief into a living, breathing brand.
          </p>
          <p>
            Our pieces are inspired by movement — the movement of people, cultures, and the quiet confidence that comes with wearing something made exactly right. We source the finest natural fabrics, seeking materials that age beautifully and carry the kind of weight that fast fashion can never replicate.
          </p>
          <p>
            The Zuvora woman and man are aware of trends, but not enslaved by them. They want to look exceptional — effortlessly, without lengthy preparation. Our clothes move with you: polished for a morning meeting, relaxed enough to carry you through the rest of the day without compromise.
          </p>
          <p>
            Every collection is built by a team of carefully chosen craftspeople. We believe quality is a form of respect — for the person wearing the garment, and for the hands that made it.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Story;