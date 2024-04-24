import React from "react";

const options = [
  {
    title: "Company Details",
    description: "Provide the information requested below.",
  },
  {
    title: "Office Addresses",
    description: "Head Office Physical/Postal Address",
  },
  {
    title: "Organisational Contacts",
    description: "Head of Organisation & Nominated Manager.",
  },
  {
    title: "  Categories of rail operations",
    description: "Tick the appropriate box/boxes below.",
  },
];

interface StepperProps {
  activeStep: number;
}

const Stepper = ({ activeStep }: StepperProps) => {
  return (
    <>
      <div className="mt-2"></div>
      <div className="container mx-auto flex divide-x border border-l-0 border-r-0">
        <div className="w-10 flex-none"></div>
        <ul className="grid grow grid-flow-col divide-x">
          {options.map((item, index) => {
            if (index == activeStep) {
              return (
                <li className="relative flex items-center gap-2 border-b-4 border-b-primary p-5">
                  <span className="circle flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary">
                    <span className="h-5 w-5 text-sm text-center text-white">
                      {index + 1}
                    </span>
                  </span>
                  <div className="grow">
                    <span className="text-sm font-semibold text-primary">
                      {item.title}
                    </span>
                    <p className="text-xs text-primary">{item.description}</p>
                  </div>
                  <div className="absolute -right-2 z-10 h-4 w-4 flex-none rotate-45 border-t border-r bg-white"></div>
                </li>
              );
            } else if (index < activeStep) {
              return (
                <li className="flex items-center gap-2 p-5">
                  <span className="circle flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-700 bg-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#64748b"
                      className="h-5 w-5">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <div className="grow">
                    <span className="text-sm font-semibold text-indigo-700">
                      {item.title}
                    </span>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <div className="absolute -right-2 z-10 h-4 w-4 flex-none rotate-45 border-t border-r bg-white"></div>
                </li>
              );
            } else {
              return (
                <li className="flex items-center gap-2 p-5">
                  <span className="circle flex h-9 w-9 items-center justify-center rounded-full border bg-white">
                    <span className="h-5 w-5 text-sm text-center text-gray-400">
                      {index + 1}
                    </span>
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-indigo-700">
                      {item.title}
                    </span>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <div className="absolute -right-2 h-4 w-4 flex-none rotate-45 border-t border-r bg-white"></div>
                </li>
              );
            }
          })}
        </ul>
        <div className="w-10 flex-none"></div>
      </div>
    </>
  );
};

export default Stepper;
