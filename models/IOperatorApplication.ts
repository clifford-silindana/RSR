import { IAddress } from "@/models/IAddress";
import { IContact } from "@/models/IContact";
import { IDocument } from "@/models/IDocument";

export interface IOperatorApplication {
    legalName: string;
    tradeName: string;
    registrationNumber: string;
    businessSector: number;
    registrationDocument: File | null;
    tradeNameLetter: File | null;
    safetyManagementReport: File | null;
    registrationDocumentValue: string | null;
    tradeNameLetterValue: string | null;
    safetyManagementReportValue: string | null;
    companyTelephone: string;
}