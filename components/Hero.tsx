import Image from "next/image";
import heroImage from "@/public/next.svg";
import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="bg-gradient-to-tl from-black to-neutral-800 w-full h-full relative">
        <Image
          src={heroImage}
          height="750"
          width="1024"
          alt=""
          className="w-full h-full object-cover absolute mix-blend-overlay opacity-80"
        />
        <div className="flex flex-col   justify-center py-40 pl-10">
          <div className="text-2xl z-10 font-bold text-white">
            <h1 className="max-w-4xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Unlock the Meaning Behind Your Dreams
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
              Discover the hidden messages in your dreams with Dream
              Interpretation AI. Our advanced algorithms analyze your dreams and
              provide personalized insights to help you understand their
              significance.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
