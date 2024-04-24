import { Metadata } from "next";
import OccurenceManagementDashboard from "@/components/Occurencies/OccurenceManagementDashboard";
import { authConfig, loginRequiredServe } from "../lib/auth";
import useSession from "@/hooks/useSession";
import { log } from "console";
// import { loginRequiredClient } from "@/app/lib/auth";

export const metadata: Metadata = {
  title: "Safety Permit",
  description: "Safety Permit Management",
  // other metadata
};
const AuthenticatedUserHomePage = async () => {
  // await loginRequiredServe();
  return (
    <>
      <OccurenceManagementDashboard />;
    </>
  );
};

export default AuthenticatedUserHomePage;
