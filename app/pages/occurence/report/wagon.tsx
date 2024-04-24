"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import api from "@/common/api";
import config from "@/common/config.json";

const WagonPage = ({addWagonType}) => {

    const [reportingFrequency, setReportingFrequency] = useState(null);
    const { session } = useSession();
    const [name, setname] = useState("");
    const [wagonType, setwagonType] = useState("");

    const NoOfWagonTypes = [
        {
            name: "Bulk: Wagons",
            id: 1
        },
        {
            name: "Bulk: Containers",
            id: 2
        },
        {
            name: "Containers",
            id: 3
        },
        {
            name: "Other",
            id: 4
        }
    ];

    const [checkedState, setCheckedState] = useState(
        new Array(NoOfWagonTypes.length).fill(false)
    );

    const handleOnChange = (position, name) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        alert(name);
        setCheckedState(updatedCheckedState);
    };

    const WagonsObj = {
    };

    const handleSubmit = (e) => {
        alert()
        e.preventDefault();
        addWagonType({wagonType,name});
        // try {
        //     const result = await api({
        //         method: "post",
        //         url: `${config.REPORT_DAILY_OCCURENCE_URL}`,
        //         headers: {
        //             accept: "application/json",
        //             "Content-Type": "application/json",
        //         },
        //         //data: JSON.stringify(reportDailyOccurenceObj),
        //     });
        //     // setLoading(false);
        //     // setSuccessful(true);
        //     return result.data;
        // } catch (error) {
        //     // setLoading(false);


        // }
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
            // setLoading(false);
            // setSuccessful(true);
            let data = result.data;
            // setSelectOptions(data);
            console.log(data);
        } catch (error) {
            // setLoading(false);


        }

    }



    // await loginRequiredServe();
    return (
        <div>
            <div className="flex flex-wrap items-center">
                <label className="mb-3 block text-black dark:text-white">
                    Number of wagons involved:
                </label>
                <div style={{ marginLeft: 20, width: 700, display: 'flex', justifyContent: 'space-between' }}>
                    {/* {NoOfWagonTypes.map(({ name, id }, index) => { */}

                        {/* return ( */}
                            <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">

                                {/* <label className="mb-1 block text-black dark:text-white">
                                    <input
                                        type="checkbox"
                                        id={`${index}`}
                                        name={name}
                                        value={name}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index, name)}
                                    />
                                    {name}
                                </label> */}
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Wagon Type
                                    </label>
                                    <input
                                        value={wagonType}
                                        type="text"
                                        placeholder="Name of Operator"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        onChange={(e) => { setwagonType(e.target.value) }}
                                    />
                                     <input type="button" onClick={handleSubmit} value="add wagon" />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        value={name}
                                        type="text"
                                        placeholder="Name of Operator"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        onChange={(e) => { setname(e.target.value) }}
                                    />
                                </div>
                               
                            </span>
                        )
                    {/* })} */}
                </div>
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Wagon Type
                </label>
                <input
                    type="text"
                    placeholder=" Wagon Type"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
        </div>
    );
};


export default WagonPage;
