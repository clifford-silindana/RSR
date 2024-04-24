import React from 'react';

function OccurrenceDetailsForm({ formStep, dateOfOccurrence, timeOfOccurrence, provinces, place, distinctCategories, subCategories, descriptionOfOccurrence, descriptionOfResponseTakenOccurrence, categories, immediateCause, setDateOfOccurrence, setTimeOfOccurrence, setProvinceID, setPlace, handleSubCategories, setCategoryId, setDescriptionOfOccurrence, setDescriptionOfResponseTakenOccurrence, setHazardClassificationId, setImmediateCause, handleNext, handleBack }) {

    return (
        <div>
            {formStep === 2 && (
                <div className="pb-6 px-6">
                    <div className="flex flex-col gap-1">
                        <ol>
                            <li>
                                <h4 className="text-l font-semibold uppercase">2. Occurrence Details
                                    <span className="text-xs normal-case block">
                                        Tick the appropriate box below and if “YES” provide further detail requested.
                                    </span>
                                </h4>
                            </li>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.1</span>
                                        <label>
                                            Date Of Occurrence
                                        </label>
                                    </div>
                                    <input
                                        type="date"
                                        value={dateOfOccurrence}
                                        placeholder="Date Of Occurrence"
                                        className="h-8 px-4 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setDateOfOccurrence(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.2</span>
                                        <label>
                                            Time Of Occurrence
                                        </label>
                                    </div>
                                    <input
                                        type="time"
                                        value={timeOfOccurrence}
                                        placeholder="Time Of Occurrence"
                                        className="h-8 px-4 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setTimeOfOccurrence(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.3</span>
                                        <label>
                                            Province
                                        </label>
                                    </div>
                                    <select
                                        className="h-8 px-12 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setProvinceID(e.target.value) }}>
                                        <option value="0">--Select--</option>
                                        {provinces.map((province) => (
                                            <option key={province.id} value={province.id}>{province.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.4</span>
                                        <label>
                                            Place
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={place}
                                        placeholder="Place of Occurrence"
                                        className="h-8 px-4 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setPlace(e.target.value) }}
                                    />
                                    {/* <PlaceMap /> */}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.5</span>
                                        <label>
                                            Occurrence Category
                                        </label>
                                    </div>
                                    <select
                                        className="h-8 px-12 ml-8 border rounded-md w-full"
                                        onChange={(e) => { handleSubCategories(e.target.value) }}>
                                        <option value="0">--Select--</option>
                                        {distinctCategories.map(({ metaType, name, description, id }) => (
                                            <option key={id} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.6</span>
                                        <label>
                                            Occurrence Sub Category
                                        </label>
                                    </div>
                                    <select
                                        className="h-8 px-12 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setCategoryId(e.target.value) }}>
                                        <option value="0">--Select--</option>
                                        {subCategories.map(({ metaType, name, description, id }) => (
                                            <option key={id} value={id}>{description}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.7</span>
                                        <label>
                                            Description of Occurrence
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={descriptionOfOccurrence}
                                        placeholder="Description of Occurrence"
                                        className="h-12 px-12 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setDescriptionOfOccurrence(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.8</span>
                                        <label>
                                            Description of Response Taken
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={descriptionOfResponseTakenOccurrence}
                                        placeholder="Description of Response Taken"
                                        className="h-12 px-12 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setDescriptionOfResponseTakenOccurrence(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.9</span>
                                        <label>
                                            Hazard Classification
                                        </label>
                                    </div>
                                    <select
                                        className="h-8 px-12 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setHazardClassificationId(e.target.value) }}>
                                        <option value="0">--Select--</option>
                                        {categories.map(({ metaType, name, id }) => {
                                            if (metaType === "HAZMATCLASSIFICATION") {
                                                return (
                                                    <option key={id} value={id}>{name}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:gap-14 mt-6">
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">2.10</span>
                                        <label>
                                            Immediate Cause
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={immediateCause}
                                        placeholder="Immediate Cause"
                                        className="h-12 px-12 ml-8 border rounded-md w-full"
                                        onChange={(e) => { setImmediateCause(e.target.value) }}
                                    />
                                </div>
                            </div>
                        </ol>
                    </div>
                    <div className="flex justify-end items-end mt-10 gap-10">
                        <button onClick={handleBack} className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500">Back</button>
                        <button onClick={handleNext} className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">Next</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OccurrenceDetailsForm;
