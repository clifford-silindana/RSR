import React from "react";


const ActionCard = () => {
    return (
        <>
            <div className="mt-2"></div>
            <div className="container mx-auto flex divide-x border border-l-0 border-r-0">
                <div className="w-10 flex-none"></div>
                <ul className="grid grow grid-flow-col divide-x">
                    <li className="relative flex items-center gap-2 border-b-4 border-b-primary p-5">
                         <span
                             className="circle flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary">
                          <span className="h-5 w-5 text-sm text-center text-white">2</span>
                        </span>
                        <div className="grow">
                            <span className="text-medium font-semibold text-primary">Apply for Permit / ASIP Submission</span>
                        </div>
                    </li>

                    <li className="relative flex items-center gap-2 border-b-4 border-b-primary p-5">
                         <span
                             className="circle flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary">
                          <span className="h-5 w-5 text-sm text-center text-white">2</span>
                        </span>
                        <div className="grow">
                            <span className="text-medium font-semibold text-primary">Apply for Permit / ASIP Submission</span>
                        </div>
                    </li>
                    <li className="relative flex items-center gap-2 border-b-4 border-b-primary p-5">
                         <span
                             className="circle flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary">
                          <span className="h-5 w-5 text-sm text-center text-white">2</span>
                        </span>
                        <div className="grow">
                            <span className="text-medium font-semibold text-primary">Apply for Permit / ASIP Submission</span>
                        </div>
                    </li>
                </ul>
                <div className="w-10 flex-none"></div>
            </div>
        </>
    );
};

export default ActionCard;