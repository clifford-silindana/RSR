"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import api from "@/common/api";
import config from "@/common/config.json";

const AddressPage = () => {
    const [immediateReportingActive, setImmediateReportingActive] = useState(null);
    const [dailyReportingActive, setDailyReportingActive] = useState(null);
    const [reportingFrequency, setReportingFrequency] = useState(null);
    const { session } = useSession();
    const [numberOfInjuries, setNumberOfInjuries] = useState(0);
    const [numberOfFatalInjuries, setNumberOfFatalInjuries] = useState(0);
    const [isInjuriesOpened, setIsInjuriesOpened] = useState(true);
    const [isFatalInjuriesOpened, setIsFatalInjuriesOpened] = useState(true);
    const operatorId = session?.user?.operatorId;
    const [safetyPermitNumber, setSafetyPermitNumber] = useState(null);
    const [nameOfOperator, setNameOfOperator] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [streetName, setStreetName] = useState(null);
    const [streetNumber, setStreetNumber] = useState(null);
    const [unitNumber, setUnitNumber] = useState(null);
    const [complex, setComplex] = useState(null);
    const [suburb, setSuburb] = useState(null);
    const [city, setCity] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [dateOfOccurence, setDateOfOccurence] = useState(null);
    const [timeOfOccurence, setTimeOfOccurence] = useState(null);
    const [place, setPlace] = useState(null);        //Not supposed to be in request body?                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    const [province, setProvince] = useState(null);  //Not supposed to be in request body? 
    const [occurenceCategory, setOccurenceCategory] = useState(null);
    const [occurenceSubCategory, setOccurenceSubCategory] = useState(null); //Not supposed to be in request body?  
    const [descriptionOfOccurence, setDescriptionOfOccurence] = useState(null);
    const [descriptionOfResponse, setDescriptionOfResponse] = useState(null); //Not supposed to be in request body? 
    const [harzardousMaterial, setHazardousMaterial] = useState(null);

    const [selectOptions, setSelectOptions] = useState([]);



    const operatorProfile = {
        operatorId: operatorId,
        legalName: nameOfOperator,
        tradeName: "string",
        registrationNumber: "string",
        permitNumber: safetyPermitNumber
    };

    const address = {
        streetName: streetName,
        streetNumber: streetNumber,
        unitNumber: unitNumber,
        complex: complex,
        suburb: suburb,
        city: city,
        provinceId: 0,
        postalCode: postalCode
    }

    const personReportingOccurrence = {
        name: "string",
        designation: "string",
        contactNumber: contactNumber,
    }

    const personFollowingUp = {
        name: "string",
        designation: "string",
        contactNumber: contactNumber
    }
    const reportDailyOccurenceObj = {
        operatorID: operatorId,
        operatorProfile: operatorProfile,
        contactNumber: contactNumber,
        referenceNumber: "string",
        address: address,
        occurrenceDateAndTime: `${dateOfOccurence} ${timeOfOccurence}`,
        descriptionOfOccurrence: descriptionOfOccurence,
        occurrenceCategoryId: 0,
        personReportingOccurrence: personReportingOccurrence,
        personFollowingUp: personFollowingUp,
        occurrenceSubCategoryId: 0,
        hazardClassificationId: 0,
        numberOfInjuries: numberOfInjuries,
        numberOfFatalities: numberOfFatalInjuries,
        descriptionOfInjuries: "string",
        impactOnAssetsAndOperations: "string",
        additionalInfomation: "string",
        divisionName: "string",
        occurrenceDate: dateOfOccurence,
        station: "string",
        province: province,
    };

    const injuriesHandleChange = (event) => {

        console.log(JSON.stringify(reportDailyOccurenceObj));
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

    const changeReportingFrequency = (e) => {


        setReportingFrequency(e.target.value);

        if (e.target.value == "Immediate") {
            setImmediateReportingActive(true);
            setDailyReportingActive(false);
        }

        else if (e.target.value == "Daily") {
            setDailyReportingActive(true);
            setImmediateReportingActive(false);
        }

        else if (e.target.value == "null") {
            setDailyReportingActive(false);
            setImmediateReportingActive(false);
        }


    }

    const handleSubmit = async () => {
        console.log(streetName);
        console.log(operatorId);
        console.log(streetNumber);
        console.log(dateOfOccurence);
        console.log("Province", province);
        console.log("Occurence category", occurenceCategory);
        console.log(reportingFrequency);
        try {
            const result = await api({
                method: "post",
                url: `${config.REPORT_DAILY_OCCURENCE_URL}`,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(reportDailyOccurenceObj),
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
            // setLoading(false);
            // setSuccessful(true);
            let data = result.data;
            setSelectOptions(data);
            console.log(data);
        } catch (error) {
            // setLoading(false);


        }

    }

  


    // await loginRequiredServe();
    return (



        <div>
            {/* <div>
                <label className="mb-3 block text-black dark:text-white">
                    Street Name
                </label>
                <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setStreetName(e.target.value)}
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Street Number
                </label>
                <input
                    type="text"
                    placeholder="Street Number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setStreetNumber(e.target.value)}
                />
            </div>

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Unit Number
                </label>
                <input
                    type="text"
                    placeholder="Unit Number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setUnitNumber(e.target.value)}
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Complex
                </label>
                <input
                    type="text"
                    placeholder="Complex"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setComplex(e.target.value)}
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Suburb
                </label>
                <input
                    type="text"
                    placeholder="Suburb"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setSuburb(e.target.value)}
                />
            </div>

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    City / Town
                </label>
                <input
                    type="text"
                    placeholder="City"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Postal Code
                </label>
                <input
                    type="number"
                    placeholder="Code"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setPostalCode(e.target.value)}
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Date Of Occurence
                </label>
                <div className="relative">
                    <input
                        type="date"
                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        onChange={(e) => setDateOfOccurence(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Time Of Occurence
                </label>
                <div className="relative">
                    <input
                        type="time"
                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        onChange={(e) => setTimeOfOccurence(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Place
                </label>
                <input
                    type="text"
                    placeholder="Place"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setPlace(e.target.value)}
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Province
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.8">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                    fill="#637381"></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                    fill="#637381"></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                    fill="#637381"></path>
                            </g>
                        </svg>
                    </span>
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        onChange={(e) => { setProvince(e.target.value) }}
                    >
                        <option value="Option one">Gauteng</option>
                        <option value="Option two">Limpopo</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.8">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill="#637381"></path>
                            </g>
                        </svg>
                    </span>
                </div>
            </div> */}
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Occurence Sub Category
                </label>
                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    onChange={(e) => { setOccurenceSubCategory(e.target.value) }}>
                    <option value="Sub-Category One">Yes</option>
                    <option value="Sub-Category Two">No</option>
                </select>
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Description Of Occurence
                </label>
                <input
                    type="text"
                    placeholder="Description Of Occurence"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => { setDescriptionOfOccurence(e.target.value) }}
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Description Of Response Taken
                </label>
                <input
                    type="text"
                    placeholder="Description Of Response Taken"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => { setDescriptionOfResponse(e.target.value) }}
                />
            </div>
        </div>
    );
};


export default AddressPage;
