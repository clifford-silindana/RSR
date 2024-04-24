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

const metadata: Metadata = {
  title: "New Registration | Nims RSR ",
  description: "Registration page ",
  // other metadata
};

const FormElements = () => {
  const [formStep, setFormStep] = useState(0);
  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  const [running, setRunning] = useState(1);
  const { addOperator, result, loading, getMetadata } = useOperator();
  const [metadata, setMetadata] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [applicationData, setApplicationData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  let linkToEntityTypeId = 57;

  // Triggered on click of the Next button
  const handleFormSubmit = (formData: any) => {
    debugger;
    if (metadata) {
      linkToEntityTypeId = metadata.filter((m: any) => m.metaType === "LINKTOENTITYTYPE" && m.name === "Operator")[0].id;
    }
    if (formStep === 0) {
      if (formData.registrationDocument?.name) {
        Helper.processFile(formData.registrationDocument, function (data) {
          var array = new Int8Array(data);
          const documentTypeId: any[] = metadata.filter(
            (m: any) => m.metaType == "OPERATORREGISTRATIONDOCUMENTTYPE" && m.name == "Company Registration Document"
          )[0].id;
          let currentFiles = allFiles;
          currentFiles.push({
            createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            createdDate: new Date(),
            fileContent: JSON.stringify(array, null, '  '),
            documentTypeId: documentTypeId,
            linkToEntityTypeId: linkToEntityTypeId,
            linkToEntityTypeValue: formData.registrationDocument.name
          });
          setAllFiles(currentFiles);
        }, function (e) {
          console.error(e);
        });
      }
      if (formData.safetyManagementReport?.name) {
        Helper.processFile(formData.safetyManagementReport, function (data) {
          debugger
          var array = new Int8Array(data);
          const documentTypeId: any[] = metadata.filter(
            (m: any) => m.metaType == "OPERATORREGISTRATIONDOCUMENTTYPE" && m.name == "Safety Management System Report"
          )[0].id;
          let currentFiles = allFiles;
          allFiles.push({
            createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            createdDate: new Date(),
            fileContent: JSON.stringify(array, null, '  '),
            documentTypeId: documentTypeId,
            linkToEntityTypeId: linkToEntityTypeId,
            linkToEntityTypeValue: formData.safetyManagementReport.name
          });
          setAllFiles(currentFiles);

        }, function (e) {
          console.error(e);
        });
      }
      if (formData.tradeNameLetter?.name) {
        Helper.processFile(formData.tradeNameLetter, function (data) {
          debugger
          var array = new Int8Array(data);
          const documentTypeId: any[] = metadata.filter(
            (m: any) => m.metaType == "OPERATORREGISTRATIONDOCUMENTTYPE" && m.name == "Trade Name Letter"
          )[0].id;
          let currentFiles = allFiles;
          allFiles.push({
            createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            createdDate: new Date(),
            fileContent: JSON.stringify(array, null, '  '),
            documentTypeId: documentTypeId,
            linkToEntityTypeId: linkToEntityTypeId,
            linkToEntityTypeValue: formData.tradeNameLetter.name
          });
          setAllFiles(currentFiles);
        }, function (e) {
          console.error(e);
        });
      }

      localStorage.setItem(
        "operatorApplication_step0",
        JSON.stringify(formData)
      );

    } else if (formStep === 1) {
      localStorage.setItem(
        "operatorApplication_step1",
        JSON.stringify(formData)
      );

    } else if (formStep === 2) {
      if (formData.appointmentLetter?.name) {
        Helper.processFile(formData.appointmentLetter, function (data) {
          debugger
          var array = new Int8Array(data);
          //ADD APPOINTMENT LETTER
          const documentTypeId: any[] = metadata.filter(
            (m: any) => m.metaType == "OPERATORREGISTRATIONDOCUMENTTYPE" && m.name == "Trade Name Letter"
          )[0].id;
          let storedCompanyDetails: any = JSON.parse(localStorage.getItem(
            "operatorApplication_step2"
          ));
          let currentFiles = allFiles;
          allFiles.push({
            createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            createdDate: new Date(),
            fileContent: JSON.stringify(array, null, '  '),
            documentTypeId: documentTypeId,
            linkToEntityTypeId: linkToEntityTypeId,
            linkToEntityTypeValue: formData.appointmentLetter.name
          });
          setAllFiles(currentFiles);
        }, function (e) {
          console.error(e);
        });
      }

      localStorage.setItem(
        "operatorApplication_step2",
        JSON.stringify(formData)
      );

    }
    else if (formStep === 3) {

      // localStorage.setItem(
      //   "operatorApplication_step3",
      //   JSON.stringify(formData)
      // );

      setShowLoader(true);
      const storedCompanyDetails: string | null = localStorage.getItem(
        "operatorApplication_step0"
      );
      const storedOfficeAddresses: string | null = localStorage.getItem(
        "operatorApplication_step1"
      );

      const storedOrgContacts: string | null = localStorage.getItem(
        "operatorApplication_step2"
      );

      const categoriesDetails = 8;

      if (storedCompanyDetails && storedOfficeAddresses && storedOrgContacts && categoriesDetails) {
        //Company Details
        const formData0: IOperatorApplication =
          JSON.parse(storedCompanyDetails);

        //Adresses
        const formData1: IOperatorApplicationAddresses = JSON.parse(
          storedOfficeAddresses
        );

        //Contacts
        const formData2: IOperatorOrgContacts = JSON.parse(storedOrgContacts);
        const formData3: ICategoryOfRail = JSON.parse(categoriesDetails);
        debugger;
        const operator: any = {
          createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createdDate: new Date(),
          modifiedDate: new Date(),
          modifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          legalName: formData0.legalName,
          tradeName: formData0.tradeName,
          registrationNumber: formData0.registrationNumber,
          physicalAddress: {
            streetNumber: formData1.streetNumber,
            streetName: formData1.streetName,
            unitNumber: formData1.unitNumber,
            complex: formData1.complex,
            suburb: formData1.suburb,
            city: formData1.cityTown,
            postalCode: formData1.postalCode,
            provinceId: provinces.filter(p => p.name == formData1.province)[0].id,
          },
          postalSameAsPhysical: false,
          postalAddress: {
            streetNumber: formData1.streetNumber,
            streetName: formData1.streetName,
            unitNumber: formData1.unitNumber,
            complex: formData1.complex,
            suburb: formData1.suburb,
            city: formData1.cityTown,
            postalCode: formData1.postalCode,
            provinceId: provinces.filter(p => p.name == formData1.province)[0].id,
          },
          telephoneNumber: formData0.companyTelephone,
          sectorId: formData0.businessSector,
          operationCategoryId: formData3,
          contacts: [
            {
              name: formData2.name,
              surname: formData2.surname,
              email: formData2.emailAddress,
              jobTitle: formData2.jobTitle,
              landline: formData2.landlinePhoneNumber,
              cellphone: formData2.cellPhoneNumber,
              fax: formData2.alternativeEmailAddress,
              phoneNumber: formData2.cellPhoneNumber,
              createUserAccount: true,
            },
            {
              name: formData2.managerName,
              surname: formData2.managersurname,
              email: formData2.manageremailAddress,
              jobTitle: formData2.managerjobTitle,
              landline: formData2.managerlandlinePhoneNumber,
              cellphone: formData2.managercellPhoneNumber,
              fax: formData2.manageralternativeEmailAddress,
              phoneNumber: formData2.managercellPhoneNumber,
              createUserAccount: false,
            },
          ],
          documents: [] // allFiles, Sent Sepearate Call 413 Error Large Request
        };

        addOperator(operator)
          .then((data: any) => {
            localStorage.clear();
            setApplicationData(data);
            setShowLoader(false);
          })
          .catch((error: any) => {
            localStorage.clear();
            setShowLoader(false);
          });
      } else {
        setShowLoader(false);
        alert(`Data not found for step:${formStep}`);
      }
    }
  };

  useEffect(() => {
    if (metadata.length <= 0) {
      getMetadata().then((data: any) => {
        //console.log(data);
        setMetadata(data);
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
    <>
      <Breadcrumb pageName="New Registration" enableBackButton />
      <Stepper activeStep={formStep} />

      <FormCard
        currentStep={formStep}
        prevFormStep={prevFormStep}
        showTwoColumns={false}>
        {formStep >= 0 && (
          <DetailsOfApplicants
            businessSectors={businessSectors}
            formStep={formStep}
            nextFormStep={nextFormStep}
            onDataSubmit={handleFormSubmit}
          />
        )}
        {formStep === 1 && (
          <OfficeAddresses
            onDataSubmit={handleFormSubmit}
            formStep={formStep}
            nextFormStep={nextFormStep}
            provinces={provinces}
            prevFormStep={prevFormStep}
          />
        )}
        {formStep === 2 && (
          <ContactDetails
            onDataSubmit={handleFormSubmit}
            formStep={formStep}
            nextFormStep={nextFormStep}
            prevFormStep={prevFormStep}
          />
        )}
        {formStep === 3 && (
          <CategoriesOfRailOperations
            categories={categories}
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
                {applicationData ?
                  <div className="flex flex-col items-center justify-center">
                    <div className="mt-4.5"></div>
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                      Registration Complete
                    </h2>
                    <div className="mt-4.5"></div>
                    <p className="font-medium text-black dark:text-white">
                      Thank you for registering with the RSR. You will receive an email with your application link and reference number.
                    </p>
                    <div className="mt-4.5"></div>
                    <p className="font-medium text-black dark:text-white italic">
                      If you have any queries, please contact the RSR on Tel: +27 10
                      495 5391
                    </p>
                  </div>
                  : <div>
                    Application not submitted, something went wrong.
                  </div>
                }
              </>

            )}
          </>
        )}
      </FormCard>
    </>
  );
};

export default FormElements;
