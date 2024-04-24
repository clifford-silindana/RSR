import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";

import useOperator from "@/hooks/useOperator";
import api from "@/common/api";
import config from "@/common/config.json";
import useSession from "@/hooks/useSession";
import useFormSubmission from "@/hooks/useFormSubmission";
type TFormValues = {};

interface TFormData { }

interface NewObject {
  createdBy: string;
  createdDate: Date;
  operatorId: string;
  applicationTypeId: string;
  applicationJson: TFormData;
}

export const DeclarationForm = ({ application, isAdministrator }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { updateApplicationStatus } = useOperator();
  const { session, checkSession } = useSession();
  const {
    onHandleNext,
    onHandleBack,
    formData,
    setFormData,
    isComplete,
    setIsComplete,
  } = useFormState();
  const { register, handleSubmit, setValue } = useForm<TFormValues>({
    defaultValues: application ? application.step10 : formData.step10,
  });

  const [succesful, setSuccesfull] = useState(false);
  const [created, setCreated] = useState(session?.user?.name)
  const { submitting } = useFormSubmission();
  // @ts-ignore
  const ID: any = session?.user?.operatorId;


  useEffect(() => {
    const getUser = async () => {
      const userSession = await checkSession();
      setCreated(userSession?.user?.name);
    }
    if (created == null) {
      getUser();
    }

  }, []);

  const onHandleRemediate = () => {
    if (application) {
      application.step10.statusId = 37;
      submitting(application)
        .then(async (data: any) => {
          debugger;
          await updateApplicationStatus(application?.step1?.currentApplication?.applicationId, 37, application?.step10?.approvalComment); //
          setIsComplete(true);
        });
    }
  }

  const onHandleApprove = () => {
    if (application) {
      application.step10.statusId = 41;
      submitting(application)
        .then(async (data: any) => {
          debugger;
          await updateApplicationStatus(application?.step1?.currentApplication?.applicationId, 41, application?.step10?.approvalComment); //
          setIsComplete(true);
        });
    }
  }

  const onHandleFormSubmit = (data: TFormValues) => {
    if (isAdministrator?.isAdministrator) {
      //setFormData((prevFrormData) => ({ ...prevFrormData, step10: application.step10 }));
      ///APPROVE REMIDIATE SECTION

    }
    else {
      setFormData((prevFrormData) => ({ ...prevFrormData, step10: data }));
      if (application) {
        application.step10 = data;
        application.step10.date = new Date();
        application.step10.statusId = 39;
        submitting(application)
          .then(async (data: any) => {
            debugger;
            await updateApplicationStatus(application?.step1?.currentApplication?.applicationId, 39, "Updated by operator "); //
            setIsComplete(true);
          });
      }
      else {
        formData.step10 = data;
        formData.step10.date = new Date();
        formData.step10.statusId = 39;
        submitting(formData)
          .then(async (data: any) => {
            debugger;
            await updateApplicationStatus(formData?.step1?.currentApplication?.applicationId, 39, "Submitted by operator"); //
            setIsComplete(true);
          });
      }
    }
  };

  const refNumber = application?.step1?.currentApplication?.referenceNumber ? application?.step1?.currentApplication?.referenceNumber : formData?.step1?.currentApplication?.referenceNumber;
  return (
    <div>
      <div>
        <h1 className="text-center text-3xl">Declaration</h1>
      </div>

      {isComplete ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <div className="mt-4.5"></div>
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
              {isAdministrator?.isAdministrator ? "Application Reviewed" : "Application Submitted"}
            </h2>
            <div className="mt-4.5"></div>
            <p className="font-medium text-black dark:text-white">
              {isAdministrator?.isAdministrator ? "Application with reference number:" : "Application with reference number:"}
            </p>
            <p className="font-medium text-primary">{refNumber}</p>
            <p> {isAdministrator?.isAdministrator ? "Has been succesfully reviewed, the operator will be notified." : "Has been succesfully submitted, you will receive an email once the application has been reviewed."}</p>
            <div className="mt-4.5"></div>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit(onHandleFormSubmit)}
          className="h-[680px] relative">
          <div className="mt-4.5">
            <p>I, the undersigned, am duly authorized to sign this permit application.</p>
            <div className="font-semibold">
              <label htmlFor="legalName">Fullname: </label>
              <input
                disabled={true}
                type="text"
                placeholder="Fullname"
                value={application ? application?.step4?.nominatedManagerName : formData.step4.nominatedManagerName}
                className="border  w-full"
                {...register("fullName")}
              /> </div>
          </div>
          <div>
            <div className="font-semibold">
              <label htmlFor="legalName">Designation: </label>
              <input
                disabled={true}
                type="text"
                value="Nominated Manager"
                placeholder="Designation"
                className="border w-full"
                {...register("designation")}
              /> </div>
          </div>
          <div>
            <> {isAdministrator.isAdministrator && <div className="font-semibold">
              <label htmlFor="legalName">Date: </label>
              <input
                disabled
                type="text"
                placeholder="Date"
                className="border w-full"
                value={application?.step10?.date}
              /> </div>}
            </>

          </div>
          <div className="flex items-end mt-10 gap-3">
            {isAdministrator?.isAdministrator && application?.step10?.statusId == 39 &&
              <>
                Approval Comments
              </>}
          </div>
          <div className="flex justify-end items-end mt-10 gap-3 ">
            {isAdministrator?.isAdministrator && application?.step10?.statusId == 39 && 
              <>
                <textarea
                  className="px-4 py-1 border rounded-md w-full"
                  rows={6}
                  {...register("approvalComment")}
                ></textarea>
              </>}
          </div>
          <div className="flex justify-end items-end mt-10 gap-3 ">

            <button
              onClick={onHandleBack}
              className="h-11 px-6 bg-black text-white">
              Back
            </button>
            {isAdministrator?.isAdministrator ?
              application?.step10?.statusId == 39 &&
              <>
                <button onClick={onHandleApprove} className="h-11 px-6 bg-black text-white">
                  Approve Application
                </button>
                <button onClick={onHandleRemediate} className="h-11 px-6 bg-black text-white" >
                  Remediate Application
                </button>
              </> :
              <>
                <button className="h-11 px-6 bg-black text-white" >
                  Submit Application
                </button></>
            }
          </div>
        </form>
      )
      }
    </div >
  );
};