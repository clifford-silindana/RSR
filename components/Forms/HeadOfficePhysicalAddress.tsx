import React, { ChangeEvent, FormEvent, useState } from "react";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import { IOperatorApplicationAddresses } from "@/models/IOperatorApplicationAddresses";

export interface FormData {
    streetName: string;
    streetNumber: string;
    unitNumber: string;
    complex: string;
    suburb: string;
    cityTown: string;
    province: number;
    postalCode: string;

    postalStreetName: string;
    postalStreetNumber: string;
    postalUnitNumber: string;
    postalComplex: string;
    postalSuburb: string;
    postalCityTown: string;
    postalProvince: number;
    postalPostalCode: string;

    postalSameAsPhysical: boolean;
}

interface DetailsOfApplicantsFormProps {
    onDataSubmit: (data: FormData) => void;
    formStep: number;
    nextFormStep: () => void;
    prevFormStep: () => void;
    provinces: { id: string; name: string }[];
    adminFormData?: FormData

}

const OfficeAddresses: React.FC<DetailsOfApplicantsFormProps> = ({
  formStep,
  nextFormStep,
  prevFormStep,
  onDataSubmit,
  provinces,
  adminFormData,
}) => {
  const storedOfficeAddresses: string | null = localStorage.getItem(
    "operatorApplication_step1"
  );
  let formData1: IOperatorApplicationAddresses =
    storedOfficeAddresses != null
      ? JSON.parse(storedOfficeAddresses)
      : {
          streetName: "",
          streetNumber: "",
          unitNumber: "",
          complex: "",
          suburb: "",
          cityTown: "",
          province: null,
          postalCode: "",

          postalStreetName: "",
          postalStreetNumber: "",
          postalUnitNumber: "",
          postalComplex: "",
          postalSuburb: "",
          postalCityTown: "",
          postalProvince: null,
          postalPostalCode: "",

          postalSameAsPhysical: false,
        };

  if (adminFormData) {
    formData1 = adminFormData;
  }

  const [formData, setFormData] = useState<FormData>({
    ...formData1,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle file input separately
    const inputValue =
      type === "file" ? (e.target as HTMLInputElement).files?.[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

    const [isCheckedb, setIsChecked] = useState(false);
    const handleCheckboxChange = (isChecked: boolean) => {
      setIsChecked(isChecked);
      setFormData((prevData) => ({
        ...prevData,
        postalSameAsPhysical: isChecked,
        postalStreetName: isChecked ? prevData.streetName : "",
        postalStreetNumber: isChecked ? prevData.streetNumber : "",
        postalUnitNumber: isChecked ? prevData.unitNumber : "",
        postalComplex: isChecked ? prevData.complex : "",
        postalSuburb: isChecked ? prevData.suburb : "",
        postalCityTown: isChecked ? prevData.cityTown : "",
        postalProvince: isChecked ? prevData.province : 0,
        postalPostalCode: isChecked ? prevData.postalCode : "",
      }));
    };
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      // Invoke the callback with the form data
      onDataSubmit(formData);
      // progress
      nextFormStep();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    console.log(formData);
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center">
          <h3 className="font-medium text-black dark:text-white">
            Office Addresses
          </h3>
          <label className="ml-10">
            <input
              type="checkbox"
              name="sameAsPhysical"
              checked={isCheckedb}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              Postal Same as Physical Address
            </span>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="bg-gray mb-4.5 py-1.5">
              <h4 className="text-l font-semibold text-black dark:text-white">
                Head Office Physical Address
              </h4>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Street Name
                </label>
                <input
                  type="text"
                  disabled={adminFormData}
                  name="streetName"
                  placeholder="Street Name"
                  value={
                    adminFormData
                      ? adminFormData.physicalAddress.streetName
                      : formData.streetName
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Street Number
                    </label>
                    <input
                      type="number"
                      disabled={adminFormData}
                      name="streetNumber"
                      placeholder="Street Number"
                      value={
                        adminFormData
                          ? adminFormData.physicalAddress.streetNumber
                          : formData.streetNumber
                      }
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2 hidden"></div>
                </div>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Suburb
                </label>
                <input
                  type="text"
                  name="suburb"
                  placeholder="Suburb"
                  value={
                    adminFormData
                      ? adminFormData.physicalAddress.suburb
                      : formData.suburb
                  }
                  disabled={adminFormData}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Complex
                    </label>
                    <input
                      type="text"
                      name="complex"
                      disabled={adminFormData}
                      placeholder="Complex"
                      value={
                        adminFormData
                          ? adminFormData.physicalAddress.complex
                          : formData.complex
                      }
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Unit Number
                    </label>
                    <input
                      type="number"
                      name="unitNumber"
                      disabled={adminFormData}
                      placeholder="Unit Number"
                      value={
                        adminFormData
                          ? adminFormData.physicalAddress.unitNumber
                          : formData.unitNumber
                      }
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  City/Town
                </label>
                <input
                  type="text"
                  name="cityTown"
                  disabled={adminFormData}
                  placeholder="City/Town"
                  value={
                    adminFormData
                      ? adminFormData.physicalAddress.city
                      : formData.cityTown
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Province
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
                      <select
                        disabled={adminFormData}
                        name="province"
                        value={
                          adminFormData
                            ? adminFormData.physicalAddress.provinceName
                            : formData.province
                        }
                        onChange={handleInputChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      >
                        {provinces.map((province) => (
                          <option defaultValue={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
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
                      Postal Code
                    </label>
                    <input
                      type="text"
                      disabled={adminFormData}
                      name="postalCode"
                      placeholder="Postal Code"
                      value={
                        adminFormData
                          ? adminFormData.physicalAddress.postalCode
                          : formData.postalCode
                      }
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4.5 ">
              {/*                       <CheckboxOne
                            title={"Head Office Postal Address same as Head Office Physical Address ?"}
                            id={"1"}
                            checked={!formData1.postalSameAsPhysical}
                            onChange={handleCheckboxChange}/>*/}
            </div>

            {/* Postal Address Section */}
            {!formData.postalSameAsPhysical && (
              <div>
                <div className="bg-gray mb-4.5 py-1.5">
                  <div>
                    <h4 className="text-l font-semibold text-black">
                      Head Office Postal Address
                    </h4>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Postal Street Name
                    </label>
                    <input
                      type="text"
                      name="postalStreetName"
                      disabled={adminFormData}
                      placeholder="Postal Street Name"
                      value={
                        adminFormData
                          ? formData.postalAddress.streetName
                          : formData.postalStreetName
                      }
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                          Postal Street Number
                        </label>
                        <input
                          type="number"
                          name="postalStreetNumber"
                          placeholder="postal Street Number"
                          disabled={adminFormData}
                          value={
                            adminFormData
                              ? formData.postalAddress.streetNumber
                              : formData.postalStreetNumber
                          }
                          onChange={handleInputChange}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/2 hidden"></div>
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Suburb
                    </label>
                    <input
                      type="text"
                      name="postalSuburb"
                      disabled={adminFormData}
                      placeholder="Suburb"
                      value={
                        adminFormData
                          ? formData.postalAddress.suburb
                          : formData.postalSuburb
                      }
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                          Complex
                        </label>
                        <input
                          type="text"
                          disabled={adminFormData}
                          name="postalComplex"
                          placeholder="Complex"
                          value={
                            adminFormData
                              ? formData.postalAddress.complex
                              : formData.postalComplex
                          }
                          onChange={handleInputChange}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                          Unit Number
                        </label>
                        <input
                          type="number"
                          disabled={adminFormData}
                          name="postalUnitNumber"
                          placeholder="Unit Number"
                          value={
                            adminFormData
                              ? formData.postalAddress.unitNumber
                              : formData.postalUnitNumber
                          }
                          onChange={handleInputChange}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      City/Town
                    </label>
                    <input
                      type="text"
                      name="postalCityTown"
                      disabled={adminFormData}
                      placeholder="City/Town"
                      value={
                        adminFormData
                          ? formData.postalAddress.city
                          : formData.postalCityTown
                      }
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                          Province
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
                                {/* ... SVG path for Province ... */}
                              </g>
                            </svg>
                          </span>
                          <select
                            name="postalProvince"
                            disabled={adminFormData}
                            value={
                              adminFormData
                                ? formData.postalAddress.provinceName
                                : formData.postalProvince
                            }
                            onChange={handleInputChange}
                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          >
                            {provinces.map((province) => (
                              <option
                                key={province.id}
                                defaultValue={province.id}
                              >
                                {province.name}
                              </option>
                            ))}
                          </select>
                          <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                {/* ... SVG path for Province ... */}
                              </g>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalPostalCode"
                          placeholder="Postal Code"
                          disabled={adminFormData}
                          value={
                            adminFormData
                              ? formData.postalAddress.postalCode
                              : formData.postalPostalCode
                          }
                          onChange={handleInputChange}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={prevFormStep}
                className="rounded bg-strokedark p-3 font-medium text-gray mr-4.5"
              >
                &laquo; Back
              </button>
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
};

export default OfficeAddresses;