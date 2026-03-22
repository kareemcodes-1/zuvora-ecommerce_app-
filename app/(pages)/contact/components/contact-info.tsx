
type ContactItem = {
  text: string;
  href?: string;
  italic?: boolean;
};

type ContactSection = {
  label: string;
  items: ContactItem[];
};

function ContactInfo() {

    

const contactDetails: ContactSection[] = [
  {
    label: "Customer Service",
    items: [
      { text: "zuvoraclothing@gmail.com", href: "mailto:zuvoraclothing@gmail.com" },
      { text: "+1 (512) 555-0178", href: "tel:+15125550178" },
    ],
  },
  {
    label: "Showroom",
    items: [
      { text: "1201 South Congress Avenue" },
      { text: "Austin, TX 78704, USA" },
      { text: "hello@zuvora.com", href: "mailto:hello@zuvora.com" },
      { text: "" },
      { text: "Please contact us before your visit", italic: true },
      { text: "+1 (512) 555-0178", href: "tel:+15125550178" },
    ],
  },
  {
    label: "Partnerships & Collaborations",
    items: [
      { text: "collab@zuvora.com", href: "mailto:collab@zuvora.com" },
    ],
  },
  {
    label: "Socials",
    items: [
      { text: "Instagram", href: "https://instagram.com/zuvora" },
      { text: "Twitter (X)", href: "https://twitter.com/zuvora" },
    ],
  },
];
  return (
  <section className="w-full bg-[#f8f8f8] py-[3rem] lg:py-[6rem] px-[1.5rem] lg:px-[3rem]">
    <div className="max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] lg:gap-[4rem] items-start">

      {/* Left — Heading */}
      <div className="flex flex-col">
        <h1 className="text-[2.2rem] md:text-[3rem] lg:text-[5rem] font-[200] tracking-[-0.02em] text-[#000] mb-[1rem] lg:mb-[1.5rem]">
          LET'S CONNECT
        </h1>
        <p className="text-[0.85rem] lg:text-[0.95rem] font-[300] text-[#555] w-full lg:w-[500px]">
          Need more help? We're happy to assist. Send us a message, email, or visit us in Texas.
        </p>
      </div>

      {/* Right — Contact rows */}
      <div className="flex flex-col">
        {contactDetails.map((section) => (
          <div
            key={section.label}
            className="border-b border-gray-300 py-[1.5rem] lg:py-[2.2rem] grid grid-cols-2 gap-[1rem] lg:gap-[1.5rem]"
          >
            <p className="text-[0.7rem] lg:text-[0.8rem] font-[600] tracking-[.15rem] uppercase text-[#000]">
              {section.label}
            </p>

            <div className="flex flex-col gap-[0.2rem]">
              {section.items.map((item, i) =>
                item.text === "" ? (
                  <div key={i} className="h-[0.8rem]" />
                ) : item.href ? (
                  
                   <a key={i}
                    href={item.href}
                    className={`text-[0.8rem] lg:text-[0.95rem] font-[300] text-[#000] hover:opacity-50 transition-opacity duration-200 w-fit break-all ${item.italic ? "italic" : ""}`}
                  >
                    {item.text}
                  </a>
                ) : (
                  <p
                    key={i}
                    className={`text-[0.8rem] lg:text-[0.95rem] font-[300] text-[#000] leading-[1.6] ${item.italic ? "italic" : ""}`}
                  >
                    {item.text}
                  </p>
                )
              )}
            </div>
          </div>
        ))}
        <div className="border-t border-gray-300" />
      </div>

    </div>
  </section>
);
}

export default ContactInfo;