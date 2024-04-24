import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import useFormSubmission from "@/hooks/useFormSubmission";
import { FiPlus } from "react-icons/fi";

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
  transportCommuters: string;
  coverForOtherUse: string;
  motivationSafeConversion: string;
};

export const DescriptionOfTrainOperator = ({ application = null, isAdministrator }) => {
  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();
  const { register, handleSubmit, watch, control } = useForm<TFormValues>({
    defaultValues: application ? application.step7 : formData.step7,
  });

  const {
    fields: tractionFields,
    append: appendTraction,
    remove: removeTraction,
  } = useFieldArray({
    control,
    name: "tractions",
  });
  const {
    fields: rollingStockFields,
    append: appendRollingStock,
    remove: removeRollingStock,
  } = useFieldArray({
    control,
    name: "rollings",
  });
  const {
    fields: runningLinesFields,
    append: appendRunningLines,
    remove: removeRunningLines,
  } = useFieldArray({
    control,
    name: "runningLines",
  });
  const {
    fields: stationsFields,
    append: appendStations,
    remove: removeStations,
  } = useFieldArray({
    control,
    name: "stations",
  });

  const { loading, submitting } = useFormSubmission();

  const onHandleFormSubmit = (data: any) => {
    if (isAdministrator?.isAdministrator) {
      setFormData((prevFrormData) => ({ ...prevFrormData, step7: application.step7 }));
      onHandleNext();
    }
    else {
      setFormData((prevFrormData) => ({ ...prevFrormData, step7: data }));
      if (application) {
        application.step7 = data;
        submitting(application)
          .then((data: any) => {
            onHandleNext();
          });
      }
      else {
        if (formData?.step7 != null) {
          formData.step7 = data;
        }
        submitting(formData)
          .then((data: any) => {
            onHandleNext();
          });
      }
    }
  };

  const coverForOtherUse = watch("coverForOtherUse");

  return (
    <div>
      <form className="pb-6 px-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1 text-sm">
          <h4 className="text-l font-semibold uppercase mb-2">
            7. DESCRIPTION OF TRAIN OPERATOR
          </h4>
          <div>
            <div className="col-span-4 mb-2 mt-4">
              <span className="pr-3">7.1</span>
              <div className="flex">
                <label htmlFor="transportCommuters">
                  Indicate the means of traction used for train services to be
                  covered on the permit (This includes locomotives, tractors,
                  winches, pinch bars, etc.)
                </label>
                <div>
                  <select
                    disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                    {...register("transportCommuters")}
                    placeholder="Traction Type"
                    className="p-1 border rounded-md w-[200px]">
                    <option value={""}>Select</option>
                    <option value={"locomotives"}>locomotives</option>
                    <option value={"tractors"}>tractors</option>
                    <option value={"winches"}>winches</option>
                    <option value={"pinch"}>pinch bars</option>
                    <option value={"others"}>others</option>
                  </select>
                </div>
              </div>
            </div>
            <table className="min-w-full bg-white border rounded border-gray-300">
              <thead>
                <tr>
                  {/* <th className="lowercase py-2 px-4 border">
                    TRANSACTION TYPE
                  </th> */}
                  <th className="lowercase py-2 px-4 border">
                    DESCRIPTION (SIDING NUMBER)
                  </th>
                  <th className="lowercase py-2 px-4 border">MODEL</th>
                  <th className="lowercase py-2 px-4 border">
                    NUMBER OF UNITS IN USE
                  </th>
                  <th className="lowercase py-2 px-4 border">AVERAGE AGE</th>
                  <th className="lowercase py-2 px-4 border"></th>
                </tr>
              </thead>
              <tbody>
                {tractionFields.map((traction, index) => (
                  <tr key={index}>
                    {/* <td className="py-2 px-4 border">
                      <select
                        {...register(`tractions.${index}.tractionType`)}
                        placeholder="Traction Type"
                        className="h-8 px-4 border rounded-md w-full">
                        <option value={""}>Select</option>
                        <option value={"locomotives"}>locomotives</option>
                        <option value={"tractors"}>tractors</option>
                        <option value={"winches"}>winches</option>
                        <option value={"pinch"}>pinch bars</option>
                        <option value={"others"}>others</option>
                      </select>
                    </td> */}
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`tractions.${index}.description`)}
                        placeholder="Description"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={traction.description}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`tractions.${index}.model`)}
                        placeholder="Model"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={traction.model}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`tractions.${index}.numberOfUnits`)}
                        placeholder="Number of Units"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={traction.numberOfUnits}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`tractions.${index}.averageAge`)}
                        placeholder="Average Age"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={traction.averageAge}
                      />
                    </td>

                    <td className="py-2 px-4 border">
                      <button
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        type="button"
                        onClick={() => removeTraction(index)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
              type="button"
              onClick={() => appendTraction({})}
              className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
              Add <FiPlus />
            </button>
          </div>

          <div>
            <div className="col-span-4 mb-2 mt-4">
              <span className="pr-3">7.2</span>
              <label htmlFor="transportCommuters">
                List the rolling stock used for train services to be covered on
                the permit.
              </label>
            </div>
            <table className="min-w-full bg-white border rounded border-gray-300">
              <thead>
                <tr>
                  <th className="lowercase py-2 px-4 border">
                    DESCRIPTION (SIDING NUMBER)
                  </th>
                  <th className="lowercase py-2 px-4 border">MODEL</th>
                  <th className="lowercase py-2 px-4 border">
                    NUMBER OF UNITS IN USE
                  </th>
                  <th className="lowercase py-2 px-4 border">AVERAGE AGE</th>
                  <th className="lowercase py-2 px-4 border"></th>
                </tr>
              </thead>
              <tbody>
                {rollingStockFields.map((rolling, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`rollings.${index}.description`)}
                        placeholder="Description"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={rolling.description}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`rollings.${index}.model`)}
                        placeholder="Model"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={rolling.model}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`rollings.${index}.numberOfUnits`)}
                        placeholder="Number of Units"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={rolling.numberOfUnits}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`rollings.${index}.averageAge`)}
                        placeholder="Average Age"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={rolling.averageAge}
                      />
                    </td>

                    <td className="py-2 px-4 border">
                      <button
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        type="button"
                        onClick={() => removeRollingStock(index)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
              type="button"
              onClick={() => appendRollingStock({})}
              className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
              Add <FiPlus />
            </button>
          </div>
          <div>
            <div className="col-span-4 mb-2 mt-4">
              <span className="pr-3">7.3</span>
              <label htmlFor="transportCommuters">
                List the running lines/sidings on which train services are
                offered.
              </label>
            </div>
            <table className="min-w-full bg-white border rounded border-gray-300">
              <thead>
                <tr>
                  <th className="lowercase py-2 px-4 border">DESCRIPTION</th>
                  <th className="lowercase py-2 px-4 border">
                    NETWORK OPERATOR
                  </th>
                  <th className="lowercase py-2 px-4 border">
                    PARTY RESPONSIBLE FOR TRAIN CONTROL ON THE RUNNING
                    LINE/SIDING
                  </th>
                  <th className="lowercase py-2 px-4 border">
                    FREQUENCY OF TRAIN SERVICES OFFERED
                  </th>
                  <th className="lowercase py-2 px-4 border"></th>
                </tr>
              </thead>
              <tbody>
                {runningLinesFields.map((running, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`runningLines.${index}.description`)}
                        placeholder="Description"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={running.description}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`runningLines.${index}.networkOperator`)}
                        placeholder="network operator"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={running.networkOperator}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(
                          `runningLines.${index}.controlResponsible`
                        )}
                        placeholder="Control responsible"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={running.controlResponsible}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`runningLines.${index}.frequency`)}
                        placeholder="Frequency"
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={running.frequency}
                      />
                    </td>

                    <td className="py-2 px-4 border">
                      <button
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        type="button"
                        onClick={() => removeRunningLines(index)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
              type="button"
              onClick={() => appendRunningLines({})}
              className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
              Add <FiPlus />
            </button>
          </div>
          <div>
            <div className="col-span-4 mb-2 mt-4">
              <span className="pr-3">7.4</span>
              <label htmlFor="transportCommuters">
                List all the stations to be covered on the permit.
              </label>
            </div>
            <table className="min-w-full bg-white border rounded border-gray-300">
              <thead>
                <tr>
                  <th className="lowercase py-2 px-4 border">STATION NAME</th>
                  <th className="lowercase py-2 px-4 border">
                    PHYSICAL STREET ADDRESS
                  </th>
                  <th className="lowercase py-2 px-4 border">
                    NETWORK OPERATOR OF LINE ON WHICH STATION IS LOCATED
                  </th>
                  <th className="lowercase py-2 px-4 border">
                    FREQUENCY OF TRAIN SERVICES OFFERED
                  </th>
                  <th className="lowercase py-2 px-4 border">
                    YEAR LAST UPGRADED
                  </th>
                  <th className="lowercase py-2 px-4 border"></th>
                </tr>
              </thead>
              <tbody>
                {stationsFields.map((station, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`stations.${index}.stationName`)}
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={station.stationName}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`stations.${index}.stationOperator`)}
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={station.stationOperator}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`stations.${index}.networkOperator`)}
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={station.networkOperator}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`stations.${index}.frequency`)}
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={station.frequency}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        {...register(`stations.${index}.yearLastUpgraded`)}
                        placeholder=""
                        className="h-8 px-4 border rounded-md w-full"
                        defaultValue={station.yearLastUpgraded}
                      />
                    </td>

                    <td className="py-2 px-4 border">
                      <button
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        type="button"
                        onClick={() => removeStations(index)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
              type="button"
              onClick={() => appendStations({})}
              className=" flex items-center gap-2 py-1 px-2 text-white rounded-md mt-3 bg-logoorange hover:bg-slate-900">
              Add <FiPlus />
            </button>
          </div>
        </div>

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
              <span className="pr-3">7.5</span>
              <label htmlFor="coverForOtherUse">
                Are any of the rolling stock (coaches/wagons) you move converted
                for use other than what they were intended for i.e. original
                design (e.g. trolly converted for passenger transport; coaches
                converted to carry higher number of passengers)?
              </label>
            </div>
            <div className="flex gap-2 ml-5">
              <input
                disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                type="radio"
                id="yes"
                value="yes"
                className="h-5 w-5"
                {...register("coverForOtherUse")}
              />
              <input
                disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                type="radio"
                id="yes"
                value="no"
                className="h-5 w-5"
                {...register("coverForOtherUse")}
              />
            </div>
          </div>
          {coverForOtherUse === "yes" && (
            <>
              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">7.5.1</span>
                  <label htmlFor="reasonsForConverstion">
                    If so, submit technical details of the conversion
                  </label>
                </div>
                <div className="col-span-2 mr-5">
                  <input
                    disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                    id="reasonsForConverstion"
                    type="file"
                    placeholder="upload files"
                    className="h-8 px-4 border rounded-md w-full"
                    {...register("reasonsForConverstion")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-5 py-2 text-sm items-center">
                <div className="col-span-3">
                  <span className="pr-3">7.5.2</span>
                  <label htmlFor="motivationSafeConversion">
                    Motivate why the conversion is safe and suitable for use
                  </label>
                </div>
                <div className="col-span-2 mr-5">
                  <textarea
                    disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                    id="motivationSafeConversion"
                    className="px-4 py-1 border rounded-md w-full"
                    {...register("motivationSafeConversion")}></textarea>
                </div>
              </div>
            </>
          )}
          {coverForOtherUse === "no" && (
            <div className="col-span-2 mr-5">
              <label htmlFor="">Reasons/additional information</label>
              <textarea
                disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                id="motivationSafeConversion"
                className="px-4 py-1 border rounded-md w-full"
                {...register("reasonsAdditionalInformation")}></textarea>
            </div>
          )}
        </div>
        <div className="flex justify-end items-end mt-10 gap-10">
          <button
            onClick={onHandleBack}
            className="h-11 px-6 rounded-md bg-black text-white">
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