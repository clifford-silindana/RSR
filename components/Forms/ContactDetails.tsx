import React, { ChangeEvent, FormEvent, useState } from "react";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import { IOperatorOrgContacts } from "@/models/IOperatorOrgContacts";

export interface ContactDetailsFormData {
    name: string;
    surname: string;
    jobTitle: string;
    landlinePhoneNumber: string;
    cellPhoneNumber: string;
    emailAddress: string;
    alternativeEmailAddress: string;
    isNominatedManagerSameAsHeadOfOrg: boolean;
    appointmentLetter: File | null;
    managerName: string;
    managersurname: string;
    managerjobTitle: string;
    managerlandlinePhoneNumber: string;
    managercellPhoneNumber: string;
    manageremailAddress: string;
    manageralternativeEmailAddress: string;
}

interface ContactDetailsProps {
    onDataSubmit: (data: ContactDetailsFormData) => void;
    formStep: number;
    nextFormStep: () => void;
    prevFormStep: () => void;
    adminFormData?: any
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
    formStep,
    prevFormStep,
    nextFormStep,
    onDataSubmit,
    adminFormData
}) => {
    const storedOrgContacts: string | null = localStorage.getItem('operatorApplication_step2');
    let formData2: IOperatorOrgContacts = storedOrgContacts != null ? JSON.parse(storedOrgContacts) : {
        name: "",
        surname: "",
        jobTitle: "",
        landlinePhoneNumber: "",
        cellPhoneNumber: "",
        emailAddress: "",
        alternativeEmailAddress: "",
        isNominatedManagerSameAsHeadOfOrg: false,
        appointmentLetter: null,
        managerName: "",
        managersurname: "",
        managerjobTitle: "",
        managerlandlinePhoneNumber: "",
        managercellPhoneNumber: "",
        manageremailAddress: "",
        manageralternativeEmailAddress: "",
    };

    if (adminFormData) {
        formData2 = adminFormData;
    }

    const [formData, setFormData] = useState<ContactDetailsFormData>({
        ...formData2,
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const handleInputChange = (
        e: ChangeEvent<
            HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
        >
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
    
    console.log(formData2);
    const handleCheckboxChange = (isChecked: boolean) => {
      setFormData((prevData) => ({
        ...prevData,
        isNominatedManagerSameAsHeadOfOrg: isChecked,
        ...(isChecked
          ? {}
          : {
              managerName: "",
              managersurname: "",
              managerjobTitle: "",
              managerlandlinePhoneNumber: "",
              managercellPhoneNumber: "",
              manageremailAddress: "",
              manageralternativeEmailAddress: "",
            }),
      }));
    };
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      // Invoke the callback with the form data
      onDataSubmit(formData);
      // progress
      nextFormStep();
      scrollToTop();
    };

    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Organisational Contacts
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {/* Contact Details Section */}
            <div className="bg-gray mb-4.5 py-1.5">
              <h4 className="text-l font-semibold text-black dark:text-white">
                Nominated Manager Details
              </h4>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  disabled={adminFormData}
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={
                    adminFormData
                      ? adminFormData?.contacts[1]?.name
                      : formData.name
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Surname
                </label>
                <input
                  disabled={adminFormData}
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={
                    adminFormData
                      ? adminFormData?.contacts[1]?.surname
                      : formData.surname
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Job Title
                </label>
                <input
                  disabled={adminFormData}
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title"
                  value={
                    adminFormData
                      ? adminFormData?.contacts[1]?.jobTitle
                      : formData.jobTitle
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Landline Phone Number
                    </label>
                    <input
                      disabled={adminFormData}
                      type="tel"
                      name="landlinePhoneNumber"
                      placeholder="Landline Phone Number"
                      value={
                        adminFormData
                          ? adminFormData?.contacts[1]?.landline
                          : formData.landlinePhoneNumber
                      }
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Cell Phone Number
                    </label>
                    <input
                      disabled={adminFormData}
                      type="tel"
                      name="cellPhoneNumber"
                      placeholder="Cell Phone Number"
                      value={
                        adminFormData
                          ? adminFormData?.contacts[1]?.phoneNumber
                          : formData.cellPhoneNumber
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
                  Email Address
                </label>
                <input
                  disabled={adminFormData}
                  type="email"
                  name="emailAddress"
                  placeholder="Email Address"
                  value={
                    adminFormData
                      ? adminFormData?.contacts[1]?.email
                      : formData.emailAddress
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Alternative Email Address
                </label>
                <input
                  disabled={adminFormData}
                  type="email"
                  name="alternativeEmailAddress"
                  placeholder="Alternative Email Address"
                  value={
                    adminFormData
                      ? adminFormData?.contacts[1]?.email
                      : formData.alternativeEmailAddress
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div></div>
            <div style={{ marginBottom: "20px" }} className="w-full xl:w-1/2">
              <label className="mb-3 block text-black dark:text-white">
                Appointment letter for the nominated manager
              </label>
              <input
                disabled={adminFormData}
                type="file"
                name="appointmentLetter"
                onChange={handleInputChange}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
            {/* <div className="mb-4.5 ">
                        <CheckboxOne
                            title={
                                "Is Nominated Manager’s details the same as the Head of Organisation name?"
                            }
                            id={"1"}
                            checked={!formData.isNominatedManagerSameAsHeadOfOrg}
                            onChange={handleCheckboxChange}
                        />
                    </div> */}

            {/*Nominated Manager details*/}

            <div>
              <div className="bg-gray mb-4.5 py-1.5">
                <h4 className="text-l font-semibold text-black dark:text-white">
                  Head of Organisation Details
                </h4>
              </div>
              <div style={{ marginBottom: "10px" }}></div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    disabled={adminFormData}
                    type="text"
                    name="managerName"
                    placeholder="Head of Organisation's Name"
                    value={
                      adminFormData
                        ? adminFormData?.contacts[0]?.name
                        : formData.name
                    }
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Surname
                  </label>
                  <input
                    disabled={adminFormData}
                    type="text"
                    name="managersurname"
                    placeholder="Head of Organisation's Surname"
                    value={
                      adminFormData
                        ? adminFormData?.contacts[0]?.surname
                        : formData.surname
                    }
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Job Title
                  </label>
                  <input
                    disabled={adminFormData}
                    type="text"
                    name="managerjobTitle"
                    placeholder="Job Title"
                    value={
                      adminFormData
                        ? adminFormData?.contacts[0]?.jobTitle
                        : formData.jobTitle
                    }
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-black dark:text-white">
                        Landline Phone Number
                      </label>
                      <input
                        disabled={adminFormData}
                        type="tel"
                        name="managerlandlinePhoneNumber"
                        placeholder="Landline Phone Number"
                        value={
                          adminFormData
                            ? adminFormData?.contacts[0]?.landline
                            : formData.landlinePhoneNumber
                        }
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-black dark:text-white">
                        Cell Phone Number
                      </label>
                      <input
                        disabled={adminFormData}
                        type="tel"
                        name="managercellPhoneNumber"
                        placeholder="Cell Phone Number"
                        value={
                          adminFormData
                            ? adminFormData?.contacts[0]?.phoneNumber
                            : formData.cellPhoneNumber
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
                    Email Address
                  </label>
                  <input
                    disabled={adminFormData}
                    type="email"
                    name="manageremailAddress"
                    placeholder="Email Address"
                    value={
                      adminFormData
                        ? adminFormData?.contacts[0]?.email
                        : formData.emailAddress
                    }
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-black dark:text-white">
                    Alternative Email Address
                  </label>
                  <input
                    disabled={adminFormData}
                    type="email"
                    name="manageralternativeEmailAddress"
                    placeholder="Alternative Email Address"
                    value={
                      adminFormData
                        ? adminFormData?.contacts[0]?.email
                        : formData.emailAddress
                    }
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>

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

export default ContactDetails;