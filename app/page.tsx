import ECommerce from "@/components/SafetyPermit/PermitManagementDashboard";
import HomeComponent from "@/components/Home/Home";
import { Metadata } from "next";
import FormElements from "@/app/auth/registration/page";
import SignIn from "@/app/auth/signin/page";
import HomePage from "@/app/home/page";
import ActionCard from "@/components/Card/Card";
import TableThree from "@/components/Tables/TableThree";

export const metadata: Metadata = {
  title: "Home |  Nims RSR",
  description: "This is Home page for Nims RSR",
  // other metadata
};

export default function Home() {

  return (
    <>
      {/*<HomeComponent Title="Test Title"/>
      <ECommerce />
  <SignIn/>
   **/}
      <HomePage/>
    </>
  );
}
