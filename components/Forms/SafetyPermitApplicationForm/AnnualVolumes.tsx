import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import useFormSubmission from "@/hooks/useFormSubmission";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
type TFormValues = {
  transportCommuters: string;
  transportPassengers: string;
  transportationOfDangerousGoods: string;
  annualVolumeGeneralFreigtTransportedTo: string;
  annualVolumePeopleAndGood: string;
  items: any[];
  annualCommutersTransported: number;
  annualKilometersForCommuters: number;
  annualPassengersTransported: number;
  annualKilometersForPassengers: number;
  annualTonsForDangerousGoods: number;
  onlyInvolvedInMovementOfEquipment: string;
  annualFeightKm: number;
  annualFeightTon: number;
  annualKilometersForDangerousGoods: number;
  wagonsPerDay: number;
  otherRailPerDay: number;
  locomotive: number;
  tonnesgrossday: number;
  tonnesgrossyear: number;
  tonnesd1: number;
  tonnesd2: number;
  tonnesd3: number;
};

export const AnnualVolumes = ({
  application = null,
  isAdministrator,
  allowEdit = true,
  asip
}) => {
  const [open, setOpen] = useState(false);
  const [openManualFee, setOpenManualFee] = useState(false);
  const [manualFee, setManualFee] = useState(null);
  const [manualClass, setManualClass] = useState(null);
  const [tempFormData, setTempFormData] = useState({});
  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    values: application ? application.step2 : formData.step2,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const { loading, submitting, calculateApplicationFee } = useFormSubmission();

  const handleManualFeeDialogClose = async () => {
    setOpenManualFee(false);
    if (application?.step2?.applicationFee) {
      application.step2.applicationFee.manualFee = manualFee;
      application.step2.applicationFee.operatorClass.manualClassName =
        manualClass;
      submitting(application)
        .then((data: any) => {
          //onHandleNext();
        })
        .catch((error: any) => {});
    }
  };

  const acceptCalculation = async () => {
    debugger;
    if (application?.step2?.applicationFee) {
      application.step2.applicationFee.manualFee =
        application?.step2?.applicationFee?.fee;
      application.step2.applicationFee.operatorClass.manualClassName =
        application.step2.applicationFee.operatorClass?.name;
      submitting(application)
        .then((data: any) => {
          //onHandleNext();
        })
        .catch((error: any) => {});
    }
  };

  const handleDialogClose = async () => {
    setOpen(false);

    // Calculate Application fee
    if (!formData.step2?.applicationFee) {
      const appFee = await calculateApplicationFee({
        ...formData,
        stepData: tempFormData,
      });

      setFormData((prevFrormData) => ({
        ...prevFrormData,
        step2: { ...tempFormData, applicationFee: appFee },
      }));

      formData.step2 = { ...tempFormData, applicationFee: appFee };
      submitting(formData)
        .then((data: any) => {
          onHandleNext();
        })
        .catch((error: any) => {});
    } else {
      onHandleNext();
    }
  };

  const onHandleFormSubmit = (currentFormData: any) => {
    const isReadOnly = !!formData.step2?.applicationFee || application;
    if (isReadOnly) {
      if (application) {
        setFormData((prevFrormData) => ({
          ...prevFrormData,
          step2: application.step2,
        }));
      }
      if (allowEdit === true) {
        setTempFormData(currentFormData);
      }
      onHandleNext();
    } else {
      setOpen(true);
      setTempFormData(currentFormData);
    }
  };
  const transportCommuters = watch("transportCommuters");
  const transportPassengers = watch("transportPassengers");
  const transportationOfDangerousGoods = watch(
    "transportationOfDangerousGoods"
  );
  const annualVolumePeopleAndGood = watch("annualVolumePeopleAndGood");
  const annualVolumeGeneralFreigtTransportedTo = watch(
    "annualVolumeGeneralFreigtTransportedTo"
  );
  const onlyInvolvedInMovementOfEquipment = watch(
    "onlyInvolvedInMovementOfEquipment"
  );
  let [wagonsPerDay, setWagonsPerDay] = useState(0);
  let [otherRailPerDay, setOtherRailPerDay] = useState(0);
  let [locomotive, setLocomotive] = useState(0);
  let [tonnesgrossday, setTonnesgrossday] = useState(0);
  let [tonnesgrossyear, setTonnesgrossyear] = useState(0);
  let [tonnesd1, setTonnesd1] = useState(0);
  let [tonnesd2, setTonnesd2] = useState(0);
  let [tonnesd3, setTonnesd3] = useState(0);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <Card>
                <CardContent>
                  <div>
                    This action cannot be undone. This will permanently add this
                    as your annual volumes.
                  </div>
                  <div>This information will be sent to RSR for review.</div>
                </CardContent>
              </Card>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={handleDialogClose}
              type="button"
              className="bg-logoorange"
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <form className="pb-6 px-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <ol className="">
            <li>
              <h4 className="text-l font-semibold uppercase">
                2. Annual Volumes Of People And Goods Transported during
                previous year (12-month Cycle)
                <span className="text-xs normal-case block">
                  Tick the appropriate box below and if “YES” provide further
                  detail requested.
                </span>
              </h4>
            </li>
            <div>
              <div className="grid grid-cols-4 py-2 items-center">
                <div className="col-span-3">
                  {errors.transportPassengers && (
                    <p className="text-danger">{`${errors.transportPassengers.message}`}</p>
                  )}
                </div>
                <div className="flex gap-2 ">
                  <span>Yes</span>
                  <span>No</span>
                </div>
              </div>
              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">2.1</span>
                  <label htmlFor="transportCommuters">
                    Involvement in the transportation of commuters
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    disabled={!allowEdit}
                    type="radio"
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("transportCommuters", {
                      required: "Tick all the appropriate box",
                    })}
                  />
                  <input
                    type="radio"
                    disabled={!allowEdit}
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("transportCommuters", {
                      required: "Tick all the appropriate box",
                    })}
                  />
                </div>
              </div>
              {transportCommuters === "yes" && (
                <>
                  <div className="grid grid-cols-4 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.1.1</span>
                      <label htmlFor="annualCommutersTransported">
                        If so, what is the annual total number of commuters
                        transported
                      </label>
                    </div>
                    <div className="mr-5">
                      {errors.annualCommutersTransported && (
                        <p className="text-danger">{`${errors.annualCommutersTransported.message}`}</p>
                      )}
                      <input
                        id="annualCommutersTransported"
                        type="number"
                        placeholder="number of commuters"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualCommutersTransported", {
                          required: "Anual commuters required ",
                        })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.1.2</span>
                      <label htmlFor="annualKilometersForCommuters">
                        State the total annual kilometre rail distance travelled
                        with commuters
                      </label>
                    </div>
                    <div className="mr-5">
                      {errors.annualKilometersForCommuters && (
                        <p className="text-danger">{`${errors.annualKilometersForCommuters.message}`}</p>
                      )}
                      <input
                        id="annualKilometersForCommuters"
                        type="number"
                        placeholder="Km covered"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualKilometersForCommuters", {
                          required: "Anual Kilometers required ",
                        })}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">2.2</span>
                  <label htmlFor="transportPassengers">
                    Involvement in the transportation of any other passengers
                    (including tourists, excluding commuters)
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    disabled={!allowEdit}
                    {...register("transportPassengers", {
                      required: "Tick all the appropriate box",
                    })}
                  />
                  <input
                    type="radio"
                    id="yes"
                    disabled={!allowEdit}
                    value="no"
                    className="h-5 w-5"
                    {...register("transportPassengers", {
                      required: "Tick all the appropriate box",
                    })}
                  />
                </div>
              </div>
              {transportPassengers === "yes" && (
                <>
                  <div className="grid grid-cols-4 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.2.1</span>
                      <label htmlFor="annualPassengersTransported">
                        Annual total number of passengers transported
                      </label>
                    </div>
                    <div className="mr-5">
                      {errors.annualPassengersTransported && (
                        <p className="text-danger">{`${errors.annualPassengersTransported.message}`}</p>
                      )}
                      <input
                        id="annualPassengersTransported"
                        type="number"
                        disabled={!allowEdit}
                        placeholder="number of passengers"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualPassengersTransported", {
                          required: "Required",
                        })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.2.2</span>
                      <label htmlFor="annualKilometersForPassengers">
                        Total annual kilometre rail distance travelled with
                        passengers (including tourists), excluding commuters
                      </label>
                    </div>
                    <div className="mr-5">
                      <input
                        disabled={!allowEdit}
                        id="annualKilometersForPassengers"
                        type="number"
                        placeholder="Km covered"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualKilometersForPassengers")}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">2.3</span>
                  <label htmlFor="transportationOfDangerousGoods">
                    Do you dispatch/receive/transport dangerous goods by rail?
                    If yes, provide details in 2.3.1 and 2.3.2
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    disabled={!allowEdit}
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("transportationOfDangerousGoods")}
                  />
                  <input
                    type="radio"
                    disabled={!allowEdit}
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("transportationOfDangerousGoods")}
                  />
                </div>
              </div>
              {transportationOfDangerousGoods === "yes" && (
                <>
                  <div className="grid grid-cols-4 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.3.1</span>
                      <label htmlFor="annualTonsForDangerousGoods">
                        What is the total annual dangerous goods tonnes?
                      </label>
                    </div>
                    <div className="mr-5">
                      <input
                        disabled={!allowEdit}
                        id="annualTonsForDangerousGoods"
                        type="number"
                        placeholder="annual tonnes"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualTonsForDangerousGoods")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.3.2</span>
                      <label htmlFor="annualKilometersForDangerousGoods">
                        What is the total annual kilometre rail distance covered
                        with dangerous goods?
                      </label>
                    </div>
                    <div className="mr-5">
                      <input
                        disabled={!allowEdit}
                        id="annualKilometersForDangerousGoods"
                        type="number"
                        placeholder="Km covered"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualKilometersForDangerousGoods")}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">2.4</span>
                  <label htmlFor="annualVolumeGeneralFreigtTransportedTo">
                    Do you dispatch/receive/transport general freight by rail?
                    If yes, provide details in 2.4.1 and 2.4.2 below
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    disabled={!allowEdit}
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("annualVolumeGeneralFreigtTransportedTo")}
                  />
                  <input
                    type="radio"
                    disabled={!allowEdit}
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("annualVolumeGeneralFreigtTransportedTo")}
                  />
                </div>
              </div>
              {annualVolumeGeneralFreigtTransportedTo === "yes" && (
                <>
                  <div className="grid grid-cols-4 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.4.1</span>
                      <label htmlFor="annualFeightTon">
                        What is the total annual general freight tonnes?
                      </label>
                    </div>
                    <div className="mr-5">
                      <input
                        disabled={!allowEdit}
                        id="annualFeightTon"
                        type="number"
                        placeholder="annual tonnes"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualFeightTon")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.4.2</span>
                      <label htmlFor="annualFeightKm">
                        What is the total annual kilometre rail distance
                        travelled with general freight?
                      </label>
                    </div>
                    <div className="mr-5">
                      <input
                        disabled={!allowEdit}
                        id="annualFeightKm"
                        type="number"
                        placeholder="total kilometre"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualFeightKm")}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">2.5</span>
                  <label htmlFor="onlyInvolvedInMovementOfEquipment">
                    Are you a railway manufacturing/maintenance company involved
                    only with the movement of equipment and/or empty
                    coaches/wagons and locomotives? If so, provide details 2.5.1
                    below
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    disabled={!allowEdit}
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("onlyInvolvedInMovementOfEquipment")}
                  />
                  <input
                    type="radio"
                    disabled={!allowEdit}
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("onlyInvolvedInMovementOfEquipment")}
                  />
                </div>
              </div>
              {onlyInvolvedInMovementOfEquipment === "yes" && (
                <>
                  <div className="mt-3">
                    <table className="min-w-full bg-white border border-gray-300">
                      <thead>
                        <tr className="text-sm">
                          <th className="h-8 px-4 border rounded-md"></th>
                          <th className="h-8 px-4 border rounded-md">
                            ITEM (A)
                          </th>
                          <th className="h-8 px-4 border rounded-md border">
                            NUMBER OF MOVEMENTS PER DAY (B)
                          </th>
                          <th className="h-8 px-4 border rounded-md border">
                            MULTIPLIED BY (C)
                          </th>
                          <th className="h-8 px-4 border rounded-md border">
                            B x C = (D)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-sm">
                          <td className="border p-1">2.5.1.1</td>
                          <td className="border p-1">
                            Number of{" "}
                            <span className="text-bold">wagon/coach</span>{" "}
                            movements per day
                          </td>
                          <td className="border p-1">
                            {" "}
                            <input
                              {...register("wagonsPerDay")}
                              disabled={!allowEdit}
                              placeholder="input value here"
                              className="h-8 px-4 border rounded-md w-full"
                              value={wagonsPerDay}
                              onChange={(e) => {
                                setWagonsPerDay(Number(e.target.value));
                                setTonnesd1(Number(wagonsPerDay) * 80);
                                setTonnesgrossday(
                                  tonnesd1 + tonnesd2 + tonnesd3
                                );
                                setTonnesgrossyear(tonnesgrossday * 350);
                              }}
                            />
                          </td>
                          <td className="border p-1">80 tonnes</td>
                          <td className="border p-1">{`D1 = ${tonnesd1}`}</td>
                        </tr>
                        <tr className="text-sm">
                          <td className="border p-1">2.5.1.2</td>
                          <td className="border p-1">
                            Number of{" "}
                            <span className="text-bold">
                              any other rail-bound maintenance vehicle
                            </span>{" "}
                            movements per day
                          </td>
                          <td className="border p-1">
                            <input
                              {...register("otherRailPerDay")}
                              disabled={!allowEdit}
                              placeholder="input value here"
                              className="h-8 px-4 border rounded-md w-full"
                              value={otherRailPerDay}
                              onChange={(e) => {
                                setOtherRailPerDay(Number(e.target.value));
                                setTonnesd2(Number(otherRailPerDay) * 80);
                                setTonnesgrossday(
                                  tonnesd1 + tonnesd2 + tonnesd3
                                );
                                setTonnesgrossyear(tonnesgrossday * 350);
                              }}
                            />
                          </td>
                          <td className="border p-1">80 tonnes</td>
                          <td className="border p-1">D2 = {tonnesd2}</td>
                        </tr>
                        <tr className="text-sm">
                          <td className="border p-1">2.5.1.3</td>
                          <td className="border p-1">
                            Number of{" "}
                            <span className="text-bold">locomotive</span>{" "}
                            movements per day
                          </td>
                          <td className="border p-1">
                            {" "}
                            <input
                              {...register("otherRailPerDay")}
                              disabled={!allowEdit}
                              placeholder="input value here"
                              className="h-8 px-4 border rounded-md w-full"
                              value={locomotive}
                              onChange={(e) => {
                                debugger;
                                setLocomotive(Number(e.target.value));
                                setTonnesd3(locomotive * 150);
                                setTonnesgrossday(
                                  tonnesd1 + tonnesd2 + tonnesd3
                                );
                                setTonnesgrossyear(tonnesgrossday * 350);
                              }}
                            />
                          </td>
                          <td className="border p-1">150 tonnes</td>
                          <td className="border p-1">D3 = {tonnesd3}</td>
                        </tr>

                        <tr className="text-sm">
                          <td className="border p-1">2.5.1.4</td>
                          <td className="border p-1">
                            GROSS TONS PER DAY (Total of D1+D2+D3)
                          </td>
                          <td className="border p-1"></td>
                          <td className="border p-1"></td>
                          <td className="border p-1">{tonnesgrossday}</td>
                        </tr>
                        <tr className="text-sm">
                          <td className="border p-1">2.5.1.5</td>
                          <td className="border p-1">
                            GROSS TONS PER YEAR (Total in B4 x 350 days)
                          </td>
                          <td className="border p-1"></td>
                          <td className="border p-1"></td>
                          <td className="border p-1">{tonnesgrossyear}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </ol>
        </div>
        <>
          {isAdministrator?.isAdministrator && !asip && (
            <div className="grid grid-cols-4 py-2 text-sm items-center">
              <div className="col-span-8">
                <Card className="shadow-md border-none">
                  <h4 className="text-l font-semibold uppercase">
                    Permit fee calculations
                  </h4>
                  <CardContent>
                    <div className="text-l font-bold uppercase">
                      {`Permit Application Fee: ZAR ${
                        application.step2?.applicationFee?.manualFee
                          ? application.step2?.applicationFee?.manualFee
                          : application.step2?.applicationFee?.fee
                      }`}
                    </div>
                    <div className="text-l font-bold uppercase">
                      {`Class:  ${
                        application.step2?.applicationFee.operatorClass
                          .manualClassName
                          ? application.step2?.applicationFee.operatorClass
                              .manualClassName
                          : application.step2?.applicationFee?.operatorClass
                              ?.name
                      }`}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-end items-end mt-10 gap-10">
                      '
                      {!application.step2?.applicationFee?.manualFee && (
                        <button
                          onClick={acceptCalculation}
                          className="h-11 px-6 rounded-md bg-success text-white hover:bg-success"
                        >
                          Accept Calculation
                        </button>
                      )}
                      <>
                        <Dialog
                          open={openManualFee}
                          onOpenChange={setOpenManualFee}
                        >
                          <DialogTrigger asChild>
                            <button className="h-11 px-6 rounded-md bg-danger text-white hover:bg-danger">
                              {application.step2?.applicationFee?.manualFee
                                ? "Edit Calculation"
                                : "Manual Calculation"}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Enter Manual Fee</DialogTitle>
                              <DialogDescription>
                                <div>
                                  <input
                                    defaultValue={
                                      application.step2?.applicationFee
                                        ?.manualFee
                                        ? application.step2?.applicationFee
                                            ?.manualFee
                                        : application.step2?.applicationFee?.fee
                                    }
                                    type="text"
                                    onChange={(text) => {
                                      setManualFee(text.target.value);
                                    }}
                                    placeholder="Enter Manual Fee"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                  />
                                </div>
                                <div>
                                  <br />
                                  <select
                                    defaultValue={
                                      application?.step2?.applicationFee
                                        ?.operatorClass?.manualClassName
                                    }
                                    onChange={(text) => {
                                      setManualClass(text.target.value);
                                    }}
                                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                  >
                                    <option disabled selected>
                                      Select Class
                                    </option>
                                    <option value="Class A">Class A</option>
                                    <option value="Class B">Class B</option>
                                    <option value="Class C">Class C</option>
                                  </select>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <button
                                className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange"
                                onClick={handleManualFeeDialogClose}
                              >
                                Save
                              </button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </>
        <div className="flex justify-end items-end mt-10 gap-10">
          {/* <button
            onClick={onHandleBack}
            className="h-11 px-6 rounded-md bg-black text-white">
            Back
          </button> */}
          {!application ? (
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
