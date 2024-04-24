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

import { ConstructionTrainSaftyPermit } from "../Forms/ConstructionTrainSafetyPermit/ConstructionTrainSafetyPermit";

import useSession from "@/hooks/useSession";
import { FormProvider } from "../Forms/FormContext/FormContext";
import useOperator from "@/hooks/useOperator";
import AsipForm from "../Forms/AsipSubmissionForm/AsipForm";

const PermitManagementDashboard: React.FC = (isAdministrator) => {
  const { session, checkSession } = useSession();
  let userId = session?.user?.id;
  let operatorId = session?.user?.operatorId;

  debugger;
  const [activeTab, setActiveTab] = useState(0);
  const [permitType, setPermitType] = useState("");
  const [permitTypes, setPermitTypes] = useState([]);
  const { getMetadata, getOperatorApplicationsByUser, getOperatorDetails } =
    useOperator();
  const [allApplications, setAllApplications] = useState([]);
  const [formMetadata, setMetadata] = useState([]);

  const [operatorPermitDetails, setOperatorPermitDetails] = useState(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const onSubmit = (permit: any) => {
    setPermitType(permit);
  };

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const operatorData = await getOperatorDetails(operatorId);
        setOperatorPermitDetails(operatorData.currentPermit);

        const data = await getMetadata();
        if (allApplications.length === 0) {
          if (userId == null) {
            const userSession = await checkSession();
            userId = userSession?.user?.userId;
          }
          const applicationsData = await getOperatorApplicationsByUser(userId);
          setAllApplications(
            applicationsData.filter((a) => a.applicationTypeId != 20)
          );
        }
        if (data) {
          const dbTypes = data.filter(
            (sItem) =>
              (sItem.metaType === "APPLICATIONTYPE" &&
                sItem?.name?.indexOf("Apply") > -1) ||
              sItem?.name?.indexOf("Submit") > -1
          );
          setPermitTypes(dbTypes);
          setMetadata(data);
        }
      } catch (error) {}
    };
    loadMetadata();
  }, [operatorId]);

  const applicationStatuses = [];
  //for each application get the applicationStaus
  allApplications.forEach((application) => {
    //from the application status, extract the name
    applicationStatuses.push(application.applicationStatus.name);
  });
  console.log("apps status", applicationStatuses);
  const statusNames = ["New", "Pending", "Approved", "Draft"];
  const statusesCounts = {};

  statusNames.forEach((statusName) => {
    const count = applicationStatuses.filter((s) => s === statusName).length;
    statusesCounts[statusName.toLowerCase()] = count;
  });

  console.log("allApplications", allApplications);
  // Check users last approved safety application and return the data
  // Filter objects with applicationType.name equal to "Apply/Renew for Safety Permit"
  const filteredData = allApplications.filter(
    (obj) => obj.applicationType.name === "Apply/Renew for Safety Permit"
  );

  // Find the object with the latest createdDate among the filtered data
  let lastOperatorApplication;
  if (filteredData.length > 0) {
    const latestObject = filteredData.reduce((prev, current) =>
      new Date(prev.createdDate) > new Date(current.createdDate)
        ? prev
        : current
    );
    lastOperatorApplication = latestObject;
  }

  const renderFormContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <HighlightedHeadingForm
            permitTypes={permitTypes}
            title="Apply for Permit / ASIP Submission"
            description="Select the type of permit / ASIP Submission you wish to apply for."
            elements={permitApplicationFormItems}
            onSubmit={onSubmit}
          />
        );
      case 3:
        return (
          <HighlightedHeadingForm
            permitTypes={permitTypes}
            title="Permit Amendment"
            description="Select the reason why you want to amend as well as the company on behalf of whom you are applying for and click Generate Form."
            elements={permitAmendmentFormItems}
            onSubmit={onSubmit}
          />
        );
      default:
        return <div></div>;
    }
  };
  const updatePermitType = (newValue) => {
    setPermitType(newValue);
  };
  //TODO: Switch Forms Based on Permit Types
  let permitForm;
  switch (permitType) {
    case "26":
      permitForm = (
        <AsipForm
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
          setPermitType={updatePermitType}
          application={lastOperatorApplication}
          permitData={operatorPermitDetails}
        />
      );
      break;
    default:
      permitForm = (
        <SafetyPermitForm
          isAdministrator={isAdministrator}
          formMetadata={formMetadata}
          permitType={permitType}
          setPermitType={updatePermitType}
        />
      );
      break;
  }
  debugger;
  return (
    <>
      <Breadcrumb
        pageName="Permit Management"
        enableBackButton={true}
        isAdmin={isAdministrator}
      />
      <CardDataStats
        data={PermitManagementOptions}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      {activeTab === 0 && (
        <TableThree
          isAdministrator={false}
          isregistration={false}
          applications={allApplications}
          pageProps={{
            heading: "My Permit Applications",
            pageUrl: "/safetypermit/application",
          }}
          statusesCounts={statusesCounts}
        />
      )}
      {permitType === "" ? (
        <div className="mt-9">
          <div className="flex flex-col gap-10">{renderFormContent()}</div>
        </div>
      ) : (
        <>
          {activeTab !== 0 && activeTab !== 2 && (
            <>
              <FormProvider>
                <div className="mt-9">{permitForm}</div>
              </FormProvider>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PermitManagementDashboard;
