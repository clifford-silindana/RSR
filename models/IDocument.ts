import {IAddress} from "@/models/IAddress";
import {IContact} from "@/models/IContact";

export interface IDocument {
    OperatorId?: string;
    FileContent: string;
    FileName: string;
    FileType: string;
}