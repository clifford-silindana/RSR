import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import { useState } from "react";
import useFormSubmission from "@/hooks/useFormSubmission";

const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-8 w-8 text-white bg-darkblue rounded cursor-pointer">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-8 w-8 text-white bg-danger rounded cursor-pointer">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

type TFormValues = {
  partyObjection: "yes" | "no" | undefined;
  nameOfObjectingParty: string;
  contactOfObjectingParty: string;
};

export const DescriptionOfStation = ({ application = null, isAdministrator }) => {
  const [stationHasName, setStationHasName] = useState(false);
  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();
  const defaulInputs = {
    stationName: "",
    streetAddress: "",
    city: "",
    province: "",
    code: "",
    stationOperator: "",
    networkOperator: "",
    yearLastUpgraded: "",
    stationDiagrams: "",
    trainOperators: [],
    agreements: [],
    contactPerson: "",
    phoneNumber: "",
    faxNumber: "",
    email: "",
  };
  const { register, handleSubmit, watch, control } = useForm<TFormValues>({
    defaultValues: application ? application.step8 : formData.step8,
    operationItems: [{ ...defaulInputs }],
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "operationItems",
  });

  const { loading, submitting } = useFormSubmission();

  const onHandleFormSubmit = (data: any) => {
    if (isAdministrator?.isAdministrator) {
      setFormData((prevFrormData) => ({ ...prevFrormData, step8: application.step8 }));
      onHandleNext();
    }
    else {
      setFormData((prevFrormData) => ({ ...prevFrormData, step8: data }));
      if (application) {
        application.step8 = data;
        submitting(application)
          .then((data: any) => {
            onHandleNext();
          });
      }
      else {
        if (formData?.step8 != null) {
          formData.step8 = data;
        }
        submitting(formData)
          .then((data: any) => {
            onHandleNext();
          });
      }
    }
  };

  const partyObjection = watch("partyObjection");

  return (
    <div>
      <form className="pb-6 px-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <div>
            <h4 className="text-l font-semibold uppercase">
              7. Description of Station Operations
            </h4>
          </div>
          <div>
            <div className="grid grid-cols-1 pt-4">
              <div>List all the stations to be covered on the permit</div>
            </div>
            <div className="grid grid-cols-5 py-2 items-center">
              <div className="col-span-4"></div>
              <div className="flex gap-2 ml-4 ">
                <span>Yes</span>
                <span>No</span>
              </div>
            </div>
            <div className="grid grid-cols-5 py-2 text-sm items-center">
              <div className="col-span-4">
                <span className="pr-3">7.1</span>
                <label>
                  List stations where passengers embark and disembark from
                  train.
                </label>
              </div>
              <div className="flex gap-2 ml-5">
                <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                  type="radio"
                  id="yes"
                  value="yes"
                  className="h-5 w-5"
                  {...register("partyObjection")}
                />
                <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                  type="radio"
                  id="no"
                  value="no"
                  className="h-5 w-5"
                  {...register("partyObjection")}
                />
              </div>
            </div>
            {partyObjection === "yes" &&
              fields.map((item, itemIndex) => (
                <>
                  <div className="grid grid-cols-5 py-2 text-sm items-cente">
                    <div className="col-span-3">
                      <label
                        htmlFor={`networkOperationItems.${itemIndex}.stationName`}>
                        Station Name
                      </label>
                    </div>
                    <div className="flex gap-5 items-center col-span-2 mr-5">
                      <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        id={`networkOperationItems.${itemIndex}.stationName`}
                        type="text"
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        {...register(
                          `networkOperationItems.${itemIndex}.stationName`
                        )}
                      />
                    </div>
                  </div>

                  <div className="px-5 border border-gray px-3 py-3 my-3 ">
                    <div className="grid grid-cols-5 py-2 text-sm items-cente">
                      <div className="col-span-2">
                        <label
                          htmlFor={`networkOperationItems.${itemIndex}.streetAddress`}>
                          Street Address
                        </label>
                      </div>
                      <div className="flex gap-5 items-center col-span-3 mr-5">
                        <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                          id={`networkOperationItems.${itemIndex}.streetAddress`}
                          type="text"
                          placeholder=""
                          className="h-8 px-4 border rounded-md w-full"
                          {...register(
                            `networkOperationItems.${itemIndex}.streetAddress`
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm items-cente">
                      <div className="col-span-2">
                        <label
                          htmlFor={`networkOperationItems.${itemIndex}.city`}>
                          City
                        </label>
                      </div>
                      <div className="flex gap-5 items-center col-span-3 mr-5">
                        <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                          id={`networkOperationItems.${itemIndex}.city`}
                          type="text"
                          placeholder=""
                          className="h-8 px-4 border rounded-md w-full"
                          {...register(
                            `networkOperationItems.${itemIndex}.city`
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm items-cente">
                      <div className="col-span-2">
                        <label
                          htmlFor={`networkOperationItems.${itemIndex}.province`}>
                          Province
                        </label>
                      </div>
                      <div className="flex gap-5 items-center col-span-3 mr-5">
                        <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                          id={`networkOperationItems.${itemIndex}.province`}
                          type="text"
                          placeholder=""
                          className="h-8 px-4 border rounded-md w-full"
                          {...register(
                            `networkOperationItems.${itemIndex}.province`
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm items-cente">
                      <div className="col-span-2">
                        <label
                          htmlFor={`networkOperationItems.${itemIndex}.code`}>
                          Code
                        </label>
                      </div>
                      <div className="flex gap-5 items-center col-span-3 mr-5">
                        <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                          id={`networkOperationItems.${itemIndex}.code`}
                          type="text"
                          placeholder=""
                          className="h-8 px-4 border rounded-md w-full"
                          {...register(
                            `networkOperationItems.${itemIndex}.code`
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 py-2 text-sm items-cente">
                    <div className="col-span-2">
                      <label
                        htmlFor={`networkOperationItems.${itemIndex}.stationOperator`}>
                        Station Operator
                      </label>
                    </div>
                    <div className="flex gap-5 items-center col-span-3 mr-5">
                      <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        id={`networkOperationItems.${itemIndex}.stationOperator`}
                        type="text"
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        {...register(
                          `networkOperationItems.${itemIndex}.stationOperator`
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-cente">
                    <div className="col-span-2">
                      <label
                        htmlFor={`networkOperationItems.${itemIndex}.networkOperator`}>
                        Network Operator of line on which station is located
                      </label>
                    </div>
                    <div className="flex gap-5 items-center col-span-3 mr-5">
                      <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        id={`networkOperationItems.${itemIndex}.networkOperator`}
                        type="text"
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        {...register(
                          `networkOperationItems.${itemIndex}.networkOperator`
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-cente">
                    <div className="col-span-2">
                      <label
                        htmlFor={`networkOperationItems.${itemIndex}.yearLastUpgraded`}>
                        Year last upgraded
                      </label>
                    </div>
                    <div className="flex gap-5 items-center col-span-2 mr-5">
                      <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        id={`networkOperationItems.${itemIndex}.yearLastUpgraded`}
                        type="date"
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        {...register(
                          `networkOperationItems.${itemIndex}.yearLastUpgraded`
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-cente">
                    <div className="col-span-3">
                      <label>
                        7.2 All operators: Submit a station diagram for each
                        station to be covered on this permit. It should clearly
                        indicate the station, buildings, platforms, tracks as
                        well as total station precinct.
                      </label>
                    </div>
                    <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                      <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        id={`networkOperationItems.${itemIndex}.stationDiagrams`}
                        type="file"
                        multiple
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        {...register(
                          `networkOperationItems.${itemIndex}.stationDiagrams`
                        )}
                      />
                    </div>
                  </div>
                  <div className="py-2 text-sm items-cente">
                    <div className="">
                      <label>
                        7.3 All operators: Submit a station diagram for each
                        station to be covered on this permit. It should clearly
                        indicate the station, buildings, platforms, tracks as
                        well as total station precinct.
                      </label>
                    </div>
                    <div className="grid grid-cols-2">
                      <table className="min-w-full bg-white border rounded border-gray-300">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b">
                              Name of train operator
                            </th>
                            <th className="py-2 px-4 border-b"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.trainOperators?.map(
                            (trainOperators, trainIndex) => (
                              <tr key={trainIndex}>
                                <td className="py-2 px-4 border">
                                  <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                    placeholder="Operator Name"
                                    className="h-8 px-4 border rounded-md w-full"
                                    {...register(
                                      `networkOperationItems.${itemIndex}.trainOperators.${trainIndex}.operatorName`
                                    )}
                                    defaultValue={trainOperators.operatorName}
                                    className="w-full"
                                  />
                                </td>
                                <td className="py-2 px-4 border">
                                  <button
                                    disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                    type="button"
                                    onClick={() =>
                                      update(itemIndex, {
                                        ...fields[itemIndex],
                                        trainOperators: [
                                          fields[
                                            itemIndex
                                          ]?.trainOperators.splice(
                                            trainIndex,
                                            1
                                          ),
                                        ],
                                      })
                                    }
                                    className="text-red-500 hover:text-red-700">
                                    <DeleteIcon />
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                    <button
                      disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                      type="button"
                      onClick={() =>
                        update(itemIndex, {
                          ...fields[itemIndex],
                          trainOperators: [
                            ...fields[itemIndex].trainOperators,
                            { operatorName: "" },
                          ],
                        })
                      }
                      className="mt-1 py-2 bg-blue-500 text-darkblue rounded hover:bg-blue-700">
                      <AddIcon />
                    </button>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-cente">
                    <div className="col-span-3">
                      <label>
                        7.4 All operators: Submit a signed agreegment between
                        the station operator and any other party using the
                        station in which the respective responsibilities of both
                        parties are clearly stated.
                      </label>
                    </div>
                    <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                      <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        id={`networkOperationItems.${itemIndex}.agreements`}
                        type="file"
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        {...register(
                          `networkOperationItems.${itemIndex}.agreements`
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-3 text-sm">
                    <label>
                      7.5 Provide the name and contact details of the person
                      responsible for railway safety at this station.
                    </label>
                  </div>
                  <div className="px-5 border border-gray px-3 py-3 my-3 ">
                    <div className="grid grid-cols-5 py-2 text-sm items-cente">
                      <div className="col-span-2">
                        <label
                          htmlFor={`networkOperationItems.${itemIndex}.contactPerson`}>
                          Contact Person Name
                        </label>
                      </div>
                      <div className="flex gap-5 items-center col-span-3 mr-5">
                        <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                          id={`networkOperationItems.${itemIndex}.contactPerson`}
                          type="text"
                          placeholder=""
                          className="h-8 px-4 border rounded-md w-full"
                          {...register(
                            `networkOperationItems.${itemIndex}.contactPerson`
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm items-cente">
                      <div className="col-span-2">
                        <label
                          htmlFor={`networkOperationItems.${itemIndex}.phoneNumber`}>
                          Telephone Number
                        </label>
                      </div>
                      <div className="flex gap-5 items-center col-span-3 mr-5">
                        <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                          id={`networkOperationItems.${itemIndex}.phoneNumber`}
                          type="text"
                          placeholder=""
                          className="h-8 px-4 border rounded-md w-full"
                          {...register(
                            `networkOperationItems.${itemIndex}.phoneNumber`
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm items-cente">
                      <div className="col-span-2">
                        <label
                          htmlFor={`networkOperationItems.${itemIndex}.faxNumber`}>
                          Fax Number
                        </label>
                      </div>
                      <div className="flex gap-5 items-center col-span-3 mr-5">
                        <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                          id={`networkOperationItems.${itemIndex}.faxNumber`}
                          type="text"
                          placeholder=""
                          className="h-8 px-4 border rounded-md w-full"
                          {...register(
                            `networkOperationItems.${itemIndex}.faxNumber`
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm items-cente">
                      <div className="col-span-2">
                        <label
                          htmlFor={`networkOperationItems.${itemIndex}.email`}>
                          Email
                        </label>
                      </div>
                      <div className="flex gap-5 items-center col-span-3 mr-5">
                        <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                          id={`networkOperationItems.${itemIndex}.email`}
                          type="text"
                          placeholder=""
                          className="h-8 px-4 border rounded-md w-full"
                          {...register(
                            `networkOperationItems.${itemIndex}.email`
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="border border-2 border-gray mt-5 mb-6" />
                </>
              ))}
            {partyObjection == "yes" && (
              <button
                disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                type="button"
                className="flex items-center bg-logoorange text-white mt-3 py-2 px-4 rounded hover:bg-darkblue"
                onClick={() => append({ ...defaulInputs })}>
                <span className="mr-2">Add new station</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-end items-end mt-10 gap-10">
          <button
            onClick={onHandleBack}
            className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500">
            Back
          </button>
          {!isAdministrator.isAdministrator ?
            <button
              className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">
              Next
            </button> :
            <button
              onClick={onHandleFormSubmit} type="button" className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">
              Next
            </button>
          }
        </div>
      </form>
    </div>
  );
};