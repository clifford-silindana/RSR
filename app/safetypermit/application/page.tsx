import { Metadata } from "next";
import PermitManagementApplication from "@/components/SafetyPermit/PermitManagementApplication";

export const metadata: Metadata = {
  title: "Safety Permit",
  description: "Safety Permit Management",
};
const AuthenticatedUserHomePage = async () => {
  return (
    <>
      <PermitManagementApplication isAdministrator={false}   />;
    </>
  );
};

export default AuthenticatedUserHomePage;
