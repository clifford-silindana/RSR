"use client";
import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import api from "@/common/api";
import config from "@/common/config.json";
import { injuryContext } from "./Injuries";
import { useRouter, useSearchParams } from "next/navigation";
import PlaceMap from "@/components/Maps/PlaceMap";
//import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

const DailyOccurrencePage = () => {

    // const { isLoaded } = useLoadScript({
    //     libraries: ['places'],
    //     googleMapsApiKey: "AIzaSyDAL2-SnwUQ9hG-BIVeC80H0ailSBdhdeU"
    // })
    const [isError, setIsError] = useState(false);
    const [errorMessage, setIErrorMessage] = useState("");
    const [isReportSent, setIsReportSent] = useState(false);
    const [occurenceId, setOccurenceId] = useState(false);
    const [isDangerousGoods, setIsDangerousGoods] = useState(false);
    const [isSendNotification, setIsSendNotification] = useState(false);
    const [categories, setCategories] = useState([]);
    const [distinctCategories, setDistinctCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [operators, setOperators] = useState([]);
    const [hazardClassificationId, setHazardClassificationId] = useState(null);
    const data = useContext(injuryContext);
    const [formStep, setFormStep] = useState(1);
    const { session } = useSession();
    const [operatorId, setOperatorId] = useState(0);
    const [nameOfPersonReporting, setNameOfPersonReporting] = useState("");
    const [designationOfPersonReporting, setDesignationOfPersonReporting] = useState("");
    const [divisionName, setDivisionName] = useState("");
    const [followUpContactPerson, setFollowUpContactPerson] = useState("");
    const [followUpContactNumber, setFollowUpContactNumber] = useState("");
    const [reportingOffice, setReportingOffice] = useState("");


    const [dateOfOccurence, setDateOfOccurence] = useState(null);
    const [timeOfOccurence, setTimeOfOccurence] = useState(null);
    const [place, setPlace] = useState(""); //Not supposed to be in request body?
    const [occurenceCategory, setOccurenceCategory] = useState(null);
    const [descriptionOfOccurence, setDescriptionOfOccurence] = useState("");
    const [
        descriptionOfResponseTakenOccurence,
        setDescriptionOfResponseTakenOccurence,
    ] = useState("");
    const [immediateCause, setImmediateCause] = useState(null); //Not supposed to be in request body?

    const [numberOfInjuries, setNumberOfInjuries] = useState("0");
    const [numberOfFatalities, setNumberOfFatalities] = useState("0");
    const [impactOnAssets, setImpactOnAssets] = useState("");
    const [additionalInfomation, setAdditionalInfomation] = useState("");
    const [referenceNumber, setReferenceNumber] = useState("");
    const [station, setStation] = useState("");

    //prepoulated Items
    const [safetyPermitNumber, setSafetyPermitNumber] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [legalName, setLegalName] = useState("");
    const [tradeName, setTradeName] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");

    //Address
    const [streetName, setStreetName] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [unitNumber, setUnitNumber] = useState("");
    const [complex, setComplex] = useState("");
    const [suburb, setSuburb] = useState("");
    const [city, setCity] = useState("");
    const [provinceId, setProvinceId] = useState("0");
    const [postalCode, setPostalCode] = useState("");

    const router = useRouter();

    const isDangerousGooodsHandleChange = (event) => {
        if (event.target.value == "Yes") {
            setIsDangerousGoods(true);
        } else if (event.target.value == "No") {
            setIsDangerousGoods(false);
        }
    };
    const isSendNotificationHandleChange = (event) => {
        if (event.target.value == "Yes") {
            setIsSendNotification(true);
        } else if (event.target.value == "No") {
            setIsSendNotification(false);
        }
    };

    const reportDailyOccurenceObj = {

        "operatorId": operatorId,
        "contactNumber": contactNumber,
        "occurrenceDate": `${dateOfOccurence} ${timeOfOccurence}`,
        "place": place,
        "provinceId": 16,
        "occurrenceCategoryId": 136,
        "description": descriptionOfOccurence,
        "responseTakenDescription": "",
        "hazardClassificationId": 145,
        "location": {
            "latitude": -25.999262,
            "longitude": 28.125912
        },
        "reportedByUserId": session?.user?.operatorId,
        "reportedDate": `${dateOfOccurence} ${timeOfOccurence}`,
        "personReportingOccurrence": {
            "name": nameOfPersonReporting,
            "designation": designationOfPersonReporting,
            "contactNumber": contactNumber
        },
        "personFollowingUp": {
            "name": followUpContactNumber,
            "designation": designationOfPersonReporting,
            "contactNumber": followUpContactNumber
        },
        "numberOfInjuries": 24,
        "numberOfFatalities": 3,
        "descriptionOfInjuries": "",
        "impactOnAssetsAndOperations": impactOnAssets,
        "divisionName": divisionName,
        "station": station,
        "reportingOffice": reportingOffice,
        "operatorReferenceNumber": "",
        "additionalInformation": additionalInfomation
    };


    const operatorObj = {
        "pageNumber": 1,
        "pageSize": 100
    }
    const handleSubmit = async () => {
        console.log(JSON.stringify(reportDailyOccurenceObj));
        if (!descriptionOfOccurence ||
            !nameOfPersonReporting ||
            !designationOfPersonReporting ||
            !divisionName ||
            !followUpContactPerson ||
            !reportingOffice ||
            !descriptionOfResponseTakenOccurence ||
            !impactOnAssets ||
            !additionalInfomation ||
            !contactNumber

        ) {
            setIErrorMessage("Please fill out all required fields");
            setIsError(true);
        }
        else {
            setIsError(false);
        }


        try {

            if (isError == false) {
                const result = await api({
                    method: "post",
                    url: "https://niims-dev.azurewebsites.net/Occurrence/ReportDailyOccurrence",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json-patch+json",
                    },
                    data: JSON.stringify(reportDailyOccurenceObj),
                });

                console.log(result.data);
                {
                    !isDangerousGoods && (
                        router.push("/occurence")
                    )
                };

                {
                    isDangerousGoods && (
                        handleNext()
                    )
                };
                let data = result.data;

                console.log(data);
                setReferenceNumber("REF-NHUISPVV")
                setOccurenceId(data);
                router.push("/occurence");
            }
        } catch (error) {
            // setLoading(false);
        }

        //router.push("/occurence");
    };

    const handleSubCategories = (id) => {
        let data = []
        categories.forEach(element => {

            if (element.name === id) {
                data.push(element);
                //
            }

        })
        setSubCategories(data);
    }


    function removeDuplicates(arr) {
        let unique = [];
        let data = []
        arr.forEach(element => {
            if (!unique.includes(element.name)) {

                if (element.metaType === "OCCURRENCECATEGORY") {
                    unique.push(element.name);
                    data.push(element)
                }
            }
            setDistinctCategories(data);
        });
        return unique;
    }
    const GetMetaData = async () => {
        try {
            const result = await api({
                method: "get",
                url: "https://niims-dev.azurewebsites.net/Metadata/GetAllMetadata",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                //: JSON.stringify(reportDailyOccurenceObj),
            });
            console.log(JSON.stringify(result.data));
            setCategories(result.data);
            removeDuplicates(result.data)

            //router.push("@/components/Occurencies/OccurenceManagementDashboard");
        } catch (error) {
            // setLoading(false);
        }
    };
    const GetOperatorList = async () => {
        try {
            const result = await api({
                method: "post",
                url: "https://niims-dev.azurewebsites.net/Operator/GetOperatorBySearchCriteria",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: operatorObj,
            });

            let res = result.data.results;
            setOperators(res);
            console.log(result.data.results);
        } catch (error) {
            // setLoading(false);
        }
    };

    const setStationName = async (id) => {
        try {
            const result = await api({
                method: "GET",
                url: "https://niims-dev.azurewebsites.net/Operator/GetOperatorStations?operatorId=" +
                id,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                }
            });

            let res = result.data[0].stationName;
            alert(res);
            setStation(res);
        } catch (error) {
            // setLoading(false);
        }
    };
  

    const GetOperatorDetails = async (id) => {
        try {
            const result = await api({
                method: "get",
                url:
                    "https://niims-dev.azurewebsites.net/Operator/GetOperatorById?operatorID=" +
                    id,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            console.log(result.data);
            let currentPermit = result.data.currentPermit.permitNumber;

            //All prepopulated items
            let email = result.data.contacts[0].email;
            let regNo = result.data.registrationNumber ? result.data.registrationNumber : "";
            let trade = result.data.tradeName ? result.data.tradeName : "";
            let legal = result.data.legalName ? result.data.legalName : "";
            let streetName = result.data.physicalAddress.streetName ? result.data.physicalAddress.streetName : "";
            let streetNumber = result.data.physicalAddress.streetNumber ? result.data.physicalAddress.streetNumber : "";
            let unitNumber = result.data.physicalAddress.unitNumber ? result.data.physicalAddress.unitNumber : "";
            let complex = result.data.physicalAddress.complex ? result.data.physicalAddress.complex : "";
            let suburb = result.data.physicalAddress.suburb ? result.data.physicalAddress.suburb : "";
            let city = result.data.physicalAddress.city ? result.data.physicalAddress.city : "";
            let provinceId = result.data.physicalAddress.provinceId;
            let postalCode = result.data.physicalAddress.postalCode ? result.data.physicalAddress.postalCode : "";
            let contact = result.data.contacts;

            {
                contact.map((con, index) => {
                    if (con.hasUserAccount == true) {
                        setContactNumber(con.landline);
                    }
                });
            }
            setLegalName(legal);
            setEmail(email);
            setSafetyPermitNumber(currentPermit);
            setRegistrationNumber(regNo);
            setTradeName(trade);

            //setReportingOffice(legal);
            setStreetName(streetName);
            setStreetNumber(streetNumber);
            setUnitNumber(unitNumber);
            setComplex(complex);
            setSuburb(suburb);
            setCity(city);
            setProvinceId(provinceId);
            setPostalCode(postalCode);
            setOperatorId(id);
            //console.log(data);
            setStationName(id);
        } catch (error) {
            // setLoading(false);
        }
    };
    const handleNext = () => {
        setFormStep(formStep + 1);
    };

    const handleBack = async () => {
        setFormStep(formStep - 1);
    };

    const handleReportSend = async () => {
        setIsReportSent(true);
    };
    const handleClose = async () => {
        router.push("/occurence");
    };

    useEffect(() => {

        GetMetaData();
        GetOperatorList();
    }, []);

    return (

        <div className="grid grid-cols-1 gap-9 ">
            <div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                    <div className="bg-gray pb-4 px-7 dark:border-strokedark">
                        <div className="flex flex-row justify-between items-center">
                            <h4 className="text-xl font-semibold text-black dark:text-white">Daily Occurrence Form</h4>
                            <p className="text-black dark:text-white"></p></div><div className="flex justify-start flex-row items-center mt-2">
                            <span className="mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path></svg>
                            </span>
                            <h5 className="text-black text-sm font-medium">
                                <p>Please select the most appropriate reason/s for submitting this Occurrence.</p></h5></div></div><div className="grid grid-cols-7 gap-5 p-7"><div className="col-span-2">
                                    <ol className=" ">

                                        {formStep === 1 && (
                                            <li className="p-2 bg-logoorange text-white mb-2"><button className="text-left">1. Permit Details</button></li>
                                        )}

                                        {formStep !== 1 && (
                                            <li className="p-2 bg-gray mb-2">
                                                <button className="text-left">1. Permit Details</button>
                                            </li>
                                        )}

                                        {formStep === 2 && (
                                            <li className="p-2 bg-logoorange text-white mb-2">
                                                <button className="text-left">
                                                    2. Occurrence Details
                                                </button>
                                            </li>
                                        )}

                                        {formStep !== 2 && (
                                            <li className="p-2 bg-gray mb-2">
                                                <button className="text-left">
                                                    2. Occurrence Details
                                                </button>
                                            </li>
                                        )}

                                        {formStep === 3 && (
                                            <li className="p-2 bg-logoorange text-white mb-2">
                                                <button className="text-left">
                                                    3. Hazard Classification
                                                </button>
                                            </li>
                                        )}

                                        {formStep !== 3 && (
                                            <li className="p-2 bg-gray mb-2"><button className="text-left">3. Hazard Classification</button></li>
                                        )}


                                        {isDangerousGoods && (
                                            formStep === 4 && (
                                                <li className="p-2 bg-logoorange text-white mb-2"><button className="text-left">4. Send Notification</button></li>
                                            )
                                        )}
                                        {isDangerousGoods && (
                                            formStep !== 4 && (
                                                <li className="p-2 bg-gray mb-2"><button className="text-left">4. Send Notification</button></li>
                                            )
                                        )}
                                    </ol>
                                </div>
                        <div className="col-span-5">
                            <div>
                                {isError && (
                                    <div className="p-4 mb-2 text-white bg-danger"><button className="text-left">{errorMessage}</button></div>
                                )}
                                {formStep === 1 && (
                                    <div className="pb-6 px-6">
                                        <div className="flex flex-col gap-1">
                                            <ol className="">
                                                <li>
                                                    <h4 className="text-l font-semibold uppercase">1. Permit Details
                                                        <span className="text-xs normal-case block">
                                                            Tick the appropriate box below and if “YES” provide further detail requested.
                                                        </span>
                                                    </h4>
                                                </li>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.2</span>
                                                            <label>
                                                                Name Of Operator
                                                            </label>
                                                        </div>
                                                        <select className="h-8 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { GetOperatorDetails(e.target.value) }}>
                                                            <option value={"0"}>--Select--</option>
                                                            {operators.map((operator, index) => {
                                                                return (
                                                                    <option value={operator.operatorId}>{operator.legalName}</option>
                                                                )
                                                            })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
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
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.3</span>
                                                            <label>
                                                                Contact Number
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={contactNumber}
                                                            disabled
                                                            type="text"
                                                            placeholder={contactNumber}
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setContactNumber(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.4</span>
                                                            <label>
                                                                Name Of Person Reporting
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={nameOfPersonReporting}
                                                            type="text"
                                                            placeholder="Name Of Person Reporting"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setNameOfPersonReporting(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.5</span>
                                                            <label>
                                                                Designation of Person Reporting
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={designationOfPersonReporting}
                                                            type="text"
                                                            placeholder="Designation of Person Reporting"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setDesignationOfPersonReporting(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.6</span>
                                                            <label>
                                                                Division Name
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={divisionName}
                                                            type="text"
                                                            placeholder="Division Name"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setDivisionName(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.7</span>
                                                            <label>
                                                                Station
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={station}
                                                            type="text"
                                                            placeholder= {station}
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={setStationName}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.8</span>
                                                            <label>
                                                                Follow Up Contact Person
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={followUpContactPerson}
                                                            type="text"
                                                            placeholder="Follow Up Contact Person"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setFollowUpContactPerson(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.9</span>
                                                            <label>
                                                                Follow Up Contact Number
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={followUpContactNumber}
                                                            type="text"
                                                            placeholder="Follow Up Contact Number"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setFollowUpContactNumber(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">1.10</span>
                                                            <label>
                                                                Reporting Office
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={reportingOffice}
                                                            type="text"
                                                            placeholder="Reporting Office"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setReportingOffice(e.target.value) }}
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
                            <div>
                                {formStep === 2 && (
                                    <div className="pb-6 px-6">
                                        <div className="flex flex-col gap-1">
                                            <ol className="">
                                                <li>
                                                    <h4 className="text-l font-semibold uppercase">2. Occurrence Details
                                                        <span className="text-xs normal-case block">
                                                            Tick the appropriate box below and if “YES” provide further detail requested.
                                                        </span>
                                                    </h4>
                                                </li>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.1</span>
                                                            <label>
                                                                Date Of Occurrence
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="date"
                                                            value={dateOfOccurence}
                                                            placeholder="Number of injuries to person(s)"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setDateOfOccurence(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.2</span>
                                                            <label>
                                                                Time Of Occurrence
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="time"
                                                            value={timeOfOccurence}
                                                            placeholder="Number of injuries to person(s)"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setTimeOfOccurence(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.3</span>
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
                                                         <PlaceMap />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.4</span>
                                                            <label>
                                                                Station
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={station}
                                                            placeholder="Station"
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setStation(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.5</span>
                                                            <label>
                                                                Description of Occurrence
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={descriptionOfOccurence}
                                                            placeholder="Description of Occurrence"
                                                            className="h-12 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setDescriptionOfOccurence(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.6</span>
                                                            <label>
                                                                Description of Response Taken
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={descriptionOfResponseTakenOccurence}
                                                            placeholder=" Description of Response Taken"
                                                            className="h-12 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setDescriptionOfResponseTakenOccurence(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.7</span>
                                                            <label>
                                                                Number Of Fatalities
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            value={numberOfFatalities}
                                                            placeholder="0"
                                                            className="h-12 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setNumberOfFatalities(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.8</span>
                                                            <label>
                                                                Number Of Injuries
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            value={numberOfInjuries}
                                                            placeholder="0"
                                                            className="h-12 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setNumberOfInjuries(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.9</span>
                                                            <label>
                                                                Impact on Assets and Operations
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={impactOnAssets}
                                                            placeholder="Impact on Assets and Operations"
                                                            className="h-12 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setImpactOnAssets(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.10</span>
                                                            <label>
                                                                Occurrence Category
                                                            </label>
                                                        </div>
                                                        <select className="h-8 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { handleSubCategories(e.target.value) }}>
                                                            <option value="0">--Select--</option>
                                                            {distinctCategories.map(({ metaType, name, description, id }, index) => {
                                                                return (
                                                                    <option value={name}>{name}</option>
                                                                )
                                                            })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.10</span>
                                                            <label>
                                                                Occurrence Sub Category
                                                            </label>
                                                        </div>
                                                        <select className="h-8 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setCategoryId(e.target.value) }}>
                                                            <option value="0">--Select--</option>
                                                            {subCategories.map(({ metaType, name, description, id }, index) => {
                                                                return (
                                                                    <option value={id}>{description}</option>
                                                                )
                                                            })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.11</span>
                                                            <label>
                                                                Hazard Classification
                                                            </label>
                                                        </div>
                                                        <select className="h-8 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setHazardClassificationId(e.target.value) }}>
                                                            <option value="0">--Select--</option>
                                                            {categories.map(({ metaType, name, id }, index) => {
                                                                return (
                                                                    <option value={id}>{name}</option>

                                                                )
                                                            })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:gap-14 mt-6">
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">2.12</span>
                                                            <label>
                                                                Additional Information
                                                            </label>
                                                        </div>
                                                        <textarea
                                                            rows={10}
                                                            value={additionalInfomation}
                                                            placeholder="Additional Information"
                                                            className="h-12 px-12 ml-8 border rounded-md w-full"
                                                            onChange={(e) => { setAdditionalInfomation(e.target.value) }}
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
                            <div>
                                {formStep === 3 && (
                                    <div className="pb-6 px-6">
                                        <div className="flex flex-col gap-1">
                                            <ol className="">
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
                                                            <input
                                                                id="yes"
                                                                onClick={isDangerousGooodsHandleChange}
                                                                className="h-5 w-5"
                                                                type="radio"
                                                                value="Yes"
                                                                name="transportCommuters"
                                                            />
                                                            Yes
                                                            <input
                                                                id="no"
                                                                onClick={isDangerousGooodsHandleChange}
                                                                checked
                                                                className="h-5 w-5"
                                                                type="radio"
                                                                value="No"
                                                                name="transportCommuters"
                                                            />
                                                            No
                                                        </div>
                                                    )}
                                                </div>
                                                {isDangerousGoods && (
                                                    <div className="grid grid-cols-1 md:gap-14 mt-6">
                                                        <div className="">
                                                            <div className="font-semibold">
                                                                <label>
                                                                    If there were any Dangerous Goods (Hazardous
                                                                    Material - HAZMAT) involved during the
                                                                    occurrence, the form RSR/OPS/253/3 must be
                                                                    completed within 7 days from the time of the
                                                                    occurrence reporting
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </ol>
                                        </div>
                                        <div className="flex justify-end items-end mt-10 gap-10">
                                            <button
                                                onClick={handleBack}
                                                className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                {formStep === 4 && (
                                    <div className="pb-6 px-6">
                                        <div className="flex flex-col gap-1">
                                            <ol className="">
                                                <li>
                                                    <h4 className="text-l font-semibold uppercase">
                                                        4. Send Notification
                                                        <span className="text-xs normal-case block">
                                                            Tick the appropriate box below and if “YES”
                                                            provide further detail requested.
                                                        </span>
                                                    </h4>
                                                </li>
                                                <div className="grid grid-cols-4 py-2 text-sm items-center">
                                                    <div className="col-span-3">
                                                        <span className="pr-3">4.1</span>
                                                        <label>
                                                            Do you want to send the “HAZMAT report template”
                                                            to Operator?
                                                        </label>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <input
                                                            id="Yes"
                                                            onClick={isSendNotificationHandleChange}
                                                            className="h-5 w-5"
                                                            type="radio"
                                                            value="Yes"
                                                            name="transportCommuters"
                                                        />
                                                        Yes
                                                        <input
                                                            id="No"
                                                            onClick={isSendNotificationHandleChange}
                                                            className="h-5 w-5"
                                                            type="radio"
                                                            value="No"
                                                            name="transportCommuters"
                                                        />{" "}
                                                        No
                                                    </div>
                                                </div>
                                                {isSendNotification && (
                                                    <div className="">
                                                        <div className="font-semibold">
                                                            <span className="pr-3">4.2</span>
                                                            <label>Email</label>
                                                        </div>
                                                        <input
                                                            value={Email}
                                                            disabled
                                                            type="text"
                                                            placeholder={Email}
                                                            className="h-8 px-4 ml-8 border rounded-md w-full"
                                                        />
                                                    </div>
                                                )}

                                                <div
                                                    style={{ marginBottom: "20px" }}
                                                    className="w-full xl:w-1/2"
                                                >
                                                    <label className="mb-3 block text-black dark:text-white">
                                                        Upload File
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="appointmentLetter"
                                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                                {isReportSent && (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="mt-4.5"></div>
                                                        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                                                            Hazmat Report Sent
                                                        </h2>
                                                        <div className="mt-4.5"></div>
                                                        <p>
                                                            Hazmat Report Template Has been succesfully sent
                                                            to operator. Operator will receive a
                                                            notification.
                                                        </p>
                                                        <div className="mt-4.5"></div>
                                                        <div className="mt-4.5"></div>
                                                        <p className="font-medium text-black dark:text-white italic">
                                                            Reference Number : {referenceNumber}
                                                        </p>
                                                    </div>
                                                )}
                                                {isReportSent && (
                                                    <div className="flex justify-end items-end mt-10 gap-10">
                                                        <button
                                                            onClick={handleClose}
                                                            className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500"
                                                        >
                                                            Done
                                                        </button>
                                                    </div>
                                                )}
                                            </ol>
                                        </div>
                                        {isSendNotification && !isReportSent && (
                                            <div className="flex justify-end items-end mt-10 gap-10">
                                                <button
                                                    onClick={handleReportSend}
                                                    className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                        {!isSendNotification && !isReportSent && (
                                            <div className="flex justify-end items-end mt-10 gap-10">
                                                <button
                                                    onClick={handleClose}
                                                    className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyOccurrencePage;
