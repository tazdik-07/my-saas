"use client";

import { useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
          <div
            className="p-5 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 focus:ring-gray-700 focus:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:bg-gray-700"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{item.question}</h3>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          <div
            className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <div className="p-5 bg-gray-800 text-gray-300">
              <p className="text-left">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
