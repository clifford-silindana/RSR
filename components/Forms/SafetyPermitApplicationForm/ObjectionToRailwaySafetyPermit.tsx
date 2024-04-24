import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import useFormSubmission from "@/hooks/useFormSubmission";

type TFormValues = {
  partyObjection: "yes" | "no" | undefined;
  nameOfObjectingParty: string;
  contactOfObjectingParty: string;
  reasonOfObjectingParty: string;
};

export const ObjectionToRailwaySafetyPermit = ({ application = null, isAdministrator }) => {
  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();
  const { register, handleSubmit, watch } = useForm<TFormValues>({
    defaultValues: application ? application.step3 : formData.step3,
  });
  debugger
  const { loading, submitting } = useFormSubmission();


  const onHandleFormSubmit = (data: any) => {
    if (isAdministrator?.isAdministrator) {
      setFormData((prevFrormData) => ({ ...prevFrormData, step3: application.step3 }));
      onHandleNext();
    }
    else {
      setFormData((prevFrormData) => ({ ...prevFrormData, step3: data }));
      if (application) {
        application.step3 = data;
        submitting(application)
          .then((data: any) => {
            onHandleNext();
          });
      }
      else {
        if (formData?.step3 == null) {
          formData.step3 = data;
        }
        submitting(formData)
          .then((data: any) => {
            onHandleNext();
          });
      }
    }

    // onHandleNext();
  };

  const objection = watch("partyObjection");

  return (
    <div>
      <form className="pb-6 px-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <ol className="">
            <li>
              <h4 className="text-l font-semibold uppercase">
                3. Objections To Railway Safety Permit Being Issued
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
                  <span className="pr-3">3.1</span>
                  <label htmlFor="partyObjection">
                    Are you aware of any other party objecting to your railway
                    activities or a safety permit being issued to you?
                  </label>
                </div>
                <div className="flex gap-2 ml-5">
                  <input
                    type="radio"
                    disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                    id="yes"
                    value="yes"
                    className="h-5 w-5"
                    {...register("partyObjection")}
                  />
                  <input
                    type="radio"
                    disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                    id="yes"
                    value="no"
                    className="h-5 w-5"
                    {...register("partyObjection")}
                  />
                </div>
              </div>
              {objection === "yes" && (
                <>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">3.2</span>
                      <label htmlFor="nameOfObjectingParty">
                        Name of party objecting
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        id="nameOfObjectingParty"
                        type="text"
                        required={true}
                        placeholder="Name of Party"
                        className="h-8 px-4 border rounded-md w-full"
                        {...register("nameOfObjectingParty")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">3.3</span>
                      <label htmlFor="contactOfObjectingParty">
                        Contact details of party objecting
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <input
                        disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                        id="contactOfObjectingParty"
                        required={true}
                        type="number"
                        className="px-4 py-1 border rounded-md w-full"
                        {...register("contactOfObjectingParty")}></input>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 py-2 text-sm items-center">
                    <div className="col-span-3">
                      <span className="pr-3">3.4</span>
                      <label htmlFor="permitNumber">
                        Reasons provided for objection
                      </label>
                    </div>
                    <div className="col-span-2 mr-5">
                      <textarea
                        id="reasonOfObjectingParty"
                        required={true}
                        className="px-4 py-1 border rounded-md w-full"
                        {...register("reasonOfObjectingParty")}>
                      </textarea>
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