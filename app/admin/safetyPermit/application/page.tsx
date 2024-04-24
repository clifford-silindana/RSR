"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FormProvider } from "@/components/Forms/FormContext/FormContext";
import PermitManagementApplication from "@/components/SafetyPermit/PermitManagementApplication";

export default function AdminSafetyPermitview() {
  return (
    <FormProvider>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">       
        <PermitManagementApplication isAdministrator={true} />;
      </div>
    </FormProvider>
  );
}