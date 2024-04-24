import React from 'react';

function PermitForm({ isError, errorMessage, formStep, operators, safetyPermitNumber, contactNumber, GetOperatorDetails, handleNext }) {
    
    const handleChangeOperator = (event) => {
        const selectedOperatorId = event.target.value;
        GetOperatorDetails(selectedOperatorId);
    };

    return (
        <div>
            {isError && (
                <div className="p-4 mb-2 text-white bg-danger">
                    <button className="text-left">{errorMessage}</button>
                </div>
            )}
            {formStep === 1 && (
                <div className="pb-6 px-6">
                    <div className="flex flex-col gap-1">
                        <ol>
                            <li>
                                <h4 className="text-l font-semibold uppercase">1. Permit Details
                                    <span className="text-xs normal-case block">
                                        Tick the appropriate box below and if “YES” provide further detail requested.
                                    </span>
                                </h4>
                            </li>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">1.2</span>
                                        <label>
                                            Name Of Operator
                                        </label>
                                    </div>
                                    <select className="h-8 px-12 ml-8 border rounded-md w-full" onChange={handleChangeOperator}>
                                        <option value="0">--Select--</option>
                                        {operators.map((operator, index) => (
                                            <option key={index} value={operator.operatorId}>{operator.legalName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">1.1</span>
                                        <label>
                                            Safety Permit Number
                                        </label>
                                    </div>
                                    <input
                                        value={safetyPermitNumber}
                                        type="number"
                                        disabled
                                        placeholder={safetyPermitNumber}
                                        className="h-8 px-4 ml-8 border rounded-md w-full"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">1.3</span>
                                        <label>
                                            Contact Number
                                        </label>
                                    </div>
                                    <input
                                        value={contactNumber}
                                        disabled
                                        type="number"
                                        placeholder={contactNumber}
                                        className="h-8 px-4 ml-8 border rounded-md w-full"
                                    />
                                </div>
                            </div>
                        </ol>
                    </div>
                    <div className="flex justify-end items-end mt-10 gap-10">
                        <button onClick={handleNext} className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">Next</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PermitForm;
