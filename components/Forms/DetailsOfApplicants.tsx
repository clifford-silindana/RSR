"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { IOperatorApplication } from "@/models/IOperatorApplication";


export interface FormData {
    legalName: string;
    tradeName: string;
    registrationNumber: string;
    registrationDocument: File | any;
    tradeNameLetter: File | any;
    safetyManagementReport: File | any;
    companyTelephone: string;
    businessSector: number
}

interface DetailsOfApplicantsFormProps {
    onDataSubmit: (data: FormData) => void;
    formStep: number;
    nextFormStep: () => void;
    businessSectors: any[]
    adminFormData?: any
}

const DetailsOfApplicants: React.FC<DetailsOfApplicantsFormProps> = ({
    formStep,
    nextFormStep,
    onDataSubmit,
    businessSectors,
    adminFormData
}) => {

    const storedCompanyDetails: string | null = adminFormData ? null : localStorage.getItem('operatorApplication_step0');
    let formData0: IOperatorApplication = storedCompanyDetails != null ? JSON.parse(storedCompanyDetails) : {
        registrationDocument: null,
        tradeNameLetter: null,
        safetyManagementReport: null,
        legalName: adminFormData ? adminFormData.legalName : '',
        tradeName: adminFormData ? adminFormData.tradeName : '',
        registrationNumber: adminFormData ? adminFormData.registrationNumber : '',
        businessSector: adminFormData ? adminFormData?.sectorId : null,
        companyTelephone: adminFormData ? adminFormData.companyTelephone : ''
    };

    const [formData, setFormData] = useState<FormData>({
        ...formData0,
    });


    debugger;
    const handleInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value, type } = e.target;

        // Handle file input separately

        const inputValue = type === 'file' ? (e.target as HTMLInputElement).files?.[0] : value;


        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Invoke the callback with the form data
        onDataSubmit(formData);
        // progress
        nextFormStep();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    console.log("first form data", adminFormData);
    return (
      <div
        className={
          formStep === 0
            ? "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            : "hidden"
        }
      >
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Company Details
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {/* Input for Legal Name */}
            {/* Input for Trade Name */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Legal Name (Name of Operator)
                </label>
                <input
                  type="text"
                  name="legalName"
                  placeholder="Legal Name"
                  disabled={adminFormData ? true : false}
                  value={
                    adminFormData
                      ? adminFormData?.legalName
                      : formData.legalName
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Trade Name (Optional)
                </label>
                <input
                  type="text"
                  name="tradeName"
                  placeholder="Trade Name"
                  disabled={adminFormData ? true : false}
                  value={
                    adminFormData
                      ? adminFormData?.tradeName
                      : formData.tradeName
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Company Registration Number
                </label>
                <input
                  name="registrationNumber"
                  placeholder="Company Registration Number"
                  disabled={adminFormData ? true : false}
                  value={
                    adminFormData
                      ? adminFormData?.registrationNumber
                      : formData.registrationNumber
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Company Telephone
                </label>
                <input
                  type="tel"
                  name="companyTelephone"
                  placeholder="Company Telephone"
                  disabled={adminFormData ? true : false}
                  value={
                    adminFormData
                      ? adminFormData?.telephoneNumber
                      : formData.companyTelephone
                  }
                  onChange={handleInputChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 10);
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Business Sector / Industry
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                          fill="#637381"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                          fill="#637381"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <div>
                    <select
                      name="businessSector"
                      value={
                        adminFormData
                          ? adminFormData.sectorId
                          : formData.businessSector
                      }
                      onChange={handleInputChange}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      {businessSectors.map((sector) => (
                        <optgroup key={sector.id} label={sector.name}>
                          <option value={sector.id}>{sector.name}</option>
                          <option value={sector.id}>
                            {sector.description}
                          </option>
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Company Registration Document
                </label>
                <input
                  type="file"
                  name="registrationDocument"
                  onChange={handleInputChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Safety Management Report
                </label>
                <input
                  type="file"
                  name="safetyManagementReport"
                  onChange={handleInputChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Trade Name Letter
                </label>
                <input
                  type="file"
                  name="tradeNameLetter"
                  onChange={handleInputChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded bg-primary p-3 font-medium text-gray"
              >
                Next &raquo;
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}
export default DetailsOfApplicants