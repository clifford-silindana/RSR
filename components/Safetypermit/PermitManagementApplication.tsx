"use client";
import React, { useState, useEffect } from "react";
import CardDataStats from "../CardDataStats";
import dynamic from "next/dynamic";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import { PermitManagementOptions } from "@/common/data";
import HighlightedHeadingForm from "@/components/Forms/HighlightedHeadingForm";
import SafetyPermitForm from "@/components/Forms/SafetyPermitApplicationForm/SafetyPermitForm";
import {
  permitApplicationFormItems,
  asipSubmissionFormItems,
  permitAmendmentFormItems,
} from "@/common/formFields";

import useSession from "@/hooks/useSession";
import { FormProvider } from "../Forms/FormContext/FormContext";
import useOperator from "@/hooks/useOperator";
import { useSearchParams } from "next/navigation";
import AsipForm from "../Forms/AsipSubmissionForm/AsipForm";

const PermitManagementApplication: React.FC = (isAdministrator) => {
  const { session } = useSession();
  const operatorId = session?.user?.operatorId;
  debugger;
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id");
  const { getApplication, getMetadata } = useOperator();
  const [application, setApplication] = useState(null);
  const [formMetadata, setMetadata] = useState([]);

  debugger;
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        if (applicationId != null && formMetadata.length == 0) {
          const data = await getApplication(applicationId);
          setApplication(data);
          const meta = await getMetadata();
          if (meta) {
            setMetadata(meta);
          }
        }
      } catch (error) {}
    };
    fetchApplication();
  }, []);

  //Render different based on the form type
  let applicationType = application?.applicationType?.id;
  const ASIPFORMID = "26";

  if(application){
    
  }

  let permitForm;
  switch (applicationType) {
    case applicationType == ASIPFORMID:
      permitForm = (
        <AsipForm
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={applicationType}
          application={application ? JSON.parse(application.applicationJson) : null}
        />
      );
      break;
    default:
      permitForm = (
        <SafetyPermitForm
          isAdministrator={isAdministrator}
          application={application ? application : null}
          formMetadata={formMetadata}
          permitType={applicationType}
        />
      );
      break;
  }

  console.log("PermitApplicationByID", application)
  return (
    <>
      <Breadcrumb
        pageName={
          isAdministrator?.isAdministrator
            ? "Permit Application Details"
            : "Permit Management"
        }
        enableBackButton={true}
      />
      <FormProvider>
        <div className="mt-9">{permitForm}</div>
      </FormProvider>
    </>
  );
};

export default PermitManagementApplication;