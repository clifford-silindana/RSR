// Defines the metadata required for each form
interface FormElement {
  type: "text" | "select" | "checkbox" | "number" | "file";
  label: string;
  name: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

type SafetyPermitFormSteps = any;

// Applying for a permit form structure
export const permitApplicationFormItems: FormElement[] = [
  {
    type: "select",
    label: "Permit Type",
    required: true,
    name: "permitType",
    options: [
      { value: "1", label: "Branch 1" },
      { value: "2", label: "Branch 2" },
      { value: "3", label: "Branch 3" },
    ],
  },
  {
    type: "select",
    label: "Branch",
    name: "branch",
    required: true,
    options: [
      { value: "1", label: "Branch 1" },
      { value: "2", label: "Branch 2" },
      { value: "3", label: "Branch 3" },
    ],
  },
];

// ASIP Submission
export const asipSubmissionFormItems: FormElement[] = [
  {
    type: "select",
    label: "Branch",
    name: "branch",
    required: true,
    options: [
      { value: "1", label: "Branch 1" },
      { value: "2", label: "Branch 2" },
      { value: "3", label: "Branch 3" },
    ],
  },
];
// Details of applicant [Register page]
export const detailsOfApplicantFormItems: FormElement[] = [
  {
    type: "text",
    label: "Legal Name (Name of Operator)",
    name: "legalName",
    required: true,
  },
  {
    type: "text",
    label: "Trade Name",
    name: "tradeName",
    required: true,
  },
  {
    type: "number",
    label: "Company Registration Number",
    name: "registrationNumber",
    required: true,
  },
  {
    type: "number",
    label: "Company Telephone",
    name: "companyTelephone",
    required: true,
  },
  {
    type: "number",
    label: "Company Fax",
    name: "companyFax",
    required: true,
  },
  {
    type: "select",
    label: "Business Sector / Industry",
    name: "businessSector",
    required: true,
    options: [
      { value: "1", label: "Sector 1" },
      { value: "2", label: "Sector 2" },
    ],
  },
  {
    type: "file",
    label: "Company Registration Document",
    name: "registrationDocument",
    required: true,
  },
];

// Permit Amendment
export const permitAmendmentFormItems: FormElement[] = [
  {
    type: "select",
    label: "Company",
    name: "company",
    required: true,
    options: [
      { value: "1", label: "Branch 1" },
      { value: "2", label: "Branch 2" },
      { value: "3", label: "Branch 3" },
    ],
  },
  {
    type: "checkbox",
    label: "Legal entity change (change in company registration number)",
    required: true,
    name: "permitType",
  },
  {
    type: "checkbox",
    label: "Name change (NO change in company registration number)",
    required: true,
    name: "permitType",
  },
  {
    type: "checkbox",
    label: "Adding sites to a permit",
    required: true,
    name: "permitType",
  },
  {
    type: "checkbox",
    label: "Removing sites from a permit",
    required: true,
    name: "permitType",
  },
  {
    type: "checkbox",
    label: "Revocation of special conditions",
    required: true,
    name: "permitType",
  },
];

export const safetyPremitFormSteps: SafetyPermitFormSteps = [{
  type: "21", fields:
    [
      "1. Reason For Application",
      "2. Annual Volumes Of People And Goods Transported",
      "3. Objections To Rail Operations",
      "4. Details Of Applicant",
      "5. Network Operations: Sidings",
      "6. Network Operations: Running Lines",
      "7. Description of Train Operations",
      "8. Station Operations",
      "9. Safety Management System (SMS Determination, 2018)",
      "10. Declaration"
    ]
}, {
  type: "22", fields:
    [
      "1. Reason For Application",
      "2. Annual Volumes Of People And Goods Transported",
      "3. Objections To Rail Operations",
      "4. Details Of Applicant",
      "5. Network Operations: Sidings",
      "6. Network Operations: Running Lines",
      "7. Description of Train Operations",
      "8. Station Operations",
      "9. Safety Management System (SMS Determination, 2018)",
      "10. Declaration"
    ]
},
{
  type: "23", fields:
    [
      "1. Reason For Application",
      "2. Annual Volumes Of People And Goods Transported",
      "3. Objections To Rail Operations",
      "4. Details Of Applicant",
      "9. Safety Management System (SMS Determination, 2018)",
      "10. Declaration"
    ]
},
{
  type: "24", fields:
    [
      "1. Reason For Application",
      "2. Annual Volumes Of People And Goods Transported",
      "3. Objections To Rail Operations",
      "4. Details Of Applicant",
      "9. Safety Management System (SMS Determination, 2018)",
      "10. Declaration"
    ]
},
{
  type: "26", fields:
    [
      "1. Permit Information",
      "2. Annual Volumes Of People And Goods Transported",
      "3. Details Of Applicant",
      "4. Network Operations: Sidings",
      "5. Network Operations: Running Lines",
      "6. Description of Train Operation",
      "7. Annual Safety Improvement Plan Report",
      "8. Declaration"
    ]
}
];

export const adminSafetyPremitFormSteps: SafetyPermitFormSteps = [
  "1. Reason For Application",
  "2. Annual Volumes Of People And Goods Transported",
  "3. Objections To Rail Operations",
  "4. Details Of Applicant",
  "5. Network Operations: Sidings",
  "6. Network Operations: Running Lines",
  "7. Description of Train Operations",
  "8. Station Operations",
  "9. Safety Management System (SMS Determination, 2018)",
  "10. Declaration"
];