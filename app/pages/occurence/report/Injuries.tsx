"use client";
import React, { useEffect, useState,createContext }  from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import api from "@/common/api";
import config from "@/common/config.json";


export const injuryContext = createContext(null);
const InjuriesPage = () => {
    const [reportingFrequency, setReportingFrequency] = useState(null);
    const { session } = useSession();
    const [numberOfInjuries, setNumberOfInjuries] = useState(0);
    const [numberOfFatalInjuries, setNumberOfFatalInjuries] = useState(0);
    const [isInjuriesOpened, setIsInjuriesOpened] = useState(true);
    const [isFatalInjuriesOpened, setIsFatalInjuriesOpened] = useState(true);
    const operatorId = session?.user?.operatorId;




   

   
    const fatalInjuriesObj = {
        numberOfInjuries: numberOfInjuries,
        numberOfFatalities: numberOfFatalInjuries,
        descriptionOfInjuries: "string",
        impactOnAssetsAndOperations: "string",
        additionalInfomation: "string",
        divisionName: "string",
        station: "string",
    };
    const temContext = createContext(fatalInjuriesObj);

    

    const injuriesHandleChange = (event) => {

        console.log(JSON.stringify(fatalInjuriesObj));
        if (event.target.value == "Yes") {
            setIsInjuriesOpened(true);
        }
        else if (event.target.value == "No") {
            setIsInjuriesOpened(false);
        }
    };

    const inFataljuriesHandleChange = (event) => {

        if (event.target.value == "Yes") {
            setIsFatalInjuriesOpened(true);
        }
        else if (event.target.value == "No") {
            setIsFatalInjuriesOpened(false);
        }
    };



    const handleSubmit = async () => {
        console.log(reportingFrequency);
        try {
            const result = await api({
                method: "post",
                url: `${config.REPORT_DAILY_OCCURENCE_URL}`,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(fatalInjuriesObj),
            });
            // setLoading(false);
            // setSuccessful(true);
            return result.data;
        } catch (error) {
            // setLoading(false);


        }
    };

    const getSelectOptions = async () => {
        try {
            const result = await api({
                method: "GET",
                // url: `${config.JSON_PLACEHOLDER_URL}`,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                }
            });
            let data = result.data;
            console.log(data);
        } catch (error) {
        }

    }




    // await loginRequiredServe();
    return (
        <injuryContext.Provider value={{numberOfInjuries,setNumberOfInjuries}}>
        <div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Are there any injuries to person(s)
                </label>
                <select onChange={injuriesHandleChange} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            {isInjuriesOpened && (
                <div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Number of injuries to person(s)
                        </label>
                        <input
                            type="number"
                            placeholder="Number of injuries to person(s)"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={(e) => { setNumberOfInjuries(Number(e.target.value)) }}
                        />
                    </div>


                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Are there any fatal injuries to person(s)
                        </label>
                        <select onChange={inFataljuriesHandleChange} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    {isFatalInjuriesOpened && (
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Number of fatal injuries to person(s)
                            </label>
                            <input
                                type="number"
                                placeholder="Number of fatal injuries to person(s)"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                onChange={(e) => { setNumberOfFatalInjuries(Number(e.target.value)) }}
                            />

                        </div>
                    )}
                </div>
            )}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Significant damage to property including assets
                </label>
                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    <option value="">Yes</option>
                    <option value="">No</option>
                </select>
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Significant damage to the environment
                </label>
                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    <option value="">Yes</option>
                    <option value="">No</option>
                </select>
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Any occurence on the network that may attract media attention or may give rise to a possible
                    evacuation of a community or part thereof, occurences wgich may affect the normal public road usage or an injury/death to a public figure?
                </label>
                <input
                    type="text"
                    placeholder="Any occurence on the network that may attract media attention "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
        </div>
        </injuryContext.Provider>
    );
};


export default InjuriesPage;
