import { IAddress } from "./IAddress";
import { IContact } from "./IContact";
import {IDocument} from "@/models/IDocument";

export interface IOperator {
    Name: string;
    Id?: string;
    RegistrationNumber: string;
    PhysicalAddress?: IAddress;
    PostalSameAsPhysical: boolean;
    PostalAddress?: IAddress;
    TelephoneNumber: string;
    OperationCategoryId: number;
    SectorId?: number;
    Contacts: IContact[];
    Documents: IDocument[];
    CreatedBy?: string;
    CreatedDate?: string;
    ModifiedBy?: string;
    ModifiedDate?: string;
}