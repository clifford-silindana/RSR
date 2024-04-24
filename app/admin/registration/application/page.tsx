"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";
import FormCard from "@/components/Forms/FormCard";
import DetailsOfApplicants from "@/components/Forms/DetailsOfApplicants";
import OfficeAddresses from "@/components/Forms/HeadOfficePhysicalAddress";
import ContactDetails from "@/components/Forms/ContactDetails";
import Stepper from "@/components/Stepper/Stepper";
import CategoriesOfRailOperations from "@/components/Forms/CategoriesOfRailOperations";
import useOperator from "@/hooks/useOperator";
import Loader from "@/components/common/Loader";
import { IOperator } from "@/models/IOperator";
import { IOperatorApplication } from "@/models/IOperatorApplication";
import { IOperatorApplicationAddresses } from "@/models/IOperatorApplicationAddresses";
import { IOperatorOrgContacts } from "@/models/IOperatorOrgContacts";
import { ICategoryOfRail } from "@/models/ICategoryOfRail";
import Helper from "@/common/helper";
import { useSearchParams } from "next/navigation";

const metadata: Metadata = {
  title: "New Registration | Nims RSR ",
  description: "Registration page ",
};

const FormElements = () => {
  const [formStep, setFormStep] = useState(0);
  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  const {
    getOperatorDetails,
    result,
    loading,
    getMetadata,
    updateRegistration,
    getUserRoles,
  } = useOperator();
  const [metadata, setMetadata] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [applicationData, setApplicationData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);



  let linkToEntityTypeId = 57;
  const searchParams = useSearchParams();
  const operatorID = searchParams.get("id");
 
  
  // Triggered on click of the Next button
  const handleFormSubmit = async (formData: any) => {
    //Approve "modifiedBy":"3f1a6e24-568b-4f3f-b6ce-4c46149d826f","createdBy":null,"createdDate":null,"modifiedDate":"2024-02-22T14:31:04.820Z","applicationId":"6ef9babb-5abd-4d40-8981-4d20f55eaa70","applicationStatusId":41
    debugger;
    await updateRegistration(applicationData?.applications[0], 37); //
  };


  // if i'm a senior officer
  // we need to store the filtered items, where they are assigned
  // based on the filtered list, check the ones i have been assigned to and display them 





  useEffect(() => {


    debugger;
    if (applicationData == null) {
      debugger;
      
      getOperatorDetails(operatorID).then((data: any) => {

        setApplicationData(data);

        if (metadata.length <= 0) {
          getMetadata().then((data1: any) => {
            //console.log(data);
            setMetadata(data1);
          });
        }
      });
    }
  }, []);

  const businessSectors: any[] = metadata.filter(
    (m: any) => m.metaType == "SECTOR"
  );
  const provinces: any[] = metadata.filter(
    (m: any) => m.metaType == "PROVINCE"
  );
  const categories: any[] = metadata.filter(
    (m: any) => m.metaType == "OPERATIONCATEGORY"
  );

  return (
    <div className="p-10">
      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-12">
          <Breadcrumb
            pageName="New Registration"
            enableBackButton
            isAdmin={true}
          />
          <Stepper activeStep={formStep} />
          <FormCard
            currentStep={formStep}
            prevFormStep={prevFormStep}
            showTwoColumns={false}
          >
            {formStep >= 0 && (
              <DetailsOfApplicants
                businessSectors={businessSectors}
                formStep={formStep}
                adminFormData={applicationData}
                nextFormStep={nextFormStep}
                onDataSubmit={handleFormSubmit}
              />
            )}
            {formStep === 1 && (
              <OfficeAddresses
                onDataSubmit={handleFormSubmit}
                formStep={formStep}
                nextFormStep={nextFormStep}
                adminFormData={applicationData}
                provinces={provinces}
                prevFormStep={prevFormStep}
              />
            )}
            {formStep === 2 && (
              <ContactDetails
                onDataSubmit={handleFormSubmit}
                formStep={formStep}
                adminFormData={applicationData}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
              />
            )}
            {formStep === 3 && (
              <CategoriesOfRailOperations
                categories={categories}
                adminFormData={applicationData}
                onDataSubmit={handleFormSubmit}
                formStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
              />
            )}

            {formStep >= 4 && (
              <>
                {showLoader ? (
                  <Loader />
                ) : (
                  <>
                    {applicationData ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="mt-4.5"></div>
                        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                          Registration Review
                        </h2>
                        <div className="mt-4.5"></div>
                        <p className="font-medium text-black dark:text-white">
                          The application has been successfully reviewed.
                        </p>
                      </div>
                    ) : (
                      <div>
                        Application not submitted, something went wrong.
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </FormCard>
        </div>
      </div>
    </div>
  );
};

export default FormElements;
