import React from 'react';

function HazardClassificationForm({ formStep, isDangerousGoods, isDangerousGooodsHandleChange, handleBack, handleSubmit }) {

    return (
        <div>
            {formStep === 3 && (
                <div className="pb-6 px-6">
                    <div className="flex flex-col gap-1">
                        <ol>
                            <li>
                                <h4 className="text-l font-semibold uppercase">3. Hazard Classification
                                    <span className="text-xs normal-case block">
                                        Tick the appropriate box below and if “YES” provide further detail requested.
                                    </span>
                                </h4>
                            </li>
                            <div className="grid grid-cols-4 py-2 text-sm items-center">
                                <div className="col-span-3">
                                    <span className="pr-3">3.1</span>
                                    <label>Were there any Dangerous Goods (Hazardous Material - HAZMAT) involved during the Occurrence?</label>
                                </div>
                                {isDangerousGoods && (
                                    <div className="flex gap-2">
                                        <input id="yes" onClick={isDangerousGooodsHandleChange} checked className="h-5 w-5" type="radio" value="Yes" name="transportCommuters" />Yes
                                        <input id="no" onClick={isDangerousGooodsHandleChange} className="h-5 w-5" type="radio" value="No" name="transportCommuters" /> No
                                    </div>
                                )}

                                {!isDangerousGoods && (
                                    <div className="flex gap-2">
                                        <input id="yes" onClick={isDangerousGooodsHandleChange} className="h-5 w-5" type="radio" value="Yes" name="transportCommuters" />Yes
                                        <input id="no" onClick={isDangerousGooodsHandleChange} checked className="h-5 w-5" type="radio" value="No" name="transportCommuters" />No
                                    </div>
                                )}
                            </div>
                            {isDangerousGoods && (
                                <div className="grid grid-cols-1 md:gap-14 mt-6">
                                    <div className="">
                                        <div className="font-semibold">
                                            <label>
                                                If there were any Dangerous Goods (Hazardous Material - HAZMAT) involved during the occurrence, the form RSR/OPS/253/3 must be completed within 7 days from the time of the occurrence reporting
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </ol>
                    </div>
                    <div className="flex justify-end items-end mt-10 gap-10">
                        <button onClick={handleBack} className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500">Back</button>
                        <button onClick={handleSubmit} className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HazardClassificationForm;
