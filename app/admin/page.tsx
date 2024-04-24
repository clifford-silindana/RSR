"use client";
import { useEffect, useState } from "react";
import ChartOne from "@/components/Charts/ChartOne";
import ChartThree from "@/components/Charts/ChartThree";
import ChartTwo from "@/components/Charts//ChartTwo";
// import Card from "@/components/Card/Card";
import TableOne from "@/components/Tables/TableOne";
import ChatCard from "@/components/Chat/ChatCard";
import useOperator from "@/hooks/useOperator";
import useSession from "@/hooks/useSession";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Divide } from "lucide-react";
import TableThree from "@/components/Tables/TableThree";

const RSRAdmin = () => {
    const { getAllApplications, getAllNotifications, getAllApprovals } = useOperator();
    const [allApplications, setAllApplications] = useState([]);
    const [allRegistrations, setAllRegistrations] = useState([]);
    const { session } = useSession();
    const [dataLoaded, setDataLoaded] = useState(false);
    const operatorId =
        session?.user?.operatorId;

    useEffect(() => {
        const fetchOperatorApplications = async () => {
            try {
                if (!dataLoaded) {
                    const data = await getAllApplications(21); //Permits
                    debugger;
                    const permitApps = data.filter(a => a.applicationTypeId === 21);
                    const registrations = data.filter(a => a.applicationTypeId === 20)
                    setAllApplications(permitApps);
                    setAllRegistrations(registrations);
                    setDataLoaded(true);

                }

            } catch (error) {

            }
        };
        fetchOperatorApplications();
    }, [getAllApplications, allApplications]);

    var applications = allApplications.sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate));
    // var newApplications = allApplications.filter(a => a.applicationStatusId === 37); //NEW
    // var pendingApplications = allApplications.filter(a => a.applicationStatusId === 39); //PENDING
    // var approvedApplications = allApplications.filter(a => a.applicationStatusId === 31); //APPROVED

    return (
      <div className="p-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-10">
          <Card className="shadow-md border-none">
            <a href="/admin/registration">
              <CardHeader>
                <CardTitle>New Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                {dataLoaded ? (
                  <span className="text-xl font-medium p-2 bg-success rounded-lg text-white">
                    {allRegistrations.length}
                  </span>
                ) : (
                  "Loading..."
                )}
              </CardContent>
            </a>
          </Card>
          <Card className="shadow-md border-none">
            <a href="/admin/safetyPermit">
              <CardHeader>
                <CardTitle>New Permit Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {dataLoaded ? (
                  <span className="text-xl font-medium p-2 bg-warning rounded-lg text-white">
                    {applications.length}
                  </span>
                ) : (
                  "Loading.."
                )}
              </CardContent>
            </a>
          </Card>
          <Card className="shadow-md border-none">
            <a href="/admin/occurences">
              <CardHeader>
                <CardTitle>New Occurrences</CardTitle>
              </CardHeader>
              <CardContent>
                {dataLoaded ? (
                  <span className="text-xl font-medium p-2 bg-warning rounded-lg text-white">
                    {applications.length}
                  </span>
                ) : (
                  "Loading.."
                )}
              </CardContent>
            </a>
          </Card>
        </div>
        <div className="grid grid-cols-10 gap-5">
          {/* <div className="col-span-12">                  
                    <TableThree applications={applications} pageProps={{ heading: "Applications", pageUrl: "/admin/safetyPermit/application" }} />
                </div> */}
        </div>
      </div>
    );
};

export default RSRAdmin;