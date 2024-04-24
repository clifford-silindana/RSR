import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import useOperator from "@/hooks/useOperator";
import useSession from "@/hooks/useSession";
import useFormSubmission from "@/hooks/useFormSubmission";

type TFormValues = {
  legalName: string;
  tradeName: string;
  registrationNumber: number;

  // Physical address
  physicalStreetNumber: string;
  physicalStreeName: string;
  physicalUnitNumber: string;
  physicalComplex: string;
  physicalSuburb: string;
  physicalcityTown: string;
  physicalProvince: string;
  physicalPostalCode: string;

  // Physical address
  postalStreetNumber: string;
  postalStreeName: string;
  postalUnitNumber: string;
  postalComplex: string;
  postalSuburb: string;
  postalcityTown: string;
  postalProvince: string;
  postalPostalCode: string;

  physicalAddress: string;
  companyTelephone: number;
  headOfOrganasationcell: number;
  faxNumber: number;
  headOfOrganasatioName: string;
  headOfOrganasationTitle: string;
  headOfOrganasationLandline: string;
  headOfOrganasationFax: number;
  headOfOrganasationEmail: string;
  nominatedManagerName: string;
  nominatedManagerTitle: string;
  nominatedManagerLandLine: number;
  nominatedManagerCell: number;
  nominatedManagerFax: number;
  nominatedManagerEmail: string;
  businessSector: string;

  // Rail way operation category
  networkOperator: boolean;
  trainOperator: boolean;
  stationOperator: boolean;
};

export const DetailsOfApplicant = ({
  application = null,
  isAdministrator,
  formMetadata,
}) => {
  const { onHandleNext, onHandleBack, formData, setFormData, operatorData } =
    useFormState();
  const { register, handleSubmit, setValue, getValues } = useForm<TFormValues>({
    defaultValues: application ? application.step4 : formData.step4,
  });
  const { getOperatorDetails } = useOperator();
  const { session } = useSession();

  const provinceChoice: any[] = formMetadata?.filter(
    (m: any) => m.metaType == "PROVINCE"
  );
  const { loading, submitting } = useFormSubmission();

  const [physicalSameAsPostal, setphysicalSameAsPostal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedOperator = localStorage.getItem("OperatorDetails");
        let user = null;
        if (storedOperator) {
          user = JSON.parse(storedOperator);
        } else {
          user = await getOperatorDetails();
        }

        console.log("checking the user details", user);
        if (user) {
          setValue("legalName", `${user.legalName}`);
          setValue("legalName", `${user.legalName}`);
          setValue(
            "tradeName",
            `${user.tradeName == null ? "No Trade Name" : user.tradeName}`
          );
          setValue("registrationNumber", user.registrationNumber);
          setValue("companyTelephone", user.telephoneNumber);
          setValue("physicalStreetNumber", user.physicalAddress.streetNumber);
          setValue("physicalStreeName", user.physicalAddress.streetName);
          setValue("physicalUnitNumber", user.physicalAddress.unitNumber);
          setValue("physicalComplex", user.physicalAddress.complex);
          setValue("physicalSuburb", user.physicalAddress.suburb);
          setValue("physicalcityTown", user.physicalAddress.city);
          setValue("physicalProvince", user.physicalAddress.provinceName);
          setValue("physicalPostalCode", user.physicalAddress.postalCode);
          setValue("postalStreetNumber", user.postalAddress.streetNumber);
          setValue("postalStreeName", user.postalAddress.streetName);
          setValue("postalUnitNumber", user.postalAddress.unitNumber);
          setValue("postalComplex", user.postalAddress.complex);
          setValue("postalSuburb", user.postalAddress.suburb);
          setValue("postalcityTown", user.postalAddress.city);
          setValue("postalProvince", user.postalAddress.provinceName);
          setValue("postalPostalCode", user.postalAddress.postalCode);
          setValue("businessSector", user.sector?.name);

          //check the two objects of the address if they are the same
          if (user.physicalAddress === user.postalAddress) {
            setphysicalSameAsPostal(true);
          }

          const nominatedManager = user.contacts.find(
            (contact: any) => contact.hasUserAccount === true
          );
          const headOfOrganisation = user.contacts.find(
            (contact: any) => contact.hasUserAccount === false
          );
          if (user.operationCategory) {
            setValue("networkOperator", user?.operationCategory?.id != null);
            setValue("trainOperator", user?.operationCategory?.id != null);
            setValue("stationOperator", user?.operationCategory?.id != null);
          }
          if (nominatedManager) {
            const { name, email, surname } = nominatedManager;
            setValue("nominatedManagerName", `${name} ${surname}`);
            setValue("nominatedManagerEmail", email);
          } else {
            //console.log("Contact not found for the given email.");
          }
          if (headOfOrganisation) {
            const { name, email, surname } = headOfOrganisation;
            setValue("headOfOrganasationTitle", `${name} ${surname}`);
            setValue("headOfOrganasationEmail", email);
          } else {
            //console.log("Contact not found for the given email.");
          }
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setValue]);

  //check if two objects are the sam

  const onHandleFormSubmit = (data: any) => {
    if (isAdministrator?.isAdministrator) {
      setFormData((prevFrormData) => ({
        ...prevFrormData,
        step4: application.step4,
      }));
      onHandleNext();
    } else {
      setFormData((prevFrormData) => ({ ...prevFrormData, step4: data }));
      if (application) {
        application.step4 = data;
        submitting(application).then((data: any) => {
          onHandleNext();
        });
      } else {
        submitting(formData).then((data: any) => {
          onHandleNext();
        });
      }
    }
  };

  //check operator data
  console.log("operator data", operatorData);

  return (
    <div>
      <form className="pb-6 px-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <ol className="">
            <li>
              <h4 className="text-l font-semibold uppercase">
                4. DETAILS OF APPLICANT
                <span className="text-xs normal-case block">
                  Provide the information requested below and tick the
                  appropriate box where applicable.
                </span>
              </h4>
            </li>
            <div className="grid grid-cols-2 md:gap-14 mt-6 ">
              <div className="">
                <div className="font-semibold">
                  <span className="pr-3">4.1</span>
                  <label htmlFor="legalName">Legal name</label>
                </div>
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="legalName"
                  type="text"
                  placeholder="Legal name"
                  className="h-8 px-4 ml-8 border rounded-md w-full"
                  {...register("legalName")}
                />
              </div>
              <div className="">
                <div className="font-semibold">
                  <span className="pr-3">4.2</span>
                  <label htmlFor="tradeName">Trade name</label>
                </div>
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="tradeName"
                  type="text"
                  placeholder="Trade name"
                  className="h-8 px-4 border rounded-md w-full"
                  {...register("tradeName")}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-10  items-center mt-5">
              <div className="">
                <div className="font-semibold">
                  <span className="pr-3">4.3</span>
                  <label htmlFor="registrationNumber">
                    Company registration number
                  </label>
                </div>
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="registrationNumber"
                  type="text"
                  placeholder="Registration Number"
                  className="h-8 px-4 ml-8 border rounded-md w-full"
                  {...register("registrationNumber")}
                />
              </div>

              <div className="py-2  items-center">
                <div className="font-semibold">
                  <span className="pr-3">4.4</span>
                  <label htmlFor="companyTelephone">
                    Company telephone number
                  </label>
                </div>
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="companyTelephone"
                  type="number"
                  placeholder="Postal address"
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 10);
                  }}
                  className="h-8 px-4 ml-4 border rounded-md w-full"
                  {...register("companyTelephone")}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-10  items-center mt-5">
              <div className="py-2  items-center">
                <div className="font-semibold">
                  <span className="pr-3">4.5</span>
                  <label htmlFor="registrationNumber">Business Sector</label>
                </div>
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="businessSector"
                  type="text"
                  placeholder="Business Sector"
                  className="h-8 px-4 ml-8 border rounded-md w-full"
                  {...register("businessSector")}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:gap-16 mt-5">
              {/* Physical Address inputs */}
              <div className=" ">
                <div className="font-semibold">
                  <span className="pr-3">4.6</span>
                  <label htmlFor="physicalAddress">Physical address</label>
                </div>
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="physicalStreetNumber"
                  type="text"
                  placeholder="Street Number"
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                  {...register("physicalStreetNumber")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="physicalStreeName"
                  type="text"
                  placeholder="Street name"
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                  {...register("physicalStreeName")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="physicalUnitNumber"
                  type="text"
                  placeholder="Unit Number"
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                  {...register("physicalUnitNumber")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="physicalComplex"
                  type="text"
                  placeholder="Complex"
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                  {...register("physicalComplex")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="physicalSuburb"
                  type="text"
                  placeholder="Suburb"
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                  {...register("physicalSuburb")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="physicalcityTown"
                  type="text"
                  placeholder="City/Town"
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                  {...register("physicalcityTown")}
                />
                <select
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  {...register("physicalProvince")}
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                >
                  {register("physicalProvince") == null && (
                    <option>Select Province</option>
                  )}
                  {provinceChoice?.map((province) => (
                    <option defaultValue={province.id}>{province.name}</option>
                  ))}
                </select>
                {/* <input
                  disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                  id="physicalProvince"
                  type="text"
                  placeholder="Province"
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                  {...register("physicalProvince")}
                /> */}
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="physicalPostalCode"
                  type="text"
                  placeholder="Postal Code"
                  className="h-8 my-2 ml-8 px-4 border rounded-md w-full"
                  {...register("physicalPostalCode")}
                />
              </div>
              {/* Postal Address inputs  */}
              <div className=" ">
                <div className="font-semibold">
                  <span className="pr-3">4.7</span>
                  {/*** 
                  <label htmlFor="postalAddress">
                    Postal Address{" "}
                    {!physicalSameAsPostal
                      ? "(Same as Physical Address✅)"
                      : "(Not the same as Physical❌)"}
                  </label>
                */}
                </div>
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="postalStreetNumber"
                  type="text"
                  placeholder="Street Number"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                  {...register("postalStreetNumber")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="postalStreeName"
                  type="text"
                  placeholder="Street name"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                  {...register("postalStreeName")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="postalUnitNumber"
                  type="text"
                  placeholder="Unit Number"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                  {...register("postalUnitNumber")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="postalComplex"
                  type="text"
                  placeholder="Complex"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                  {...register("postalComplex")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="postalSuburb"
                  type="text"
                  placeholder="Suburb"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                  {...register("postalSuburb")}
                />
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="postalcityTown"
                  type="text"
                  placeholder="City/Town"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                  {...register("postalcityTown")}
                />
                <select
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  {...register("postalProvince")}
                  placeholder="Select Province"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                >
                  {register("postalProvince") == null && (
                    <option>Select Province</option>
                  )}
                  {provinceChoice?.map((province) => (
                    <option defaultValue={province.id}>{province.name}</option>
                  ))}
                </select>
                {/* <input
                  disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                  id="postalProvince"
                  type="text"
                  placeholder="Province"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                  {...register("postalProvince")}
                /> */}
                <input
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  id="postalPostalCode"
                  type="text"
                  placeholder="Postal Code"
                  className="h-8 my-2 px-4 border rounded-md w-full"
                  {...register("postalPostalCode")}
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="font-semibold">
                <span className="pr-3">4.8</span>
                <label htmlFor="postalAddress">Rail Category</label>
              </div>
              <div className="ml-8">
                <div>
                  <div className="flex gap-3 py-2 text-sm items-center">
                    <input
                      disabled={
                        isAdministrator?.isAdministrator ||
                        application?.step10?.statusId === 39
                      }
                      {...register("networkOperator")}
                      //checked={getValues().networkOperator}
                      type="checkbox"
                      name="networkOperator"
                      id="existingGroup"
                      className="h-3 w-3"
                    />
                    <div className="">
                      <label htmlFor="">Network operator</label>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-3 py-2 text-sm items-center">
                    <input
                      disabled={
                        isAdministrator?.isAdministrator ||
                        application?.step10?.statusId === 39
                      }
                      {...register("trainOperator")}
                      //checked={getValues().trainOperator}
                      type="checkbox"
                      name="trainOperator"
                      id="existingGroup"
                      className="h-3 w-3"
                    />
                    <div className="col-span-4">
                      <label htmlFor="">Train operator</label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3 py-2 text-sm items-center">
                    <input
                      disabled={
                        isAdministrator?.isAdministrator ||
                        application?.step10?.statusId === 39
                      }
                      {...register("stationOperator")}
                      //checked={getValues().stationOperator}
                      type="checkbox"
                      name="stationOperator"
                      id="existingGroup"
                      className="h-3 w-3"
                    />
                    <div className="col-span-4">
                      <label htmlFor="">Station operator</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="font-bold bg-bodydark p-2 text-center mb-5">
                  Operator Details
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <div className=" py-2 text-sm items-center">
                      <div className="">
                        <label htmlFor="headOfOrganasatioName">
                          Operator Name
                        </label>
                        <div>
                          <input
                            disabled={
                              isAdministrator?.isAdministrator ||
                              application?.step10?.statusId === 39
                            }
                            id="headOfOrganasatioName"
                            type="text"
                            className="h-8 px-4 border border-gray rounded-md w-full bg-gray"
                            {...register("legalName")}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" py-2 text-sm items-center">
                      <div className="">
                        <label htmlFor="headOfOrganasationTitle">
                          Company registration number
                        </label>
                        <div>
                          <input
                            disabled={
                              isAdministrator?.isAdministrator ||
                              application?.step10?.statusId === 39
                            }
                            id="headOfOrganasationTitle"
                            type="text"
                            className="h-8 px-4 border border-gray rounded-md w-full bg-gray"
                            value={operatorData.companyRegistrationNumber}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className=" py-2 text-sm items-center">
                      <div className="">
                        <label htmlFor="headOfOrganasationLandline">
                          Nominated Manager Name
                        </label>
                        <div>
                          <input
                            disabled={
                              isAdministrator?.isAdministrator ||
                              application?.step10?.statusId === 39
                            }
                            id="headOfOrganasationTitle"
                            type="text"
                            className="h-8 px-4 border border-gray rounded-md w-full bg-gray"
                            {...register("nominatedManagerName")}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" py-2 text-sm items-center">
                      <div className="">
                        <label htmlFor="headOfOrganasationLandline">
                          Head of the Organisation Name
                        </label>
                        <div>
                          <input
                            disabled={
                              isAdministrator?.isAdministrator ||
                              application?.step10?.statusId === 39
                            }
                            id="headOfOrganasationTitle"
                            type="text"
                            className="h-8 px-4 border border-gray rounded-md w-full bg-gray"
                            {...register("headOfOrganasationTitle")}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ol>
        </div>
        <div className="flex justify-end items-end mt-10 gap-3">
          <button
            onClick={onHandleBack}
            className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500"
          >
            Back
          </button>
          {!isAdministrator.isAdministrator ? (
            <button className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">
              Next
            </button>
          ) : (
            <button
              onClick={onHandleFormSubmit}
              type="button"
              className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
