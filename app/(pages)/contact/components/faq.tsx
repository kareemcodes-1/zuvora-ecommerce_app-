"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. International shipping times vary by location, typically between 7–14 business days. Shipping costs are calculated at checkout based on your country.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is dispatched, you'll receive a confirmation email with a tracking number. You can use this to monitor your delivery in real time via our courier's website.",
  },
  {
    question: "How can I apply a discount or promo code?",
    answer:
      "At checkout, you'll find a field labelled 'Promo Code'. Enter your code there and click apply. The discount will be reflected in your order total before payment.",
  },
  {
    question: "What sizes do you offer and how do I choose?",
    answer:
      "We offer sizes XS through XXL. Each product page includes a detailed size guide with measurements to help you find the perfect fit. If you're between sizes, we recommend sizing up.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We accept returns and exchanges within 14 days of delivery, provided items are unworn, unwashed, and in their original packaging. Visit our returns page to initiate a request.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us at hello@zuvora.com or via the contact form on our website. We aim to respond to all enquiries within 24–48 hours on business days.",
  },
];

function FAQ() {
  return (
  <section className="w-full bg-[#f8f8f8] py-[3rem] lg:py-[6rem] px-[1.5rem] lg:px-[3rem]">
    <div className="flex flex-col gap-[2rem] lg:gap-[3rem]">

      {/* Heading */}
      <div>
        <h2 className="mt-[1rem] text-[2.2rem] md:text-[3rem] lg:text-[5rem] font-[200] leading-[1.2] tracking-[-0.02em] text-[#000]">
          Frequently <br /> asked questions
        </h2>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-[0.85rem] lg:text-[1rem] font-[300] text-[#111] py-[1.2rem] lg:py-[1.8rem] hover:no-underline text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[0.8rem] lg:text-[0.95rem] font-[300] text-[#555] leading-[1.8] pb-[1.2rem] lg:pb-[1.8rem]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  </section>
);
}

export default FAQ;