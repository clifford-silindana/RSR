"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import api from "@/common/api";
import config from "@/common/config.json";



const HazmatPage = () => {
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
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Are there any Dangerous Goods (Hazardous Material - HAZMAT) involved during the
                    Occurrence?
                </label>
                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    onChange={(e) => { setHazardousMaterial(e.target.value) }}>
                    <option value="Hazardous YES">Yes</option>
                    <option value="Hazardous NO">No</option>
                </select>
            </div>

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    If there were any Dangerous Goods (Hazardous Material - HAZMAT) involved during the occurrence, the form RSR/OPS/253/3 must be completed within 7 days from the time of the occurrence reporting
                </label>
            </div>
            {/* <div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                    onClick={handleSubmit}>
                    Submit
                </button>
            </div> */}
        </div>
    );
};


export default HazmatPage;
