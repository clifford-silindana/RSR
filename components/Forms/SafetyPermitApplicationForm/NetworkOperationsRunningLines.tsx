import { ChangeEvent, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import useFormSubmission from "@/hooks/useFormSubmission";
import { FiPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

type TFormValues = {
  partyObjection: "yes" | "no" | undefined;
  nameOfObjectingParty: string;
  contactOfObjectingParty: string;
  runningLines: string;
  typeOfGoods: string;
  gaugeWith1067: string;
  standardGauge: string;
  narrowGauge: string;
  levelsCrossing: string;
};

interface IOperator {
  id: number;
  name: string;
  activityNature: string;
}

interface IDangerousOrSide {
  id: number;
  type: string;
  totalTonnagePreviousCycle: string;
  distanceGoodNote: string;
}

interface BlockRunning {
  dangerousOrSide: IDangerousOrSide[];
  statusRunningLines: IOperator[];
  trainOperators: IOperator[];
  stationOperators: IOperator[];
  maintenanceContractors: IOperator[];
}

interface NetworkParty {
  id: number;
  operatorName: string;
  activityNature: string;
}

interface SidingCover {
  id: number;
  sidingNumber: string;
  streetAddress: string;
  contactDetails: string;
  telephone: string;
  email: string;
}

interface AllowedParty {
  id: number;
  sidingNumber: string;
  partyAllowed: string;
  activityNature: string;
}

interface BlockSiding {
  sidingsToBeCoverd: SidingCover[];
  sidingsPartyAllowed: AllowedParty[];
}

export const NetworkOperationsRunningLines = ({ application = null, isAdministrator, formMetadata }) => {
  const [blockNetworks, setBlockNetworks] = useState<BlockRunning[]>([
    {
      dangerousOrSide: [
        {
          id: Math.floor(Math.random() * 1000),
          type: "",
          totalTonnagePreviousCycle: "",
          distanceGoodNote: "",
        },
      ],
      statusRunningLines: [
        {
          id: Math.floor(Math.random() * 1000),
          name: "",
          activityNature: "",
        },
      ],
      trainOperators: [
        {
          id: Math.floor(Math.random() * 1000),
          name: "",
          activityNature: "",
        },
      ],
      stationOperators: [
        {
          id: Math.floor(Math.random() * 1000),
          name: "",
          activityNature: "",
        },
      ],
      maintenanceContractors: [
        {
          id: Math.floor(Math.random() * 1000),
          name: "",
          activityNature: "",
        },
      ],
    },
  ]);

  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();
  const { register, handleSubmit, watch, control } = useForm<TFormValues>({
    defaultValues: application ? application.step6 : formData.step6,
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "runningLinesArray",
  });

  const { loading, submitting, uploadDocument } = useFormSubmission();

  const onHandleFormSubmit = (data: any) => {
    if (isAdministrator?.isAdministrator) {
      setFormData((prevFrormData) => ({ ...prevFrormData, step6: application.step6 }));
      onHandleNext();
    }
    else {
      setFormData((prevFrormData) => ({ ...prevFrormData, step6: data }));
      if (application) {
        application.step6 = data;
        submitting(application)
          .then((data: any) => {
            onHandleNext();
          });
      }
      else {
        if (formData?.step6 != null) {
          formData.step6 = data;
        }
        submitting(formData)
          .then((data: any) => {
            onHandleNext();
          });
      }
    }
  };
  // Add rows
  const addDangerousOrSideRow = (blockIndex: number) => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            dangerousOrSide: [
              ...block.dangerousOrSide,
              {
                id: Math.floor(Math.random() * 1000),
                type: "",
                totalTonnagePreviousCycle: "",
                distanceGoodNote: "",
              },
            ],
          };
        } else {
          return block;
        }
      })
    );
  };

  const addStatusRunningLinesRow = (blockIndex: number) => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            trainOperators: [
              ...block.trainOperators,
              {
                id: Math.floor(Math.random() * 1000),
                name: "",
                activityNature: "",
              },
            ],
          };
        } else {
          return block;
        }
      })
    );
  };

  const addTrainOperatorsRow = (blockIndex: number) => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            trainOperators: [
              ...block.trainOperators,
              {
                id: Math.floor(Math.random() * 1000),
                name: "",
                activityNature: "",
              },
            ],
          };
        } else {
          return block;
        }
      })
    );
  };
  const addStationOperatorsRow = (blockIndex: number) => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            stationOperators: [
              ...block.stationOperators,
              {
                id: Math.floor(Math.random() * 1000),
                name: "",
                activityNature: "",
              },
            ],
          };
        } else {
          return block;
        }
      })
    );
  };
  const addMaintenanceContractorsRow = (blockIndex: number) => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            maintenanceContractors: [
              ...block.maintenanceContractors,
              {
                id: Math.floor(Math.random() * 1000),
                name: "",
                activityNature: "",
              },
            ],
          };
        } else {
          return block;
        }
      })
    );
  };

  const addSidingBlock = (): void => {
    const newRows: BlockSiding[] = [
      ...blockSidings,
      {
        dangerousOrSide: [
          {
            id: Math.floor(Math.random() * 1000),
            type: "",
            totalTonnagePreviousCycle: "",
            distanceGoodNote: "",
          },
        ],
        sidingsToBeCoverd: [
          {
            id: Math.floor(Math.random() * 1000),
            status: "",
            totalLength: "",
            locationSiding: "",
            sidingCity: "",
          },
        ],
        sidingsAllToBeCoverd: [
          {
            id: Math.floor(Math.random() * 1000),
            streetAddress: "",
            contactDetails: "",
            telephone: "",
            email: "",
          },
        ],
        trainOperators: [
          {
            id: Math.floor(Math.random() * 1000),
            name: "",
            activityNature: "",
          },
        ],
        stationOperators: [
          {
            id: Math.floor(Math.random() * 1000),
            name: "",
            activityNature: "",
          },
        ],
        maintenanceContractors: [
          {
            id: Math.floor(Math.random() * 1000),
            name: "",
            activityNature: "",
          },
        ],
      },
    ];
    setBlockNetworks(newRows);
  };

  const handleDangerousOrSide = (blockIndex: number, id: number): void => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            dangerousOrSide: block.dangerousOrSide.filter(
              (item, iIndex) => item.id !== id
            ),
          };
        } else {
          return block;
        }
      })
    );
  };
  const handleRemoveSidingsToBeCoverd = (
    blockIndex: number,
    id: number
  ): void => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            sidingsToBeCoverd: block.sidingsToBeCoverd.filter(
              (item, iIndex) => item.id !== id
            ),
          };
        } else {
          return block;
        }
      })
    );
  };
  const handleRemoveTrainOperators = (blockIndex: number, id: number): void => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            trainOperators: block.trainOperators.filter(
              (item, iIndex) => item.id !== id
            ),
          };
        } else {
          return block;
        }
      })
    );
  };
  const handleRemoveStationOperators = (
    blockIndex: number,
    id: number
  ): void => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            stationOperators: block.stationOperators.filter(
              (item, iIndex) => item.id !== id
            ),
          };
        } else {
          return block;
        }
      })
    );
  };
  const handleRemoveMaintenanceContractors = (
    blockIndex: number,
    id: number
  ): void => {
    setBlockNetworks((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            maintenanceContractors: block.maintenanceContractors.filter(
              (item, iIndex) => item.id !== id
            ),
          };
        } else {
          return block;
        }
      })
    );
  };

  const handleRemoveNetworkParty = (blockIndex: number, id: number): void => {
    setBlockRunningLines((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            networkParties: block.networkParties.filter(
              (item, iIndex) => item.id !== id
            ),
          };
        } else {
          return block;
        }
      })
    );
  };

  const runningLines = watch("runningLines");
  const typeOfGoods = watch("typeOfGoods");
  const gaugeWith1067 = watch("gaugeWith1067");
  const standardGauge = watch("standardGauge");
  const narrowGauge = watch("narrowGauge");
  const levelsCrossing = watch("levelsCrossing");

  return (
    <div>
      <form className="pb-6 px-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <ol className="">
            <li>
              <h4 className="text-l font-semibold uppercase">
                6 Description of Network Operations <b>Running Lines</b>
              </h4>
            </li>
            <div>
              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4">
                  <label htmlFor="transportCommuters">
                    Tick the appropriate box. If the answer is "yes" submit
                    answers in the space provided.
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4">
                  <span className="pr-3">6.1</span>
                  <label htmlFor="runningLines">
                    Do you operate, manage and/or maintain <b>RUNNING LINES</b>{" "}
                    (main lines between stations and/or branch lines{" "}
                    <i>excluding</i> private sidings)?
                  </label>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col gap-2 ml-5">
                    <label htmlFor="yes">Yes</label>
                    <input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                      type="radio"
                      value="yes"
                      className="h-5 w-5"
                      {...register("runningLines")}
                    />
                  </div>
                  <div className="flex flex-col gap-2 ml-5">
                    <label htmlFor="no">No</label>
                    < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                      type="radio"
                      value="no"
                      className="h-5 w-5"
                      {...register("runningLines")}
                    />
                  </div>
                </div>
              </div>
              {runningLines === "yes" && (
                <>
                  {blockNetworks.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {" "}
                      <div className="ml-5 grid grid-cols-2 gap-5 mt-5">
                        <div className="flex gap-3 items-center mb-3">
                          <span>6.1.1</span>
                          <h4 className="">Network Description</h4>
                        </div>
                        <textarea
                          className="border rounded-md"
                          cols={5}
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-10 mt-5">
                        <div className="flex gap-3 items-center mb-3">
                          <span>6.1.2</span>
                          <h4 className="">
                            {" "}
                            Select type of goods/commodities transported
                          </h4>
                        </div>
                        <select
                          className="px-4 border rounded-md w-full"
                          id="mySelect"
                          {...register("typeOfGoods")}>
                          <option value={""}>Select </option>
                          <option value="Dangerous">Dangerous </option>
                          <option value="General">General </option>
                        </select>
                      </div>
                      <div className="mt-3 w-full">
                        <>
                          <div className="ml-5 w-full">
                            <div className="flex gap-3 items-center mb-3">
                              {typeOfGoods === "Dangerous" ? (
                                <h4 className="font-medium text-lg mb-2">
                                  <span className="font-normal">6.2.1</span>{" "}
                                  Dangerous goods
                                </h4>
                              ) : (
                                <h4 className="font-medium text-lg mb-2">
                                  <span className="font-normal">6.2.1</span>{" "}
                                  General freight”
                                </h4>
                              )}
                            </div>
                            <table className="table-aout border w-full">
                              <thead>
                                <tr>
                                  <th className="border">Description</th>
                                  <th className="border">
                                    Total Annual Volume (in tonnes)
                                  </th>
                                  <th className="border">
                                    Distance with Goods (Expressed in KM)
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {blockNetworks[itemIndex].dangerousOrSide?.map(
                                  (train, trainIndex) => (
                                    <tr key={train.id}>
                                      <td className="border">
                                        < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                          {...register(
                                            `runningLinesArray.${itemIndex}.dangerousOrSide.${trainIndex}.type`
                                          )}
                                          type="text"
                                          className="border border-y-gray-2 px-2 w-auto m-2 rounded-md"
                                        />
                                      </td>
                                      <td className="border">
                                        < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                          {...register(
                                            `runningLinesArray.${itemIndex}.dangerousOrSide.${trainIndex}.totalTonnagePreviousCycle`
                                          )}
                                          type="text"
                                          className="border border-y-gray-2 px-2 w-auto m-2 rounded-md"
                                        />
                                      </td>
                                      <td className="border">
                                        < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                          {...register(
                                            `runningLinesArray.${itemIndex}.dangerousOrSide.${trainIndex}.distanceGoodNote`
                                          )}
                                          type="text"
                                          className="border border-y-gray-2 px-2 w-auto m-2 rounded-md"
                                        />
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                            <button
                              type="button"
                              disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                              onClick={() => addDangerousOrSideRow(itemIndex)}
                              className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
                              add <FiPlus />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-10 mt-5">
                            <div className="flex gap-3 items-center mb-3">
                              <span>6.1.3</span>
                              <h4 className="">Status of Running Lines</h4>
                            </div>
                            <table className="border w-ful">
                              <thead>
                                <tr className="border">
                                  <th className="border">
                                    Running lines Status
                                  </th>
                                  <th className="border">Total Length inKM</th>
                                </tr>
                              </thead>
                              <tbody>
                                {blockNetworks[
                                  itemIndex
                                ].statusRunningLines?.map(
                                  (train, trainIndex) => (
                                    <tr key={train.id}>
                                      <td className="border p-2">
                                        <select className="border rounded-md w-full">
                                          <option
                                            disabled
                                            selected
                                            {...register(
                                              `runningLinesArray.${itemIndex}.statusRunningLines.${trainIndex}.name`
                                            )}>
                                            Select status
                                          </option>
                                          <option value="Active">Active</option>
                                          <option value="Dormant">
                                            Dormant
                                          </option>
                                          <option value="Spiked">Spiked</option>
                                        </select>
                                      </td>
                                      <td className="p-2">
                                        < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                          type="text"
                                          className="border rounded-md"
                                        />
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                            {/* <button
                              type="button"
                              onClick={() =>
                                addStatusRunningLinesRow(itemIndex)
                              }
                              className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
                              add <FiPlus />
                            </button> */}
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-8 items-end">
                            <div className="flex gap-3 items-center mb-3">
                              <span>6.1.4</span>
                              <h4 className="">
                                Is the running lanes gauge width Cape Gauge
                                (1067mm)?
                              </h4>
                            </div>
                            <div className="flex gap-5 ml-5">
                              <div className="flex flex-col items-center">
                                <label htmlFor="yes">Yes</label>
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="radio"
                                  value="yes"
                                  className="h-5 w-5"
                                  {...register("gaugeWith1067")}
                                />
                              </div>
                              <div className="flex flex-col items-center">
                                <label htmlFor="no">No</label>
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="radio"
                                  value="no"
                                  className="h-5 w-5"
                                  {...register("gaugeWith1067")}
                                />
                              </div>
                            </div>
                          </div>
                          {gaugeWith1067 === "yes" && (
                            <div className=" ml-5 grid grid-cols-2 gap-5 mt-3">
                              <div className="flex gap-3 items-center mb-3">
                                <span>6.1.4.1</span>
                                <h4 className="">
                                  Indicate the total length of Cape Gauge
                                  sidings in kilometre.
                                </h4>
                              </div>
                              <div className="flex gap-5">
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="text"
                                  className="border rounded-md w-full h-7"
                                />
                              </div>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-2 items-end">
                            <div className="flex gap-3 items-center mb-3">
                              <span>6.1.5</span>
                              <h4 className="">
                                Is the siding gauge width Standard Gauge
                                (1435mm)?
                              </h4>
                            </div>
                            <div className="flex gap-5 ml-5">
                              <div className="flex flex-col items-center">
                                <label htmlFor="yes">Yes</label>
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="radio"
                                  value="yes"
                                  className="h-5 w-5"
                                  {...register("standardGauge")}
                                />
                              </div>
                              <div className="flex flex-col items-center">
                                <label htmlFor="no">No</label>
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="radio"
                                  value="no"
                                  className="h-5 w-5"
                                  {...register("standardGauge")}
                                />
                              </div>
                            </div>
                          </div>
                          {standardGauge === "yes" && (
                            <div className=" ml-5 grid grid-cols-2 gap-5 mt-3">
                              <div className="flex gap-3 items-center mb-3">
                                <span>6.1.5.1</span>
                                <h4 className="">
                                  Indicate the total length of Standard Gauge
                                  sidings in kilometre.
                                </h4>
                              </div>
                              <div className="flex gap-5">
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="text"
                                  className="border rounded-md w-full h-7"
                                />
                              </div>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-2 items-end">
                            <div className="flex gap-3 items-center mb-3">
                              <span>6.1.6</span>
                              <h4 className="">
                                Is the Running lines gauge width Narrow Gauge
                                (610mm)?
                              </h4>
                            </div>
                            <div className="flex gap-5 ml-5">
                              <div className="flex flex-col items-center">
                                <label htmlFor="yes">Yes</label>
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="radio"
                                  value="yes"
                                  className="h-5 w-5"
                                  {...register("narrowGauge")}
                                />
                              </div>
                              <div className="flex flex-col items-center">
                                <label htmlFor="no">No</label>
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="radio"
                                  value="no"
                                  className="h-5 w-5"
                                  {...register("narrowGauge")}
                                />
                              </div>
                            </div>
                          </div>
                          {narrowGauge === "yes" && (
                            <div className=" ml-5 grid grid-cols-2 gap-5 mt-3">
                              <div className="flex gap-3 items-center mb-3">
                                <span>6.1.6.1</span>
                                <h4 className="">
                                  Indicate the total length of Narrow-Gauge
                                  sidings in kilometre.
                                </h4>
                              </div>
                              <div className="flex gap-5">
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="number"
                                  className="border rounded-md w-full h-7"
                                />
                              </div>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-10 items-end">
                            <div className="flex gap-3 items-center mb-3">
                              <span>6.1.7</span>
                              <h4 className="">
                                Who is responsible for maintaining the network ?
                              </h4>
                            </div>
                            <div className="flex gap-5">
                              < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                type="number"
                                className="border rounded-md w-full h-7"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 items-end">
                            <div className="flex gap-3 items-center mb-3">
                              <span>6.1.8</span>
                              <h4 className="">
                                Are there levels crossing on the running
                                lines/network?
                              </h4>
                            </div>
                            <div className="flex gap-5 ml-5">
                              <div className="flex flex-col items-center">
                                <label htmlFor="yes">Yes</label>
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="radio"
                                  value="yes"
                                  className="h-5 w-5"
                                  {...register("levelsCrossing")}
                                />
                              </div>
                              <div className="flex flex-col items-center">
                                <label htmlFor="no">No</label>
                                < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  type="radio"
                                  value="no"
                                  className="h-5 w-5"
                                  {...register("levelsCrossing")}
                                />
                              </div>
                            </div>
                          </div>
                          {levelsCrossing === "yes" && (
                            <>
                              <div className=" ml-5 grid grid-cols-2 gap-5 mt-3">
                                <div className="flex gap-3 items-center mb-3">
                                  <span>6.1.8.1</span>
                                  <h4 className="">
                                    How many level crossings located on public
                                    roads?
                                  </h4>
                                </div>
                                <div className="flex gap-5">
                                  < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                    type="number"
                                    className="border rounded-md w-full h-7"
                                  />
                                </div>
                              </div>
                              <div className=" ml-5 grid grid-cols-2 gap-5">
                                <div className="flex gap-3 items-center mb-3">
                                  <span>6.1.8.2</span>
                                  <h4 className="">
                                    How many level crossings located on private
                                    roads?
                                  </h4>
                                </div>
                                <div className="flex gap-5">
                                  < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                    type="number"
                                    className="border rounded-md w-full h-7"
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          <div className="mt-8">
                            <div className="flex gap-3 items-center mb-3">
                              <span>6.1.9</span>
                              <h4 className="">
                                List all other parties allowed access to the
                                network/running lines, as well as the nature of
                                their activities on the Running Lines, including
                                train operators, station operators, maintenance
                                contractors. Add rows as needed.
                              </h4>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-3 items-end">
                            <div className="flex flex-col gap-3 mb-3">
                              <span className="font-semibold">
                                Train Operator(s)
                              </span>
                              <div>
                                <table className="border">
                                  <thead>
                                    <tr>
                                      <th className="border px-3">
                                        Operator name
                                      </th>
                                      <th className="border px-3">
                                        Nature of activities on the siding
                                      </th>
                                      <th className="border text-center"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {blockNetworks[
                                      itemIndex
                                    ].trainOperators?.map(
                                      (train, trainIndex) => (
                                        <tr key={train.id}>
                                          <td className="border p-2">
                                            {" "}
                                            < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                              {...register(
                                                `runningLinesArray.0.trainOperators.${trainIndex}.name`
                                              )}
                                              type="text"
                                              className="rounded-md border"
                                            />{" "}
                                          </td>
                                          <td className="border px-3">
                                            <select
                                              {...register(
                                                `runningLinesArray.0.trainOperators.${trainIndex}.activityNature`
                                              )}
                                              className="border rounded-md w-full text-center">
                                              <option value=""></option>
                                              <option value="Shunting">
                                                Shunting
                                              </option>
                                              <option value="Dropping and collection">
                                                Dropping and collection
                                              </option>
                                              <option value="Other">
                                                Other
                                              </option>
                                            </select>
                                          </td>
                                          <td className=" px-3">
                                            <FiTrash2 className="text-red-500 hover:text-red-700" />
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                                <button
                                  disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  onClick={() => addTrainOperatorsRow(0)}
                                  type="button"
                                  className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
                                  add <FiPlus />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-8 items-end">
                            <div className="flex flex-col gap-3 mb-3">
                              <span className="font-semibold">
                                Station Operator(s)
                              </span>
                              <div>
                                <table className="border">
                                  <thead>
                                    <tr>
                                      <th className="border px-3">
                                        Operator name
                                      </th>
                                      <th className="border px-3">
                                        Nature of activities on the siding
                                      </th>
                                      <th className="border text-center"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {blockNetworks[
                                      itemIndex
                                    ].stationOperators?.map(
                                      (train, trainIndex) => (
                                        <tr key={train.id}>
                                          <td className="border p-2">
                                            {" "}
                                            < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                              {...register(
                                                `runningLinesArray.0.stationOperators.${trainIndex}.activityNature`
                                              )}
                                              type="text"
                                              className="rounded-md border"
                                            />{" "}
                                          </td>
                                          <td className="border px-3">
                                            < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                              {...register(
                                                `runningLinesArray.0.stationOperators.${trainIndex}.activityNature`
                                              )}
                                              type="text"
                                              className="rounded-md border"
                                            />
                                          </td>
                                          <td className=" px-3">
                                            <FiTrash2 className="text-red-500 hover:text-red-700" />
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                                <button
                                  disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  onClick={() => addStationOperatorsRow(0)}
                                  type="button"
                                  className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
                                  add <FiPlus />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-8 items-end">
                            <div className="flex flex-col gap-3 mb-3">
                              <span className="font-semibold">
                                Maintenance Contractor(s)
                              </span>
                              <div>
                                <table className="border">
                                  <thead>
                                    <tr>
                                      <th className="border px-3">
                                        Operator name
                                      </th>
                                      <th className="border px-3">
                                        Nature of activities on the siding
                                      </th>
                                      <th className="border text-center"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {blockNetworks[
                                      itemIndex
                                    ].maintenanceContractors?.map(
                                      (train, trainIndex) => (
                                        <tr key={train.id}>
                                          <td className="border p-2">
                                            {" "}
                                            < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                              {...register(
                                                `runningLinesArray.0.maintenanceContractors.${trainIndex}.activityNature`
                                              )}
                                              type="text"
                                              className="rounded-md border"
                                            />{" "}
                                          </td>
                                          <td className="border px-3">
                                            < input disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                              {...register(
                                                `runningLinesArray.0.maintenanceContractors.${trainIndex}.activityNature`
                                              )}
                                              type="text"
                                              className="rounded-md border"
                                            />
                                          </td>
                                          <td className=" px-3">
                                            <FiTrash2 className="text-red-500 hover:text-red-700" />
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                                <button
                                  disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                                  onClick={() =>
                                    addMaintenanceContractorsRow(0)
                                  }
                                  type="button"
                                  className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
                                  add <FiPlus />
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </ol>
        </div>
        <div className="flex justify-end items-end mt-10 gap-10">
          <button
            onClick={onHandleBack}
            className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500">
            Back
          </button>
          {!isAdministrator.isAdministrator ?
            <button className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">
              Next
            </button> :
            <button onClick={onHandleFormSubmit} type="button" className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">
              Next
            </button>
          }
        </div>
      </form>
    </div>
  );
};