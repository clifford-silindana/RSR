"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";

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

export const CategoryOfRailOperationsApplied = () => {
  const { onHandleNext, setFormData, onHandleBack, formData, step } =
    useFormState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<TFormValues>({
    defaultValues: formData.step4,
  });

  const onHandleFormSubmit = (data: any) => {
    setFormData((prevFrormData) => ({ ...prevFrormData, step4: data }));
    onHandleNext();
  };

  return (
    <div>
      <form className="p-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1 mb-10">
          <ol className="">
            <li>
              <h4 className="text-l font-semibold uppercase mb-5">
                4. Categories of rail operations
                <span className="text-xs normal-case block">
                  Tick the appropriate box/boxes below
                </span>
              </h4>
            </li>
            <div>
              <div className="flex gap-3 py-2 text-sm items-center">
                <input
                  {...register("networkOperator")}
                  type="checkbox"
                  name="networkOperator"
                  id="existingGroup"
                  className="h-3 w-3"
                />
                <div className="">
                  <span className="pr-3">4.1</span>
                  <label htmlFor="">Network useOperator</label>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-3 py-2 text-sm items-center">
                <input
                  {...register("trainOperator")}
                  type="checkbox"
                  name="trainOperator"
                  id="existingGroup"
                  className="h-3 w-3"
                />
                <div className="col-span-4">
                  <span className="pr-3">4.2</span>
                  <label htmlFor="">Train useOperator</label>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-3 py-2 text-sm items-center">
                <input
                  {...register("stationOperator")}
                  type="checkbox"
                  name="stationOperator"
                  id="existingGroup"
                  className="h-3 w-3"
                />
                <div className="col-span-4">
                  <span className="pr-3">4.3</span>
                  <label htmlFor="">Station operator</label>
                </div>
              </div>
            </div>
          </ol>
        </div>
        <div className="flex justify-end items-end mt-10 gap-10">
          <button
            onClick={onHandleBack}
            className="h-11 px-6 bg-black text-white">
            Back
          </button>
          <button className="h-11 px-6 bg-black text-white">Next</button>
        </div>
      </form>
    </div>
  );
};