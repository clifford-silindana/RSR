"use client";
import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import api from "@/common/api";
import config from "@/common/config.json";
import { injuryContext } from "./Injuries";
import { useRouter, useSearchParams } from "next/navigation";
import PlaceMap from "@/components/Maps/PlaceMap";
import PermitForm from "@/components/Forms/PermitForm";
import OccurenceDetailsForm from "@/components/Forms/OccurenceDetailsForm";
import HazardClassificationForm from "@/components/Forms/HazardClassificationForm";
import SendNotificationForm from "@/components/Forms/SendNotificationForm";


///utilities imports
import { handleSubmit, handleSubCategories, removeDuplicates, GetMetaData, getOperators, GetOperatorList, GetOperatorDetails, handleNext, handleBack, handleReportSend, handleClose  } from "@/components/Forms/formutilities";

const ImmediateOccurrencePage = () => {
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
    const [hazardClassificationId, setHazardClassificationId] = useState("0");
    const data = useContext(injuryContext);
    const [formStep, setFormStep] = useState(1);
    const { session } = useSession();
    const [operatorId, setOperatorId] = useState(null);
    const [safetyPermitNumber, setSafetyPermitNumber] = useState(null);
    const [nameOfOperator, setNameOfOperator] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [Email, setEmail] = useState(null);
    const [dateOfOccurence, setDateOfOccurence] = useState(null);
    const [timeOfOccurence, setTimeOfOccurence] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [provinceID, setProvinceID] = useState(null);
    const [place, setPlace] = useState(null);        //Not supposed to be in request body?                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    const [occurenceCategory, setOccurenceCategory] = useState("0");
    const [descriptionOfOccurence, setDescriptionOfOccurence] = useState(null);
    const [descriptionOfResponseTakenOccurence, setDescriptionOfResponseTakenOccurence] = useState(null);
    const [immediateCause, setImmediateCause] = useState(null); //Not supposed to be in request body? 
    const router = useRouter();

    const isDangerousGooodsHandleChange = (event) => {
        if (event.target.value == "Yes") {
            setIsDangerousGoods(true);
        }
        else if (event.target.value == "No") {
            setIsDangerousGoods(false);
        }
    };
    const isSendNotificationHandleChange = (event) => {
        if (event.target.value == "Yes") {
            setIsSendNotification(true);
        }
        else if (event.target.value == "No") {
            setIsSendNotification(false);
        }
    };

    const operatorObj = {
        "pageNumber": 1,
        "pageSize": 100
    }
    const reportDailyOccurenceObj = {
        operatorId: operatorId,
        occurrenceDate: dateOfOccurence,
        place: place,
        provinceId: provinceID,
        occurrenceCategoryId: occurenceCategory,
        description: descriptionOfOccurence,
        responseTakenDescription: descriptionOfResponseTakenOccurence,
        hazardClassificationId: hazardClassificationId,
        immediateCause: immediateCause,
        reportedByUserId: operatorId,
        reportedDate: `${dateOfOccurence} ${timeOfOccurence}`
    };

    useEffect(() => {
        GetOperatorList();
        GetMetaData();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-9 ">
            <div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                    <div className="bg-gray pb-4 px-7 dark:border-strokedark">
                        <div className="flex flex-row justify-between items-center">
                            <h4 className="text-xl font-semibold text-black dark:text-white">Immediate Occurrence Form</h4>
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
                                            <li className="p-2 bg-gray mb-2"><button className="text-left">1. Permit Details</button></li>
                                        )}


                                        {formStep === 2 && (
                                            <li className="p-2 bg-logoorange text-white mb-2"><button className="text-left">2. Occurrence Details</button></li>
                                        )}

                                        {formStep !== 2 && (
                                            <li className="p-2 bg-gray mb-2"><button className="text-left">2. Occurrence Details</button></li>
                                        )}


                                        {formStep === 3 && (
                                            <li className="p-2 bg-logoorange text-white mb-2"><button className="text-left">3. Hazard Classification</button></li>
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

                        <PermitForm
                            isError={isError}
                            errorMessage={errorMessage}
                            formStep={formStep}
                            operators={operators}
                            safetyPermitNumber={safetyPermitNumber}
                            contactNumber={contactNumber}
                            GetOperatorDetails={GetOperatorDetails}
                            handleNext={handleNext}
                        />

                        <OccurenceDetailsForm
                            formStep={formStep}
                            dateOfOccurrence={dateOfOccurence}
                            timeOfOccurrence={timeOfOccurence}
                            provinces={provinces}
                            place={place}
                            distinctCategories={distinctCategories}
                            subCategories={subCategories}
                            descriptionOfOccurrence={descriptionOfOccurence}
                            descriptionOfResponseTakenOccurrence={descriptionOfResponseTakenOccurence}
                            categories={categories}
                            immediateCause={immediateCause}
                            setDateOfOccurrence={setDateOfOccurence}
                            setTimeOfOccurrence={setTimeOfOccurence}
                            setProvinceID={setProvinceID}
                            setPlace={setPlace}
                            handleSubCategories={handleSubCategories}
                            setCategoryId={setCategoryId}
                            setDescriptionOfOccurrence={setDescriptionOfOccurence}
                            setDescriptionOfResponseTakenOccurrence={setDescriptionOfResponseTakenOccurence}
                            setHazardClassificationId={setHazardClassificationId}
                            setImmediateCause={setImmediateCause}
                            handleNext={handleNext}
                            handleBack={handleBack}
                        />

                        <HazardClassificationForm
                            formStep={formStep}
                            isDangerousGoods={isDangerousGoods}
                            isDangerousGooodsHandleChange={isDangerousGooodsHandleChange}
                            handleBack={handleBack}
                            handleSubmit={handleSubmit}
                        />

                        <SendNotificationForm
                            formStep={formStep}
                            isSendNotification={isSendNotification}
                            isSendNotificationHandleChange={isSendNotificationHandleChange}
                            isReportSent={isReportSent}
                            Email={Email}
                            handleClose={handleClose}
                            handleReportSend={handleReportSend}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImmediateOccurrencePage;
