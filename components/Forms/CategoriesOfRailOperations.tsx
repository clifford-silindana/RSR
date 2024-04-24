"use client";
import React, { FormEvent, useState } from "react";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import useOperator from "@/hooks/useOperator";
import { useSearchParams } from "next/navigation";

interface CategoriesOfRailOperationsFormProps {
  onDataSubmit: (data: FormData) => void;
  formStep: number;
  nextFormStep: () => void;
  prevFormStep: () => void;
  categories: any[];
  adminFormData?: any;
}

interface CategoriesFormData {
  networkOperator: boolean;
  trainOperator: boolean;
  stationOperator: boolean;
}

const CategoriesOfRailOperations: React.FC<
  CategoriesOfRailOperationsFormProps
> = ({
  formStep,
  prevFormStep,
  nextFormStep,
  onDataSubmit,
  categories,
  adminFormData,
}) => {
  let [formData, setFormData] = useState<CategoriesFormData>({
    networkOperator: false,
    trainOperator: false,
    stationOperator: false,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    debugger;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Invoke the callback with the form data
    onDataSubmit(formData);
    nextFormStep();
    scrollToTop();
  };
  const searchParams = useSearchParams();
  const applicationStatus = searchParams.get("status");

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Categories of rail operations applied for
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5.5 p-6.5">
          <h3 className="font-small text-black dark:text-white">
            Tick the appropriate box/boxes below
          </h3>
          {/* Checkboxes for network operator, train operator, and station operator */}
          {categories.map((category) => {
            return (
              <div className="mb-1">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name={category.name}
                    value={category.id}
                    checked={adminFormData}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <span className="ml-2 font-medium text-black dark:text-white">
                    {category.name}
                  </span>
                </label>
              </div>
            );
          })}

          <div className="flex justify-end">
            <button
              onClick={prevFormStep}
              className="rounded bg-strokedark p-3 font-medium text-gray mr-4.5"
            >
              &laquo; Back
            </button>
            {
              <>
                {adminFormData ? (
                  <button
                    //onClick={nextFormStep}
                    type="submit"
                    className={
                      applicationStatus === "Approved"
                        ? "rounded bg-gray p-3 font-medium text-white"
                        : "rounded bg-primary p-3 font-medium text-gray"
                    }
                    disabled={applicationStatus === "Approved"}
                  >
                    Approve Application &raquo;
                  </button>
                ) : (
                  <button
                    //onClick={nextFormStep}
                    type="submit"
                    className="rounded bg-primary p-3 font-medium text-gray"
                  >
                    Submit Application &raquo;
                  </button>
                )}
              </>
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoriesOfRailOperations;