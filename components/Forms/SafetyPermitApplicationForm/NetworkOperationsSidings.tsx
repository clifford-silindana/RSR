import { ChangeEvent, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import useFormSubmission from "@/hooks/useFormSubmission";
import { FiPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className=" w-8 text-white bg-danger rounded cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

type TFormValues = {
  partyObjection: "yes" | "no" | undefined;
  nameOfObjectingParty: string;
  contactOfObjectingParty: string;
  runningLines: string;
  sidings: string;
  siddingName: string;
  siddingValue: string;
  dangerousGoods: string;
  goodTransported: string;
  isCapeGauge: string;
  lengthOfStandardGauge: number;
  standardGauge: string;
  isStandardGauge: string;
  narrowGauge: string;
  isWithNarrowGauge: string;
  isLevelCrossingOnSiding: string;
  isAnyFormOfTraction: string;
};

interface NetworkParty {
  id: number;
  operatorName: string;
  activityNature: string;
}
//NETWORK OPERATIONS SIDINGS

interface NetworkOperationsSiding {
  id: number;
  formValues: TFormValues;
  repeating: BlockSiding;
}

interface SidingCover {
  id: number;
  status: String;
  totalLength: String;
  locationSiding: String;
  sidingCity: String;
}

interface SidingAllCover {
  id: number;
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

interface BlockRunning {
  networkParties: NetworkParty[];
}

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

interface BlockSiding {
  dangerousOrSide: IDangerousOrSide[];
  sidingsToBeCoverd: SidingCover[];
  sidingsAllToBeCoverd: SidingAllCover[];
  trainOperators: IOperator[];
  stationOperators: IOperator[];
  maintenanceContractors: IOperator[];
}

export const NetworkOperationsSidings = ({
  application = null,
  isAdministrator,
  formMetadata,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  debugger;
  const provinceChoice: any[] = formMetadata?.filter(
    (m: any) => m.metaType == "PROVINCE"
  );
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  const [blockRunningLines, setBlockRunningLines] = useState<BlockRunning[]>([
    {
      networkParties: [
        {
          id: Math.floor(Math.random() * 1000),
          operatorName: "",
          activityNature: "",
        },
      ],
    },
  ]);

  const [blockSidings, setBlockSidings] = useState<BlockSiding[]>([
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
  ]);

  const initialMulSidings = [
    {
      id: Math.floor(Math.random() * 1000),
      formValues: {
        partyObjection: undefined,
        nameOfObjectingParty: "",
        contactOfObjectingParty: "",
        runningLines: "",
        sidings: "",
        siddingName: "",
        siddingValue: "",
        dangerousGoods: "",
        goodTransported: "",
        isCapeGauge: "",
        lengthOfStandardGauge: 0,
        standardGauge: "",
        isStandardGauge: "",
        narrowGauge: "",
        isWithNarrowGauge: "",
        isLevelCrossingOnSiding: "",
        isAnyFormOfTraction: "",
      },
      repeating: {
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
    },
  ];

  const [mulSidings, SetMulSidings] = useState<NetworkOperationsSiding[]>([
    initialMulSidings[0],
  ]);

  console.log("Sidings",application);
  const [blockNetworks, setBlockNetworks] = useState([]);
  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();
  const { register, handleSubmit, watch, control } = useForm<TFormValues>({
    defaultValues: application ? application.step5 : formData.step5,
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "runningLinesArray",
  });

  const { loading, submitting, uploadDocument } = useFormSubmission();

  const onHandleFormSubmit = (data: any) => {
    if (isAdministrator?.isAdministrator) {
      setFormData((prevFrormData) => ({
        ...prevFrormData,
        step5: application.step5,
      }));
      onHandleNext();
    } else {
      setFormData((prevFrormData) => ({ ...prevFrormData, step5: data }));
      if (application) {
        application.step5 = data;
        submitting(application).then((data: any) => {
          onHandleNext();
        });
      } else {
        if (formData?.step5 != null) {
          formData.step5 = data;
        }
        submitting(formData).then((data: any) => {
          onHandleNext();
        });
      }
    }
  };

  // Updates
  const HandleNetworkPartiesUpdate = (
    e: ChangeEvent<HTMLInputElement>,
    blockIndex: number,
    itemIndex: number,
    inputName: string
  ) => {
    const { name, value } = e.target;

    setBlockRunningLines((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          // If the block index matches
          return {
            ...block,
            networkParties: block.networkParties.map((item, iIndex) =>
              iIndex === itemIndex
                ? {
                    ...item,
                    [inputName]: value,
                  }
                : item
            ),
          };
        } else {
          return block;
        }
      })
    );
  };

  // Add rows
  const addDangerousOrSideRow = (blockIndex: number) => {
    setBlockSidings((prevData) =>
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

    //console.log("after add ", blockRunningLines);
  };

  const addSidingsToBeCoverdRow = (blockIndex: number) => {
    setBlockSidings((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            sidingsToBeCoverd: [
              ...block.sidingsToBeCoverd,
              {
                id: Math.floor(Math.random() * 1000),
                status: "",
                totalLength: "",
                locationSiding: "",
                sidingCity: "",
              },
            ],
          };
        } else {
          return block;
        }
      })
    );

    //console.log("after add ", blockRunningLines);
  };

  const addSidingsAllToBeCoverdRow = (blockIndex: number) => {
    setBlockSidings((prevData) =>
      prevData.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          return {
            ...block,
            sidingsAllToBeCoverd: [
              ...block.sidingsAllToBeCoverd,
              {
                id: Math.floor(Math.random() * 1000),
                streetAddress: "",
                contactDetails: "",
                telephone: "",
                email: "",
              },
            ],
          };
        } else {
          return block;
        }
      })
    );

    //console.log("after add ", blockRunningLines);
  };
  const addTrainOperatorsRow = (blockIndex: number) => {
    setBlockSidings((prevData) =>
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

    //console.log("after add ", blockRunningLines);
  };
  const addStationOperatorsRow = (blockIndex: number) => {
    setBlockSidings((prevData) =>
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

    //console.log("after add ", blockRunningLines);
  };
  const addMaintenanceContractorsRow = (blockIndex: number) => {
    setBlockSidings((prevData) =>
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

    //console.log("after add ", blockRunningLines);
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
    setBlockSidings(newRows);
  };

  const handleDangerousOrSide = (blockIndex: number, id: number): void => {
    setBlockSidings((prevData) =>
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
    setBlockSidings((prevData) =>
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
    setBlockSidings((prevData) =>
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
    setBlockSidings((prevData) =>
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
    setBlockSidings((prevData) =>
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
  const sidings = watch("sidings");
  const dangerousGoods = watch("dangerousGoods");
  const goodTransported = watch("goodTransported");
  const isCapeGauge = watch("isCapeGauge");
  const isStandardGauge = watch("isStandardGauge");
  const isWithNarrowGauge = watch("isWithNarrowGauge");
  const isLevelCrossingOnSiding = watch("isLevelCrossingOnSiding");
  const isAnyFormOfTraction = watch("isAnyFormOfTraction");

  return (
    <div>
      <form className="pb-6 px-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <ol className="">
            <li>
              <h4 className="text-l font-semibold uppercase">
                5 Description of Network Operations <b>Sidings</b>
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
              </div>{" "}
            </div>

            {/** RENDER MULTIPLE SIDINGS*/}
            <div>
              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4">
                  <label htmlFor="sidings">
                    Do you operate, manage and/or maintain <b>SIDINGS</b>{" "}
                    (Private sidings, yards, municipalities, ports, and any rail
                    activity in an enclosed area - excluding main and branch
                    lines)?
                  </label>
                </div>
                <div className="flex items-center gap-2 ml-5">
                  <div className="flex flex-col">
                    <label htmlFor="yes">Yes</label>
                    <input
                      disabled={
                        isAdministrator?.isAdministrator ||
                        application?.step10?.statusId === 39
                      }
                      type="radio"
                      id="yes"
                      value="yes"
                      className="h-5 w-5"
                      {...register("sidings")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="no">No</label>
                    <input
                      disabled={
                        isAdministrator?.isAdministrator ||
                        application?.step10?.statusId === 39
                      }
                      type="radio"
                      id="yes"
                      value="no"
                      className="h-5 w-5"
                      {...register("sidings")}
                    />
                  </div>
                </div>
              </div>

              {mulSidings.map((item, index) => (
                <div key={index}>
                  {sidings === "yes" && (
                    <>
                      {blockSidings.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="mt-5 rounded-sm border border-logoorange border-stroke p-2"
                        >
                          <div className="py-2 mb-5">
                            <div className="flex gap-3">
                              <span>5.1</span>
                              <h4>
                                List <b>Network Operations sidings</b> to be
                                covered on this permit
                              </h4>
                              <button
                                className="ml-auto cursor-pointer"
                                onClick={() =>
                                  handleRemoveSidingsToBeCoverd(0, index)
                                }
                              >
                                <FiTrash2 style={{ color: "red" }} />
                              </button>
                            </div>

                            <div className="grid grid-cols-3 gap-10 mt-5">
                              <div className="col-span-2 flex flex-col">
                                <label>Siding name</label>
                                <input
                                  disabled={
                                    isAdministrator?.isAdministrator ||
                                    application?.step10?.statusId === 39
                                  }
                                  type="text"
                                  {...register(`siddingName`)}
                                  className=" px-4 border rounded-md"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label>Siding number</label>
                                <input
                                  disabled={
                                    isAdministrator?.isAdministrator ||
                                    application?.step10?.statusId === 39
                                  }
                                  type="text"
                                  {...register("siddingValue")}
                                  className=" px-4 border rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <span>5.2</span>
                            <label htmlFor="typeOfGoods" className="w-full">
                              Select type of goods/commodities transported
                            </label>
                            <select
                              disabled={
                                isAdministrator?.isAdministrator ||
                                application?.step10?.statusId === 39
                              }
                              {...register("goodTransported")}
                              className="px-4 border rounded-md w-full"
                            >
                              <option selected disabled>
                                Select{" "}
                              </option>
                              <option value="dangerous goods">
                                Dangerous goods
                              </option>
                              <option value="general freight">
                                General freight
                              </option>
                            </select>
                          </div>
                          <div className="mt-10 w-full">
                            <div className="w-full">
                              <div className="flex gap-3 items-center mb-3">
                                <span>5.2.1</span>
                                <h4 className="font-medium text-lg">
                                  {goodTransported === "dangerous goods"
                                    ? "Dangerous goods"
                                    : "General freight"}
                                </h4>
                              </div>
                              <table className="table-aout border w-full">
                                <thead>
                                  <tr>
                                    <th className="border p-2">
                                      Types of Dangerous goods
                                    </th>
                                    <th className="border p-2">
                                      TOTAL ANNUAL RAIL TONNAGES MOVED IN
                                      PREVIOUS CYCLE NOTE: Expressed in tonnes
                                    </th>
                                    <th className="border p-2">
                                      DISTANCE WITH GOODS NOTE: Expressed in KM
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {blockSidings[itemIndex].dangerousOrSide?.map(
                                    (train, trainIndex) => (
                                      <tr key={train.id}>
                                        <td className="border">
                                          <input
                                            disabled={
                                              isAdministrator?.isAdministrator ||
                                              application?.step10?.statusId ===
                                                39
                                            }
                                            {...register(
                                              `sidingsArray.${itemIndex}.dangerousOrSide.${trainIndex}.type`
                                            )}
                                            type="text"
                                            className="border border-y-gray-2 px-2 w-auto m-2 rounded-md"
                                          />
                                        </td>
                                        <td className="border">
                                          <input
                                            disabled={
                                              isAdministrator?.isAdministrator ||
                                              application?.step10?.statusId ===
                                                39
                                            }
                                            {...register(
                                              `sidingsArray.${itemIndex}.dangerousOrSide.${trainIndex}.totalTonnagePreviousCycle`
                                            )}
                                            type="text"
                                            className="border border-y-gray-2 px-2 w-auto m-2 rounded-md"
                                          />
                                        </td>
                                        <td className="border">
                                          <input
                                            disabled={
                                              isAdministrator?.isAdministrator ||
                                              application?.step10?.statusId ===
                                                39
                                            }
                                            {...register(
                                              `sidingsArray.${itemIndex}.dangerousOrSide.${trainIndex}.distanceGoodNote`
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
                                disabled={
                                  isAdministrator?.isAdministrator ||
                                  application?.step10?.statusId === 39
                                }
                                type="button"
                                onClick={() => addDangerousOrSideRow(itemIndex)}
                                className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900"
                              >
                                add <FiPlus />
                              </button>
                              {/* add here component  */}
                              <div className="flex items-center gap-3 mb-2 mt-10">
                                <span>5.3</span>
                                <h4 className="font-medium text-lg ">
                                  Siding status to be covered on this permit.
                                </h4>
                              </div>
                              <table className="table-aout border w-full">
                                <thead>
                                  <tr>
                                    <th className="border p-2">
                                      Siding Status
                                    </th>
                                    <th className="border p-2">
                                      Total Length in KM
                                    </th>
                                    <th className="border p-2">
                                      Location of Siding
                                    </th>
                                    <th className="border p-2">
                                      Siding City/Town
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {blockSidings[
                                    itemIndex
                                  ].sidingsToBeCoverd?.map(
                                    (train, trainIndex) => (
                                      <tr key={train.id}>
                                        <td className="border px-3">
                                          <select
                                            disabled={
                                              isAdministrator?.isAdministrator ||
                                              application?.step10?.statusId ===
                                                39
                                            }
                                            {...register(
                                              `sidingsArray.${itemIndex}.sidingsToBeCoverd.${trainIndex}.status`
                                            )}
                                            name=""
                                            id=""
                                            className="border rounded-md mx-auto w-full"
                                          >
                                            <option value="">Select</option>
                                            <option value="">Active</option>
                                            <option value="">Dormant</option>
                                            <option value="">Spiked</option>
                                          </select>
                                        </td>
                                        <td className="border">
                                          <input
                                            disabled={
                                              isAdministrator?.isAdministrator ||
                                              application?.step10?.statusId ===
                                                39
                                            }
                                            {...register(
                                              `sidingsArray.${itemIndex}.sidingsToBeCoverd.${trainIndex}.totalLength`
                                            )}
                                            type="number"
                                            className="border border-y-gray-2 px-2 w-auto m-2 rounded-md"
                                          />
                                        </td>
                                        <td className="border px-3">
                                          <select
                                            disabled={
                                              isAdministrator?.isAdministrator ||
                                              application?.step10?.statusId ===
                                                39
                                            }
                                            {...register(
                                              `sidingsArray.${itemIndex}.sidingsToBeCoverd.${trainIndex}.locationSiding`
                                            )}
                                            className="border rounded-md mx-auto w-full"
                                          >
                                            {provinceChoice?.map((province) => (
                                              <option
                                                defaultValue={province.id}
                                              >
                                                {province.name}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td className="border px-3">
                                          <input
                                            type="text"
                                            disabled={
                                              isAdministrator?.isAdministrator ||
                                              application?.step10?.statusId ===
                                                39
                                            }
                                            {...register(
                                              `sidingsArray.${itemIndex}.sidingsToBeCoverd.${trainIndex}.sidingCity`
                                            )}
                                            className="border rounded-md mx-auto w-full"
                                          />
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <button
                                disabled={
                                  isAdministrator?.isAdministrator ||
                                  application?.step10?.statusId === 39
                                }
                                type="button"
                                onClick={() =>
                                  addSidingsToBeCoverdRow(itemIndex)
                                }
                                className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900"
                              >
                                add <FiPlus />
                              </button>
                              <div className="mt-5">
                                <div className="grid grid-cols-5 py-2 text-sm items-center">
                                  <div className="col-span-4">
                                    <span className="pr-3">5.4</span>
                                    <label htmlFor="">
                                      Is the siding gauge width Cape Gauge
                                      (1067mm)?
                                    </label>
                                  </div>
                                  <div className="flex gap-2 ml-5">
                                    <div className="flex flex-col">
                                      <label htmlFor="">Yes</label>
                                      <input
                                        disabled={
                                          isAdministrator?.isAdministrator ||
                                          application?.step10?.statusId === 39
                                        }
                                        {...register("isCapeGauge")}
                                        type="radio"
                                        id="yes"
                                        value="yes"
                                        className="h-5 w-5"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <label htmlFor="">No</label>
                                      <input
                                        disabled={
                                          isAdministrator?.isAdministrator ||
                                          application?.step10?.statusId === 39
                                        }
                                        {...register("isCapeGauge")}
                                        type="radio"
                                        value="no"
                                        className="h-5 w-5"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <>
                                  {isCapeGauge === "yes" && (
                                    <>
                                      <div className="flex py-2 text-sm items-center justify-between">
                                        <div className="col-span-3">
                                          <span className="ml-5 pr-3">
                                            5.4.1
                                          </span>
                                          <label htmlFor="totalLenghtCape">
                                            Indicate the total length of
                                            Standard Gauge sidings in kilometre
                                          </label>
                                        </div>
                                        <div className="col-span-3 mr-5">
                                          <input
                                            disabled={
                                              isAdministrator?.isAdministrator ||
                                              application?.step10?.statusId ===
                                                39
                                            }
                                            {...register(
                                              "lengthOfStandardGauge"
                                            )}
                                            id=""
                                            type="text"
                                            placeholder=""
                                            className=" px-4 border rounded-md w-full"
                                          />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </>
                              </div>
                              <div className="">
                                <div className="grid grid-cols-5 py-2 text-sm items-center">
                                  <div className="col-span-4">
                                    <span className="pr-3">5.5</span>
                                    <label htmlFor="">
                                      Is the siding gauge width Standard Gauge
                                      (1435mm)?
                                    </label>
                                  </div>
                                  <div className="flex gap-2 ml-5">
                                    <div className="flex flex-col">
                                      <label htmlFor="">Yes</label>
                                      <input
                                        disabled={
                                          isAdministrator?.isAdministrator ||
                                          application?.step10?.statusId === 39
                                        }
                                        {...register("isStandardGauge")}
                                        type="radio"
                                        id="yes"
                                        value="yes"
                                        className="h-5 w-5"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <label htmlFor="">No</label>
                                      <input
                                        disabled={
                                          isAdministrator?.isAdministrator ||
                                          application?.step10?.statusId === 39
                                        }
                                        {...register("isStandardGauge")}
                                        type="radio"
                                        value="no"
                                        className="h-5 w-5"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <>
                                  {isStandardGauge === "yes" && (
                                    <div className="flex py-2 text-sm items-center justify-between">
                                      <div className="col-span-3">
                                        <span className="ml-5 pr-3">5.5.1</span>
                                        <label htmlFor="totalLenghtCape">
                                          Indicate the total length of Standard
                                          Gauge sidings in kilometre
                                        </label>
                                      </div>
                                      <div className="col-span-3 mr-5">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          {...register("standardGauge")}
                                          id=""
                                          type="text"
                                          placeholder=""
                                          className=" px-4 border rounded-md w-full"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              </div>
                              <div className="">
                                <div className="grid grid-cols-5 py-2 text-sm items-center">
                                  <div className="col-span-4">
                                    <span className="pr-3">5.6</span>
                                    <label htmlFor="">
                                      Is the siding gauge width Narrow Gauge
                                      (610mm)?
                                    </label>
                                  </div>
                                  <div className="flex gap-2 ml-5">
                                    <div className="flex flex-col">
                                      <label htmlFor="">Yes</label>
                                      <input
                                        disabled={
                                          isAdministrator?.isAdministrator ||
                                          application?.step10?.statusId === 39
                                        }
                                        {...register("isWithNarrowGauge")}
                                        type="radio"
                                        id="yes"
                                        value="yes"
                                        className="h-5 w-5"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <label htmlFor="">No</label>
                                      <input
                                        disabled={
                                          isAdministrator?.isAdministrator ||
                                          application?.step10?.statusId === 39
                                        }
                                        {...register("isWithNarrowGauge")}
                                        type="radio"
                                        id="yes"
                                        value="no"
                                        className="h-5 w-5"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <>
                                  {isWithNarrowGauge === "yes" && (
                                    <div className="flex py-2 text-sm items-center justify-between">
                                      <div className="col-span-3">
                                        <span className="ml-5 pr-3">5.6.1</span>
                                        <label htmlFor="totalLenghtCape">
                                          Indicate the total length of
                                          Narrow-Gauge sidings in kilometre.
                                        </label>
                                      </div>
                                      <div className="col-span-3 mr-5">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          {...register("narrowGauge")}
                                          id=""
                                          type="text"
                                          placeholder=""
                                          className=" px-4 border rounded-md w-full"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              </div>
                              <div className="flex items-center mt-3">
                                <span className="pr-3">5.7</span>
                                <h4>
                                  List all the sidings to be covered on this
                                  permit
                                </h4>
                              </div>
                              <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                <table className="min-w-full mt-2 bg-white border rounded border-gray-300">
                                  <thead className="uppercase">
                                    <tr>
                                      <th className="py-2 px-4 border">
                                        PHYSICAL STREET ADDRESS OF THE SIDING
                                      </th>
                                      <th className="py-2 px-4 border">
                                        NAME AND CONTACT DETAILS OF THE PERSON
                                        RESPONSIBLE FOR THE RAILWAY SAFETY AT
                                        THE SIDING
                                      </th>
                                      <th className="py-2 px-4 border">
                                        TELEPHONE
                                      </th>
                                      <th className="py-2 px-4 border">
                                        EMAIL
                                      </th>
                                      <th className="py-2 px-4 border"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {blockSidings[0].sidingsAllToBeCoverd?.map(
                                      (train, trainIndex) => (
                                        <tr key={train.id}>
                                          <td className="py-2 px-4 border">
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              placeholder=""
                                              className="px-4 border rounded-md w-full"
                                              {...register(
                                                `sidingsArray.0.sidingsAllToBeCoverd.${trainIndex}.sidingNumber`
                                              )}
                                              defaultValue={train.sidingNumber}
                                            />
                                          </td>
                                          <td className="py-2 px-4 border">
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              placeholder=""
                                              className="px-4 border rounded-md w-full"
                                              {...register(
                                                `sidingsArray.0.sidingsAllToBeCoverd.${trainIndex}.streetAddress`
                                              )}
                                              defaultValue={train.streetAddress}
                                            />
                                          </td>
                                          <td className="py-2 px-4 border">
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              placeholder=""
                                              className="px-4 border rounded-md w-full"
                                              {...register(
                                                `sidingsArray.0.sidingsAllToBeCoverd.${trainIndex}.contactDetails`
                                              )}
                                              defaultValue={
                                                train.contactDetails
                                              }
                                            />
                                          </td>
                                          <td className="py-2 px-4 border">
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              placeholder=""
                                              className="px-4 border rounded-md w-full"
                                              {...register(
                                                `sidingsArray.0.sidingsAllToBeCoverd.${trainIndex}.telephone`
                                              )}
                                              defaultValue={train.telephone}
                                            />
                                          </td>
                                          <td className="py-2 px-4 border">
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              placeholder=""
                                              className="px-4 border rounded-md w-full"
                                              {...register(
                                                `sidingsArray.0.sidingsAllToBeCoverd.${trainIndex}.email`
                                              )}
                                              defaultValue={train.email}
                                              className="w-full"
                                            />
                                          </td>
                                          <td className="py-2 px-4 border">
                                            <button
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              type="button"
                                              onClick={() =>
                                                handleRemoveSidingsToBeCoverd(
                                                  0,
                                                  train.id
                                                )
                                              }
                                              className="text-red-500 hover:text-red-700"
                                            >
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
                                disabled={
                                  isAdministrator?.isAdministrator ||
                                  application?.step10?.statusId === 39
                                }
                                onClick={() => addSidingsAllToBeCoverdRow(0)}
                                type="button"
                                className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900"
                              >
                                add <FiPlus />
                              </button>

                              <div className="flex mt-5">
                                <span className="pr-3">5.8</span>
                                <h4>
                                  List all other parties allowed access to each
                                  siding, as well as the nature of their
                                  activities on the siding, including train
                                  operators, station operators, maintenance
                                  contractors. Add rows as needed.
                                </h4>
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg mt-3">
                                  Train Operator(s)
                                </h4>
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
                                    {blockSidings[
                                      itemIndex
                                    ].trainOperators?.map(
                                      (train, trainIndex) => (
                                        <tr key={train.id}>
                                          <td className="border p-2">
                                            {" "}
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              {...register(
                                                `sidingsArray.0.trainOperators.${trainIndex}.name`
                                              )}
                                              type="text"
                                              className="rounded-md border"
                                            />{" "}
                                          </td>
                                          <td className="border px-3">
                                            <select
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              {...register(
                                                `sidingsArray.0.trainOperators.${trainIndex}.activityNature`
                                              )}
                                              className="border rounded-md w-full text-center"
                                            >
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
                                  disabled={
                                    isAdministrator?.isAdministrator ||
                                    application?.step10?.statusId === 39
                                  }
                                  onClick={() => addTrainOperatorsRow(0)}
                                  type="button"
                                  className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900"
                                >
                                  add <FiPlus />
                                </button>
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg mt-2">
                                  Station Operator(s)
                                </h4>
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
                                    {blockSidings[
                                      itemIndex
                                    ].stationOperators?.map(
                                      (train, trainIndex) => (
                                        <tr key={train.id}>
                                          <td className="border p-2">
                                            {" "}
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              {...register(
                                                `sidingsArray.0.stationOperators.${trainIndex}.activityNature`
                                              )}
                                              type="text"
                                              className="rounded-md border"
                                            />{" "}
                                          </td>
                                          <td className="border px-3">
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              {...register(
                                                `sidingsArray.0.stationOperators.${trainIndex}.activityNature`
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
                                  disabled={
                                    isAdministrator?.isAdministrator ||
                                    application?.step10?.statusId === 39
                                  }
                                  onClick={() => addStationOperatorsRow(0)}
                                  type="button"
                                  className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900"
                                >
                                  add <FiPlus />
                                </button>
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg mt-2">
                                  Maintenance Contractor(s)
                                </h4>
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
                                    {blockSidings[
                                      itemIndex
                                    ].maintenanceContractors?.map(
                                      (train, trainIndex) => (
                                        <tr key={train.id}>
                                          <td className="border p-2">
                                            {" "}
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              {...register(
                                                `sidingsArray.0.maintenanceContractors.${trainIndex}.activityNature`
                                              )}
                                              type="text"
                                              className="rounded-md border"
                                            />{" "}
                                          </td>
                                          <td className="border px-3">
                                            <input
                                              disabled={
                                                isAdministrator?.isAdministrator ||
                                                application?.step10
                                                  ?.statusId === 39
                                              }
                                              {...register(
                                                `sidingsArray.0.maintenanceContractors.${trainIndex}.activityNature`
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
                                  disabled={
                                    isAdministrator?.isAdministrator ||
                                    application?.step10?.statusId === 39
                                  }
                                  onClick={() =>
                                    addMaintenanceContractorsRow(0)
                                  }
                                  type="button"
                                  className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900"
                                >
                                  add <FiPlus />
                                </button>
                              </div>
                              <div className="grid grid-cols-5 py-2 text-sm items-center">
                                <div className="col-span-4">
                                  <span className="pr-3">5.9</span>
                                  <label htmlFor="">
                                    Are there level crossings on the sidings?
                                    (Y/N)
                                  </label>
                                </div>
                                <div className="flex gap-2 ml-5">
                                  <div className="flex flex-col">
                                    <label htmlFor="yes">Yes</label>
                                    <input
                                      disabled={
                                        isAdministrator?.isAdministrator ||
                                        application?.step10?.statusId === 39
                                      }
                                      {...register("isLevelCrossingOnSiding")}
                                      type="radio"
                                      id="yes"
                                      value="yes"
                                      className="h-5 w-5"
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label htmlFor="no">No</label>
                                    <input
                                      disabled={
                                        isAdministrator?.isAdministrator ||
                                        application?.step10?.statusId === 39
                                      }
                                      {...register("isLevelCrossingOnSiding")}
                                      type="radio"
                                      id="yes"
                                      value="no"
                                      className="h-5 w-5"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* if yes show this thable */}
                              {isLevelCrossingOnSiding === "yes" && (
                                <div className="">
                                  <table className="w-full">
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.9.1 How many level crossings are
                                        located on public roads.
                                      </td>
                                      <td className="w-[20%] border px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="number"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.9.2 How many level crossings are
                                        located on private roads
                                      </td>
                                      <td className="w-[20%] border p-1 px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="number"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.9.3 Who operates the network to which
                                        the siding is connected?
                                      </td>
                                      <td className="w-[20%] border p-1 px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="text"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.9.4 Party/Operator responsible to
                                        place order for block loads/wagons to
                                        transport commodities
                                      </td>
                                      <td className="w-[20%] border p-1 px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="text"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.9.5 Party/Operator responsible for
                                        train control
                                      </td>
                                      <td className="w-[20%] border p-1 px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="text"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.9.6 Party/Operator responsible for
                                        allowing trains access to the siding
                                      </td>
                                      <td className="w-[20%] border p-1 px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="text"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.9.7 Party/Operator responsible for
                                        placing trains in the siding
                                      </td>
                                      <td className="w-[20%] border p-1 px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="text"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              )}

                              <div className="grid grid-cols-5 py-2 text-sm items-center">
                                <div className="col-span-4">
                                  <span className="pr-3">5.10</span>
                                  <label htmlFor="">
                                    Are trains/wagons moved (using any form of
                                    traction) after they are placed in the
                                    siding? (Y/N)
                                  </label>
                                </div>
                                <div className="flex gap-2 ml-5">
                                  <div className="flex flex-col">
                                    <label htmlFor="yes">Yes</label>
                                    <input
                                      disabled={
                                        isAdministrator?.isAdministrator ||
                                        application?.step10?.statusId === 39
                                      }
                                      {...register("isAnyFormOfTraction")}
                                      type="radio"
                                      id="yes"
                                      value="yes"
                                      className="h-5 w-5"
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label htmlFor="no">No</label>
                                    <input
                                      disabled={
                                        isAdministrator?.isAdministrator ||
                                        application?.step10?.statusId === 39
                                      }
                                      {...register("isAnyFormOfTraction")}
                                      type="radio"
                                      id="yes"
                                      value="no"
                                      className="h-5 w-5"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* if yes show this thable */}
                              {isAnyFormOfTraction === "yes" && (
                                <div className="">
                                  <table className="w-full">
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.10.1 If YES, partly responsible for
                                        the safe movement of trains/wagons after
                                        it is placed in the siding.
                                      </td>
                                      <td className="w-[20%] border px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="text"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="w-[80%] border p-1">
                                        5.10.2 Party responsible for collecting
                                        the block loads/wagons from the siding
                                        afterwards
                                      </td>
                                      <td className="w-[20%] border p-1 px-3">
                                        <input
                                          disabled={
                                            isAdministrator?.isAdministrator ||
                                            application?.step10?.statusId === 39
                                          }
                                          type="TEXT"
                                          name=""
                                          id=""
                                          className="border rounded-md px-4"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              )}

                              <div className="grid grid-cols-5 py-2 text-sm items-center mt-5">
                                <div className="col-span-2">
                                  <span className="pr-3">5.11</span>
                                  <label htmlFor="files" className="btn">
                                    Network diagrams: Upload
                                  </label>
                                  <input
                                    disabled={
                                      isAdministrator?.isAdministrator ||
                                      application?.step10?.statusId === 39
                                    }
                                    type="file"
                                    name="files"
                                    id=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>

            {sidings === "yes" && (
              <>
                <button
                  disabled={
                    isAdministrator?.isAdministrator ||
                    application?.step10?.statusId === 39
                  }
                  onClick={() => addSidingBlock()}
                  type="button"
                  className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900"
                >
                  add <FiPlus />
                </button>
              </>
            )}
          </ol>
        </div>
        <div className="flex justify-end items-end mt-10 gap-10">
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
