
import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import useFormSubmission from "@/hooks/useFormSubmission";
import { FiPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormSectionComponent from "@/components/FormSectionComponent";
import { useState } from "react";





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

export const AnnualSafetyImprovementPlanReport = ({
  application = null,
  isAdministrator,
  formMetadata,
}) => {
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
      setFormData((prevFrormData) => ({
        ...prevFrormData,
        step6: application.step6,
      }));
      onHandleNext();
    } else {
      setFormData((prevFrormData) => ({ ...prevFrormData, step6: data }));
      if (application) {
        application.step6 = data;
        submitting(application).then((data: any) => {
          onHandleNext();
        });
      } else {
        if (formData?.step6 != null) {
          formData.step6 = data;
        }
        submitting(formData).then((data: any) => {
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
                8 Annual Safety Improvement Plan Report
              </h4>
            </li>
            <div>
              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4 border rounded-sm p-4">
                  <label htmlFor="transportCommuters">
                    Please note that the content of your ASIP submission shall
                    comply with the minimum requirements as detailed in the
                    latest SMS and SMSR Determination published by the Regulator
                    and the SANS 3000-1. The Annual Safety Improvement Plan
                    shall include the following elements:
                  </label>
                </div>
              </div>

              <div className="col-span-4 mb-2 mt-4">
                <span className="pr-3">7.1</span>
                <div className="flex justify-between">
                  <label htmlFor="transportCommuters">
                    A - 1 : Annual Safety Improvement Plans(ASIP)
                  </label>
                  <div>
                    <input
                      type="file"
                      placeholder="Add File"
                      className="p-1 border rounded-md w-[200px]"
                      multiple
                    />
                  </div>
                </div>
              </div>




              <div className="grid grid-cols-2 gap-2 mt-3 items-end">
                <div className="flex flex-col gap-3 mb-3">
                  <span className="font-semibold">Train Operator(s)</span>
                  <div>
                    <table className="border">
                      <thead>
                        <tr>
                          <th className="border px-3">Operator Comment</th>
                          <th className="border px-3">
                           Status
                          </th>
                          <th className="border px-3">RSR Comment</th>
                          <th className="border px-3">
                           Status
                          </th>
                          <th className="border text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        
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
                </div>
              </div>
            </div>
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
