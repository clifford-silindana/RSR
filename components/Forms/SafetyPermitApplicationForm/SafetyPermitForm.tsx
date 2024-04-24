"use client";
import React, { useEffect } from "react";
import { safetyPremitFormSteps } from "@/common/formFields";
import { FormProvider, useFormState } from "../FormContext/FormContext";
import { FormSteps } from "../FormContext/FormSteps";
import { FiMinusCircle } from "react-icons/fi";

function safetyPermitForm({
  application = null,
  isAdministrator,
  formMetadata,
  permitType,
  setPermitType = null,
}) {
  const closeForm = () => {
    setPermitType("");
  };
  const { onHandleGoTo, step, onHandleNext } = useFormState();
  const annualVolumesHelp = (
    <p>
      Commuters are defined as people transported to and from work on a daily
      basis. Tourists are defined as any people transported, excluding
      commuters. Dangerous goods are goods classified as such in the
      international dangerous goods classification. Please note that fuel and
      other dangerous liquids should be converted to tons for purposes of the
      submission. If it is provided in liter operators will pay a much higher
      permit fee as it will be interpreted as tons. The annual commuter/tourist,
      dangerous goods and general freight kilometre. This is arrived at by
      multiplying the running line distance covered with each of these
      commodities in a year by the total tonnage of each grouping transported on
      the running lines during a year. General freightt is goods such as cement,
      coal, maize, lime, wood etc. not classified as dangerous goods. Indicate
      each such commodity transported as well as the annual tonnage for each
      commodity. Total Length of Running Lines This provides values of the total
      kilometre length of Running lines per gauge width. Total Length of Sidings
      This provides values of the total kilometre length of Sidings per gauge
      width
    </p>
  );
  const railDescription = (
    <p>
      Please select the most appropriate reason/s for submitting this
      application. Operators need to inform the Regulator should they be aware –
      at the time of submitting a permit application or any time thereafter – of
      any other party objecting to them being issued with a safety permit. The
      mere existence of an objection does not imply that a permit will not be
      issued (or impacted on if already issued), but it will allow the Regulator
      to consider the objection. Objections by any interested or affected party
      should be reflected in the application.
    </p>
  );
  const descriptionArray = [
    isAdministrator?.isAdministrator
      ? "Please review the application below"
      : " Complete the form below and click next to save.",
    "Please select the most appropriate reason(s) for submitting this application.",
    annualVolumesHelp,
    railDescription,
  ];
  let refNumber = "";
  if (application) {
    let applicationData = JSON.parse(
      application.applicationJson == "" ? "{}" : application.applicationJson
    );
    refNumber = applicationData?.step1?.currentApplication?.referenceNumber;
  }
  debugger;

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
        <div className="bg-gray pb-4 pt-4  px-7 dark:border-strokedark">
          <div className="flex flex-row justify-between items-center">
            {isAdministrator?.isAdministrator ? (
              <h4 className="text-xl font-semibold text-black dark:text-white">
                {`Safety Permit Application: ${refNumber}`}
              </h4>
            ) : (
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Safety Permit Application Form
              </h4>
            )}
            {step > 1 || application ? (
              <>
                <p className="text-black dark:text-white">{refNumber}</p>
              </>
            ) : (
              <button
                onClick={() => closeForm()}
                className="text-primary  p-1 -mr-1"
              >
                <FiMinusCircle size={24} />
              </button>
            )}
          </div>
          <div className="flex justify-start flex-row items-center mt-2">
            <span className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </span>
            {isAdministrator?.isAdministrator ? (
              <h5 className="text-black text-sm font-medium">
                {descriptionArray[step]
                  ? descriptionArray[step]
                  : descriptionArray[0]}
              </h5>
            ) : (
              <h5 className="text-black text-sm font-medium">
                {descriptionArray[step]
                  ? descriptionArray[step]
                  : descriptionArray[0]}
              </h5>
            )}
          </div>
        </div>
        <div
          className={`${
            step == 1 ? "w-1/2 mx-auto" : "grid grid-cols-7 gap-5 p-7"
          }`}
        >
          <div className={`${step == 1 ? "hidden" : "col-span-2"}`}>
            <ol className=" ">
              {permitType != null &&
                safetyPremitFormSteps
                  .filter((t) => t.type == permitType?.toString())[0]
                  .fields.map((question, index: number) =>
                    step == 1 ? (
                      ""
                    ) : (
                      <li
                        key={index}
                        className={`p-2 ${
                          step === index + 1
                            ? "bg-logoorange text-white"
                            : "bg-gray"
                        } mb-2`}
                      >
                        {/* onClick={() => onHandleGoTo(index + 1)} */}
                        <button className="text-left">{question}</button>
                      </li>
                    )
                  )}
            </ol>
          </div>
          <div className={`${step == 1 ? "" : "col-span-5"}`}>
            <FormSteps
              application={application}
              isAdministrator={isAdministrator}
              formMetadata={formMetadata}
              permitType={permitType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default safetyPermitForm;
