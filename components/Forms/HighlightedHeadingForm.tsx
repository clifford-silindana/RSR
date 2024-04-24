import { log } from "console";
import React, { useState } from "react";

interface FormElement {
  type: "text" | "select" | "checkbox" | "number" | "file";
  label: string;
  name: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

interface DynamicFormProps {
  permitTypes: any;
  title: string;
  description: string;
  onSubmit: (formData: Record<string, any>) => void;
}

const HighlightedHeadingForm: React.FC<DynamicFormProps> = ({
  permitTypes,
  title,
  description,
  onSubmit,
}) => {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedForm = Object.fromEntries(formData);
    onSubmit(selectedForm);
  };

  const handPermitChange = (evt: any) => {
    onSubmit(evt.target.value);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
      <div className="bg-gray py-4 px-7 dark:border-strokedark flex justify-between items-center">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
          <div className="flex justify-start flex-row items-center mt-2">
            <span className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </span>
            <h5 className="text-black text-sm font-medium">{description}</h5>
          </div>
        </div>
        <div>
          <select
            id="permitType"
            name="permitType"
            className="p-3 border border-logoorange rounded-sm"
            onChange={handPermitChange}>
            <option disabled selected>
              Select Report Frequency
            </option>
            {permitTypes &&
              permitTypes.map((permit) => (
                <option key={permit.id} value={permit.id}>
                  {permit.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HighlightedHeadingForm;