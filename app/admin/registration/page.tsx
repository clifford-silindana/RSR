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
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const RSRAdmin = () => {
    const { getAllApplications, getAllNotifications, getAllApprovals } = useOperator();
    const [allApplications, setAllApplications] = useState([]);
    const [allRegistrations, setAllRegistrations] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const { session } = useSession();
    const operatorId =
        session?.user?.operatorId;

    useEffect(() => {
        const fetchOperatorApplications = async () => {
            try {
                if (!dataLoaded) {
                    const data = await getAllApplications(21);
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

    var applications = allRegistrations.sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate));
    // var newApplications = allApplications.filter(a => a.applicationStatusId === 37); //NEW
    // var pendingApplications = allApplications.filter(a => a.applicationStatusId === 39); //PENDING
    // var approvedApplications = allApplications.filter(a => a.applicationStatusId === 31); //APPROVED

    console.log(applications);

    return (
        <div className="p-10">
            <div className="grid grid-cols-10 gap-5">
                <div className="col-span-12">
                    <Breadcrumb pageName="Registration Applications" enableBackButton={true} isAdmin={true} />
                    <TableThree isregistration={true} applications={applications} pageProps={{ heading: "", pageUrl: "/admin/registration/application" }} />
                </div>
            </div>
        </div>
    );
};

export default RSRAdmin;