"use client";
import { useState } from "react";
import ICheckboxProps from "@/components/Checkboxes/ICheckboxProps";

const CheckboxOne = ({checked, title,onChange}:ICheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex cursor-pointer select-none items-center text-black"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
                //onChange(!isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && "bg-primary"}`}
            ></span>
          </div>
        </div>
          {title}
      </label>
    </div>
  );
};

export default CheckboxOne;
