import React from 'react';

const YourComponent: React.FC = () => {
    return (
        <>
            <div className="mt-2"></div>
            <div className="container mx-auto flex divide-x border border-l-0 border-r-0">
                <div className="w-10 flex-none"></div>
                <ul className="grid grow grid-flow-col divide-x">
                    <li className="relative flex items-center gap-2 p-5">
            <span className="circle flex h-9 w-9 flex-none items-center justify-center rounded-full bg-indigo-700 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
                        <div className="grow">
                            <span className="text-sm font-semibold">Provide Contact</span>
                            <p className="text-xs text-gray-500">adipisicing elit</p>
                        </div>
                        <div className="absolute -right-2 z-10 h-4 w-4 flex-none rotate-45 border-t border-r bg-white"></div>
                    </li>
                    <li className="relative flex items-center gap-2 border-b-4 border-b-indigo-700 p-5">
            <span className="circle flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-700 bg-white">
              <span className="h-5 w-5 text-sm text-indigo-700">02</span>
            </span>
                        <div>
                            <span className="text-sm font-semibold text-indigo-700">Choose Plan</span>
                            <p className="text-xs text-gray-500">adipisicing elit.</p>
                        </div>
                        <div className="absolute -right-2 h-4 w-4 flex-none rotate-45 border-t border-r bg-white"></div>
                    </li>
                    <li className="flex items-center gap-2 p-5">
            <span className="circle flex h-9 w-9 items-center justify-center rounded-full border bg-white">
              <span className="h-5 w-5 text-sm text-gray-400">03</span>
            </span>
                        <div className="text-gray-400">
                            <span className="text-sm font-semibold">Make Payment</span>
                            <p className="text-xs">Aliquam quaeraeaque a veritatis .</p>
                        </div>
                    </li>
                </ul>
                <div className="w-10 flex-none"></div>
            </div>
        </>
    );
};

export default YourComponent;
