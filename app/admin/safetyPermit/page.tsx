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
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

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
  const {
    loading,
    getAllApplications,
    getAllNotifications,
    getAllApprovals,
    getOfficers,
    getUserRoles,
  } = useOperator();
  const [allApplications, setAllApplications] = useState([]);
  //const [allRegistrations, setAllRegistrations] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [officers, setOfficers] = useState([]);
  const { session } = useSession();
  //const operatorId = session?.user?.operatorId;
  //   const roleId = session?.user?.roleId;
  const userId = session?.user?.userId;
  const roleId = "75f5e745-ba42-4c25-8fc4-68051184ccfb";

  console.log(userId);
  console.log(roleId);

  const [userRoles, setUserRoles] = useState([]);
  const [isPermitManager, setIsPermitManager] = useState(false);

  useEffect(() => {
    const fetchOperatorApplications = async () => {
      try {
        if (!dataLoaded) {
          const _roles = await getUserRoles();
          setUserRoles(_roles);

          const data = await getAllApplications(21); //Permits

          
          //const permitApps = data.filter((a) => a.applicationTypeId === 21);
          //const registrations = data.filter((a) => a.applicationTypeId === 20);
          const officers = await getOfficers();
          setOfficers(officers);
          setAllApplications(data);
          //setAllRegistrations(registrations);
          setDataLoaded(true);
        }
      } catch (error) {}
    };
    fetchOperatorApplications();
  }, [getAllApplications, allApplications]);

  const sortedApplications = allApplications.sort(
    (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
  );

  let applications;

  /*
  if (sortedApplications) {
    // Identify the role of the current user
    const currentUserRole = userRoles.find((item) => item.roleId === roleId);
    debugger;
    // Filter applications based on the user role
    if (currentUserRole) {
      switch (currentUserRole.roleName) {
        case "Senior Manager":
          applications = sortedApplications;
          break;
        case "Permit Officer":
          applications = sortedApplications.filter(
            (item) => item.assignedToUserId === userId
          );
          break;
        default:
          console.log("Default roleId");
          applications = [];
          break;
      }
    }
  }
*/

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
  //save the append the name to count for specific
  console.log("counts obj", statusesCounts);
  // IF NOMINATED SHOW EVERYTHING

  return (
    <div className="p-10">
      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-12">
          <Breadcrumb
            pageName="Safety Permit Applications"
            enableBackButton={true}
            isAdmin={true}
          />
          {dataLoaded ? (
            <TableThree
              isAdministrator={true}
              isregistration={false}
              isPermitManager={true}
              applications={sortedApplications}
              pageProps={{
                heading: "",
                pageUrl: "/admin/safetyPermit/application",
              }}
              people={officers}
              statusesCounts={statusesCounts}
            />
          ) : (
            "Permit Applications Table Loading... "
          )}
        </div>
      </div>
    </div>
  );
};

export default RSRAdmin;