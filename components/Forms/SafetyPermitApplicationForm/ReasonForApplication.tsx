"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";

import useOperator from "@/hooks/useOperator";
import useSession from "@/hooks/useSession";
import router from "next/router";
import useFormSubmission from "@/hooks/useFormSubmission";

type TFormValues = {
  existingGroup: boolean;
  needSafetyPermit: boolean;
  constructionTrainPermit: boolean;
  testAndCommissioningPermit: boolean;
  firstTimeApplicants: boolean;
  companyNameChanged: boolean;
  legalentitychange: boolean;
  takingOverAnEntity: boolean;
  permitNumber: string;
  permitExpiryDate: string;
  reasonForApplying: string;
};

export const ReasonForApplication = ({ application = null, permitType }) => {
  const { onHandleNext, setFormData, formData, step } = useFormState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<TFormValues>({
    defaultValues: application ? application.step1 : formData.step1,
  });

  const { submitting } = useFormSubmission();

  const reasonsWithInputs = [
    "existingGroup",
    "needSafetyPermit",
    "testAndCommissioningPermit",
    "constructionTrainPermit",
    "needTempSafetyPermit"
  ];


  const currentReasonForApplying = watch("reasonForApplying");
  const { generateApplicationReference } = useOperator();
  const { session } = useSession();

  const onHandleFormSubmit = async (data: any) => {
    debugger;
    const applicationData: any = {
      createdBy: session?.user?.userId,
      createdDate: new Date(),
      modifiedBy: session?.user?.userId,
      modifiedDate: new Date(),
      operatorId: session?.user?.operatorId,
      applicationTypeId: permitType,
    };

    if (application) {
      //data.currentApplication = application;
      setFormData((prevFrormData) => ({ ...prevFrormData, step1: application.step1 }));
      onHandleNext();
    }
    // send data
    else {
      const newApplication = await generateApplicationReference(applicationData);
      data.currentApplication = newApplication;
      setFormData((prevFrormData) => ({ ...prevFrormData, step1: data }));
      if (formData?.step1 == null) {
        formData.step1 = data;
      }
      submitting(formData).then((data: any) => {
        onHandleNext();
      });
    }
    //onHandleNext();
    //router.push(`/safetyPermit/application?id=${application.applicationId}`);
  };

  let existingGroupQuestion = permitType == 22 ? "Current holder of either a Group A, B or C safety permit guided by the RSR to apply for a temporary safety permit" : "Existing Group A, B or C safety permit to be renewed";
  let tempPermitReason = permitType == 22 ? "Currently active operator – first time a temporary safety permit is applied for?" : "Temporary Safety Permit holder needing a safety permit";
  let existingCompany = permitType == 22 ? "are you applying because you have re-registered a new entity or have taken over an entity in possession of a current safety permit?" : "New permit needed due to company name change";
  switch (permitType) {
    case "23":
      existingGroupQuestion = "Current holder of either a Group A, B or C permit guided by the RSR to apply for a construction safety permit";
      tempPermitReason = "Never operated before – construction rail facilities to be operated in future";
      break;
    case "24":
      existingGroupQuestion = "Current holder of either a Group A, B or C permit guided by RSR to apply for a test and commission safety permit?";
      tempPermitReason = "Never operated before – test and commissioning new rail facilities to be operated in future?";
      break;
    default:
      break;
  }

  return (
    <div>
      <form className="p-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1 mb-10">
          <ol className="">
            <li>
              <h4 className="text-xl font-semibold uppercase mb-5">
                Reason For application
                <span className="text-xs normal-case block">
                  Tick the appropriate box below
                </span>
              </h4>
            </li>
            <div>
              <div className="grid grid-cols-3 gap-10 py-2 text-sm items-center">
                <div className="col-span-2">
                  <span className="pr-3">1.1</span>
                  <label htmlFor="">
                    {existingGroupQuestion}
                  </label>
                </div>
                <div className="flex justify-end">
                  {!application && errors.reasonForApplying && (
                    <p className="text-danger">{`${errors.reasonForApplying.message}`}</p>
                  )}
                  {
                    application ?
                      <input
                        {...register("reasonForApplying")}
                        required={!application}
                        disabled={application}
                        checked={application?.step1?.reasonForApplying == "existingGroup"}
                        type="radio"
                        name="reasonForApplying"
                        id="existingGroup"
                        value="existingGroup"
                        className="h-5 w-5"
                      /> : <input
                        {...register("reasonForApplying", !application && {
                          required: "State a reason for the application applying",
                        })}
                        type="radio"
                        name="reasonForApplying"
                        id="existingGroup"
                        value="existingGroup"
                        className="h-5 w-5"
                      />
                  }
                </div>
              </div>
              <div className="grid grid-cols-4 gap-10 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">1.2</span>
                  <label htmlFor="">
                    {tempPermitReason}
                  </label>
                </div>
                <div className="flex justify-end ">
                  {
                    application ?
                      <input
                        {...register("reasonForApplying")}
                        disabled={application}
                        required={!application}
                        checked={application?.step1?.reasonForApplying === "needTempSafetyPermit"}
                        type="radio"
                        name="reasonForApplying"
                        id="needTempSafetyPermit"
                        value="needTempSafetyPermit"
                        className="h-5 w-5"
                      /> :
                      <input
                        {...register("reasonForApplying", {
                          required:
                            "State a reason for the application the application ",
                        })}
                        type="radio"
                        name="reasonForApplying"
                        id="needTempSafetyPermit"
                        value="needTempSafetyPermit"
                        className="h-5 w-5"
                      />
                  }
                </div>
              </div>
              {permitType == 21 &&
                <>
                  <div className="grid grid-cols-4 gap-10 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">1.3</span>
                      <label htmlFor="">
                        Construction Train Safety Permit holder needing a safety
                        permit
                      </label>
                    </div>
                    <div className="flex justify-end ">
                      {
                        application ?
                          <input
                            {...register("reasonForApplying", {
                              required: "State a reason for the application ",
                            })}
                            disabled={application}
                            required={!application}
                            checked={application?.step1?.reasonForApplying === "testAndCommissioningPermit"}
                            type="radio"
                            name="reasonForApplying"
                            id="testAndCommissioningPermit"
                            value="testAndCommissioningPermit"
                            className="h-5 w-5"
                          /> : <input
                            {...register("reasonForApplying", {
                              required: "State a reason for the application ",
                            })}
                            type="radio"
                            name="reasonForApplying"
                            id="testAndCommissioningPermit"
                            value="testAndCommissioningPermit"
                            className="h-5 w-5"
                          />}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-10 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">1.4</span>
                      <label htmlFor="">
                        Test & Commissioning Train Safety Permit holder needing a
                        safety permit
                      </label>
                    </div>
                    <div className="flex justify-end ">
                      {application ?

                        <input
                          {...register("reasonForApplying", !application && {
                            required: "State a reason for the application ",
                          })}
                          disabled={application}
                          required={!application}
                          checked={application?.step1?.reasonForApplying === "constructionTrainPermit"}
                          type="radio"
                          name="reasonForApplying"
                          id="constructionTrainPermit"
                          value="constructionTrainPermit"
                          className="h-5 w-5"
                        /> :
                        <input
                          {...register("reasonForApplying", {
                            required: "State a reason for the application ",
                          })}
                          type="radio"
                          name="reasonForApplying"
                          id="constructionTrainPermit"
                          value="constructionTrainPermit"
                          className="h-5 w-5"
                        />
                      }
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-10 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">1.5</span>
                      <label htmlFor="">
                        New application – first time a safety permit is applied for
                      </label>
                    </div>
                    <div className="flex justify-end ">
                      {application ?
                        <input
                          {...register("reasonForApplying", !application && {
                            required: "State a reason for the application ",
                          })}
                          type="radio"
                          disabled={application}
                          checked={application?.step1?.reasonForApplying === "first Time Applicants" || application}
                          name="reasonForApplying"
                          id="firstTimeApplicants"
                          value="first Time Applicants"
                          className="h-5 w-5"
                        /> :
                        <input
                          {...register("reasonForApplying", {
                            required: "State a reason for the application ",
                          })}
                          type="radio"
                          name="reasonForApplying"
                          id="firstTimeApplicants"
                          value="first Time Applicants"
                          className="h-5 w-5"
                        />}
                    </div>
                  </div>
                </>
              }
              <div className="grid grid-cols-4 gap-10 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">1.6</span>
                  <label htmlFor="">
                    {existingCompany}
                  </label>
                </div>
                <div className="flex justify-end ">
                  {application ?
                    <input
                      {...register("reasonForApplying", !application && {
                        required: "State a reason for the application ",
                      })}
                      type="radio"
                      disabled={application}
                      required={!application}
                      name="reasonForApplying"
                      checked={application?.step1?.reasonForApplying == "company Name Changed"}
                      id="companyNameChanged"
                      value="company Name Changed"
                      className="h-5 w-5"
                    /> :
                    <input
                      {...register("reasonForApplying", {
                        required: "State a reason for the application ",
                      })}
                      type="radio"
                      name="reasonForApplying"
                      id="companyNameChanged"
                      value="company Name Changed"
                      className="h-5 w-5"
                    />}
                </div>
              </div>
              {permitType != 22 &&
                <>
                  <div className="grid grid-cols-4 gap-10 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">1.7</span>
                      <label htmlFor="">
                        New permit needed due to legal entity change
                      </label>
                    </div>
                    <div className="flex justify-end ">
                      {application ?
                        <input
                          {...register("reasonForApplying", !application && {
                            required: "State a reason for the application ",
                          })}
                          disabled={application}
                          required={!application}
                          type="radio"
                          name="reasonForApplying"
                          id="legalentitychange"
                          value="legal entity change"
                          className="h-5 w-5"
                        /> :
                        <input
                          {...register("reasonForApplying", {
                            required: "State a reason for the application ",
                          })}
                          type="radio"
                          name="reasonForApplying"
                          id="legalentitychange"
                          value="legal entity change"
                          className="h-5 w-5"
                        />
                      }
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-10 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">1.8</span>
                      <label htmlFor="">
                        New permit needed – taking over an entity with a current
                        safety permit
                      </label>
                    </div>
                    <div className="flex justify-end ">
                      {application ?
                        <input
                          {...register("reasonForApplying", !application && {
                            required: "State a reason for the application ",
                          })}
                          type="radio"
                          checked={application?.step1?.reasonForApplying == "taking Over AnEntity"}
                          disabled={application}
                          required={!application}
                          name="reasonForApplying"
                          id="takingOverAnEntity"
                          value="taking Over AnEntity"
                          className="h-5 w-5"
                        /> :
                        <input
                          {...register("reasonForApplying", !application && {
                            required: "State a reason for the application ",
                          })}
                          type="radio"
                          disabled={application}
                          required={!application}
                          name="reasonForApplying"
                          id="takingOverAnEntity"
                          value="taking Over AnEntity"
                          className="h-5 w-5"
                        />}
                    </div>
                  </div>
                </>
              }
              {(reasonsWithInputs.includes(currentReasonForApplying) || permitType == 22) && (
                <div className="bg-slate-100 px-5">
                  <div className="grid grid-cols-2 gap-5 py-2 text-sm items-center">
                    <div className="">
                      <span className="pr-3">1.9</span>
                      <label htmlFor="permitNumber">
                        Current permit number
                      </label>
                    </div>
                    <div className="">
                      {application ?
                        <>
                          <input
                            id="permitNumber"
                            disabled={application}
                            required={!application}
                            type="text"
                            placeholder="Permit Number"
                            className="h-8 px-4 border rounded-md w-full"
                            {...register("permitNumber")}
                          /> </> :
                        <>
                          <input
                            id="permitNumber"
                            type="text"
                            placeholder="Permit Number"
                            className="h-8 px-4 border rounded-md w-full"
                            {...register("permitNumber", {
                              required: "Permit number is required.",
                            })}
                          />
                          {errors.permitNumber && (
                            <p className="text-danger">{`${errors.permitNumber.message}`}</p>
                          )}</>
                      }
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 py-2 text-sm items-center">
                    <div className="">
                      <span className="pr-3">1.10</span>
                      <label htmlFor="permitExpiryDate">
                        Current permit expiry date
                      </label>
                    </div>
                    <div className="">
                      <input
                        id="permitExpiryDate"
                        type="date"
                        disabled={application}
                        required={!application}
                        placeholder="Permit Number"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("permitExpiryDate", {
                          required: "Please provide expity date",
                        })}
                      />
                      {errors.permitExpiryDate && (
                        <p className="text-danger">{`${errors.permitExpiryDate.message}`}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ol>
        </div>
        <div className="flex justify-center">
          {
            !application ?
              <button
                className="h-11 w-full px-6 bg-black text-xl text-white hover:bg-logoorange">
                Start Application
              </button>
              : <button
                type="button"
                onClick={onHandleFormSubmit}
                className="h-11 w-full px-6 bg-black text-xl text-white hover:bg-logoorange">
                Next
              </button>
          }
        </div>
      </form>
    </div>
  );
};