"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";

import useOperator from "@/hooks/useOperator";
import useSession from "@/hooks/useSession";
import router from "next/router";
import useFormSubmission from "@/hooks/useFormSubmission";

type TFormValues = {
  currentApplication: any;
  permitNumber: string;
  validUntil: string;
  annualVolumes: string;
  newAnnualVolumes: string;
};

export const PermitInfo = ({
  application = null,
  permitType,
  permitData = null,
}) => {
  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    values: permitData
      ? permitData
      : formData.step1
      ? formData.step1
      : application.step1,
  });

  const { submitting } = useFormSubmission();
  const { generateApplicationReference } = useOperator();
  const { session } = useSession();

  const onHandleFormSubmit = async (data: TFormValues) => {
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
      setFormData((prevFrormData) => ({
        ...prevFrormData,
        step1: application.step1,
      }));
      onHandleNext();
    } else {
      const newApplication = await generateApplicationReference(
        applicationData
      );
      data.currentApplication = newApplication;

      setFormData((prevFrormData) => ({ ...prevFrormData, step1: data }));
      if (formData?.step1 == null) {
        formData.step1 = data;
      }

      console.log("formData", formData);

      submitting(formData).then((data: any) => {
        onHandleNext();
      });
    }

    /*
    if (application) {
      //data.currentApplication = application;
      setFormData((prevFrormData) => ({
        ...prevFrormData,
        //step1: application.step1,
        step1: {
          reasonForApplying: "needTempSafetyPermit",
          permitNumber: "2924/02/44",
          permitExpiryDate: "2024-04-03",
          currentApplication: {
            applicationId: "ae43c16f-247e-4a5a-8d27-9ed7b0d4ea91",
            referenceNumber: "REF485417",
          },
        },
      }));
      onHandleNext();
    }
    // send data
    else {
      const newApplication = await generateApplicationReference(
        applicationData
      );
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
    */
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onHandleFormSubmit)} className="pb-6 px-6">
        <div className="flex flex-col gap-1">
          <ol className="">
            <li>
              <h4 className="text-l font-semibold uppercase">
                1. Current Permit Information
              </h4>
            </li>
            <div>
              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">1.1</span>
                  <label htmlFor="permitNumber">Permit number</label>
                </div>
                <div className="mr-5">
                  <input
                    id="permitNumber"
                    type="text"
                    
                    placeholder="Permit Number"
                    className="h-8 px-4 border rounded-md w-full"
                    {...register("permitNumber")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">1.2</span>
                  <label htmlFor="validUntil">Permit expiry date</label>
                </div>
                <div className="mr-5">
                  <input
                    id="validUntil"
                    type="text"
                    
                    placeholder="Permit Expiry Date"
                    className="h-8 px-4 border rounded-md w-full"
                    {...register("validUntil")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">1.3</span>
                  <label htmlFor="annualVolumes">Current annual volumes</label>
                </div>
                <div className="mr-5">
                  <input
                    id="annualVolumes"
                    type="text"
                    placeholder="Current annual volumes"
                    className="h-8 px-4 border rounded-md w-full"
                    {...register("annualVolumes")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">1.4</span>
                  <label htmlFor="newAnnualVolumes">New annual volumes</label>
                </div>
                <div className="mr-5">
                  <input
                    id="newAnnualVolumes"
                    type="text"
                    placeholder="New annual volumes"
                    className="h-8 px-4 border rounded-md w-full"
                    {...register("newAnnualVolumes")}
                  />
                </div>
              </div>
            </div>
          </ol>
        </div>
        <div className="flex justify-end items-end mt-10 gap-10">
          <button
            type="submit"
            className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
