import React, { useState, useEffect } from "react";
import { useFormState } from "../FormContext/FormContext";
import { ReasonForApplication } from "../SafetyPermitApplicationForm/ReasonForApplication";
import { ObjectionToRailwaySafetyPermit } from "../SafetyPermitApplicationForm/ObjectionToRailwaySafetyPermit";
import { DetailsOfApplicant } from "../SafetyPermitApplicationForm/DetailsOfApplicant";
import { CategoryOfRailOperationsApplied } from "../SafetyPermitApplicationForm/CategoryOfRailOperationsApplied";
import { DeclarationForm } from "../SafetyPermitApplicationForm/DeclarationForm";
import { AnnualVolumes } from "../SafetyPermitApplicationForm/AnnualVolumes";
import { NetworkOperationsSidings } from "../SafetyPermitApplicationForm/NetworkOperationsSidings";
import { NetworkOperationsRunningLines } from "../SafetyPermitApplicationForm/NetworkOperationsRunningLines";
import { DescriptionOfTrainOperator } from "../SafetyPermitApplicationForm/DescriptionOfTrainOperator";
import { DescriptionOfStation } from "../SafetyPermitApplicationForm/DescriptionOfStation";
import { SafetyManagementSystem } from "../SafetyPermitApplicationForm/SafetyManagementSystem";
import { PermitInfo } from "../AsipSubmissionForm/PermitInfo";
import { AnnualSafetyImprovementPlanReport } from "../AsipSubmissionForm/AnnualSafetyImprovementPlanReport";
import useOperator from "@/hooks/useOperator";

export const FormSteps = ({
  application = null,
  isAdministrator,
  formMetadata,
  permitType,
  asip = null,
  permitData = null,
}) => {
  const { loading, getApplication, getOperatorDetails } = useOperator();
  const { step } = useFormState();
  const AsipFormID = "26";

  // ASIP Form data state

 
  
  const [asipFormApplicationJSON, setAsipFormApplicationJSON] = useState(null);

  useEffect(() => {
    if (permitType === AsipFormID && !isAdministrator) {
      console.log("Fetching ASIP Form data...");
      getApplication(permitData.applicationId)
        .then((data) => {
          setAsipFormApplicationJSON(JSON.parse(data.applicationJson));
        })
        .catch((error) => {
          console.error("Error fetching ASIP Form data:", error);
        });
    }
  }, [permitType, AsipFormID]); // Dependencies for the useEffect hook

  //console.log("ASIP SUBMISSION",asipFormApplicationJSON ? JSON.parse(asipFormApplicationJSON.applicationJson) : {});
  let applicationData = application
    ? JSON.parse(
        application.applicationJson == "" ? "{}" : application.applicationJson
      )
    : null;

  // Fetch operators annual volumes details

  switch (step) {
    case 1:
      if (permitType == AsipFormID) {
        return (
          <PermitInfo
            application={applicationData}
            permitType={permitType}
            permitData={permitData}
          />
        );
      }
      return (
        <ReasonForApplication
          application={applicationData}
          formMetadata={formMetadata}
          permitType={permitType}
        />
      );
    case 2:
      if (permitType == AsipFormID) {
        return (
          <AnnualVolumes
            application={isAdministrator ? applicationData : asipFormApplicationJSON}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
            allowEdit={true}
            permitType={permitType}
            asip={asip}
          />
        );
      }
      return (
        <AnnualVolumes
          application={applicationData}
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
        />
      );
    case 3:
      if (permitType == AsipFormID) {
        return (
          <DetailsOfApplicant
            application={isAdministrator ? applicationData : asipFormApplicationJSON}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
          />
        );
      }
      return (
        <ObjectionToRailwaySafetyPermit
          application={applicationData}
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
        />
      );
    case 4:
      if (permitType == AsipFormID) {
        return (
          <NetworkOperationsSidings
            application={isAdministrator ? applicationData : asipFormApplicationJSON}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
          />
        );
      }
      return (
        <DetailsOfApplicant
          application={applicationData}
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
        />
      );
    case 5:
      debugger;
      if (permitType == "23" || permitType == "24") {
        return (
          <SafetyManagementSystem
            application={applicationData}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
            permitType={permitType}
          />
        );
      } else if (permitType == AsipFormID) {
        return (
          <NetworkOperationsRunningLines
            application={isAdministrator ? applicationData : asipFormApplicationJSON}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
          />
        );
      } else {
        return (
          <NetworkOperationsSidings
            application={applicationData}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
            permitType={permitType}
          />
        );
      }
    case 6:
      debugger;
      if (permitType == "23" || permitType == "24") {
        return (
          <DeclarationForm
            application={applicationData}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
            permitType={permitType}
          />
        );
      } else if (permitType == AsipFormID) {
        return (
          <DescriptionOfTrainOperator
            application={isAdministrator ? applicationData : asipFormApplicationJSON}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}git 
            permitType={permitType}
          />
        );
      } else {
        return (
          <NetworkOperationsRunningLines
            application={applicationData}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
            permitType={permitType}
          />
        );
      }
    case 7:
      if (permitType == AsipFormID) {
        return (
          <SafetyManagementSystem
            application={isAdministrator ? applicationData : asipFormApplicationJSON}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
            permitType={permitType}
            asip
          />
        );
      }
      return (
        <DescriptionOfTrainOperator
          application={applicationData}
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
        />
      );
    case 8:
      if (permitType == AsipFormID) {
        return (
          <DeclarationForm
            application={isAdministrator ? applicationData : asipFormApplicationJSON}
            isAdministrator={isAdministrator}
            formMetadata={formMetadata}
            permitType={permitType}
          />
        );
      }
      return (
        <DescriptionOfStation
          application={applicationData}
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
        />
      );
    case 9:
      return (
        <SafetyManagementSystem
          application={applicationData}
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
        />
      );
    case 10:
      return (
        <DeclarationForm
          application={applicationData}
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
        />
      );
    default:
      return null;
  }
};
