export interface IOperatorOrgContacts {
    name: string;
    surname: string;
    jobTitle: string;
    landlinePhoneNumber: string;
    cellPhoneNumber: string;
    emailAddress: string;
    alternativeEmailAddress: string;
    isNominatedManagerSameAsHeadOfOrg: boolean;
    appointmentLetter: File | null;
    managerName: string;
    managersurname: string;
    managerjobTitle: string;
    managerlandlinePhoneNumber: string;
    managercellPhoneNumber: string;
    manageremailAddress: string;
    manageralternativeEmailAddress: string;
}