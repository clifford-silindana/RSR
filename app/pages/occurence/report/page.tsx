"use client";
import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import api from "@/common/api";
import config from "@/common/config.json";
import { injuryContext } from "./Injuries";
import { useRouter, useSearchParams } from "next/navigation";
import ImmediateOccurrencePage from "./immediateOccurrence";
import DailyOccurrencePage from "./dailyOccurrence";
import PermitPage from "./permit";
import HighlightedHeadingForm from "@/components/Forms/HighlightedHeadingForm";
import WagonPage from "./wagon";

const ReportOccurrencePage = () => {
  const [isReportSent, setIsReportSent] = useState(false);
  const [isDangerousGoods, setIsDangerousGoods] = useState(false);
  const [isSendNotification, setIsSendNotification] = useState(false);
  const [categories, setCategories] = useState([]);
  const data = useContext(injuryContext);
  const [formStep, setFormStep] = useState(1);
  const [immediateReportingActive, setImmediateReportingActive] =
    useState(null);
  const [dailyReportingActive, setDailyReportingActive] = useState(null);
  const [reportingFrequency, setReportingFrequency] = useState(null);
  const { session } = useSession();
  const [numberOfInjuries, setNumberOfInjuries] = useState(0);
  const [numberOfFatalInjuries, setNumberOfFatalInjuries] = useState(0);
  const [isInjuriesOpened, setIsInjuriesOpened] = useState(true);
  const [isFatalInjuriesOpened, setIsFatalInjuriesOpened] = useState(true);
  const operatorId = "82af69c0-808e-4289-a8af-ea6248897b6d";
  const [safetyPermitNumber, setSafetyPermitNumber] = useState(null);
  const [nameOfOperator, setNameOfOperator] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [Email, setEmail] = useState(null);
  const [streetName, setStreetName] = useState(null);
  const [streetNumber, setStreetNumber] = useState(null);
  const [unitNumber, setUnitNumber] = useState(null);
  const [complex, setComplex] = useState(null);
  const [suburb, setSuburb] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [dateOfOccurence, setDateOfOccurence] = useState(null);
  const [timeOfOccurence, setTimeOfOccurence] = useState(null);
  const [place, setPlace] = useState(null); //Not supposed to be in request body?
  const [province, setProvince] = useState(null); //Not supposed to be in request body?
  const [occurenceCategory, setOccurenceCategory] = useState(null);
  const [occurenceSubCategory, setOccurenceSubCategory] = useState(null); //Not supposed to be in request body?
  const [descriptionOfOccurence, setDescriptionOfOccurence] = useState(null);
  const [descriptionOfResponse, setDescriptionOfResponse] = useState(null); //Not supposed to be in request body?
  const [harzardousMaterial, setHazardousMaterial] = useState(null);
  const router = useRouter();
  const [selectOptions, setSelectOptions] = useState([]);

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

  const [wagons, setWagons] = useState({
    wagonType: "",
    name: "",
  });

  const addWagonType = (wagonType, name) => {
    setWagons({
      wagonType: wagonType,
      name: name,
    });
  };

  const operatorProfile = {
    operatorId: operatorId,
    legalName: nameOfOperator,
    tradeName: "string",
    registrationNumber: "string",
    permitNumber: safetyPermitNumber,
  };

  const address = {
    streetName: streetName,
    streetNumber: streetNumber,
    unitNumber: unitNumber,
    complex: complex,
    suburb: suburb,
    city: city,
    provinceId: 0,
    postalCode: postalCode,
  };

  const personReportingOccurrence = {
    name: "string",
    designation: "string",
    contactNumber: contactNumber,
  };

  const personFollowingUp = {
    name: "string",
    designation: "string",
    contactNumber: contactNumber,
  };
  const reportDailyOccurenceObj = {
    operatorId: operatorId,
    occurrenceDate: dateOfOccurence,
    place: place,
    provinceId: 1,
    occurrenceCategoryId: occurenceCategory,
    description: descriptionOfOccurence,
    responseTakenDescription: descriptionOfOccurence,
    hazardClassificationId: 1,
    immediateCause: descriptionOfOccurence,
    reportedByUserId: operatorId,
    reportedDate: dateOfOccurence,
  };

  const injuriesHandleChange = (event) => {
    console.log(JSON.stringify(reportDailyOccurenceObj));
    if (event.target.value == "Yes") {
      setIsInjuriesOpened(true);
    } else if (event.target.value == "No") {
      setIsInjuriesOpened(false);
    }
  };

  const inFataljuriesHandleChange = (event) => {
    if (event.target.value == "Yes") {
      setIsFatalInjuriesOpened(true);
    } else if (event.target.value == "No") {
      setIsFatalInjuriesOpened(false);
    }
  };

  const changeReportingFrequency = (e) => {
    setReportingFrequency(e.target.value);
  };

  // const handleSubmit = async () => {
  //     console.log(reportDailyOccurenceObj);
  //     try {
  //         const result = await api({
  //             method: "post",
  //             url: "https://localhost:44390/AddOccurrence?OperatorId=074A7D4C-0583-496E-8AE7-13F1EC1AD12F&ReferenceNumber=1&OccurrenceAddressId=1&Place=JHB&ProvinceId=1&OccurrenceCategoryId=79&OccurrenceSubCategoryId=1&OccurrenceDescription=" + descriptionOfOccurence + "&DescriptionOfResponseTaken=" + descriptionOfResponse + "&ComplianceStatusId=1&OccurrenceStatusId=89&AllocatedToUserId=0f4418f7-90f8-46c8-94af-5af0e31f6d68&ImmediateCause=Derail&HazardClassificationId=1",
  //             headers: {
  //                 accept: "application/json",
  //                 "Content-Type": "application/json",
  //             },
  //             data: JSON.stringify(reportDailyOccurenceObj),
  //         });

  //     } catch (error) {
  //         // setLoading(false);
  //     }

  //     //router.push("/occurence");
  // };

  const GetCategories = async () => {
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
      //router.push("@/components/Occurencies/OccurenceManagementDashboard");
    } catch (error) {
      // setLoading(false);
    }
  };

  const GetOperatorDetails = async () => {
    try {
      const result = await api({
        method: "get",
        url:
          "https://niims-dev.azurewebsites.net/Operator/GetOperatorById?operatorID=" +
          operatorId,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(result.data);
      let currentPermit = result.data.currentPermit.permitNumber;
      let operatorName = result.data.legalName;
      let tel = result.data.contacts[0].landline;
      let email = result.data.contacts[0].email;
      setSafetyPermitNumber(currentPermit);
      setNameOfOperator(operatorName);
      setContactNumber(tel);
      setEmail(email);
      //setCategories(result.data);
      console.log(data);
      // setLoading(false);
      // setSuccessful(true);
      //router.push("@/components/Occurencies/OccurenceManagementDashboard");
    } catch (error) {
      // setLoading(false);
    }
  };
  operatorId;

  const handleNext = () => {
    setFormStep(formStep + 1);
  };
  const check = () => {
    alert(wagons);
    console.log(wagons);
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

  const getSelectOptions = async () => {
    try {
      const result = await api({
        method: "GET",
        // url: `${config.JSON_PLACEHOLDER_URL}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = result.data;
      setSelectOptions(data);
    } catch (error) {
      // setLoading(false);
    }
  };

  useEffect(() => {
    /*
    getSelectOptions();
    GetCategories();
    GetOperatorDetails();
*/
    if (reportingFrequency === "Immediate") {
      setImmediateReportingActive(true);
      setDailyReportingActive(false);
    } else if (reportingFrequency === "Daily") {
      setImmediateReportingActive(false);
      setDailyReportingActive(true);
    } else {
      setImmediateReportingActive(false);
      setDailyReportingActive(false);
    }
  }, [reportingFrequency]);
  const PERMITYPES = [
    { value: 1, name: "Immediate" },
    { value: 2, name: "Daily" },
  ];
  const onSubmit = (e) => {
    setReportingFrequency(e);
  };

  // await loginRequiredServe();
  return (
    <div className="mt-9">
      {!immediateReportingActive && !dailyReportingActive && (
        <HighlightedHeadingForm
          permitTypes={PERMITYPES}
          title="Report Occurence"
          description="Select Reporting Frequency."
          onSubmit={onSubmit}
        />
      )}
      {immediateReportingActive && (
        <div>
          <WagonPage addWagonType={addWagonType}/>
          <ImmediateOccurrencePage />
        </div>
      )}

      {dailyReportingActive && (
        <div>
          <DailyOccurrencePage />
        </div>
      )}
    </div>
  );
};

export default ReportOccurrencePage;
