"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import useOperator from "@/hooks/useOperator";
import api from "@/common/api";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableThree from "../Tables/TableThree";
import TableOccurrences from "../Tables/TableOcurrences";
import CardDataStats from "../CardDataStats";
import { OccurenceManagementOptions } from "@/common/data";
import ReportOccurrencePage from "@/app/pages/occurence/report/page";

const OccurenceManagementDashboard: React.FC = (isAdministrator) => {
  const results: string[] = [];
  const { session, checkSession } = useSession();
  let userId = session?.user?.id;
  let operatorId = session?.user?.operatorId;
  debugger;
  const {
    getMetadata,
    getOperatorApplicationsByUser,
    getOccurrenceBySearchCriteria,
  } = useOperator();
  const [allApplications, setAllApplications] = useState([]);
  const [data, setData] = useState([] as any);

  // Indicate the currently selected tab on the home screens
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const loadMetadata = async () => {
      const operatorOccurences = await getOccurrenceBySearchCriteria(
        operatorId
      );
      setAllApplications(operatorOccurences);
      /*
      try {
        const operatorOccurences = await getOccurrenceBySearchCriteria(operatorId);
        setAllApplications(operatorOccurences);

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
   
    */
    };
    loadMetadata();
  }, [operatorId]);

  return (
    <>
      <Breadcrumb pageName="Occurrence Management" enableBackButton={true} />
      <CardDataStats
        data={OccurenceManagementOptions}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      {/***
       * 
       *       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-10">
        <Card className="shadow-md border-none">
          <a href="pages/occurence/report">
            <CardHeader>
              <CardTitle>Report Occurrences</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </a>
        </Card>
        <Card className="shadow-md border-none">
          <a href="../../app/occurence/daily/DailyPage">
            <CardHeader>
              <CardTitle>Bulk Upload Occurrence</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
          </a>
        </Card>
        <Card className="shadow-md border-none">
          <a href="/admin/safetyPermit">
            <CardHeader>
              <CardTitle>Capture Quarterly Report</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </a>
        </Card>
        <Card className="shadow-md border-none">
          <a href="/admin/safetyPermit">
            <CardHeader>
              <CardTitle>Desktop Review</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </a>
        </Card>
        <Card className="shadow-md border-none">
          <a href="/admin/safetyPermit">
            <CardHeader>
              <CardTitle>Desktop Review</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </a>
        </Card>
        <Card className="shadow-md border-none">
          <a href="/admin/safetyPermit">
            <CardHeader>
              <CardTitle>Board of Enquiry</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </a>
        </Card>
      </div>
     

     
  */}

      {activeTab === 0 && (
        <TableOccurrences
          isAdministrator={false}
          isregistration={false}
          applications={allApplications}
          pageProps={{
            heading: "My Ocurrences",
            pageUrl: "/occurence/application",
          }}
          people={undefined}
          isPermitManager={false}
        />
      )}

      {activeTab === 1 && <ReportOccurrencePage />}

      {/*** 

      <div>
          <Table className="min-w-full bg-white border rounded border-gray-300">
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="lowercase py-2 px-4 border">Occurrence ID</TableHead>
              <TableHead className="lowercase py-2 px-4 border">Reference Number</TableHead>
              <TableHead className="lowercase py-2 px-4 border">Occurrence Description</TableHead>
              <TableHead className="lowercase py-2 px-4 border">Immediate Cause</TableHead>
              <TableHead className="lowercase py-2 px-4 border">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          </TableBody>
        </Table>
      </div>
      */}
    </>
  );
};

export default OccurenceManagementDashboard;
