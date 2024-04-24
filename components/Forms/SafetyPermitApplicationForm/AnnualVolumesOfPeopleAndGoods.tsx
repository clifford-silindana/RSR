import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";

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

export const AnnualVolumes = () => {
  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: formData.step5,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onHandleFormSubmit = (data: any) => {
    //console.log(data);

    setFormData((prevFrormData) => ({ ...prevFrormData, step5: data }));

    onHandleNext();
  };

  const transportCommuters = watch("transportCommuters");
  const transportPassengers = watch("transportPassengers");
  const transportationOfDangerousGoods = watch(
    "transportationOfDangerousGoods"
  );
  const annualVolumePeopleAndGood = watch("annualVolumePeopleAndGood");
  const annualVolumePeopleAndGoodTransportedTo = watch(
    "annualVolumePeopleAndGoodTransportedTo"
  );
  const haveRunningLines = watch("haveRunningLines");

  return (
    <div>
      <form className="p-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <ol className="">
            <li>
              <h4 className="text-l font-semibold uppercase">
                2. Annual Volumes Of People And Goods Transported
                <span className="text-xs normal-case block">
                  Tick the appropriate box below and if “YES” provide further
                  detail requested.
                </span>
              </h4>
            </li>
            <div>
              <div className="grid grid-cols-5 py-2 items-center">
                <div className="col-span-4"></div>
                <div className="flex gap-2 ml-4 ">
                  <span>Yes</span>
                  <span>No</span>
                </div>
              </div>
              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4">
                  <span className="pr-3">5.1</span>
                  <label htmlFor="transportCommuters">
                    Involvement in the transportation of commuters (commuters
                    are people transported to and from work on a daily basis)
                  </label>
                </div>
                <div className="flex gap-2 ml-5">
                  <input
                    type="radio"
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("transportCommuters")}
                  />
                  <input
                    type="radio"
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("transportCommuters")}
                  />
                </div>
              </div>
              {transportCommuters === "yes" && (
                <>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">2.1.1</span>
                      <label htmlFor="annualCommutersTransported">
                        Annual total number of commuters transported
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        id="annualCommutersTransported"
                        type="text"
                        placeholder="number of commuters"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualCommutersTransported")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">5.1.2</span>
                      <label htmlFor="annualKilometersForCommuters">
                        Total annual commuter passenger Km
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        id="annualKilometersForCommuters"
                        type="text"
                        placeholder="Km covered"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualKilometersForCommuters")}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4">
                  <span className="pr-3">5.2</span>
                  <label htmlFor="transportPassengers">
                    Involvement in the transportation of any passengers
                    (including tourists, excluding commuters)
                  </label>
                </div>
                <div className="flex gap-2 ml-5">
                  <input
                    type="radio"
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("transportPassengers")}
                  />
                  <input
                    type="radio"
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("transportPassengers")}
                  />
                </div>
              </div>
              {transportPassengers === "yes" && (
                <>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">5.2.1</span>
                      <label htmlFor="annualPassengersTransported">
                        Annual total number of passengers transported
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        id="annualPassengersTransported"
                        type="text"
                        placeholder="number of passengers"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualPassengersTransported")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">5.2.2</span>
                      <label htmlFor="annualKilometersForPassengers">
                        Total annual passenger Km (people, excluding commuters)
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        id="annualKilometersForPassengers"
                        type="text"
                        placeholder="Km covered"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualKilometersForPassengers")}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4">
                  <span className="pr-3">5.3</span>
                  <label htmlFor="transportationOfDangerousGoods">
                    Dispatch/receipt/transportation of dangerous goods by rail
                    (provide details in 5.6 below)
                  </label>
                </div>
                <div className="flex gap-2 ml-5">
                  <input
                    type="radio"
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("transportationOfDangerousGoods")}
                  />
                  <input
                    type="radio"
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("transportationOfDangerousGoods")}
                  />
                </div>
              </div>
              {transportationOfDangerousGoods === "yes" && (
                <>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">5.3.1</span>
                      <label htmlFor="annualKilometersForDangerousGoods">
                        Total annual dangerous goods km
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        id="annualKilometersForDangerousGoods"
                        type="text"
                        placeholder="Km covered"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualKilometersForDangerousGoods")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">5.3.2</span>
                      <label htmlFor="haveRunningLines">
                        Do you operate, manage and/or maintain Running Lines
                        (main lines between stations and/or branch lines
                        excluding private sidings)?
                      </label>
                    </div>
                    <div className="flex gap-2 ml-5">
                      <input
                        type="radio"
                        id="yes"
                        value="yes"
                        className="h-5 w-5"
                        {...register("haveRunningLines")}
                      />
                      <input
                        type="radio"
                        id="yes"
                        value="no"
                        className="h-5 w-5"
                        {...register("haveRunningLines")}
                      />
                    </div>
                  </div>

                  {haveRunningLines === "yes" && (
                    <>
                      <div className="">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr>
                              <th className="py-2 px-4 border-b">
                                Description
                              </th>
                              <th className="py-2 px-4 border-b">
                                Total Annual Volume (in tonnes)
                              </th>
                              <th className="py-2 px-4 border-b"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {fields.map((item, index) => (
                              <tr key={item.id}>
                                <td className="py-2 px-4 border">
                                  {errors &&
                                    errors.items &&
                                    errors.items[index]?.description && (
                                      <p className="text-danger">
                                        Field Required!
                                      </p>
                                    )}
                                  <input
                                    placeholder="Description"
                                    className={`h-8 px-4 border rounded-md w-full ${
                                      errors &&
                                      errors.items &&
                                      errors.items[index]?.description
                                        ? "border-danger border-2"
                                        : ""
                                    }`}
                                    {...register(`items.${index}.description`, {
                                      required: "Field Required",
                                    })}
                                    defaultValue={item.description}
                                  />
                                </td>
                                <td className="py-2 px-4 border">
                                  {errors &&
                                    errors.items &&
                                    errors.items[index]?.volume && (
                                      <p className="text-danger">
                                        Field Required!
                                      </p>
                                    )}
                                  <input
                                    placeholder="Volume in tonnes"
                                    className={`h-8 px-4 border rounded-md w-full ${
                                      errors &&
                                      errors.items &&
                                      errors.items[index]?.volume
                                        ? "border-danger border-2"
                                        : ""
                                    }`}
                                    {...register(`items.${index}.volume`, {
                                      required: "Field Required",
                                    })}
                                    defaultValue={item.volume}
                                  />
                                </td>
                                <td className="py-2 px-4 border">
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700">
                                    <DeleteIcon />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button
                          type="button"
                          onClick={() =>
                            append({ description: "", volume: "" })
                          }
                          className="mt-1 px-4 py-2 bg-blue-500 text-darkblue rounded hover:bg-blue-700">
                          <AddIcon />
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4">
                  <span className="pr-3">5.4</span>
                  <label htmlFor="annualVolumePeopleAndGoodTransportedTo">
                    Involvement in the transportation of any passengers
                    (including tourists, excluding commuters)
                  </label>
                </div>
                <div className="flex gap-2 ml-5">
                  <input
                    type="radio"
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("annualVolumePeopleAndGoodTransportedTo")}
                  />
                  <input
                    type="radio"
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("annualVolumePeopleAndGoodTransportedTo")}
                  />
                </div>
              </div>
              {annualVolumePeopleAndGoodTransportedTo === "yes" && (
                <>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">5.4.1</span>
                      <label htmlFor="annualFeightKm">
                        Total annual general freight km
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        id="annualFeightKm"
                        type="text"
                        placeholder="number of passengers"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualFeightKm")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">5.4.2</span>
                      <label htmlFor="annualFeightTon">
                        Total annual general freight ton
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        id="annualFeightTon"
                        type="text"
                        placeholder="Km covered"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualFeightTon")}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-4">
                  <span className="pr-3">5.5</span>
                  <label htmlFor="annualVolumePeopleAndGood">
                    Annual Volumes Of People And Goods Transported to "Are you a
                    railway manufacturing/maintenance company involved only with
                    the movement of equipment and/or empty coaches/wagons and
                    locomotives (provide details in 5.8 below)"
                  </label>
                </div>
                <div className="flex gap-2 ml-5">
                  <input
                    type="radio"
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("annualVolumePeopleAndGood")}
                  />
                  <input
                    type="radio"
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("annualVolumePeopleAndGood")}
                  />
                </div>
              </div>
              {annualVolumePeopleAndGood === "yes" && (
                <>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">5.5.1</span>
                      <label htmlFor="annualKilometersForDangerousGoods">
                        Total annual dangerous goods km
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        id="annualKilometersForDangerousGoods"
                        type="text"
                        placeholder="Km covered"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("annualKilometersForDangerousGoods")}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </ol>
        </div>
        <div className="flex justify-end items-end mt-10 gap-10">
          <button
            onClick={onHandleBack}
            className="h-11 px-6 rounded-md bg-black text-white">
            Back
          </button>
          <button className="h-11 px-6 rounded-md bg-black text-white">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};